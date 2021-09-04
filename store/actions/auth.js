export const SIGNUP="SIGNUP";
export const LOGIN="LOGIN";
let timer;
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authenticate=(userId,token,expiryTime)=>{
    return dispatch=>{
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type:"AUTHENTICATE",
            userId:userId,
            token:token
        })
    }
}

export const logout=()=>{
    clearLogoutTimer();
    AsyncStorage.removeItem('userData')
    return {
        type:"LOGOUT"
    }
}

const clearLogoutTimer=()=>{
    if(timer){
        clearTimeout(timer);
    }
}

const setLogoutTimer=expirationDate=>{
  return dispatch=>{
  timer= setTimeout(()=>{
        dispatch(logout())
    },expirationDate)
  }
}

export const signup=(email,password)=>{
    return async dispatch=>{
      let response=await  fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpQ9k3CuH5eQHyfMb5J1ajWsMr2Wc7WME",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        });
        if(!response.ok){
            let message="Something went wrong!";
            const errorResData=await response.json();
            const errorId=errorResData.error.message;
            if(errorId==="EMAIL_EXISTS"){
                message="email already exists"
            }
            throw new Error(message)
        }
        const resData=await response.json()
        dispatch(authenticate(resData.localId,resData.idToken,parseInt(resData.expiresIn)*1000))
        const expirationDate=new Date(new Date().getTime()+(parseInt(resData.expiresIn)*1000))
        saveDataToStorage(resData.idToken,resData.localId,expirationDate)
    }
}

export const signin=(email,password)=>{
    return async dispatch=>{
      let response=await  fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpQ9k3CuH5eQHyfMb5J1ajWsMr2Wc7WME",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        });
        if(!response.ok){
            let message="Something went wrong!";
            const errorResData=await response.json();
            const errorId=errorResData.error.message;
            if(errorId==="EMAIL_NOT_FOUND"){
                message="email id is not valid"
            }
            if(errorId==="INVALID_PASSWORD"){
                message="password is not valid"
            }
            throw new Error(message)
        }
        const resData=await response.json()
        dispatch(authenticate(resData.localId,resData.idToken,parseInt(resData.expiresIn)*1000))
        const expirationDate=new Date(new Date().getTime()+(parseInt(resData.expiresIn)*1000))
        saveDataToStorage(resData.idToken,resData.localId,expirationDate)
    }
}

const saveDataToStorage=(token,userId,expirationDate)=>{
    AsyncStorage.setItem('userData',JSON.stringify(
        {
        token:token,
        userId:userId,
        expiryDate:expirationDate.toISOString()
        }
    ))
}