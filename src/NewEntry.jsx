import React from 'react';

const NewEntry = ({setSpecialization,setUniversityName}) => {
    return (
        <div>
             <form >
     <label>Enter University Name</label>
     <input type="text" onChange={e=>setUniversityName(e.target.value)}></input>

     <label>specialization</label>
     <input type="text" onChange={e=>setSpecialization(e.target.value)}></input>
     </form>
        </div>
    );
};

NewEntry.propTypes = {
    
};

export default NewEntry;

