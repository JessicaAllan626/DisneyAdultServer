# Disney Drinking App 

Disney Drinking Application
Jessica Allan - 2021

## Mission Statement

This app is for Disney Adults who love to go to Disney World and drink! When I worked at Disney, I spent many of my days off drinking in the parks with my friends. An app like this will allow the Disney Adult community to rate and review drinks and share their experiences with others. 


## My server endpoints 

### Users 
    • POST/user/register   	    	 Registers new user account
    • POST/user/login                Logs in a user

### Reviews
    • GET/reviews/mine               Get all my reviews
    • POST /reviews/create           Create new review
    • PUT/reviews/update/:entryId    Update review
    • DELETE/reviews/delete/:id   	 Deletes review

### Drinks
    • GET/drinks/mine                Get all drinks
    • POST /drinks/create        	 Create a new drink
    • PUT/drinks/update/:entryId     Update a drink
    • DELETE/drinks/delete/:id  	 Deletes a drink

## Access Role
    • User = 'User',

## Helpers • Environment

### Utilizing Local Host
    • [http://localhost:3000]

# Project Built with Create React App & TypeScript Template

[Create React App](https://github.com/facebook/create-react-app)

[TypeScript](https://www.typescriptlang.org/)

## Scripts

### `npm start`

Runs the app in the development mode.\
Uses [http://localhost:3000]

The page will reload if you make edits.\
You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Dev Dependencies
    • "@types/react-router-dom": "^5.3.2"

## Dependencies

    • "@material-ui/core": "^4.12.3",
    • "@testing-library/jest-dom": "^5.15.1",
    • "@testing-library/react": "^11.2.7",
    • "@testing-library/user-event": "^12.8.3",
    • "@types/jest": "^26.0.24",
    • "@types/node": "^12.20.37",
    • "@types/react": "^17.0.37",
    • "@types/react-dom": "^17.0.11",
    • "@types/react-native": "^0.66.6",
    • "bootstrap": "^5.1.3",
    • "radium": "^0.26.1",
    • "react": "^17.0.2",
    • "react-dom": "^17.0.2",
    • "react-router-dom": "^6.0.2",
    • "react-scripts": "4.0.3",
    • "reactstrap": "^9.0.1",
    • "typescript": "^4.5.2",
    • "web-vitals": "^1.1.2"
