import React, {useMemo} from 'react';
import CustomHeader from '../baseComponents/gui/customHeader/CustomHeader';
import Footer from '../baseComponents/gui/footer/Footer';
import {header} from "../../constants/copyright";
import {node} from "prop-types";
import ModalProvider from "../baseComponents/controllers/modalController/ModalProvider";
import Preloader from "../baseComponents/gui/preloader/Preloader";
import ErrorHandlerModal from "../baseComponents/gui/errorHandlerModal/ErrorHandlerModal";

export default function MainLayout({children}) {
  return (
    <ModalProvider
      aliases={useMemo(() => ({
        errorHandlerModal: {Modal: ErrorHandlerModal},
        // infoModal: {Modal: InfoModal, props: {message: "Lorem ipsum"}}
      }), [])}
    >
      <div className={'content'}>{children}</div>
    </ModalProvider>
  )
}

MainLayout.propTypes = {
  children: node,
};
