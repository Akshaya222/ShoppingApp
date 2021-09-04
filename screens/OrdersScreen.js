import React from 'react';
import {View,Text,Button,StyleSheet, FlatList} from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { HeaderButton } from '../components/HeaderButton';
import colors from '../constants/colors'

const OrdersScreen = (props) => {
    const dispatch=useDispatch()
    const orders=useSelector((state)=>state.products.orders);
    const readbaleDate=(date)=>{
        console.log(date)
    }
    const renderOrderItems=(product)=>{
        return  <View style={styles.item} >
        <View style={styles.details} >
            <Text style={styles.cost} >{product.item.price*product.item.count}</Text>
            <Text style={styles.date}>{}</Text>
            <Button title="tri" onPress={()=>readbaleDate(product.item.id)} />
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Show details" color={colors.primary} onPress={()=>
                props.navigation.navigate({
                    routeName:"ProductDetails",
                    params:{
                        productId:product.item.id
                    }
                })} />
        </View>
    </View>
    }
    return (
        <View style={styles.screen}>
          <View style={{width:"90%"}}>
          <FlatList style={{width:"100%"}} data={orders} keyExtractor={(item,index)=>item.id} renderItem={renderOrderItems} />
          </View>
    </View>
    )
}

OrdersScreen.navigationOptions=(navData)=>{
    return  {
       headerTitle:'Orders',
       headerLeft:()=>{
           return <HeaderButtons HeaderButtonComponent={HeaderButton}>
               <Ionicons name="ios-menu" style={{marginLeft:18}} size={25} color="#ffffff" onPress={()=>navData.navigation.toggleDrawer()} />
           </HeaderButtons>
       },
       headerRight:()=>{
        return <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Ionicons name="ios-cart" style={{marginRight:18}} size={25} color="#ffffff" onPress={()=>navData.navigation.navigate("Cart")} />
        </HeaderButtons>
    }
    }
 }

 const styles=StyleSheet.create({
     screen:{
         flex: 1,
         alignItems:'center',
         paddingVertical:15
     },
     item:{
         width: "100%",
         alignItems:'center',
         padding: 12,
         backgroundColor:'#fff',
         marginHorizontal:5,
         elevation:5,
         borderRadius:14,
         marginVertical:10
     },
     details:{
        width: "100%",
        flexDirection:'row',
        paddingHorizontal:8,
        justifyContent:'space-between'
     },
     buttonContainer:{
         width: "70%",
         marginVertical:8
     }
 })

export default OrdersScreen
