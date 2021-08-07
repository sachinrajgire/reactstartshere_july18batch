import  React,{ useState, useEffect, Fragment} from 'react';
import './App.css';
import importedData from './Student_Data.json' ;
import Card from './Card.jsx'
import NewEntry from './NewEntry.jsx'
import { v4 as uuidv4 } from 'uuid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

function App() {

const [favs, setFavs] =useState([])
const [data, setData] =useState([])
const [recentlyDeleted, setRecentlyDeleted] =useState([])
const [universityName, setUniversityName] =useState("")
const [specialization, setSpecialization] =useState("")
const [graduationYear, setGraduationYear] =useState("")
const [employer, setEmployer] =useState("")
const [jobTitle, setJobTitle] =useState("")
const [jobStartDate, setJobStartDate] =useState("")
const [careerUrl, setCareerUrl] =useState("")
console.log(universityName,'UNIVERSITY NAME');
// console.log(recentlyDeleted ,'RECENTLY DELETED');
 ///single source of truth
// console.log(data,'DATA');

// ComponentDidMount-- Runs only after component has mounted 
useEffect(()=>{
console.log('COMPONENT DID MOUNT')
let newData =[...importedData]
newData= newData.map(i=>{
  return {...i,id:uuidv4()}
})
setData(newData)
  },[])
 
  // Promises
useEffect(()=>{
axios.get("http://localhost:4000/getallentries")
.then(resp => console.log(resp,'RESPONSE'))
.catch (e=> console.log(e))

  },[])


 


function saveFavorites (employer) {
//im
  let copyFavs=[...favs]
  if(copyFavs.includes(employer)){
     return 
  }
  copyFavs.push(employer)
  setFavs(copyFavs)
  
}
function handleUnFavorite (employer) {
// Solution 1 
  const removed= favs.filter(i=>i!== employer)
  setFavs(removed)

  // Solution 2
  const copyFavs = [...favs]
  const index = copyFavs.indexOf(employer)
  copyFavs.splice(index,1)
  setFavs(copyFavs)

}
function handleDelete (idClicked) {
  // solution 1
  const itemsLeft = data.filter (i => i.id !== idClicked)

  const deletedItem = data.filter (i => i.id === idClicked)
  console.log(itemsLeft,'ITEMS LEFT ');
  console.log(deletedItem,' DELETED ITEM ');

  setData(itemsLeft)
  setRecentlyDeleted(recentlyDeleted.concat(deletedItem))

}
function handleSubmit (e) {
// e.preventDefault()
// e.stopPropagation
const objectTobePushed = {
  University_Name:universityName,
  Specialization:specialization,
  id:uuidv4(),
   "Graduation_Year": 2021,
    "Employer": "TCS",
    "Job_Title": "Software Engineer",
    "Job_Start_Date": "6/20/2020",
    "Career_Url": "https://ibegin.tcs.com/iBegin/jobs/search"
}
// Solution 1 
// const pushedData =[objectTobePushed,...data]

// Alternate Solution
const copydata = [...data]
copydata.unshift(objectTobePushed)
// console.log(pushedData,'pushedData');
setData(copydata)

}

let names = data.map((i)=>{
  const {Employer,University_Name ,id} = i
  return (
    <div className="container" key={i.id}>
    <Card 
      employer = {Employer}
      UniversityName = {University_Name}
      jobTitle = {i.Job_Title}
      />
      <button disabled={favs.includes(Employer)} onClick={()=>saveFavorites(Employer)}>Favorite</button>
      <button disabled={!favs.includes(Employer)}onClick={()=>handleUnFavorite(Employer)}>UnFavorite</button>
      <button onClick={()=>handleDelete(id)}>Delete</button>
    
    </div>
  )
})
  return (
     <div className="App">
    <Router>
    <div>
      <nav>
        <ul>
          <li> <Link to="/" >Home</Link></li>
          <li><Link to="/newentry">Create New Entry</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/newentry" exact>
          <NewEntry 
          setUniversityName={setUniversityName}
          setSpecialization={setSpecialization}
          />
        </Route>
      </Switch>
     
    </div>
  </Router>
  Recently Deleted Items : 
    
    <button onClick={(e)=>handleSubmit(e)}>SUBMIT </button>
    {recentlyDeleted.map(i=>i.Employer).join(", ")}
      <button onClick={()=>handleDelete()}>ADD NEW </button>
    {`You current favorite are ${favs.join(",")}`}
  {names}
 
</div>
 
  );
}



export default App;

