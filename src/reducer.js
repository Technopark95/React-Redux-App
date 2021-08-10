const initialState = {

    userData : []
    
}


export default function reducer(state=initialState , action)  {


    if (action.type === "SUCCESS") {

        return Object.assign({}, state, {

            userData : action.data

         })

    } 


    else if (action.type === "FAILURE")  {
        

            return Object.assign({}, state, {
    
                userData : []
    
             })
    
        

    }

return state;

}