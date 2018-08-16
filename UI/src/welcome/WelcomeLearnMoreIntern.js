import React from "react";
import { Grid, Modal, Transition } from "semantic-ui-react";
import styled from "styled-components";

const StyledModalHeader = styled.div`
  color: #44687c;
  background-color: #bed8e1;
  padding: 30px;
`;

const StyledModalContent = styled.div`
  background-color: #bed8e1;
  padding: 0 50px 50px 50px;
`;

const Header1 = styled.h1`
  margin: 0;
  font-weight: 100;
`;

const Header2 = styled.h2`
  margin: 0;
  font-weight: 100;
  color: #44687c;
`;

const Paragraph = styled.p`
  font-size: 1.1em;
  color: #6e7678;
`;

const LearnMoreInternship = props => (
  <Transition animation="fly up" duration={1000} transitionOnMount>
    <Modal open dimmer={true} onClose={props.close} size="large">
      <StyledModalHeader>
        <Header1>hirengine</Header1>
        <Header2 style={{ fontSize: "1em" }}>We connect the dots</Header2>
      </StyledModalHeader>
      <StyledModalContent>
        <Modal.Content>
          <Header2 style={{ fontSize: "1.2em" }}>
            Internship and part time jobs
          </Header2>
          <Header1 style={{ color: "white" }}>
            Find the best opportunities that matches your schedule
          </Header1>
          <Grid columns={2}>
            <Grid.Row style={{ padding: "50px" }}>
              <Grid.Column>
                <Paragraph>
                  Data-driven marketing has transformed from an innovative
                  approach to a fundamental part of advertising and business
                  strategy; it can now be defined in several ways, but at the
                  most basic level, it can be explained as follows:
                </Paragraph>
                <Paragraph>
                  Data-driven marketing refers to strategies built on insights
                  pulled from analysis of big data, collected through consumer
                  interactions and engagements, to form predictions about future
                  behaviors. This involves understanding the data you already
                  have, the data you can get, and how to organize, analyze, and
                  apply that data to better marketing efforts.
                </Paragraph>
              </Grid.Column>
              <Grid.Column>
                <Paragraph>
                  Although there are many reasons why companies use data-driven
                  marketing, more often than not, its intended goal is to
                  enhance and personalize the customer experience.
                </Paragraph>
                <Paragraph>
                  To provide more clarity around the topic, we've outlined key
                  benefits and common challenges of data-driven marketing, in
                  addition to example applications
                </Paragraph>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </StyledModalContent>
    </Modal>
  </Transition>
);

export default LearnMoreInternship;
