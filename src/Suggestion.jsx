import React, { Component } from "react";
import thinksome from "./openai";
import isValidTweet from "./tweet-validation";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  Alert,
} from "react-bootstrap";

class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thought: "",
      openaiThought: "",
      key: "",
      tokens: 70,
      isTwitter: false,
      chars: 0,
      badgeClass: "primary",
      copyMessage: "",
      validationMessage: "",
    };
  }

  onChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "thought") {
          this.charCount();
        }
      }
    );
  };

  onSubmit = async () => {
    let { key, tokens, thought, isTwitter } = this.state;
    //console.log(tokens, typeof tokens, key.length, key.length === 51);
    if (thought && key.length === 51) {
      let touch = await thinksome(key, tokens, thought, isTwitter);

      this.setState({
        openaiThought: touch,
      });
    } else {
      this.setState({
        validationMessage: (
          <Alert
            variant="warning"
            onClose={() => this.setState({ validationMessage: "" })}
            dismissible
          >
            Key must be of 51 chars and thoughts can't be empty.
          </Alert>
        ),
      });
    }
  };

  copy = () => {
    navigator.clipboard.writeText(this.state.openaiThought);

    this.showCopiedMessage();
  };

  charCount = async () => {
    if (this.state.isTwitter && this.state.thought.length) {
      const { weightedLength, tweetValidStatus } = isValidTweet(
        this.state.thought
      );

      this.setState({ chars: weightedLength }, () => {
        if (!tweetValidStatus) {
          this.setState({ badgeClass: "danger" });
        } else if (280 - weightedLength <= 10) {
          this.setState({ badgeClass: "warning" });
        } else {
          this.setState({ badgeClass: "primary" });
        }
      });
    } else {
      this.setState({
        chars: this.state.thought.length,
        badgeClass: "primary",
      });
    }
  };

  showCopiedMessage = () => {
    if (this.state.openaiThought.length) {
      this.setState({
        copyMessage: (
          <Alert
            variant="info"
            onClose={() => this.setState({ copyMessage: "" })}
            dismissible
          >
            copied!
          </Alert>
        ),
      });
    }
  };

  render() {
    return (
      <div>
        <Container className="p-3">
          <Container className="p-5 mb-4 rounded-3">
            <h1 className="header">Thought Some</h1>
          </Container>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      required
                      type="password"
                      name="key"
                      placeholder="key"
                      onChange={this.onChange}
                      value={this.state.key}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="thought"
                      onChange={this.onChange}
                      value={this.state.thought}
                      as="textarea"
                      placeholder="spill your thoughts"
                      style={{ height: "100px" }}
                    />
                    <Badge
                      pill
                      bg={this.state.badgeClass}
                      style={{
                        float: "right",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {this.state.chars}
                    </Badge>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      name="tokens"
                      placeholder="token"
                      onChange={this.onChange}
                      value={this.state.tokens}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="twitter"
                      name="isTwitter"
                      onChange={(e) =>
                        this.setState({ isTwitter: !this.state.isTwitter })
                      }
                    />
                  </Form.Group>
                  <Button onClick={this.onSubmit} variant="primary">
                    Thought Some
                  </Button>
                  <Form.Group>
                    <Form.Text className="muted">
                      <a href="https://beta.openai.com/tokenizer">
                        Check requried token here
                      </a>
                    </Form.Text>
                  </Form.Group>
                </Form>
                {this.state.validationMessage}
              </Col>
              <Col>
                <Card bg="dark" text="white" className="mb-2">
                  <Card.Header>thinksome</Card.Header>
                  <Card.Body>{this.state.openaiThought}</Card.Body>
                </Card>
                <Button onClick={this.copy} variant="primary">
                  Copy
                </Button>
                {this.state.copyMessage}
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Suggestion;
