import React from 'react';
import Card from '../Card/Card' ;

const ListMovies = ({data}) => {
    
    let movies = data && data.map(i=>{
        
        return (
            <div>
             <Card 
             title={i.Title}
             year={i.Year}
             poster={i.Poster}
             />   
            </div>
        )
    })
    
    return (
        <div>
            {movies}
        </div>
    );
};

export default ListMovies;
