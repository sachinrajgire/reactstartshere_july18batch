import React from 'react';
import Card from '../Card/Card' ;


const Nominations = ({data,nominated,setNominated}) => {

    function handleRemoveNomination (imdbId) {
        let copyNominated= [...nominated]
        let idx= copyNominated.indexOf(imdbId)
        copyNominated.splice(idx,1)

        setNominated(copyNominated)
        }

    let nominatedMovies = data && 
    
data
    .filter( j => nominated.includes(j.imdbID))
    .map(i=>{
        
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

            <button disabled={!nominated.includes(i.imdbID)} onClick={()=>handleRemoveNomination(i.imdbID)}>
                 Unnominated</button>
            </div>
        )
    })

    return (
        <div>
            <h3>{nominatedMovies}</h3>
        </div>
    );
};

export default Nominations;