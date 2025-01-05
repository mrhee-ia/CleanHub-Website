import styles from "./Modal.module.css";

const Modal = ({children}) => {
    return (
        <div className={styles["backdrop"]}>
            <div className={styles["modal-content"]}>
                {children}
            </div>
        </div>
    )
}

export default Modal