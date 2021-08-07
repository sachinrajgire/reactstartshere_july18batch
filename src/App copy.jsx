import  { useState } from 'react';
import './App.css';
import data from './Student_Data.json'
console.log(data,'data');

function App() {
 

  return (
   <div className="App">
   {data.map(i=>{
     return (
       <ol>
    <li>{i.Employer}</li>
        </ol>
     )
   })} 
  
  </div>
  );
}



export default App;
