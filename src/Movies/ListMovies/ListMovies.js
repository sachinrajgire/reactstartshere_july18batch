import React from 'react';
import Card from '../Card/Card' ;
import './list-movies.css'

const ListMovies = ({data,nominated,setNominated}) => {
    

function handleAddNomination (imdbId) {

    if(nominated.length >= 5) {
   return  alert('Maximum nominations reached')
    }
let copyNominated= [...nominated]
if(!nominated.includes(imdbId)){
copyNominated.push(imdbId)
}
setNominated(copyNominated)
}

    let movies = data && data.map(i=>{
        
        return (
            <div key={i.imdbID} className='cardcontainer'>
             <Card 
             title={i.Title}
             year={parseInt(i.Year)}
             poster={i.Poster}
             alt={i.Title}
             array1prop={[3,4]}
             object1prop={{name:"sachin"}}
             classname="card-cover-marketing"
             color="red"
             /> 

            <button disabled={nominated.includes(i.imdbID)} onClick={()=>handleAddNomination(i.imdbID)}>
                {nominated.includes(i.imdbID)? 'Nominated' : 'Nominate'}</button>
            </div>
        )
    })
    
    return (
        <div className="moviescontainer">
            <h3>Movie List</h3>
            {movies}
        </div>
    );
};

export default ListMovies;
