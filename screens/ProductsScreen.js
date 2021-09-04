import React from 'react';
import {View,Text,Button,Image,StyleSheet,Platform,FlatList,TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { HeaderButton } from '../components/HeaderButton';
import PRODUCTS from '../data/dummy-data';
import colors from '../constants/colors';
import {addToCart} from '../store/actions/products'

const ProductsScreen = (props) => {

    console.log("start start +++++++++++++++++++++++++++++++++++++++++===")
    const products=useSelector((state)=>state.products.products);
    const dispatch=useDispatch()

    let TouchableCmp=TouchableOpacity; 
    if(Platform.OS==="android" && Platform.Version>=21){
        TouchableCmp=TouchableNativeFeedback;
    }

    const goToDetailsPage=(id)=>{
        props.navigation.navigate({
            routeName:"ProductDetails",
            params:{
                productId:id
            }
        })
    }

    const renderProduct=(product)=>{
        return <View style={styles.productContainer}>
            <TouchableCmp onPress={()=>goToDetailsPage(product.item.id)}>
                <View style={styles.product}>
                <View style={styles.imageContainer}>
                     <Image style={styles.image} source={{uri:product.item.imageUrl}} style={styles.image}/> 
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.item.title}</Text>
                    <Text style={styles.price}>{product.item.price}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="View Details" color={colors.primary} onPress={()=>goToDetailsPage(product.item.id)} />
                    <Button title="To Cart" color={colors.primary} onPress={()=>dispatch(addToCart(product.item.id))} />
                </View>
                </View>
                </View>
            </TouchableCmp>
        </View>
    }
    return (
     <View style={styles.screen} >
         <FlatList data={PRODUCTS} style={styles.container} keyExtractor={(item,index)=>item.id} renderItem={renderProduct} />
     </View>   
    )
}

ProductsScreen.navigationOptions=(navData)=>{
 return  {
    headerTitle:'Shop',
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
        width: "100%",
        alignItems:'center',
    },
    container:{
        width:"100%"
    },
    productContainer:{
        width: "90%",
        alignSelf:'center',
        flex: 1,
        height: 250,
        backgroundColor:'#fff',
        borderRadius:20,
        overflow: "hidden",
        elevation:10,
        marginVertical:15,
        marginHorizontal:5
    },
    imageContainer:{
        width: "100%",
        height: "60%"
    },
    image:{
        height: "100%",
        width: "100%"
    },
    title:{
        textAlign:'center',
        fontWeight:'bold'
    },
    price:{
        color: "#636262",
        fontSize:12,
        textAlign:'center'
    },
    detailsContainer:{
        alignItems:'center',
        padding: 10
    },
    buttonContainer:{
        width: "100%",
        flexDirection:'row',
        justifyContent:'space-between' 
    },
    product:{
        borderRadius:20
    }
})

export default ProductsScreen
