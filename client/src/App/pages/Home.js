import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: {},
        navigate: false
    };
    this.logout = this.logout.bind(this);  
  }
  componentDidMount() {
    this.setState({ 
        user: JSON.parse(localStorage.getItem('user'))
    });
}
  logout() {
    localStorage.removeItem('user');   
    window.webkit.messageHandlers.logout.postMessage({deleteCache: true});
    this.setState({ navigate :true });
  }

  render() {
    if(this.state.navigate) {
      return <Redirect to={{ pathname: '/login'}} />;
    }
    return (
    <div className="App">
      <input type="hidden" id="token" value={this.state.user} />
      <div className="text-center">      
      <h4>Hi User</h4>
      {/* Link to List.js */}
      
        <button onClick={this.logout} className="btn btn-primary" >
            Logout
        </button>     
        </div>
    </div>
    );
  }
}
export default Home;