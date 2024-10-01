import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {safeHTML} from "../../../../utils/safeHTML";


export default function MapBasePoint({style, position, name, onClick}) {

  return (
    <div className={classNames("map-base__point", {
      [`map-base__point_${position}`]: position !== undefined
    })}
         style={style}
         onClick={onClick}
    >
      <div className={"map-base__point-circle"}>
        <div className={"map-base__point-circle-block"}/>
      </div>
      {name && <div className={"map-base__point-title"}>{safeHTML(name)}</div>}

    </div>
  );
}
MapBasePoint.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

