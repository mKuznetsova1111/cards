import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import CustomModal from "../customModal/CustomModal";
import Button from "../button/Button";
import {useModal} from "../../../../hooks/useModal";


export default function ErrorHandlerModal({className, error, onClose}) {
  const {id} = useModal();
  return (
    <CustomModal>
      <div className={classNames("error-handler-modal", className)}>
        <div className={"error-handler-modal__bg"}/>
        <div className={"error-handler-modal__block"}>
          <h1 className={"error-handler-modal__title"}>
            Упс, что-то пошло не&nbsp;так
          </h1>
          <div className={"error-handler-modal__content"}>
            <div className={"error-handler-modal__content-item"}>
              {error?.displayMessage}
            </div>
          </div>
          <Button onClick={() => {
            onClose?.(id);
          }}>
            {"Ок"}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}
ErrorHandlerModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

