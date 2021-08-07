import React from 'react';
import  { useState } from 'react';

// const [counter, setCounter] = useState(0)


// hydrate is with initial seed 
// props and state 
// react rendering sequence 
// state and props change automatically when and state and props change
// forced update 

const ImageDetailer = (props) => {
    console.log('IMAGE DETAILER RENDERED')
    console.log(props, 'PROPS ');
    const [shouldDisplayName,setShouldDisplayName] =useState(true) //state
    const [displayLength,setDisplayLength] =useState(false) //state
    const [counter, setCounter] = useState(0)
    const [incInput, setIncInput] = useState(0)
    const [decInput, setDecInput] = useState(0)
    
    function handleLength () {
      return props.person.name.length + props.person.lastName.length
    }

    return (
        <div>
          <h3>{counter}</h3> 
         {/* {shouldDisplayName 
         ?  <p>My Name is {`${props.person.name} ${props.person.lastName}`} </p>
         : null
        }   
        {displayLength ? handleLength () : null}
        <button onClick={()=>setShouldDisplayName(false)}>Make name Disapper</button>
        <button onClick={()=>setDisplayLength(!displayLength)}>Toggle Length</button>  */}
        
        <button onClick={()=>setCounter(counter+1)}>Increment by 1</button> 
        <button onClick={()=>setCounter(counter-1)}>Decrement by 1</button> 
        <button onClick={()=>setCounter(0)}>Reset it to Zero</button> 
        <input onChange={(e)=>setIncInput(parseInt(e.target.value))}></input>
        <button onClick={()=>setCounter(incInput+counter)}>{`Increement by ${incInput}`}</button> 
        <div>DECREMENT</div>
        <input onChange={(e)=>setDecInput(parseInt(e.target.value))}></input>
        <button onClick={()=>setCounter(counter-decInput)}>{`Decrement by ${decInput}`}</button> 

        </div>
    );
};

export default ImageDetailer;