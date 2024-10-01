import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../button/Button";
// import Icon from "../icon/Icon";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {image} from "../../../../utils/data/baseUrl";


const CustomButton = React.forwardRef(
  function CustomButton({className, children, text, icon, img, onClick, tag, target, href, disabled, style, isTransparent, isIcon, isLoad = false}, ref) {
    return (
      <Button className={classNames("custom-button", {[`${className}`]: className}, {[`custom-button_icon`]: isIcon}, {[`custom-button_transparent`]: isTransparent}, {[`custom-button_hideContent`]: isLoad})} disabled={disabled} onClick={onClick} tag={tag} target={target} href={href} style={style}>
        {text && <div className={"custom-button__text"}>{text}</div>}
        {img && <div className={"custom-button__image"}><img src={image(img, true)} alt={''}/></div>}
        {/*{icon && <div className={"custom-button__image"}><Icon name={icon}/></div>}*/}
        <TransitionGroup component={null}>
          {isLoad ?
            <CSSTransition key={isLoad} timeout={{enter: 500, exit: 500}} classNames={"custom-button__load"}>
              <div className={"custom-button__load"}>
                <img src={image("test/load.svg", true)}/>
              </div>
            </CSSTransition> : null}
        </TransitionGroup>
        {children}
      </Button>
    );
  });

export default CustomButton;

CustomButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

