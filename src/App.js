import fetch from "node-fetch";
import React from 'react';
import ReactDOM  from "react-dom";
import store from './store';
import styles from './App.module.css'

class Users extends React.Component {


    async fetchUsers()  {

        if (!window.navigator.onLine) {

            alert("Check your Internet Connectivity")
            return;
        }

        let response = await fetch("https://jsonplaceholder.typicode.com/users");

        let jsonResult = await response.json();

       let fetchedInformation = {}

        if (jsonResult.length !== 0) {

            fetchedInformation = {

                type : "SUCCESS",
                data : jsonResult
    
            }

        }

        else {


            fetchedInformation = {

                type : "FAILURE",
                data : []
    
            }



        }

        store.dispatch(fetchedInformation);

    }


    render()  {

        return ( <div className={styles.container}>
    

            {this.props.Data.map(item => {
                return <div key={item["username"].toString()} className={styles.listitem}>
                        <label className={styles.name}>{item["name"]}</label>
                        <label className={styles.name}> Username : <span className={styles.username}>{item["username"]}</span></label>
                        <label className={styles.name}> Email : <span className={styles.email}>{item["email"]}</span></label>
                         </div>
            })}
            
    
    
        </div>);

    }




}

class TopController extends React.Component {

async refreshuserlist ()  {

    
    let User = new Users();

    await User.fetchUsers();

    let UserInfo = store.getState()["userData"];
    console.log("Hello")

    ReactDOM.render(<Users Data={UserInfo}/> , document.getElementById("root"))
    
}


 render()  {


return (

<div>
    <button onClick={this.refreshuserlist}>Refresh Users</button>
</div>

)

 }



}

export{
    Users,
    TopController
}