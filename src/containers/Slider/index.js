import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const handleChangeRadio = (radioIdx) => {
    setIndex(radioIdx);
    setActiveIndex(radioIdx);
  };

  const nextCard = () => {
    setTimeout(() => {
      setIndex(() =>
        index < (byDateDesc?.length || 0) - 1 ? index + 1 : 0
      );
      setActiveIndex(() =>
        index < (byDateDesc?.length || 0) - 1 ? index + 1 : 0
      );
    }, 5000);
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
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
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={activeIndex === radioIdx}
                  onChange={() => handleChangeRadio(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;