import React, { useEffect, useState } from 'react'
import Card from './Card'
import useScrollTrigger from '../application/hooks/useScrollTrigger';

const CardList = ({service}) => {

    const [cards, setCards] = useState([]);
    const [cursor, setCursor] = useState(null);
    
    const  [shouldFetch, fetchMoreData] = useScrollTrigger(service);


    useEffect(() => {
        // Load initial cards on component mount
        const loadInitialCards = async () => {
          const initialCards = await service.loadInitial();
          setCards(initialCards);
          setCursor(initialCards[initialCards.length - 1]?.id);
        };
        
        loadInitialCards();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (shouldFetch) {
          fetchMoreData(cursor).then(newCards => {
            if (newCards?.length) {
              setCards(prev => [...prev, ...newCards]);
              setCursor(newCards[newCards.length - 1]?.id);
            }
          });
        }
        // eslint-disable-next-line
    }, [shouldFetch, fetchMoreData]);

    return (
        <div className='row'>
            {cards.map((card) => {
                return (
                    <div className="col-md-4">
                    <Card card = {card} cardService = {service}/>
                    </div>
                );}
            )}
        </div>
    )
}

export default CardList
