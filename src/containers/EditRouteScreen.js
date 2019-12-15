import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import mapEventToState from '../utils/mapEventToState';
import CustomPropTypes from '../utils/CustomPropTypes';
import sortableElementClass from '../styles/helperClasses';
import Layout from '../components/Layout';
import Form from '../components/Form';
import Input from '../components/Input';
import Title from '../components/Title';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import PlacePreview from '../components/PlacePreview';
import SortableList from '../components/SortableList';
import {
  removeFromStagedRoute,
  moveItemInStagedRoute,
  activateRoute,
} from '../actions/index';
import { authorizedRequest } from '../utils/request';

const mapStateToProps = state => ({
  routePlaces: state.stagedRoute.places,
  routeName: state.stagedRoute.name,
});

const mapDispatchToProps = dispatch => ({
  onItemRemove: index => dispatch(removeFromStagedRoute(index)),
  onItemMove: (oldIndex, newIndex) => dispatch(moveItemInStagedRoute(oldIndex, newIndex)),
  onTourStart: (id, name, places) => dispatch(activateRoute(id, name, places)),
});

class EditRouteScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.routeName,
      errorMessage: '',
    };

    this.handleChange = mapEventToState.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSortEnd({ oldIndex, newIndex }) {
    const { onItemMove } = this.props;
    onItemMove(oldIndex, newIndex);
  }

  handleItemRemove(index) {
    const { onItemRemove, routePlaces } = this.props;

    if (routePlaces.length === 1) {
      this.setState({
        errorMessage: 'There has to be at least one place in the route.',
      });
    } else {
      onItemRemove(index);
    }
  }

  async handleSubmit(onEnd, button) {
    const {
      routePlaces, history, onTourStart,
    } = this.props;
    const { name } = this.state;
    const places = routePlaces.map(({ id }) => id);

    const { id } = await authorizedRequest('routes', {
      method: 'POST',
      body: { name, places },
    });

    await authorizedRequest(`routes/${id}`);

    if (button === 'Start Touring') {
      onTourStart(id, name, routePlaces);
      onEnd();
      history.push('/tour');
    } else {
      onEnd();
      history.push('/routes');
    }
  }

  render() {
    const { routeName, routePlaces, history } = this.props;
    const { name, errorMessage } = this.state;

    const isTargetLink = e => e.target.tagName.toLowerCase() === 'a';

    if (!routePlaces) {
      return <Redirect to="/new-route" />;
    }

    return (
      <Layout narrow>
        <BackButton history={history} />
        <Title>{`Editing ${routeName}`}</Title>
        <SortableList
          lockAxis="y"
          pressDelay={200}
          helperClass={sortableElementClass}
          onSortEnd={this.handleSortEnd}
          shouldCancelStart={isTargetLink}
        >
          {routePlaces.map((place, index) => (
            <PlacePreview
              onDelete={() => this.handleItemRemove(index)}
              key={place.id}
              {...place}
              position={index + 1}
            />
          ))}
        </SortableList>
        <Form
          onSubmit={this.handleSubmit}
          elements={(
            <Input
              required
              type="text"
              name="name"
              placeholder="Route name"
              onChange={this.handleChange}
              value={name}
            />
          )}
          errorMessage={errorMessage}
          buttons={[
            <Button
              as="input"
              type="submit"
              value="Save"
              secondary
            />,
            <Button
              as="input"
              type="submit"
              value="Start Touring"
              primary
            />,
          ]}
        />
      </Layout>
    );
  }
}

EditRouteScreen.propTypes = {
  routePlaces: CustomPropTypes.routePlaces.isRequired,
  routeName: PropTypes.string.isRequired,
  history: CustomPropTypes.history.isRequired,
  onTourStart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRouteScreen);
