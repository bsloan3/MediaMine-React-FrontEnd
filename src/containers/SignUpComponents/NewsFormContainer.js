import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Button} from 'react-bootstrap'

export default class NewsFormContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      sources: [],
      news: {
      outlet_name: '',
      showMe: false
    }
  }
  this.addNews = this.addNews.bind(this)


}

addNews(source){
  debugger
  let my_url = 'https://media-mine-backend.herokuapp.com/users/'+sessionStorage.user_id+'/news';
  let data = {
    user_id: sessionStorage.user_id,
    news: {
      outlet_name: source
      }
    }
  axios.post(my_url, data).then(res => {
    });
  }



  render() {
    let {source} = this.props
    // debugger
    return(
      <div>

          <Button className="btn btn-info btn-xsm add-news-button" onClick={this.addNews.bind(null, source)}>
            <h4>Add</h4>
          </Button>
      </div>

    );
  }
}
