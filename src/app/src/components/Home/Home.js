import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Home.css';
import './../../App.css';
import PaperService from './../../services/PaperService';
import AuthService from './../../services/AuthService';
import PaperModel from './../../models/Paper';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      papers: [],

      nonFilteredPapers: [],
      toSpecificPaper: false,
      showModal: false,
      paper: {
        title: null,
        filename: null,
        contactauthoremail: null,
        abstract: null,
      },
      currentParticipator: null,
    };

    AuthService.getCurrentParticipator().then(currentParticipator => {
      AuthService.authorizedView();

      this.setState(() => ({
        currentParticipator: currentParticipator,
      }));

      PaperService.getPapers().then(resp => {
        this.setState(() => ({
          papers: resp,
          nonFilteredPapers: resp,
        }));
      });
    });
  }

  handleShowModal = () => {
    this.setState(() => ({
      showModal: true,
    }));
  };

  handleHideModal = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  handleCardClick = paper => {
    PaperService.setSelectedPaper(paper).then(() => {
      this.setState(() => ({
        toSpecificPaper: true,
      }));
    });
  };

  handleSearchChange = event => {
    const filteredPapers = this.state.nonFilteredPapers.filter(
      paper => paper.paperid.toString().indexOf(event.target.value) !== -1,
    );
    this.setState({
      papers: filteredPapers,
    });
  };

  handleChange = event => {
    this.setState({
      paper: {
        ...this.state.paper,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = () => {
    PaperService.createPaper(
      new PaperModel(
        null,
        this.state.paper.title,
        this.state.paper.filename,
        this.state.currentParticipator.email,
        this.state.paper.abstract,
      ),
    )
      .then(papers => {
        this.setState(() => ({
          papers: papers,
          nonFilteredPapers: papers,
          showModal: false,
          paper: {
            title: null,
            filename: null,
            contactauthoremail: null,
            abstract: null,
          },
        }));
      })
      .catch(err => {
        alert(err);
      });
  };

  validateForm() {
    return this.state.paper.title !== null && this.state.paper.filename !== null;
  }

  render() {
    if (this.state.toSpecificPaper) {
      return <Redirect to="/paper" />;
    }

    const searchBar = (
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search by paper ID..."
          className="form-control app-search-bar"
          onChange={this.handleSearchChange}
        />
      </div>
    );

    const paperCards = this.state.papers.map(paper => (
      <div className="card" key={paper.paperid} onClick={() => this.handleCardClick(paper)}>
        <div className="card-top">
          <h3>#{paper.paperid}</h3>
        </div>
        <div className="card-middle">
          <h1>{paper.title}</h1>
        </div>
        <div className="card-bottom">
          <span className="card-bottom-item-small">Contact: {paper.contactauthoremail}</span>
          <span className="card-bottom-item-large">Abstract: {paper.abstract}</span>
        </div>
      </div>
    ));

    const addPaperButton =
      !this.state.isLoading && this.state.currentParticipator !== null && this.state.currentParticipator.isAuthor ? (
        <div className="add-button-container btn-primary" onClick={() => this.handleShowModal()}>
          <span>+</span>
        </div>
      ) : null;

    const addPaperModal = this.state.showModal ? (
      <div className="app-modal-container">
        <div className="app-modal">
          <div className="app-modal-close-button-container">
            <Button className="app-modal-close-button btn-light" onClick={() => this.handleHideModal()}>
              X
            </Button>
          </div>
          <h1>Add a new paper...</h1>
          <div className="app-modal-item">
            <input
              type="text"
              maxLength="50"
              name="title"
              placeholder="Title..."
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="app-modal-item">
            <input
              type="text"
              maxLength="30"
              placeholder="Filename..."
              name="filename"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <textarea
            maxLength="120"
            placeholder="Abstract..."
            className="app-modal-item form-control"
            name="abstract"
            onChange={this.handleChange}
          ></textarea>
          <Button disabled={!this.validateForm()} onClick={() => this.handleSubmit()}>
            Submit
          </Button>
        </div>
      </div>
    ) : null;

    return (
      <div className="home">
        <div>{searchBar}</div>
        <div className="card-container">{paperCards}</div>
        <div>{addPaperButton}</div>
        <div>{addPaperModal}</div>
      </div>
    );
  }
}
