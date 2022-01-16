import React, { useEffect, useState } from "react";
import {createPortal} from "react-dom";
import classNames from "classnames";
import { motion, AnimatePresence } from 'framer-motion';

function Modal(props) {
  const [modalRoot, setModalRoot] = useState(null);
  const { children, closeModalHandler, visible, style = {}, sideModal = false } = props;

  let variants;
    if(sideModal) {
      variants = {
        initial: {
           x: -300
        },
        animate: {
           x: 0
        },
        exit: {
          x: -100
        }
     }
    } else {
      variants = {
        initial: {
           opacity: 0
        },
        animate: {
           opacity: 1
        },
        exit: {
          opacity: 0
        }
     }
    }

  const wrapperClasses = classNames({
    'modal__modal-wrapper': true,
    'side-modal': sideModal,
  });

  const modalBoxClasses = classNames({
    'modal__modal-box modal-scrollbar': true,
    'side-modal': sideModal
  });

  let modalContent = (
    <div className={wrapperClasses}>
      <div
        onClick={() => closeModalHandler()}
        className="modal__backdrop"
      ></div>
      <AnimatePresence>
        <motion.div initial="initial" animate="animate" exit="exit" variants={variants} transition={{duration: 0.3}} style={{ ...style }} className={modalBoxClasses} >
          <div className="modal__children">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  useEffect(() => {
    const modalDom = window.document.getElementById("modal-root");
    setModalRoot(modalDom);
    
    const bodyDOM = window.document.body;

    // Remove scrollbar when Floating cart is open
    if (visible) {
      bodyDOM.style.height = "100vh";
      bodyDOM.style.overflowY = "hidden";
    } else {
      bodyDOM.style.height = "";
      bodyDOM.style.overflowY = "";
    }
  }, [visible]);

  if (visible && modalRoot) {
    return createPortal(modalContent, modalRoot);
  } else {
    return null;
  }
}

export default Modal;
