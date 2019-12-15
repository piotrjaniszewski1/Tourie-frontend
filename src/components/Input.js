import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import uniqueId from '../utils/uniqueId';

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  color: $color-text-secondary;
  pointer-events: none;
  font-size: ${({ theme }) => theme.font.size.label.primary};
  position: absolute;
  top: 2rem;
  transition: 
    top ${({ theme }) => theme.effects.transition.quick},
    font-size ${({ theme }) => theme.effects.transition.quick};

  ${({ isActive, theme }) => isActive && css`
    top: 0;
    font-size: ${theme.font.size.label.tertiary};
  `}
`;

const InputElement = styled.input`
  border: none;
  border-bottom: 
    ${({ theme }) => theme.size.line} 
    solid 
    ${({ theme }) => theme.color.elements.line}; 
  padding: 2rem 0 1rem;
  color: ${({ theme }) => theme.color.text.primary};
  width: 100%;
  transition: 
    border-bottom-color ${({ theme }) => theme.effects.transition.quick};

  &:focus {
    outline: 0;
    border-bottom-color: ${({ theme }) => theme.color.accent.primary.light};
  }
`;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.inputElement = React.createRef();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    this.generatedId = uniqueId();
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  render() {
    const { isFocused } = this.state;
    const {
      value, placeholder, type, name, onChange, required,
    } = this.props;
    const isFilled = value !== '';

    return (
      <InputGroup>
        <InputLabel
          htmlFor={this.generatedId}
          isActive={isFocused || isFilled}
        >
          {placeholder}
        </InputLabel>
        <InputElement
          type={type}
          name={name}
          aria-label={name}
          ref={this.textInput}
          id={this.generatedId}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={onChange}
          isFilled={isFilled}
          value={value}
          required={required}
        />
      </InputGroup>
    );
  }
}

Input.defaultProps = {
  required: false,
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default Input;
