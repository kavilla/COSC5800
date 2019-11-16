# Final Project for CS5800

Final project to implement an online conference review database system using
Python, Flask, FlaskRestPlus,and with an oracle database as the back end.
The conference review is given in previous assignments.

### Getting started

How to run the API:

* Clone this repo
* Open your desired shell
* cd src/api
* [Install python, create and run a virtual environment](https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment) - follow until you get to the part to twilio.
  * Here's my virtual environment name:
  ```
  python -m venv env
  source env/Scripts/activate
  ```
* Install the dependencies by running:
```
pip install -r requirements.txt
```
* Run the API by running:
```
python app.py
```
* Navigate to localhost:5000 to get the swagger page.

This front was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

How to run the UI:

* cd src/app

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

## Authors

* **Kawika Avilla**

## Resources

* [Designing Well-Structured REST APIs with Flask-RestPlus: Part 1](https://medium.com/ki-labs-engineering/designing-well-structured-rest-apis-with-flask-restplus-part-1-7e96f2da8850)
* [How to Build RESTful APIs with Python and Flask](https://www.codementor.io/dongido/how-to-build-restful-apis-with-python-and-flask-fh5x7zjrx)
* [Flask Github](https://github.com/pallets/flask)
