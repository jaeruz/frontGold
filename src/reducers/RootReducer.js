import { combineReducers } from 'redux';
import item from './ItemReducer';
import details from './DetailsReducer';
import barcodeScanResult from './BarcodeScanReducer'

export default combineReducers({
    item: item,
    details: details,
    barcodeScanResult: barcodeScanResult
});
