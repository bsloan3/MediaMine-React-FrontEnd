import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavContainer from './containers/NavContainer';
import Calendar from './containers/Calendar';
import SignupContainer from './containers/SignUpComponents/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import SportsContainer from './containers/SportsContainer';
import MoviesContainer from './containers/MoviesContainer';
import NewsContainer from './containers/NewsContainer';
import GamesContainer from './containers/GamesContainer';
import PodcastsContainer from './containers/PodcastsContainer';
import HomepageContainer from './containers/HomepageContainer';
import MusicContainer from './containers/MusicContainer';
import PodcastContainer from './containers/SignUpComponents/PodcastContainer'
import NewsDisplay from './containers/SignUpComponents/NewsDisplay'
import {BrowserRouter, Route, Router} from 'react-router-dom';
// import UpcomingMovies from './containers/SignUpComponents/UpcomingMovies'
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: [],
      podcastData : {},
    }
  }

  componentDidMount() {
    var movie_events = [];
    var calendar_events = [];
    var user_id = sessionStorage.user_id;
    axios.get('https://media-mine-backend.herokuapp.com/users/' + user_id + '/movies/')
    .then(movie_response => {
      return axios.get('https://media-mine-backend.herokuapp.com/users/' + user_id + '/calendarevents/')
        .then(calendar_response => {
          movie_events = movie_response.data.map(e => {
            return {title: e.movie_name, start: new Date(e.movie_date), end: new Date(e.movie_date)}
          })
          let calendar_events = calendar_response.data.map(e => {
            return {title: e.title, start: new Date(e.start), end: new Date(e.end)}
          })
          this.setState({ events: movie_events.concat(calendar_events)})
        })
    })
  }

  render() {
  if(sessionStorage.length === 0){
    return (
      <BrowserRouter>
        <div>
        <HomepageContainer />
        <Route path='/register' component={SignupContainer} />
        <Route path='/login' component={LoginContainer} />
      </div>
      </BrowserRouter>
      );
    }
    else {
      return(
        <BrowserRouter>
        <div className="App">
          <div className="Nav">
            <Route path='/podcasts' component={PodcastContainer} />
            <Route path='/news' component={NewsDisplay} />
            <Route path='/logout' component={NavContainer} />
            <NavContainer/>
          </div>
          <div className="appbody">

          <div id="Calendar" className="page">
            <Calendar events={this.state.events}/>
          </div>

            <div id="PodcastsContainer">
              <PodcastsContainer/>
            </div>

            <div id="SportsContainer" className="page">
              <SportsContainer/>
            </div>

            <div id="NewsContainer" className="page">
              <NewsContainer/>
            </div>

            <div id="MoviesContainer" className="page">
              <MoviesContainer/>
            </div>

            <div style={{position: 'fixed', bottom: '0', width: '25%', height: '25%'}}>
              <MusicContainer/>
            </div>

            <div id="GamesContainer" className="page">
              <GamesContainer/>
            </div>
          </div>
        </div>
      </BrowserRouter>
      );
    }
  }
}
