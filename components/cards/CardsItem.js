import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {CSSTransition, TransitionGroup} from "react-transition-group";


export default function CardsItem({className, word, translate, pinyin, example}) {
  const [isBack, setIsBack] = useState(false);
  const [isEct, setIsEtc] = useState(false);
  return (
    <>
      <div className={classNames("cards__item", className, `${isBack ? "cards__item_back" : ""}`)}>
        <div className={"cards__item-block"} onClick={() => setIsBack(!isBack)}>
          <div className={"cards__item-side cards__item-side_back"}>
            <div className={"cards__item-word"}>{translate}</div>
          </div>
          <div className={"cards__item-side cards__item-side_front"}>
            <div className={"cards__item-word"}>{word}</div>
          </div>
        </div>
        <div className={"cards__item-button"} onClick={() => setIsEtc(true)}><img src={"/images/info.svg"}/></div>
      </div>

      <TransitionGroup component={null}>
        {isEct && (
          <CSSTransition key={isEct} classNames={"cards__item-info"} timeout={{enter: 300, exit: 300}}>
            <div className={"cards__item-info"}>
              <div className={"cards__item-info-bg"} onClick={() => setIsEtc(false)}/>
              <div className={"cards__item-info-block"}>
                <div className={"cards__item-info-title"}>{pinyin}</div>
                { example && <div className={"cards__item-info-text"}>{example}</div> }
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
}
CardsItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

