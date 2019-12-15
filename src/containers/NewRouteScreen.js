import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../utils/CustomPropTypes';
import mapEventToState from '../utils/mapEventToState';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Form from '../components/Form';
import Title from '../components/Title';
import BackButton from '../components/BackButton';
import { LabelTag } from '../components/LabelTag';
import Section from '../components/Section';
import RangeSlider from '../components/RangeSlider';
import Request from '../components/Request';
import createPhotoURL from '../utils/createPhotoURL';
import { authorizedRequest } from '../utils/request';

import { stageRoute } from '../actions';

class NewRouteScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: {},
      priceLevel: '1',
      durationIndex: '0',
      errorMessage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSliderChange = mapEventToState.bind(this);
  }

  handleCategorySelect(id) {
    const { selectedCategories } = this.state;

    const newSelectedCategories = { ...selectedCategories };
    if (selectedCategories[id]) {
      delete newSelectedCategories[id];
    } else {
      newSelectedCategories[id] = true;
    }

    this.setState({
      selectedCategories: newSelectedCategories,
    });
  }

  async handleSubmit(onEnd) {
    const { onRouteGenerated, durationValues, history } = this.props;
    const { selectedCategories, priceLevel, durationIndex } = this.state;

    const categories = Object.keys(selectedCategories);
    const duration = durationValues[durationIndex];

    if (categories.length === 0) {
      this.setState({ errorMessage: 'Please select at least one category' });
      onEnd();
      return;
    }

    const { name, places } = await authorizedRequest('routes/generate', {
      method: 'POST',
      body: { categories, priceLevel, duration },
    });

    places.forEach((place) => {
      place.photo = createPhotoURL(place.photoReference);
    });

    onEnd();
    onRouteGenerated(name, places);
    history.push('/new-route/customize');
  }

  durationValuesLabels() {
    const { durationValues } = this.props;
    return durationValues.filter((_, i) => i % 2 === 0).map(number => `${number}h`);
  }

  render() {
    const {
      errorMessage, selectedCategories, priceLevel, durationIndex,
    } = this.state;
    const { history, durationValues } = this.props;

    return (
      <Layout narrow>
        <BackButton history={history} />
        <Title>New Route</Title>
        <Form
          requiresOnline
          onSubmit={this.handleSubmit}
          elements={(
            <>
              <Section>
                <h2>Select categories</h2>
                <Request
                  inner
                  path="categories"
                  cacheFirst
                  render={({ categories }) => categories.map(({ id, name }) => (
                    <LabelTag
                      aria-label={name}
                      key={id}
                      active={selectedCategories[id]}
                      onClick={() => this.handleCategorySelect(id)}
                    >
                      {name}
                    </LabelTag>
                  ))}
                />
              </Section>
              <Section>
                <RangeSlider
                  label="Price level"
                  name="priceLevel"
                  rangeLabels={['$', '$$', '$$$', '$$$$']}
                  min={0}
                  max={3}
                  value={priceLevel}
                  onChange={this.handleSliderChange}
                />
              </Section>
              <Section>
                <RangeSlider
                  label="Duration"
                  name="durationIndex"
                  rangeLabels={this.durationValuesLabels()}
                  min={0}
                  max={durationValues.length - 1}
                  value={durationIndex}
                  onChange={this.handleSliderChange}
                />
              </Section>
            </>
          )}
          errorMessage={errorMessage}
          buttons={[
            <Button
              as="input"
              type="submit"
              value="Generate route"
              primary
            />,
          ]}
        />
      </Layout>
    );
  }
}

NewRouteScreen.defaultProps = {
  durationValues: [1, 1.5, 2, 3, 5, 6, 8, 10, 12],
};

NewRouteScreen.propTypes = {
  history: CustomPropTypes.history.isRequired,
  durationValues: PropTypes.arrayOf(PropTypes.number),
  onRouteGenerated: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onRouteGenerated: (name, places) => dispatch(stageRoute(name, places)),
});

export default connect(null, mapDispatchToProps)(NewRouteScreen);
