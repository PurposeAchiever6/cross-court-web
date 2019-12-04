# Crosscourt Web

## About the app structure

Inside the `src/screens` directory we can find all the app routes with its internal components.

Inside the `src/shared` directory we can find all the components,assets, services, redux stuff that are shared between all the app components

## Before start

You should create a `.env.local` file in the project root directory with the following lines of code inside.

```
REACT_APP_API_URL=https://cross-court-testing.herokuapp.com/api/v1
REACT_APP_URL=http://localhost:3000
```

## Commands

To run the application in development mode

```
yarn install
yarn start
```

To run the production build.

```
yarn install
yarn run build
```

Build files should be located at the `build` directory
