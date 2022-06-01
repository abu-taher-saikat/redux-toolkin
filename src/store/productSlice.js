const {createSlice}  = require('@reduxjs/toolkit');


export const STATUSES = Object.freeze({
    IDEL : 'idle',
    ERROR : 'error',
    LOADING : 'loading',
});

const productSlice = createSlice({
    name : 'product',
    initialState : {
        data : [],
        status : STATUSES.IDEL
    },
    reducers : {
        setProducts(state, action){
           state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        }
    }
})


export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;


// Thunks. are 2 types.
// normal one.
export function fetchProducts(){
    return async function fetchProductThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING));

        // you can get all the state from getState.
        try{
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUSES.IDEL));

        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));

        }
    }
}