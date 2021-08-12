import {createStore} from 'redux';
import rootreducer from './reducers/combinedreducer';


const store = createStore(rootreducer);

export default store;