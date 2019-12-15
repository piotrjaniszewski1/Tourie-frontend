import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withOfflineState from 'react-offline-hoc';
import { ErrorLabel, SuccessLabel } from './Label';
import Grid from './Grid';
import mapEventToState from '../utils/mapEventToState';

const FormElement = styled.form`
  margin-bottom: 1.5rem;
  
  ${({ expand }) => expand && css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  `}
  
  input[type="submit"] {
    margin-top: 1.5rem;
  }
`;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocked: false,
      button: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = mapEventToState.bind(this);
  }

  expectOnline() {
    const { isOnline, requiresOnline } = this.props;
    return requiresOnline && !isOnline;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { blocked, button } = this.state;
    const { onSubmit } = this.props;

    if (blocked || this.expectOnline()) return;

    this.setState({
      blocked: true,
    }, () => {
      onSubmit(() => this.setState({
        blocked: false,
      }), button);
    });
  }

  render() {
    const { blocked } = this.state;
    const {
      elements, errorMessage, successMessage, buttons, expand,
    } = this.props;

    return (
      <FormElement expand={expand} onSubmit={this.handleSubmit}>
        <div>
          {elements}
          {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
          {successMessage && <SuccessLabel>{successMessage}</SuccessLabel>}
        </div>
        <Grid cols={Math.min(buttons.length, 2)}>
          {buttons.map(el => (
            <el.type
              key={el.props.value}
              name="button"
              onClick={this.handleClick}
              blocked={blocked || this.expectOnline()}
              {...el.props}
            />
          ))}
        </Grid>
      </FormElement>
    );
  }
}

Form.defaultProps = {
  elements: null,
  errorMessage: null,
  successMessage: null,
  expand: false,
  requiresOnline: false,
  buttons: [],
};

Form.propTypes = {
  elements: PropTypes.node,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.node),
  expand: PropTypes.bool,
  isOnline: PropTypes.bool.isRequired,
  requiresOnline: PropTypes.bool,
};

export default withOfflineState(Form);
