import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productCreateReducer,
	productCreateReviewReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	productUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	adminEditUserInfoReducer,
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListProfileReducer,
	orderListAllReducer,
	orderDeleteReducer,
	orderDeliverReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productDelete: productDeleteReducer,
	productCreateReview: productCreateReviewReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	adminEditUserInfo: adminEditUserInfoReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderDeliver: orderDeliverReducer,
	orderListProfile: orderListProfileReducer,
	orderListAll: orderListAllReducer,
	orderDelete: orderDeleteReducer,
});

const cartItemsFromStroage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromStroage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromStroage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const paymentMethodFromStroage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: '';

const initialState = {
	cart: {
		cartItems: cartItemsFromStroage,
		shippingAddress: shippingAddressFromStroage,
		paymentMethod: paymentMethodFromStroage,
	},
	userLogin: { userInfo: userInfoFromStroage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
