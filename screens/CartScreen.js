import React,{useEffect} from 'react';
import {View,Text,Button,StyleSheet,FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import colors from '../constants/colors';
import PRODUCTS from '../data/dummy-data';
import {addToOrders,deleteItemFromCart} from '../store/actions/products';

const CartScreen = () => {

    const dispatch=useDispatch();
    const cart=useSelector((state)=>state.products.cart);
    
    let score=0;
    cart.forEach((product)=>{
        score+=product.price*product.count
    })


    const renderCartItems=(product)=>{
        return <View style={styles.item}>
        <Text style={{fontWeight:"bold"}}>{product.item.title} x <Text style={styles.quantity}>{product.item.count}</Text></Text>
        <View style={styles.iconContainer}>
        <Text style={{...styles.totalPrice,color:'#000'}} >${product.item.price*product.item.count}</Text>
        <Ionicons name="ios-trash" color="red" onPress={()=>dispatch(deleteItemFromCart(product.item.id))}  size={18} />
        </View>
    </View>
    }

    return (
        <View style={styles.screen}>
        <View style={styles.priceContainer}>
            <Text style={styles.total}>Total : <Text style={styles.totalPrice}>${score}</Text></Text>
            <Button title="Order now" color={colors.accent} onPress={()=>dispatch(addToOrders("p1"))}/>
        </View>
        <View style={styles.itemsContainer}>
            <FlatList data={cart} style={{width:"100%"}} renderItem={renderCartItems} keyExtractor={(item,index)=>item.id} />
        </View>
    </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:'center'
    },
    priceContainer:{
        width: "92%",
        marginVertical:15,
        backgroundColor:'#fff',
        paddingHorizontal:10,
        borderRadius:10,
        elevation:10,
        paddingVertical:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    total:{
        fontWeight:'bold'
    },
    totalPrice:{
        color: colors.primary,
        fontWeight:'bold'
    },
    quantity:{
        color: "#636262",
        fontSize:12,
    },
    itemsContainer:{
        width: "85%"
    },
    item:{
        width: "100%",
        padding: 12,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },iconContainer:{
        width: "30%",
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around'
    }
})

export default CartScreen
