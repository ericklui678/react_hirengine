import _ from "lodash";
import faker from "faker";
import React, { Component } from "react";
import { Container, Divider, Grid, List, Segment } from "semantic-ui-react";
import DashboardNav from "./DashboardNav";
import DashboardSearch from "./DashboardSearch";
import CircularProgress from "../components/circular-progressbar/CircularProgressbar";
import GoogleMaps from "../components/google-maps/GoogleMaps";
import styled from "styled-components";
import "./dashboard.css";
import fakeCompanyData from "../assets/json/fakeCompanyData";

const dummyCompanyData = _.times(20, () => ({
  title: faker.company.companyName(),
  rate: Math.floor(Math.random() * 29 + 1), // limit to under 30%
  latitude: faker.address.latitude(),
  longitude: faker.address.longitude()
}));

const Header1 = styled.h1`
  font-weight: 100;
  font-size: 1.5em;
  margin-bottom: 40px;
`;

const Paragraph = styled.p`
  padding-bottom: 20px;
  font-size: 1.2em;
  font-weight: 100;
`;

class Dashboard extends Component {
  state = {
    selectedCompanyName: "",
    selectedCompanyRate: 0,
    selectedCompanyLat: 37.387,
    selectedCompanyLong: -121.848
  };

  handleCompanyClick = (e, { value }) => {
    const company = value.split("|");
    const companyName = company[0];
    const companyRate = Number(company[1]);
    const companyLat = Number(company[2]);
    const companyLong = Number(company[3]);
    this.setState({
      selectedCompanyName: companyName,
      selectedCompanyRate: companyRate,
      selectedCompanyLat: companyLat,
      selectedCompanyLong: companyLong
    });
  };

  render() {
    const {
      selectedCompanyName,
      selectedCompanyRate,
      selectedCompanyLat,
      selectedCompanyLong
    } = this.state;
    console.log(dummyCompanyData);
    console.log(fakeCompanyData);

    const data = fakeCompanyData.map((company, i) => {
      return (
        <List.Item
          key={i}
          value={`${company.title}|${company.rate}|${company.latitude}|${
            company.longitude
          }`}
          onClick={this.handleCompanyClick}
        >
          <List.Content>
            <List.Header>{company.title}</List.Header>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <div>
        <div id="sidebar">
          <DashboardNav />
        </div>
        <div id="content">
          <DashboardSearch />
          <Container fluid style={{ padding: "30px 5%" }}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={16} largeScreen={4} widescreen={4} />
                <Grid.Column computer={16} largeScreen={12} widescreen={12}>
                  <Header1>
                    Acceptance Rate is based on the assessment, inputs, and job
                    requirements
                  </Header1>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                {/* Big Circle */}
                <Grid.Column
                  computer={16}
                  largeScreen={4}
                  widescreen={4}
                  textAlign="center"
                >
                  <CircularProgress
                    color={"#049fda"}
                    percent={64}
                    radius={115}
                  />
                  <Paragraph>Overall Rate</Paragraph>
                </Grid.Column>
                {/* 4 Circles */}
                <Grid.Column computer={16} largeScreen={12} widescreen={12}>
                  <Grid divided>
                    <Grid.Row>
                      <Grid.Column
                        computer={8}
                        largeScreen={4}
                        widescreen={4}
                        textAlign="center"
                      >
                        <CircularProgress
                          color={"#55d8fe"}
                          percent={94}
                          radius={88}
                        />
                        <Paragraph>Facebook</Paragraph>
                      </Grid.Column>
                      <Grid.Column
                        computer={8}
                        largeScreen={4}
                        widescreen={4}
                        textAlign="center"
                      >
                        <CircularProgress
                          color={"#a3a0fb"}
                          percent={80}
                          radius={88}
                        />
                        <Paragraph>LinkedIn</Paragraph>
                      </Grid.Column>
                      <Grid.Column
                        computer={8}
                        largeScreen={4}
                        widescreen={4}
                        textAlign="center"
                      >
                        <CircularProgress
                          color={"#ffda83"}
                          percent={43}
                          radius={88}
                        />
                        <Paragraph>Chegg</Paragraph>
                      </Grid.Column>
                      <Grid.Column
                        computer={8}
                        largeScreen={4}
                        widescreen={4}
                        textAlign="center"
                      >
                        <CircularProgress
                          color={"#ff8273"}
                          percent={32}
                          radius={88}
                        />
                        <Paragraph>Cisco</Paragraph>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <p>
                        hirengine suggest to apply for above companies. Click
                        each result to learn more
                      </p>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <Grid>
              <Grid.Row id="content-bottom">
                <Grid.Column computer={16} largeScreen={6} widescreen={4}>
                  {/* Google Map Here */}
                  <Segment raised style={{ padding: 0 }}>
                    <GoogleMaps
                      isMarkerShown={true}
                      destLat={selectedCompanyLat}
                      destLong={selectedCompanyLong}
                    />
                  </Segment>
                </Grid.Column>
                <Grid.Column
                  computer={16}
                  largeScreen={4}
                  widescreen={4}
                  textAlign="center"
                  verticalAlign="middle"
                >
                  <CircularProgress
                    color={"#ff8273"}
                    percent={selectedCompanyRate}
                    radius={115}
                  />
                  <h3>{selectedCompanyName || "Select a company"}</h3>
                  <p>Acceptance rate</p>
                </Grid.Column>
                <Grid.Column computer={16} largeScreen={6} widescreen={8}>
                  <p>Click on a company below to see the rate</p>

                  <List selection animated size="large" horizontal>
                    {data}
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

export default Dashboard;
