import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {safeHTML} from "../../../../utils/safeHTML";


export default function FlipCardSide(props) {
  const {className, children, image, title, text} = props;
  return (
    <div className={classNames("flip-card__side", className)}>
      {image && <div className="flip-card__side-bg">
        <img src={image} alt=""/>
      </div>}
      {title && <strong className="flip-card__side-title">{safeHTML(title)}</strong>}
      {text && <strong className="flip-card__side-text">{safeHTML(text)}</strong>}
      {children}
    </div>
  );
}
FlipCardSide.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

