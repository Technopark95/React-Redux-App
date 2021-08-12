import {combineReducers} from 'redux';
import fetch from './fetch';
import counter from './counter';


export default combineReducers( {

    fetch,
    counter

})