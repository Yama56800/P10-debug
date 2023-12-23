import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt = "image",  // Mettre imageAlt à "image" par défaut si aucune valeur n'est fournie
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => {
  console.log("Image source:", imageSrc);  

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month" data-testid="card-month-testid">{getMonth(date)}</div>
      </div>
    </div>
  );
};


EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,  // Not marked as required
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,       // Not marked as required
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",  // Default value for imageAlt
  small: false,       // Default value for small
};

export default EventCard;