
const initialState = {

    counter : 0
    
}


export default function reducer(state=initialState , action)  {


    if (action.type === "-") {

        state["counter"]--

    } 


    else if (action.type === "+")  {
        

             state["counter"]++
    
        

    }

return state;

}