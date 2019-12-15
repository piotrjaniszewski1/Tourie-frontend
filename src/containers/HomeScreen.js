import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import FloatingActionButton from '../components/FloatingActionButton';
import Navigation from './Navigation';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import bannerBackground from '../assets/banner-background.png';
import precache from '../utils/precache';
import RemoteActionHandler from './RemoteActionHandler';

const mapStateToProps = state => ({
  userName: state.userName,
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(query) {
    this.setState({ query });
  }

  componentDidMount() {
    precache();
  }

  render() {
    const { userName } = this.props;
    const { query } = this.state;

    return (
      <>
        <Banner image={bannerBackground} title={`Hello,\n${userName}!`}>
          <SearchBar
            name="query"
            placeholder="What would you like me to do?"
            onChange={this.handleQuery}
          />
        </Banner>
        <Layout spanned light elongated />
        <FloatingActionButton to="/new-route" name="New route" />
        <Navigation />
        <RemoteActionHandler query={query} />
      </>
    );
  }
}

HomeScreen.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HomeScreen);
