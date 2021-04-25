import { combineReducers } from 'redux';
    
import movies from '../screens/movies/reducer';
import hotel from '../screens/hotel/reducer';
import cart from '../screens/cart/reducer';
import registry from '../screens/registry/reducer';
import login from '../screens/login/reducer';
    
const combineReducer = combineReducers({
    movies,
    hotel,
    cart,
    registry,
    login,
});
    
export default combineReducer;
