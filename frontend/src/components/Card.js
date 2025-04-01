import React, { useState } from 'react'

function Card(props) {
  
  const { id, value , onIncrement } = props;
  const [localValue, setLocalValue] = useState(value);

  const handleIncrement = () => {
    setLocalValue(localValue + 1); // Update locally
    onIncrement(id);
  };

  return (
    <div className="card w-25">
      <div className="card-body">
        <h2 className="card-title">Card id = {id} </h2>
        <h4> card value = {localValue} </h4>
        <div className="btn btn-primary" onClick={handleIncrement}>Button</div>
      </div>
    </div>
  );
}

export default Card
