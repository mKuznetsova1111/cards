import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import CardsItem from "./CardsItem";
import {useApp, setFilter, nextWord, restart, shuffleList} from "../../redux/reducer/app";
import {useDispatch} from "react-redux";
import Icon from "../baseComponents/gui/icon/Icon";


export default function Cards({className}) {
  const dispatch = useDispatch();
  const [wordState, setWordState] = useState(null);
  const {list, isFilter, activeWord, isShuffle} = useApp();

  function click(state){
    setWordState(state);
    const t = setTimeout(() => {
      setWordState(null);
      dispatch(nextWord());
    }, 400)

    return () => clearTimeout(t);
  }
  return (
    <div className={classNames("cards", className)}>
      <div className={"cards__header"}>
        <div className={"cards__header-counter"}>{activeWord + 1}/{list.length}</div>
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
                [`cards__item_active`]: activeWord === index,
                [`cards__item_${wordState}`]: activeWord === index && wordState !== null
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
        <div className={"cards__panel-item"}><img src={"/images/list.svg"}/></div>
        <div className={`cards__panel-item ${isFilter ? "cards__panel-item_active" : ""}`} onClick={() => dispatch(setFilter(!isFilter))}><Icon name={"filter"}/></div>
        <div className={"cards__panel-item"} onClick={() => dispatch(restart())}><img src={"/images/restart.svg"}/></div>
        <div className={`cards__panel-item ${isShuffle ? "cards__panel-item_active" : ""}`} onClick={() => dispatch(shuffleList(!isShuffle))}><Icon name={"shuffle"}/></div>
      </div>
    </div>
  );
}
Cards.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

