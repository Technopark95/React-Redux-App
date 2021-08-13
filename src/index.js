import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Users,TopController,RefreshTime} from './App.js'



async function startApp()  {






    ReactDOM.render(<Users/> , document.getElementById("root"))

    let User = new Users();
    
    await User.FetchUsers();

     ReactDOM.render(<TopController /> , document.getElementById("controls"))
    
     ReactDOM.render(<RefreshTime/> , document.getElementById("timevalue"))

}

startApp();