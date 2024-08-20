import { MouseEvent, PropsWithChildren } from "react";
import styles from "./index.module.scss";
import { CloseIcon } from "../icons/CloseIcon";

interface ModalProps {
    visible: boolean;
    onVisibleChange: (visible: boolean) => void;
}

export function Modal({ visible, onVisibleChange, children }: PropsWithChildren<ModalProps>) {
    const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        onVisibleChange(false);
    };

    return (
        <div className={styles.modalContainer} data-visible={visible} onClick={handleContainerClick}>
            <div className={styles.modal}>
                <button className={styles.modalClose} onClick={() => onVisibleChange(false)}>
                    <CloseIcon />
                </button>
                {children}
            </div>
        </div>
    );
}
