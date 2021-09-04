import React from 'react'
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator,DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from 'react-navigation';
import { Platform,SafeAreaView,Button,View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';

import ProductsScreen from "../screens/ProductsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import  AuthScreen  from '../screens/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import colors from "../constants/colors";
import AdminScreen from '../screens/AdminScreen';
import * as AuthActions from '../store/actions/auth';


const defaultNavOpions={
    headerStyle:{
        backgroundColor:Platform.OS==="android"?colors.primary :''
    },
    headerTintColor:Platform.OS==="android"?'white':colors.primary
}

const productsStackNavigator=createStackNavigator({
     Products:ProductsScreen,
     ProductDetails:ProductDetailsScreen,
     Cart:CartScreen
},{
    defaultNavigationOptions:defaultNavOpions
});


const ordersNavigation=createStackNavigator({
     Orders:OrdersScreen
},
{
    defaultNavigationOptions:defaultNavOpions
})

const adminNavigation=createStackNavigator({
    Admin:AdminScreen,
    AddProduct:EditProductScreen
},
{
    defaultNavigationOptions:defaultNavOpions
})


const productsDrawerNavigator=createDrawerNavigator({
    Products:{
        screen:productsStackNavigator,
        navigationOptions:{
            drawerLabel:'Products',
            drawerIcon:()=>{
                return <Ionicons name="ios-star" size={25} color={colors.primary}/>
            }
        }
    },
    Orders:{
        screen:ordersNavigation,
        navigationOptions:{
            drawerLabel:'Orders',
            drawerIcon:()=>{
                return <Ionicons name="ios-star" size={25} color={colors.primary}/>
            }
        }
    },
    Admin:{
        screen:adminNavigation,
        navigationOptions:{
            drawerLabel:'Admin',
            drawerIcon:()=>{
                return <Ionicons name="ios-star" size={25} color={colors.primary}/>
            }
        }
    }
},
{
    contentOptions:{
        activeTintColor:colors.primary
    },
    contentComponent:(props)=>{
        const dispatch=useDispatch();
        return <View style={{flex:1}}>
            <SafeAreaView forceInset={{top:'always',horizontal:'never'}} >
                <DrawerItems {...props} />
                <Button title="Logout" color={colors.primary} onPress={()=>{
                    dispatch(AuthActions.logout());
                }} />
            </SafeAreaView>
        </View>
    }
}
)


const authNavigator=createStackNavigator({
    Auth:AuthScreen
},{
    defaultNavigationOptions: defaultNavOpions
  })

const switchNavigator=createSwitchNavigator({
    Start:StartUpScreen,
    Auth:authNavigator,
    Shop:productsDrawerNavigator
})

export default createAppContainer(switchNavigator)