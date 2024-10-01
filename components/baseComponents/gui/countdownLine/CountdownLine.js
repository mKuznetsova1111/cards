import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Countdown from "react-countdown";


export default function CountdownLine({className, children, date = 0, renderer, onComplete}) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true)
  }, []);
  return (
    <div className={classNames("countdown-line", className)}>
      {render && <Countdown date={date}
                            renderer={renderer}
                            onComplete={onComplete}
      />}
      {children}
    </div>
  );
}
CountdownLine.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

