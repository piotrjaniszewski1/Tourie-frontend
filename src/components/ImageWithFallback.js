import React from 'react';
import PropTypes from 'prop-types';
import noImage from '../assets/no-image.png';

class ImageWithFallback extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: false };
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { src, alt, ...rest } = this.props;
    const source = error ? noImage : src;
    return (<img src={source} alt={alt} {...rest} onError={this.handleError} />);
  }
}

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageWithFallback;
