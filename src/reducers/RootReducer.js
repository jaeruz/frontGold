import { combineReducers } from 'redux';
import item from './ItemReducer';
import details from './DetailsReducer';

export default combineReducers({
    item: item,
    details:details
});
