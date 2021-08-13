import fetch from "node-fetch";
import React from 'react';
import store from './store';
import styles from './App.module.css'
import refreshicon from './refresh.png'



function updateTime() {

    let d = new Date(); // for now
    this.setState({curTime : ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`})
}

function updateState(userInfo) {
        
    this.setState({userData : userInfo})

    console.log(this.userInfo)

}


class Users extends React.Component {


    constructor()  {

super();

this.state =  {userData : [] }

updateState = updateState.bind(this);

    }


    async FetchUsers()  {

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

        let UserInfo = store.getState()["fetch"]["userData"];

        updateState(UserInfo)


    }


    render()  {

        return ( <div className={styles.container}>
    
            {this.state.userData.map(item => {
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

    
    document.getElementById("refreshico").style.transition = "600ms linear";
    document.getElementById("refreshico").style.transform = "rotate(360deg)";

    setTimeout(()=> {

    document.getElementById("refreshico").style.transition = "0ms linear";
    document.getElementById("refreshico").style.transform = "rotate(0deg)";

    },700);


    let User = new Users();
    await User.FetchUsers();

    updateTime();
    
}


 render()  {


return (

<div>
    <button className={styles.refreshbutton} onClick={this.refreshuserlist}><img id={"refreshico"} alt={"Refresh"} className={styles.refreshicon} src={refreshicon}></img></button>
</div>

)

 }



}


class RefreshTime extends React.Component {


    constructor()  {
        super();
        let d = new Date(); // for now
        this.state = {curTime : `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` }

        updateTime = updateTime.bind(this);
    }

    render ()  {

        return this.state.curTime;
    }


}

export{
    Users,
    TopController,
    RefreshTime
}