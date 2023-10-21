import classes from './Modal.module.css';
import {useNavigate} from "react-router-dom";

// object destructuring for props
function Modal({children}) {
  const navigate = useNavigate()

  function closeHandler() {
    navigate('..'); /* go to parent */
  }

  return (
      <>
        <div className={classes.backdrop} onClick={closeHandler}/>
        <dialog open className={classes.modal}>
          {children}
        </dialog>
      </>
  );
}

export default Modal;