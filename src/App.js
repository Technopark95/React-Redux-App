import fetch from "node-fetch";
import React from 'react';
import ReactDOM  from "react-dom";
import store from './store';
import styles from './App.module.css'
import refreshicon from './refresh.png'



function updateTime() {

    let d = new Date(); // for now
    this.setState({curTime : ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`})
}


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
    let Timestamp = new RefreshTime();

    document.getElementById("refreshico").style.transition = "600ms linear";
    document.getElementById("refreshico").style.transform = "rotate(360deg)";

    setTimeout(()=> {

    document.getElementById("refreshico").style.transition = "0ms linear";
    document.getElementById("refreshico").style.transform = "rotate(0deg)";

    },1050);



    await User.fetchUsers();

    updateTime();


    let UserInfo = store.getState()["userData"];

    ReactDOM.render(<Users Data={UserInfo}/> , document.getElementById("root"))
    
    
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