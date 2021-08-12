import axios from 'axios';
import React ,{useEffect, useState} from 'react';
import Hero from './Hero/Hero';
import ListMovies from './ListMovies/ListMovies';
import Nominations from './Nominations/Nominations';
import "./movies.css"

const Movies = props => {

  const [searchString, setSearchString] =useState("")
  const [data, setData] =useState([])
  const [nominated, setNominated] =useState([]) 

  console.log(nominated,'NOMINATED');

console.log(data,'data');

//ComponentDidUpdate
useEffect(()=>{
  axios.get(`http://www.omdbapi.com/?apikey=83fb5568&s=${searchString}`)
  .then(resp=>setData(resp.data.Search))
  .catch(e =>console.log(e))
},[searchString])

    return (
        <div class='maincontainer'>
          <div class="hero">
          <Hero 
          searchString={searchString}
          setSearchString={setSearchString}
          placeholder="Enter your movie search here"
          />
          </div>
          
          <div class="listmovies">
          <ListMovies
          data = {data}
          setNominated={setNominated}
          nominated={nominated}
          />
         </div>

         <div class="nominations">
          <Nominations 
          data={data}
          nominated={nominated}
          setNominated={setNominated}
          />
         </div>

        </div>
    );
};


export default Movies;