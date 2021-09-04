import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";

const initialState={
    products:PRODUCTS,
    cart:[],
    orders:[]
}

const productsReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            const selectedProduct=state.products.find((product)=>product.id===action.productId);
            const toCartItem=state.cart.find((product)=>product.id===action.productId);
            if(toCartItem){
                toCartItem.count=parseInt(toCartItem.count)+1
                return {
                    ...state,
                    cart:state.cart
                }
            }
            else{
                selectedProduct.count=1
                return {...state,cart:[...state.cart,selectedProduct]}}
        case "ADD_TO_ORDERS":
            let OrderItems=state.cart;
            OrderItems.forEach((item)=>{
                item.date=new Date().toISOString();
            })
            return {
                ...state,orders:[...state.orders,OrderItems],cart:[]
            }
        case "DELETE_FROM_CART":
            let items=state.cart.filter((item)=>item.id!==action.productId);
            return {
                ...state,
                cart:items
            }
        case "DELETE_ADMIN_PRODUCT":
            let item=state.products.find((item)=>item.id===action.productId);
            if(item.ownerId==="u1"){
                let productItems=state.products.filter((item)=>item.id!=action.productId);
                return {
                    ...state,
                    products:productItems
                }
            }
            else{
                console.log("u dont have permissions")
                return state;
            }
            case "ADMIN_ADD_PRODUCT":
                const newItem=new Product(action.payload.id,action.payload.ownerId,action.payload.title,
                    action.payload.imageUrl,action.payload.description,action.payload.price)
                return {
                    ...state,
                    products:[newItem,...state.products]
                }
            case "ADMIN_EDIT_PRODUCT":
                const productToEdit=state.products.find((prod)=>prod.id==action.payload.id);
                productToEdit.description=action.payload.description;
                productToEdit.imageUrl=action.payload.imageUrl;
                productToEdit.title=action.payload.title;
                const totalProducts=state.products.filter((prod)=>prod.id!=action.payload.id);
            return {
                    ...state,
                    products:[productToEdit,...totalProducts] 
                }
        default:
            return state;
}
}

export default  productsReducer
