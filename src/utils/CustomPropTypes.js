import PropTypes from 'prop-types';
import { MAP_MODE, LIST_MODE } from './tourModes';

const CustomPropTypes = {};

CustomPropTypes.history = PropTypes.shape({
  push: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
});

CustomPropTypes.categories = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
);

CustomPropTypes.location = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
});

CustomPropTypes.route = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placesCount: PropTypes.number.isRequired,
  lastFinishedAt: PropTypes.string,
  sharedBy: PropTypes.string,
  photoReference: PropTypes.string,
});

CustomPropTypes.routePlaces = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    photoReference: PropTypes.string,
    website: PropTypes.string,
    categories: CustomPropTypes.categories,
    location: CustomPropTypes.location,
  }),
);

CustomPropTypes.tourMode = PropTypes.oneOf([
  MAP_MODE, LIST_MODE,
]);

export default CustomPropTypes;
