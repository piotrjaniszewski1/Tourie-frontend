import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Card from './Card';
import Subtitle from './Subtitle';
import ImageWithFallback from './ImageWithFallback';
import IconLabel from './IconLabel';
import monument from '../assets/monument.svg';
import person from '../assets/person.svg';
import time from '../assets/time.svg';

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo('en-US');

const RoutePreview = ({
  name, photo, placesCount, lastFinishedAt, sharedBy,
}) => (
  <Card insertLeft={<ImageWithFallback src={photo} alt={name} />}>
    <Subtitle>{name}</Subtitle>
    <IconLabel src={monument} alt="Number of places">{placesCount}</IconLabel>
    {lastFinishedAt && (
      <IconLabel src={time} alt="Last Finished">
        {timeAgo.format(new Date(lastFinishedAt))}
      </IconLabel>
    )}
    {sharedBy && <IconLabel src={person} alt="Shared by" block>{sharedBy}</IconLabel>}
  </Card>
);

RoutePreview.defaultProps = {
  sharedBy: null,
  lastFinishedAt: null,
};

RoutePreview.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastFinishedAt: PropTypes.string,
  placesCount: PropTypes.number.isRequired,
  sharedBy: PropTypes.string,
};

export default RoutePreview;
