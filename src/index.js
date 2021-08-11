import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Users,TopController,RefreshTime} from './App.js'



async function startApp()  {


    let User = new Users();

    await User.fetchUsers();

    let UserInfo = store.getState()["userData"];

    ReactDOM.render(<TopController Data={UserInfo}/> , document.getElementById("controls"))
    
    ReactDOM.render(<Users Data={UserInfo}/> , document.getElementById("root"))

    ReactDOM.render(<RefreshTime/> , document.getElementById("timevalue"))

}

startApp();