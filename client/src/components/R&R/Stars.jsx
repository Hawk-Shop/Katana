import React from 'react';

const Stars = ({rating}) => {
  return (
    <div>
      <span className="stars" style={{ "--rating": (Math.round(rating * 4) / 4).toFixed(2)}}></span>
    </div>
  )
}

export default Stars;