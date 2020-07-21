import React, {Component} from 'react';
import {SwapiServiceProvider} from '../swapi-service-context';
import ErrorBoundry from '../error-boundry'; 
import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage, StarshipPage, PlanetPage, SecretPage, LoginPage } from '../pages'; 
import SwapiService from '../../services/swapi-service'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './app.css';
import { StarshipDetails } from '../sw-components';


export default class App  extends Component {
  

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false 
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }


  componentDidCatch() {
    this.setState({ hasError: true }); 
  }

  render() {

    const { isLoggedIn } = this.state; 

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app" >
              <Header/>
              <RandomPlanet />

              <Switch>
                <Route path="/" render={ () => <h2>Welcome to star DB</h2> } exact />
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets" component={PlanetPage}/>
                <Route path="/starships" exact component={StarshipPage} />
                <Route path="/planets" component={PlanetPage}/>
                <Route path="/starships" exact component={StarshipPage} />

                <Route path="/starships/:id" 
                      render={ ( { match } ) => {
                                  const { id } = match.params; 
                                  return <StarshipDetails itemId={id}/> 
                                }
                      } /> 
                <Route path="/login" 
                    render={ () => (
                      <LoginPage 
                        isLoggedIn={isLoggedIn}
                        onLogin={this.onLogin}
                      />
                    )}/>
                <Route path="/secret" 
                  render={ () => (
                    <SecretPage isLoggedIn={isLoggedIn} />
                  )}/>

                <Route render={()=> <h2>Page Not Found</h2>} />
              </Switch>


            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }


}