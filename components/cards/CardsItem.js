import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {image} from "../../utils/data/baseUrl";


export default function CardsItem({className, word, translate, setIsEtc}) {
  const [isBack, setIsBack] = useState(false);
  return (
    <div className={classNames("cards__item", className, `${isBack ? "cards__item_back" : ""}`)}>
      <div className={"cards__item-block"} onClick={() => setIsBack(!isBack)}>
        <div className={"cards__item-side cards__item-side_back"}>
          <div className={"cards__item-word"}>{translate}</div>
        </div>
        <div className={"cards__item-side cards__item-side_front"}>
          <div className={"cards__item-word"}>{word}</div>
        </div>
      </div>
      <div className={"cards__item-button"} onClick={() => setIsEtc(true)}><img src={image("info.svg")}/></div>
    </div>
  );
}
CardsItem.propTypes = {
  className: PropTypes.string
};

