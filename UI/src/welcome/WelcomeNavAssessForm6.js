import React from "react";
import { Button, Icon, Modal, Progress, Transition } from "semantic-ui-react";
import styled from "styled-components";

const ListItem = styled.li`
  padding: 3px;
`;

const Form6Assessment = props => (
  <Transition animation="fade" duration={1000} transitionOnMount>
    <Modal
      open
      closeIcon
      closeOnEscape={false}
      closeOnDimmerClick={false}
      dimmer={true}
      onClose={props.close}
      size="small"
    >
      <Modal.Header style={{ border: 0, paddingBottom: "10px" }}>
        <h1 align="center">Assessment</h1>
      </Modal.Header>
      <Progress
        percent={75}
        size="tiny"
        color="blue"
        style={{ margin: "5px 0px" }}
      />
      <Modal.Content style={{ padding: "21px 50px" }}>
        <div style={{ textAlign: "center" }}>
          <h3>Almost done! Now it's time to take a short assessment!</h3>
          <p>
            In order to find the right place for you I would suggest you to take
            the assessment
          </p>
        </div>
        <div style={{ paddingTop: "30px" }}>
          <h3>It benefits you in:</h3>
          <div>
            <ol>
              <ListItem>Saving time to find a job</ListItem>
              <ListItem>Faster and better matched results</ListItem>
              <ListItem>Employers can find you faster</ListItem>
              <ListItem>Accurate data projection</ListItem>
              <ListItem>
                Relevant, actionable, and data-based intelligence with data
                visualization
              </ListItem>
              <ListItem>Analytics</ListItem>
              <ListItem>Help</ListItem>
              <ListItem>Suggestions based on your input</ListItem>
            </ol>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#e1e2e2",
            borderRadius: "3px",
            marginTop: "20px"
          }}
        >
          <p style={{ padding: "10px" }}>
            Note: You can take the assessment without using our AI Engine. But
            still, you can see your information already entered in your
            Dashboard and browse the opportunities and submit your request.
          </p>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button icon labelPosition="left" onClick={props.prev}>
          Previous
          <Icon name="left arrow" />
        </Button>
        <Button icon onClick={props.next} primary labelPosition="right">
          Next
          <Icon name="right arrow" />
        </Button>
      </Modal.Actions>
    </Modal>
  </Transition>
);

export default Form6Assessment;
