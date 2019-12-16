# Final Project for COSC5800

Final project to implement an online conference review database system using
Python, Flask, FlaskRestPlus, and with an oracle database as the back end.
Front end was built in ReactJS, which was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

The conference review is given in previous assignments.

Demo video:

[![Demo Video](https://i.ytimg.com/vi/V6kkCs0MNLQ/hqdefault.jpg)](https://youtu.be/V6kkCs0MNLQ)

Setup video:

[![Setup Video](https://i.ytimg.com/vi/YoyEKSLo16s/hqdefault.jpg)](https://www.youtube.com/watch?v=YoyEKSLo16s)


### Getting started

* Clone this repo
* Open your desired shell
* [Install Oracle Client](https://oracle.github.io/odpi/doc/installation.html#windows)
  * Or cd src/api and unzip the instantclient_19_3 to current the direction
* Add the location of instantclient_19_3 to your environment system variables with the trailing slash for the Path variable
  * For me: C:\{path_to_project}\COSC5800\src\api\instantclient_19_3\

`How to run the API:`

* If you haven't already cd src/api
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
  * If you run into an error saying cx-Oracle could not be installed you need to install from [here](https://visualstudio.microsoft.com/thank-you-for-downloading-visual-studio-for-cplusplus/?sku=Community&rel=16&rid=30005)
* Run the API by running:
  ```
  python app.py
  ```
* Open to [http://localhost:5000](http://localhost:5000) to get the swagger page.

`How to run the UI:`

* cd src/app
* Install the dependencies
  ```
  npm install
  ```
* Fix in npm issues if it says to
  ```
  npm audit fix
  ```
* Run the app in development mode
  ```
  npm start
  ```
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
* Launch test runner in interactive watch mode
  ```
  npm test
  ```
* Build the app minified to the build folder.
  ```
  npm run build
  ```

## Authors

* **Kawika Avilla**

## Resources

* [Designing Well-Structured REST APIs with Flask-RestPlus: Part 1](https://medium.com/ki-labs-engineering/designing-well-structured-rest-apis-with-flask-restplus-part-1-7e96f2da8850)
* [How to Build RESTful APIs with Python and Flask](https://www.codementor.io/dongido/how-to-build-restful-apis-with-python-and-flask-fh5x7zjrx)
* [Flask Github](https://github.com/pallets/flask)
* [Running React tests](https://facebook.github.io/create-react-app/docs/running-tests)
* [Deploying React app](https://facebook.github.io/create-react-app/docs/deployment)
* [Code Splitting in React](https://facebook.github.io/create-react-app/docs/code-splitting)
* [Analyzing the Bundle Size in React](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
* [Making a Progressive Web App in React](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
* [Advanced Configuration in React](https://facebook.github.io/create-react-app/docs/advanced-configuration)
* [Mocks](https://app.moqups.com/dPCEae4MLG/edit/page/a1b990b30)
* [Getting started with React Router](https://codeburst.io/getting-started-with-react-router-5c978f70df91)
