import React, { useEffect, useState } from 'react'
import Card from './Card'
import useScrollTrigger from '../application/hooks/useScrollTrigger';
import useScrollVelocity from '../application/hooks/useScrollVelocity';

const CardList = ({service}) => {

    const [cards, setCards] = useState([]);
    const [cursor, setCursor] = useState('0');
    const scrollVelocity = useScrollVelocity();
    const [shouldFetch, fetchMoreData, targetRef] = useScrollTrigger(service);

    useEffect(() => {
        if (shouldFetch) {
            //Saving the updates
            service.savePendingUpdates().catch((error) => {
                console.error('Error saving pending updates:', error);
            });

            //Fetching more data
            fetchMoreData(cursor, scrollVelocity).then(newCards => {
                if (newCards?.length) {
                setCards(prev => [...prev, ...newCards]);
                setCursor(newCards[newCards.length-1]?._id);
                }
            });
        }
        // eslint-disable-next-line
    }, [shouldFetch]);

    useEffect(() => {
        const handleBeforeUnload = async (event) => {
            // event.preventDefault(); // To Prevent default behavior
    
            try {
                await service.savePendingUpdates();
                console.log('Pending updates saved before closing.');
            } catch (error) {
                console.error('Error saving pending updates before closing:', error);
            }
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [service]);

    return (
        <div className='row'>
            {cards.map((card) => {
                return (
                    <div className="col-md-4" key={card.cardId}>
                    <Card card = {card} cardService = {service}/>
                    </div>
                );}
            )}
            <div ref={targetRef} style={{ height: "20px" }} aria-hidden="true" />
        </div>
    )
}

export default CardList


// useEffect(() => {
//     // Load initial cards on component mount
//     const loadInitialCards = async () => {
//       const initialCards = await service.loadInitial();
//       setCards(initialCards);
//       setCursor(initialCards[initialCards.length - 1]?.id);
//     };
    
//     loadInitialCards();
//     // eslint-disable-next-line
// }, []);