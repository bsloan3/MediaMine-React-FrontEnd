import React, { Component } from 'react';
import SourceContainer from './NewsComponents/SourceContainer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class NewsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news_sources:[]
    };
  }

  componentDidMount(){
    fetch('https://media-mine-backend.herokuapp.com/users/'+sessionStorage.user_id+'/news/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({news_sources: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className="page_container news-page-container">
        <h1 style={{paddingRight: '5%', paddingTop: '7%', paddingBottom: '2%', color: 'white', textAlign: 'right'}}> News </h1>
        <Tabs>
          <TabList>
          {this.state.news_sources.map(function (source) {
              return (
                <Tab style={{textTransform: 'uppercase'}}> {source} </Tab>
              )
            })}
          </TabList>
            {this.state.news_sources.map(function (source) {
              return (
                <div>
                  <TabPanel>
                    <SourceContainer source={source}/>
                  </TabPanel>
                </div>
              )
            })}
        </Tabs>
      </div>
    );
  }
}
