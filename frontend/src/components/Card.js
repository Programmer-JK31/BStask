import React, { useState } from 'react'

function Card(props) {
  
  const { card, cardService } = props;
  const [localValue, setLocalValue] = useState(card.value);

  const handleIncrement = () => {
    card.increment();
    setLocalValue(card.value); // Update locally
    cardService.queueUpdate(card);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2> card value = {localValue} </h2>
        <h5 className="card-title">Card id = {card.cardId} </h5>
        <div className="btn btn-primary" onClick={handleIncrement}>Button</div>
      </div>
    </div>
  );
}

export default Card
