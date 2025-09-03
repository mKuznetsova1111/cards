import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import CardsItem from "./CardsItem";
import {useApp, setFilter, nextWord, restart, shuffleList, getFiltered} from "../../redux/reducer/app";
import {useDispatch} from "react-redux";
import Icon from "../baseComponents/gui/icon/Icon";
import {image} from "../../utils/data/baseUrl";
import {panel} from "../../constants/copyright";
import {CSSTransition, TransitionGroup} from "react-transition-group";


export default function Cards({className}) {
  const dispatch = useDispatch();
  const [wordState, setWordState] = useState(null);
  const [isEct, setIsEtc] = useState(false);
  const {list, isFilter, activeWord, isShuffle} = useApp();
  const [activeAction, setActiveAction] = useState({filter: isFilter ? true : false, shuffle: isShuffle ? true : false});

  const actions = {
    filter: () => { 
      // dispatch(setFilter({isFilter: !isFilter, type: "isHSK5"})) 
      dispatch(getFiltered({isShuffle, filterType: activeAction.filter ? "isHSK5" : false}))
      setActiveAction({filter: !activeAction.filter, shuffle: activeAction.shuffle})
    },
    restart: () => { 
      dispatch(restart()) 
    },
    shuffle: () => { 
      // dispatch(shuffleList(!isShuffle));
      dispatch(getFiltered({isShuffle: true}))
      setActiveAction({filter: activeAction.filter, shuffle: !activeAction.shuffle})
    },
  }

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
          { list.length > 0 && list.map(({word, translate}, index) => (
            <CardsItem 
              key={`CardsItem-${index}`}
              word={word}
              translate={translate}
              setIsEtc={setIsEtc}
              className={classNames({
                [`cards__item_active`]: activeWord === index,
                [`cards__item_${wordState}`]: activeWord === index && wordState !== null
              })}
            />
          ))}
        </div>
        <div className={"cards__nav"}>
          <div className={"cards__nav-item"} onClick={() => click("left")}><img src={image("ok.svg")}/></div>
          <div className={"cards__nav-item"} onClick={() => click("right")}><img src={image("neok.svg")}/></div>
        </div>
      </div>
      <div className={"cards__panel"}>
        {
          panel.map(({image, action}, index) =>
            <div 
              key={`cards__panel-item-${index}`} 
              className={classNames("cards__panel-item", className, {
                ["cards__panel-item_active"]: (activeAction.filter && action === "filter") || (activeAction.shuffle && action === "shuffle"),
                ["cards__panel-item_disabled"]: (activeWord > 0 && action !== "restart"),
              })}
              onClick={() => actions[action]?.()}
            >
              <img src={image}/>
            </div>
          )
        }
      </div>

      <TransitionGroup component={null}>
        {isEct && (
          <CSSTransition key={isEct} classNames={"cards__item-info"} timeout={{enter: 300, exit: 300}}>
            <div className={"cards__item-info"}>
              <div className={"cards__item-info-bg"} onClick={() => setIsEtc(false)}/>
              <div className={"cards__item-info-block"}>
                <div className={"cards__item-info-title"}>{list[activeWord]?.pinyin}</div>
                { list[activeWord]?.example && <div className={"cards__item-info-text"}>{list[activeWord]?.example}</div> }
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}
Cards.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

