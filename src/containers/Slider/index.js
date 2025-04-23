import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  
  const { data } = useData(); //  Récupère tous les événements à afficher

  const [index, setIndex] = useState(0); // Index slide actuellement affiché

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
 // ancien code => new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
 // Correction plus ancien au plus recent
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  /** ancien code => 
   * const nextCard = () => {
   * setTimeout(
   * () => setIndex(index < byDateDesc.length ? index + 1 : 0),
   * 5000
   * );
   * };
  */    

  // page blanche au milieu
  const dataLength = data?.focus.length

  const nextCard = () => {
    setTimeout(
      // Ajout de -1 après "length" pour etre surs que index depasse pas 
      () => setIndex(index < dataLength - 1 ? index + 1 : 0), // dernier slide retour a zero
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
            >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
    
      ))} 
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
          // {byDateDesc.map((_, radioIdx)
            <input
              key={event.title}
              // key={`${event.id}`} correction event a pas id mais event
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // checked={idx === radioIdx} correction idx???? => index 
              onClick={() => setIndex(radioIdx)} // onclick dot navigation
              readOnly

            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;