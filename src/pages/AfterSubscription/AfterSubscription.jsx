import { useState } from "react"

function a(){
    return 0
}

function AfterSubscription(){
    
    const [count,setCount]=useState(a())

    const Increased=()=>{
        setCount(count=>count+1)
        setCount(count=>count+1)
    }

    

    const Decreased=()=>{
        setCount(count=>count-1)
    }
   

    return(
        <div>
        <p>Count:{count}</p>
        <button onClick={Increased}>Increased</button>
        <button onClick={Decreased}>Decreased</button>
        <h1>Hello</h1>
        </div>
    )
}
export default AfterSubscription