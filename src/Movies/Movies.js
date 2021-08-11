import axios from 'axios';
import React ,{useEffect, useState} from 'react';
import Hero from './Hero/Hero';
import ListMovies from './ListMovies/ListMovies';

const Movies = props => {

  const [searchString, setSearchString] =useState("")
  const [data, setData] =useState([])

console.log(data,'data');

//ComponentDidUpdate
useEffect(()=>{
  axios.get(`http://www.omdbapi.com/?apikey=83fb5568&s=${searchString}`)
  .then(resp=>setData(resp.data.Search))
  .catch(e =>console.log(e))
},[searchString])

    return (
        <div>
          <Hero 
          searchString={searchString}
          setSearchString={setSearchString}
          placeholder="Enter your movie search here"
          />
          
        <div>
          <ListMovies
          data = {data}

         />
          {/* <Nominations /> */}
          </div>
        </div>
    );
};


export default Movies;