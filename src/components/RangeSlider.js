import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uniqueId from '../utils/uniqueId';

const RangeContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const RangeLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.font.size.label.secondary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0 0 1em;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;

  span {
    color: ${({ theme }) => theme.color.text.secondary};
  }
`;

const RangeInput = styled.input`
  appearance: none;
  width: 100%;
  height: ${({ theme }) => theme.size.line};
  background: ${({ theme }) => theme.color.elements.line};
  outline: none; /* Remove outline */
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%; 
    background: ${({ theme }) => theme.color.accent.secondary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    border-radius: 50%; 
    background: ${({ theme }) => theme.color.accent.secondary};
    cursor: pointer;
  }
`;

const ProgressBar = styled.div`
  height: ${({ theme }) => theme.size.line};
  background: ${({ theme }) => theme.color.accent.secondary};
  width: ${({ width }) => width}%;
  position: absolute;
  bottom: 3px;
`;

class RangeSlider extends Component {
  componentDidMount() {
    this.inputId = uniqueId();
  }

  render() {
    const {
      label, rangeLabels, value, min, max, onChange, name,
    } = this.props;

    return (
      <RangeContainer>
        <RangeLabel
          as="label"
          htmlFor={this.inputId}
        >
          {label}
        </RangeLabel>
        <LabelContainer>
          {rangeLabels.map(text => <span key={text}>{text}</span>)}
        </LabelContainer>
        <RangeInput
          type="range"
          id={this.inputId}
          min={min}
          max={max}
          onChange={onChange}
          value={value}
          name={name}
        />
        <ProgressBar
          width={(min + value) / (max - min) * 100}
        />
      </RangeContainer>
    );
  }
}

RangeSlider.defaultProps = {
  rangeLabels: [],
};

RangeSlider.propTypes = {
  label: PropTypes.string.isRequired,
  rangeLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RangeSlider;
