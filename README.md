# engineering-project-frontend

## Getting started

### Requirements

* Node.js
* Yarn
* Corresponding back-end application

### Setup

```bash
git clone git@github.com:hejmsdz/engineering-project-frontend.git
cd engineering-project-frontend
yarn
```

### Environment variables

External services are configured using environment variables.
They can also be loaded from a `.env` file.

```text
REACT_APP_API='http://localhost:4000/'
REACT_APP_GOOGLE_MAPS_API_KEY=... # get it from https://console.developers.google.com
```

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
