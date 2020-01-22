import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './_components';
import './css/App.css';
import './css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';

class App extends Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-lg-6 col-md-8 col-sm-12 login_main offset-lg-3 offset-md-2 offset-sm-0">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={Home} />
                                <Route path="/login" component={Login} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
