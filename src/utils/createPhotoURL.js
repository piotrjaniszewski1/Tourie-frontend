import noImage from '../assets/no-image.png';

export default (photoReference) => {
  if (!photoReference) {
    return noImage;
  }

  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
};
