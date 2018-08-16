import React from "react";
import { Confirm } from "semantic-ui-react";

const ExitConfirmation = props => (
  <Confirm
    open
    cancelButton="Nevermind"
    confirmButton="OK"
    content="Are you sure? All form progress will be lost if you hit OK."
    onCancel={props.cancel}
    onConfirm={props.confirm}
    size="tiny"
  />
);

export default ExitConfirmation;
