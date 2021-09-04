import React from 'react';
import { FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import colors from '../../constants/colors';


const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
                <View style={styles.product}>
                <View style={styles.imageContainer}>
                     <Image style={styles.image} source={{uri:product.item.imageUrl}} style={styles.image}/> 
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.item.title}</Text>
                    <Text style={styles.price}>{product.item.price}</Text>
                <View style={styles.buttonContainer}>
                <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
                </View>
                </View>
                </View>
      )}
    />
  );
};

// UserProductsScreen.navigationOptions = navData => {
//   return {
//     headerTitle: 'Your Products',
//     headerLeft: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//     headerRight: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Add"
//           iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           onPress={() => {
//             navData.navigation.navigate('EditProduct');
//           }}
//         />
//       </HeaderButtons>
//     )
//   };
// };

export default UserProductsScreen;
