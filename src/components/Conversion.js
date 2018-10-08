import React, { Component } from "react";
import "../App.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Alert
} from "reactstrap";

class Conversion extends Component {
  state = {
    alertVisible: false,
    mmolReading: "5.4",
    mgdlReading: "97.2",
    message: ""
  };

  handleChange = currentlyEditing => event => {
    this._calculateBloodSugar(currentlyEditing, event.target.value);
  };

  _calculateBloodSugar = (currentlyEditing, newValue) => {
    if (currentlyEditing === "mmol") {
      const mgdlValue = parseFloat(newValue * 18).toFixed(1);
      const message = this.checkHypoHyperglycemia(newValue, mgdlValue);
      this.setState({
        mmolReading: newValue,
        mgdlReading: mgdlValue,
        message: message,
        alertVisible: message !== null ? true : false
      });
    } else {
      const mmolValue = parseFloat(newValue / 18).toFixed(1);
      const message = this.checkHypoHyperglycemia(mmolValue, newValue);
      this.setState({
        mmolReading: mmolValue,
        mgdlReading: newValue,
        message: message,
        alertVisible: message !== null ? true : false
      });
    }
  };

  checkHypoHyperglycemia = (mmol, mgdl) => {
    if (mmol < 4 && mgdl < 72) {
      return "Hypoglycemia";
    } else if (mmol > 11.1 && mgdl > 200) {
      return "Hyperglycemia";
    } else {
      return null;
    }
  };

  onDismiss = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    return (
      <Col className="App">
        <header className="App-header">
          <div className="heading">Blood Sugar Converter</div>
          <Container>
            <Row>
              <Col md={2} sm={{ offset: 4 }}>
                <InputGroup>
                  <Input
                    bsSize="lg"
                    type="text"
                    value={this.state.mmolReading}
                    onChange={this.handleChange("mmol")}
                  />
                  <InputGroupAddon addonType="prepend">mmol/L</InputGroupAddon>
                </InputGroup>
              </Col>
              <Col md={2} sm={{ offset: 0 }}>
                <InputGroup>
                  <Input
                    bsSize="lg"
                    type="text"
                    value={this.state.mgdlReading}
                    onChange={this.handleChange("mgdl")}
                  />
                  <InputGroupAddon addonType="prepend">mg/dL</InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={6} sm={{ offset: 3 }}>
                <Alert
                  color="danger"
                  isOpen={this.state.alertVisible}
                  toggle={this.onDismiss}
                >
                  {this.state.message}
                </Alert>
              </Col>
            </Row>
          </Container>
        </header>
      </Col>
    );
  }
}

export default Conversion;
