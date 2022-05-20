import React from 'react';

const Stars = ({rating}) => {
  return (
    <div>
      <span className="stars" style={{ "--rating": rating}}></span>
    </div>
  )
}

export default Stars;