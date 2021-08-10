import  React,{ useState, useEffect, Fragment} from 'react';
import './App.css';
// import importedData from './Student_Data.json' ;
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
import LinearProgress from '@material-ui/core/LinearProgress';

// hydrating - some set of data --
// clear rehydraate
function App() {

const [favs, setFavs] =useState([])
const [data, setData] =useState([]) 
console.log(data,'DATA');
const [recentlyDeleted, setRecentlyDeleted] =useState([])
const [universityName, setUniversityName] =useState("")
const [specialization, setSpecialization] =useState("")
const [isLoading, setIsLoading] =useState(true)
const [searchString,setSearchString] =useState("")
const [isSearchEnabled,setIsSearchEnabled] =useState(false)
const [currentPage,setCurrentPage] = useState(1)

console.log(currentPage,'currentPage');

useEffect(()=>{
axios.get("http://localhost:4000/getallentries")
.then(resp =>{
  setIsLoading(false)
  setData(resp.data)
})
.catch (e=> {
  setIsLoading (false)
})
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
//convert everything to lowercase
function handleSearch () {
  setIsSearchEnabled(true)
  // let copyData = [...data]
  // let filteredData = copyData.filter((j)=>{
  //   // console.log(j.Employer.includes(searchString),'RESULTS')
  //   if(j.Employer.toLowerCase().includes(searchString.toLowerCase())
  //   || (j.Job_Title.toLowerCase().includes(searchString.toLowerCase()))
    
  //   ){
  //     return true
  //   }
  
  // })
  // return filteredData
  
}
//solution 

function handleClear () {
  setSearchString("")
  //Refetch from the network 
//   axios.get("http://localhost:4000/getallentries")
// .then(resp =>{
//   setIsLoading(false)
//   setData(resp.data)
// })
// .catch (e=> {
//   setIsLoading (false)
// })
}

function runFilters() {
  let copyData = [...data]

   copyData = copyData.filter((j)=>{
    // console.log(j.Employer.includes(searchString),'RESULTS')
    if(j.Employer.toLowerCase().includes(searchString.toLowerCase())
    || (j.Job_Title.toLowerCase().includes(searchString.toLowerCase()))
    ){
      return true
    }
  })
  return copyData
  
}

function calculatePages () {
  const len = data.length // 68
  const entriesPerPage = 10
  const pages = len < entriesPerPage ? 1 : Math.ceil(len / entriesPerPage);
let finalPages= []
for (let i=1;i<=pages;i++){
   finalPages.push(i)
}
console.log(finalPages)
return finalPages
  
}


let names =
 data
 .slice(((currentPage-1)*10)+1,((currentPage-1)*10)+11)
 .map((i)=>{
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
// false
if(isLoading) {
  return  <LinearProgress />
}
/////will not run this code 
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
  {/* Recently Deleted Items :  */}
  <label>Filter your results</label>
  <input type="text" value={searchString} onChange={(e)=>setSearchString(e.target.value)}></input>
  <button onClick={(e)=>handleSearch(e)}>Search </button>
  <button onClick={(e)=>handleClear(e)}>Clear </button>
    {/* <button onClick={(e)=>handleSubmit(e)}>SUBMIT </button>
    {recentlyDeleted.map(i=>i.Employer).join(", ")}
      <button onClick={()=>handleDelete()}>ADD NEW </button>
    {`You current favorite are ${favs.join(",")}`} */}
<div>
{calculatePages().map((i,idx)=>{
  console.log(`Page number is ${i}`);
  console.log(`Index  is ${idx}`);
    return (
      <span onClick={()=>setCurrentPage(i)}>
        {i}{" "}
        </span>
    )
  })}
  </div>

  {names}
  
 
</div>
 
  );
}

export default App;


// create input box 
// save the input ( state)
// filter the data before mapping


