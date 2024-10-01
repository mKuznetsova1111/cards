import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import CardsItem from "./CardsItem";


export default function Cards({className, list}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordState, setWordState] = useState(null);

  function click(state){
    setWordState(state);
    const t = setTimeout(() => {
      setWordState(null);
      setActiveIndex(activeIndex + 1 < list.length ? activeIndex + 1 : activeIndex);
    }, 400)

    return () => clearTimeout(t);
  }
  return (
    <div className={classNames("cards", className)}>
      <div className={"cards__header"}>
      </div>
      <div className={"cards__block"}>
        <div className={"cards__items"}>
          { list.length > 0 && list.map(({word, translate, pinyin, example}, index) => (
            <CardsItem 
              key={`CardsItem-${index}`}
              word={word}
              translate={translate}
              pinyin={pinyin}
              example={example}
              className={classNames({
                [`cards__item_active`]: activeIndex === index,
                [`cards__item_${wordState}`]: activeIndex === index && wordState !== null
              })}
            />
          ))}
        </div>
        <div className={"cards__nav"}>
          <div className={"cards__nav-item"} onClick={() => click("left")}><img src={"/images/ok.svg"}/></div>
          <div className={"cards__nav-item"} onClick={() => click("right")}><img src={"/images/neok.svg"}/></div>
        </div>
      </div>
      <div className={"cards__panel"}>
      </div>
    </div>
  );
}
Cards.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

