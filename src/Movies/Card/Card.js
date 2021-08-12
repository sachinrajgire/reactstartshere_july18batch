import React from 'react';
import PropTypes from 'prop-types'; // ES6
import './card.css'

const Card = ({title,year,poster,alt,height, width,array1prop,object1prop,classname,color}) => {

    return (
        <div style={{backgroundColor:color}} className={`${classname} card-cover`}>
        {/* <div className="card-cover-marketing card-cover"> */}
       <h5>{title}</h5>
           <p>{year}</p>
          <img 
          src={poster} alt={alt} width={width} height={height} />
        </div>
    );
};
Card.defaultProps= {
    width:100,
    height:100
}

Card.propTypes = {
    title: PropTypes.string,
    year: PropTypes.number,
    poster: PropTypes.string,
    array1prop: PropTypes.array,
    object1prop: PropTypes.object,
}

export default Card;