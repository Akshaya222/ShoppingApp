
import React from 'react';
import { HeaderButtons } from 'react-navigation-header-buttons';
import {View,Text,Button,Image,StyleSheet,Platform,FlatList,TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector,useDispatch } from 'react-redux';

import colors from '../constants/colors';
import { deleteAdminProduct } from '../store/actions/products';
import { HeaderButton } from '../components/HeaderButton';

const AdminScreen = (props) => {
    const dispatch=useDispatch();
    const products=useSelector((state)=>state.products.products);
    const ownerProducts=products.filter((product)=>product.ownerId==="u1");
    console.log("Owner products+++++++++++++++++++++++++++++++++++++++++++++===",ownerProducts);
    console.log("total products********************************************",products)
   
     let TouchableCmp=TouchableOpacity; 
     if(Platform.OS==="android" && Platform.Version>=21){
         TouchableCmp=TouchableNativeFeedback;
     }

     const renderProduct=(product)=>{
        return <View style={styles.productContainer}>
            <TouchableCmp onPress={()=>{}}>
                <View style={styles.product}>
                <View style={styles.imageContainer}>
                     <Image style={styles.image} source={{uri:product.item.imageUrl}} style={styles.image}/> 
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.item.title}</Text>
                    <Text style={styles.price}>{product.item.price}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" color={colors.primary} onPress={()=>{props.navigation.navigate({
                        routeName:'AddProduct',
                        params:{
                            productIdToEdit:product.item.id
                        }
                    })}}  />
                    <Button title="Delete" color={colors.primary} onPress={()=>{dispatch(deleteAdminProduct(product.item.id))}} />
                </View>
                </View>
                </View>
            </TouchableCmp>
        </View>
    }

     return (
        <View style={styles.screen} >
            <FlatList data={ownerProducts} style={styles.container} keyExtractor={(item,index)=>item.id} renderItem={renderProduct} />
        </View>   
       )
}

AdminScreen.navigationOptions=(navData)=>{
    return  {
       headerTitle:'Your Products',
       headerLeft:()=>{
           return <HeaderButtons HeaderButtonComponent={HeaderButton}>
               <Ionicons name="ios-menu" style={{marginLeft:18}} size={25} color="#ffffff" onPress={()=>navData.navigation.toggleDrawer()} />
           </HeaderButtons>
       },
       headerRight: ()=>{
            return  <HeaderButtons HeaderButtonComponent={HeaderButton}>
                   <Ionicons name="ios-add" style={{marginRight:18}} size={25} color="#ffffff" onPress={()=>{navData.navigation.navigate('AddProduct')}} />
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
        paddingHorizontal:15,
        justifyContent:'space-between' 
    },
    product:{
        borderRadius:20
    }
})


export default AdminScreen
