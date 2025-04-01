import React, { useState } from 'react'

function Card(props) {
  
  const { card, CardService } = props;
  const [localValue, setLocalValue] = useState(card.value);

  const handleIncrement = () => {
    card.increment();
    setLocalValue(card.value); // Update locally
    CardService.queueUpdate(card);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Card id = {card.id} </h2>
        <h4> card value = {localValue} </h4>
        <div className="btn btn-primary" onClick={handleIncrement}>Button</div>
      </div>
    </div>
  );
}

export default Card
