import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../utils/CustomPropTypes';
import { authorizedRequest } from '../utils/request';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Button from '../components/Button';
import Navigation from './Navigation';
import { deactivateRoute } from '../actions';
import Section from '../components/Section';
import ScrollingHorizontally from '../components/ScrollingHorizontally';
import SelectableImage from '../components/SelectableImage';
import Statistics from '../components/Statistics';
import Form from '../components/Form';

const mapStateToProps = state => ({
  routeId: state.activeRoute.id,
  routePlaces: state.activeRoute.places,
  routeName: state.activeRoute.name,
  startTime: state.activeRoute.startTime,
});

const mapDispatchToProps = dispatch => ({
  onRouteFinish: () => dispatch(deactivateRoute()),
});

class FinishTourScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favouritePlaceId: null,
    };

    this.timeTraveled = this.computeTravelTime();

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  computeTravelTime() {
    const { startTime } = this.props;
    return Math.floor((Date.now() - startTime) / 60000);
  }

  handleImageClick(id) {
    this.setState({
      favouritePlaceId: id,
    });
  }

  async handleSubmit(onEnd) {
    const { onRouteFinish, routeId } = this.props;
    const { favouritePlaceId } = this.state;

    try {
      await authorizedRequest(`routes/${routeId}/finish`, {
        method: 'POST',
      });
    } catch (error) {
      console.error(error);
    }

    if (favouritePlaceId === null) {
      onEnd();
      onRouteFinish();
      return;
    }

    try {
      await authorizedRequest('places/favorites', {
        method: 'POST',
        body: { id: favouritePlaceId },
      });
    } catch (error) {
      console.error(error);
    } finally {
      onEnd();
      onRouteFinish();
    }
  }

  render() {
    const { routePlaces, routeName } = this.props;
    const { favouritePlaceId } = this.state;

    return (
      <Layout spanned light elongated>
        <Title>
          Congratulations!
          <br />
          {`You have finished ${routeName}.`}
        </Title>
        <Form
          onSubmit={this.handleSubmit}
          elements={(
            <>
              <Section>
                <h2>Pick your favourite place</h2>
                <ScrollingHorizontally>
                  {routePlaces.map(({ id, photo }) => (
                    <SelectableImage
                      key={id}
                      id={id}
                      src={photo}
                      selected={id === favouritePlaceId}
                      onClick={this.handleImageClick}
                    />
                  ))}
                </ScrollingHorizontally>
              </Section>
              <Section>
                <h2>Statistics</h2>
                <Statistics
                  primary={{
                    value: routePlaces.length,
                    total: routePlaces.length,
                    title: 'Visited places',
                    text: 'Number of all places you have visited during this tour.',
                  }}
                  secondary={[
                    {
                      value: this.timeTraveled,
                      label: 'minutes traveled',
                    },
                  ]}
                />
              </Section>
            </>
          )}
          buttons={[
            <Button
              as="input"
              type="submit"
              primary
              value="Awesome!"
            />,
          ]}
        />
        <Navigation />
      </Layout>
    );
  }
}

FinishTourScreen.propTypes = {
  routeId: PropTypes.string.isRequired,
  routePlaces: CustomPropTypes.routePlaces.isRequired,
  routeName: PropTypes.string.isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  onRouteFinish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishTourScreen);
