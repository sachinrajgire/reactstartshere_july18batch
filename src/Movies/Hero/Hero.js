import React from 'react';

const Hero = ({searchString,setSearchString,placeholder}) => {
    

    return (
        <div>
          <input 
          type='text' 
          onChange={(e)=>setSearchString(e.target.value)} 
          value={searchString}
          placeholder={placeholder}
          />  
        </div>
    );
};

export default Hero;