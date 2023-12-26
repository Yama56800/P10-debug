import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData('');
  const [type, setType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const typeList = new Set(data?.events.map((event) => event.type));
  const filteredEvents = data?.events.filter(event => !type || event.type === type).slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE ) || [];


  const changeType = (evtType) => {
    console.log("Selected type:", evtType); // Ajoutez cette ligne
    setCurrentPage(1);
    setType(evtType);
  };
  

  

  useEffect(() => {
    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;
  
    console.log("Start:", start, "End:", end);
    console.log("Number of filtered events:", filteredEvents.length);
  
  }, [currentPage, data, type, filteredEvents]);
  

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  console.log("bla",typeList)  
                                                                //     
  return (
    <>
    
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => changeType(value, filteredEvents )}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
  {[...Array(pageNumber)].map((_, n) => (
    <a key={`page-${n + 1}`} href="#events" onClick={() => setCurrentPage(n + 1)}>
      {n + 1}
    </a>
  ))}
</div>

        </>
      )}
    </>
  );
};

export default EventList;
