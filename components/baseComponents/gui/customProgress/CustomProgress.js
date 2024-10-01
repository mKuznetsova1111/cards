import React, {useState, useEffect, createRef, useCallback, useRef} from "react";
import PropTypes from "prop-types";

const defaultClasses = {
  element: 'custom-progress',
  verticalModifier: '_vertical',
  line: 'custom-progress__line',
  lineInner: 'custom-progress__line-inner',
  point: 'custom-progress__line-point',
  pointBlock: 'custom-progress__line-point-block'
};

export default function CustomProgress(props) {
  const {value = .5, progressChanged, onChangeStarted, onChangeEnded, isVertical, hasDot, overrideClasses, onSeekStart, onSeekEnd} = props;
  const lineRef = useRef();

  const classes = {...defaultClasses, ...overrideClasses};

  const [pointerdown, setPointerdown] = useState(false);

  const clearPointerdownState = () => {
    setPointerdown(false);
    onChangeEnded && onChangeEnded();
  };

  const changeVal = (e) => calculateValue(e, lineRef, isVertical, progressChanged);

  const onPointerMove = useCallback((e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    changeVal(e);
  }, []);

  const onPointerDown = useCallback((e) => {
    window.addEventListener("pointermove", onPointerMove, {capture: true});
    window.addEventListener("pointerup", onPointerUp, {capture: true});

    onSeekStart?.();
    changeVal(e);
  }, []);

  const onPointerUp = useCallback(() => {
    window.removeEventListener("pointermove", onPointerMove, {capture: true});
    window.removeEventListener("pointerup", onPointerUp, {capture: true});

    onSeekEnd?.();
  }, []);

  useEffect(() => {
    lineRef.current.addEventListener("pointerdown", onPointerDown, {capture: true});

    window.addEventListener('pointerup', clearPointerdownState);
    return () => {
      window.removeEventListener('pointerup', clearPointerdownState);
    };
  }, []);

  return (
    <div
      className={`${classes.element} ${isVertical && `${classes.element}${classes.verticalModifier}`}`}
      role={"button"}
      tabIndex={"0"}>
      <div className={`${classes.line} ${isVertical && `${classes.line}${classes.verticalModifier}`}`}
           ref={lineRef}
           role={"button"}
           tabIndex={"0"}
      >
        <div
          className={`${classes.lineInner} ${isVertical && `${classes.lineInner}${classes.verticalModifier}`}`}
          style={isVertical ? {height: `${value * 100}%`} : {width: `${value * 100}%`}}/>
        {(hasDot) &&
        <div
          className={`${classes.point} ${isVertical && `${classes.point}${classes.verticalModifier}`}`}
          style={isVertical ? {bottom: `${value * 100}%`} : {left: `${value * 100}%`}}>
          <div
            className={`${classes.pointBlock} 
              ${isVertical && `${classes.pointBlock}${classes.verticalModifier}`}`}/>
        </div>
        }
      </div>
    </div>
  )
}

function calculateValue({pageX, pageY, touches}, line, isVertical, progressChanged) {
  const x = touches ? touches[0].pageX : pageX;
  const y = touches ? touches[0].pageY : pageY;
  let val;
  const rect = line.current.getBoundingClientRect();

  if (isVertical) {
    val = 1 - (y - rect.y) / rect.height;
  } else {
    val = (x - rect.x) / rect.width;
  }

  if (progressChanged)
    progressChanged(Math.min(Math.max(val, 0), 1));
}

CustomProgress.propTypes = {
  /**
   * Значение прогресса (0-1)
   */
  value: PropTypes.number,
  /**
   * Метод, который вызывается когда действие пользователя поменяло значение прогресса
   */
  progressChanged: PropTypes.func,
  /**
   * Метод, который вызывается когда пользователь начал пепретаскивать прогресс
   */
  onChangeStarted: PropTypes.func,
  /**
   * Метод, который вызывается когда пользователь закончил пепретаскивать прогресс
   */
  onChangeEnded: PropTypes.func,
  /**
   * Вертикальный прогресс
   */
  isVertical: PropTypes.bool,
  /**
   * Наличие точки в конце линии
   */
  hasDot: PropTypes.bool,
  /**
   * Классы для перегрузки стандартных
   */
  overrideClasses: PropTypes.object,
};

CustomProgress.displayName = "CustomProgress";

