# Crosscourt Web

## About the app structure

Inside the `src/screens` directory we can find all the app routes with its internal components.

Inside the `src/shared` directory we can find all the components,assets, services, redux stuff that are shared between all the app components

## Before start

You should create a `.env.local` file in the project root directory with the following lines of code inside.

```
REACT_APP_API_URL=https://cross-court-testing.herokuapp.com/api/v1
REACT_APP_URL=http://localhost:3000

REACT_APP_GOOGLE_ANALYTICS_CODE=UA-111654318-1
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyDLr9IoxSVY-V0lN_Z7-EDjFWei2F6a55Y
REACT_APP_STRIPE_API_KEY=pk_test_ruSiCBKu2EJm5li5MQ69Q5h900wyV2yYKw

REACT_APP_SO_APPLICANT_LINK=https://crosscourt.bamboohr.com/jobs/view.php?id=21
REACT_APP_SEM_APPLICANT_LINK=https://crosscourt.bamboohr.com/jobs/view.php?id=21

REACT_APP_FACEBOOK_LINK=https://www.facebook.com/CrossCourtBall/
REACT_APP_TWITTER_LINK=https://twitter.com/crosscourtball
REACT_APP_INSTAGRAM_LINK=https://instagram.com/crosscourt
REACT_APP_LINKEDIN_LINK=https://www.linkedin.com/in/crosscourt-basketball-42539b162
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
