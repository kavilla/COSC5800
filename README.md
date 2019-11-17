# Final Project for COSC5800

Final project to implement an online conference review database system using
Python, Flask, FlaskRestPlus,and with an oracle database as the back end.
Front end was built in ReactJS, which was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

The conference review is given in previous assignments.

### Getting started

* Clone this repo
* Open your desired shell

`How to run the API:`

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
* Open to [http://localhost:5000](http://localhost:5000) to get the swagger page.

`How to run the UI:`

* cd src/app
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
