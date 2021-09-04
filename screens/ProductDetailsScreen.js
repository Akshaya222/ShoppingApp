import React,{useState} from 'react';
import {View,Text,Image,StyleSheet,Button} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';

import PRODUCTS from '../data/dummy-data';
import colors from '../constants/colors';
import {addToCart} from '../store/actions/products'

const ProductDetailsScreen = (props) => {
    const productId=props.navigation.getParam("productId");
    const dispatch=useDispatch()

    const cart=useSelector((state)=>state.products.cart);
    const item= cart.find((item)=>item.id==productId);

    const selectedProduct=PRODUCTS.find((product)=>product.id===productId);
    console.log(selectedProduct)
    return (
        <View style={styles.screen}>
          <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
          </View>
          <View style={styles.textContainer} >
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <Text style={styles.price}>{selectedProduct.price}</Text>
          </View>
          <Text style={{paddingHorizontal:15}}>{selectedProduct.description}</Text>
          <View style={styles.buttonContainer}>
          <Button title="Add to cart" color={colors.primary} onPress={()=>{
              if(item){
                  return;
              }
              dispatch(addToCart(selectedProduct.id))
          }} />
          </View>
     </View>
    )
}

ProductDetailsScreen.navigationOptions=(navData)=>{
    const productId=navData.navigation.getParam("productId");
    const selectedProduct=PRODUCTS.find((product)=>product.id===productId)
   return{
       headerTitle:selectedProduct.title
   }
}

const styles=StyleSheet.create({
    screen:{
        width: "100%",
        height: "100%",
        padding: 10,
        alignItems:'center'
    },
    imageContainer:{
      height: 200,
      width: "100%"
    },
    image:{
        height: "100%",
        width:"100%"
    },
    textContainer:{
        width: "100%",
        paddingHorizontal:15,
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:21
    },
    price:{
        color: "#636262",
        fontSize:12,
    },
    buttonContainer:{
        marginVertical:10,
        width: 200
    }
})

export default ProductDetailsScreen
