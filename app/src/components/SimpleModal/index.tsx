import React, { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { delay } from "../../shared/utils";
import Button from "../Button";
import { ANIMATION_DURATION_SAFE, useStyles } from "./styles";

interface Props {
  heading: string;
  body: React.ReactNode;
  show: boolean;
  canConfirm: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const modalRoot: HTMLElement = document.getElementById("modal-root")!;

const SimpleModal: FC<Props> = (props) => {
  const { heading, canConfirm, show, body, onCancel, onConfirm } = props;
  const classes = useStyles();
  const [element] = useState(document.createElement("div"));
  const [active, setActive] = useState(false);
  const [opening, setOpening] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  useEffect(() => {
    if (!show) {
      setClosing(true);
      delay(ANIMATION_DURATION_SAFE).then(() => {
        setActive(false);
        setClosing(false);
      });
    } else {
      setActive(true);
      setOpening(true);
      delay(ANIMATION_DURATION_SAFE).then(() => {
        setOpening(false);
      });
    }
  }, [show]);

  const output = active ? (
    <>
      <div className={clsx(classes.overlayBackground, { opening: opening, closing: closing })} />
      <div className={classes.overlayLayout}>
        <div className={clsx(classes.modal, { opening: opening, closing: closing })}>
          <div className={clsx(classes.modalHeader)}>
            <div className={clsx(classes.headerText, classes.container)}>{heading}</div>
          </div>
          <div className={clsx(classes.modalBody, classes.container)}>{body}</div>
          <div className={clsx(classes.modalFooter, classes.container)}>
            <Button className={clsx("mr-1")} type="button" color={"secondary"} variant={"outlined"} onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" color={"primary"} variant={"contained"} disabled={!canConfirm} onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : null;

  return createPortal(output, element);
};

export default SimpleModal;
