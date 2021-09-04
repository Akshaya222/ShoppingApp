import React,{useState,useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { View,Alert,Text,TextInput,ActivityIndicator,ScrollView,KeyboardAvoidingView,StyleSheet, Button } from 'react-native';

import colors from '../constants/colors';
import * as AuthActions from '../store/actions/auth';

const AuthScreen = (props) => {
    const dispatch=useDispatch();
    const [error,setError]=useState(null);
    const [isSignUp,setIsSignup]=useState(false);
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const emailChangeHandler=(value)=>{
        setEmail(value);
    }
    const passwordChangeHandler=(value)=>{
        setPassword(value)
    }
    const signInHandler=()=>{
        if(isSignUp){
            setLoading(true)
            setError(null)
            try{
                dispatch(AuthActions.signup(email,password))
                props.navigation.navigate("Shop")
            }
            catch(e){
                setError(e.message)
                setLoading(false)
            }
           
        }
        else{
            setLoading(true)
            setError(null)
            try{
                dispatch(AuthActions.signin(email,password))
                props.navigation.navigate("Shop")
            }
            catch(e){
                setError(e.message)
                setLoading(false)
            }
        }
    }


    useEffect(()=>{
        if(error){
            Alert.alert('An Error Occured!',error,[{text:'Okay'}])
        }
    },[error])

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}  style={styles.screen} >
         <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient} >
          {
                     <View style={styles.container}>
                     <View>
                         <Text>Email</Text>
                         <TextInput style={styles.input}  keyboardType="email-address" value={email}  autoCapitalize="none" onChangeText={emailChangeHandler} />
                     </View>
                     <View>
                         <Text>Password</Text>
                         <TextInput style={styles.input} keyboardType="default" autoCapitalize="none" value={password} secureTextEntry onChangeText={passwordChangeHandler} />
                     </View>
                     {
                         loading?<ActivityIndicator size="small" color={colors.primary} />:
                         <View style={styles.buttonContainer}>
                     <Button title={isSignUp?"Sign Up":"Sign In"} color={colors.primary} onPress={signInHandler}/>
                     <Button title={isSignUp?"Sign In Instead":"Sign Up Instead"} color={colors.accent} onPress={()=>{
                         setIsSignup(prevState=>!prevState)
                     }}/>
                     </View>
                     }
                    </View>
                }
         </LinearGradient>
       </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions={
    headerTitle:"Authentication"
}

const styles=StyleSheet.create({
    screen: {
        flex: 1
      },
      gradient: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
      },
      container:{
          backgroundColor:'white',
          width: "82%",
          padding:15
      },
      input:{
          borderBottomWidth:1,
          borderBottomColor:'#ccc',
          marginBottom:15
      }
})

export default AuthScreen