import  { useState } from 'react';

// Single responsibility
// Pure Component
function Card({employer, UniversityName, jobTitle }) {
// const  = props
  // destructure props and use it ..

return (
  <div>
   {employer}
   {UniversityName}
   {jobTitle}
  </div>
)
}



export default Card;

