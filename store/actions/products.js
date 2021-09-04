export const addToCart=(id)=>{
    return{
        type:"ADD_TO_CART",
        productId:id
    }
}

export const addToOrders=(id)=>{
    return{
        type:"ADD_TO_ORDERS",
        productId:id
    }
}

export const deleteItemFromCart=(id)=>{
    return {
        type:"DELETE_FROM_CART",
        productId:id
    }
}

export const deleteAdminProduct=(id)=>{
    return {
        type:"DELETE_ADMIN_PRODUCT",
        productId:id
    }
}

export const addAdminProduct=(product)=>{
  return {
      type:"ADMIN_ADD_PRODUCT",
      payload:product
  }
}

export const editAdminProduct=(product)=>{
    return {
        type:"ADMIN_EDIT_PRODUCT",
        payload:product
    }
}