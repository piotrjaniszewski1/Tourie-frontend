import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SpeechRecognition from 'react-speech-recognition';
import MicrophoneIcon from './icons/MicrophoneIcon';
import SearchIcon from './icons/SearchIcon';

const SearchWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    height: 2rem;
    width: auto;
    top: 50%;
    margin-left: 1rem;
    transform: translateY(-50%);
  }
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: 
    ${({ theme }) => theme.size.line} 
    solid 
    ${({ theme }) => theme.color.elements.line}; 
  box-sizing: border-box;
  padding: 1rem;
  padding-left: 3.5rem;
  color: ${({ theme }) => theme.color.text.primary};
  width: 100%;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  &:focus {
    outline: 0;
  }
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '' };

    this.inputElement = React.createRef();
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTranscript = this.handleTranscript.bind(this);
  }

  componentDidMount() {
    const {
      recognition, language, stopListening, browserSupportsSpeechRecognition, onChange,
    } = this.props;
    const { previousTranscript } = this.state;
    if (browserSupportsSpeechRecognition) recognition.lang = language;
    stopListening();

    this.finalTranscript = '';
    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const tmpTranscript = event.results[i][0].transcript;
        if (event.results[i].isFinal) this.finalTranscript += `${tmpTranscript} `;
        else interimTranscript += tmpTranscript;
      }

      if (previousTranscript !== interimTranscript) {
        clearTimeout(window.transcriptTimer);
        window.transcriptTimer = setTimeout(() => {
          onChange(this.finalTranscript);
          stopListening();
        }, process.env.REACT_APP_QUERY_TIMEOUT || 1700);
      }

      this.setState({
        previousTranscript: interimTranscript,
        query: interimTranscript.trim() ? interimTranscript : this.finalTranscript,
      });
    };
  }

  toggleMicrophone() {
    const {
      resetTranscript, listening, stopListening, startListening, recognition, transcript, onChange,
    } = this.props;
    recognition.interimResults = true;
    if (listening) {
      onChange(transcript);
      stopListening();
    } else {
      resetTranscript();
      startListening();
      this.finalTranscript = '';
      this.handleTranscript();
    }
  }

  handleTranscript() {
    const {
      stopListening,
    } = this.props;

    window.transcriptTimer = setTimeout(() => {
      stopListening();
    }, process.env.REACT_APP_QUERY_TIMEOUT || 1700);
  }

  handleChange(e) {
    const { onChange, stopListening } = this.props;
    const newQuery = e.target.value || '';
    this.setState({ query: newQuery }, () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        onChange(newQuery);
        stopListening();
      }, process.env.REACT_APP_QUERY_TIMEOUT || 1800);
    });
  }

  render() {
    const {
      placeholder,
      required,
      listening,
      browserSupportsSpeechRecognition,
    } = this.props;
    const { query } = this.state;

    return (
      <SearchWrapper>
        {browserSupportsSpeechRecognition ? (
          <MicrophoneIcon
            onClick={this.toggleMicrophone}
            active={listening}
          />) : <SearchIcon />
        }
        <SearchInput
          aria-label="Search"
          ref={this.textInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={query}
          required={required}
          placeholder={placeholder}
        />
      </SearchWrapper>
    );
  }
}

SearchBar.defaultProps = {
  required: false,
  language: 'en-US',
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  language: PropTypes.string,
  transcript: PropTypes.string.isRequired,
  resetTranscript: PropTypes.func.isRequired,
  browserSupportsSpeechRecognition: PropTypes.bool.isRequired,
  startListening: PropTypes.func.isRequired,
  stopListening: PropTypes.func.isRequired,
  listening: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  recognition: PropTypes.shape({
    continuous: PropTypes.bool,
    grammars: PropTypes.shape({
      length: PropTypes.number,
    }),
    interimResults: PropTypes.bool,
    lang: PropTypes.string,
    maxAlternatives: PropTypes.number,
    onaudioend: PropTypes.func,
    onaudiostart: PropTypes.func,
    onend: PropTypes.func,
    onerror: PropTypes.func,
    onnomatch: PropTypes.func,
    onresult: PropTypes.func,
    onsoundend: PropTypes.func,
    onsoundstart: PropTypes.func,
    onspeechend: PropTypes.func,
    onspeechstart: PropTypes.func,
    onstart: PropTypes.func,
  }),
};

export default SpeechRecognition(SearchBar);
