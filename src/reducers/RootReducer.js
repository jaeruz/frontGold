import { combineReducers } from 'redux';
import item from './ItemReducer';
import details from './DetailsReducer';
import barcodeScanResult from './BarcodeScanReducer'
import auth from './AuthReducer'

export default combineReducers({
    item: item,
    details: details,
    barcodeScanResult: barcodeScanResult,
    auth:auth
});
