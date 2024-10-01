import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import FlipCardSide from "./FlipCardSide";


export default function FlipCard({className, frontSide, backSide}) {
  const [showBack, setShowBack] = useState(false);
  return (
    <div className={classNames("flip-card", className, {
      "flip-card_rotate": showBack
    })}
         onClick={() => setShowBack(!showBack)}>
      <div className="flip-card__content">
        <FlipCardSide className={"flip-card__side_front"} {...frontSide}/>
        <FlipCardSide className={"flip-card__side_back"} {...backSide}/>
      </div>
    </div>
  );
}
FlipCard.propTypes = {
  className: PropTypes.string,
  frontSide: PropTypes.object,
  backSide: PropTypes.object,
  children: PropTypes.node,
};

