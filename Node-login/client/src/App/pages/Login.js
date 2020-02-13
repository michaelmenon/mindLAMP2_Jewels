import React, { Component } from 'react';
import '../css/Login.css';
import logo from "../images/logo.png";
import loader from "../images/loader.gif";

import TextField from '@material-ui/core/TextField';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
            body: JSON.stringify({ username, password }),
           
        };
        return fetch(process.env.REACT_APP_SERVER_URL_LOGINCHECK, requestOptions)
            .then( res =>
                res.json().then(data => {
                    if(data.status == 503) {
                        this.setState({ error: 'No network available !!', loading: false })  
                    } else if(data.status == 403) {
                        this.setState({ error: "Username or password not correct", loading: false })
                    } else {
                        localStorage.setItem('user', JSON.stringify(data.token));   
                        const { from } = this.props.location.state || { from: { pathname: "/" } };
                        window.webkit.messageHandlers.login.postMessage({isLogin: true, token: data.token.substring(6), userId : data.userID});
                        window.location.href = process.env.REACT_APP_LOGIN_REDIRECT + data.token.substring(6);
                    }
                },
                error => this.setState({ error, loading: false })  
            ));   
    }
  
    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <div className="col">
               <div className="logo"><img src={logo} alt="LAMP" /></div>
               <h1>mindLAMP</h1>
               <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <TextField id="outlined-location" className="form-control" label="Server Location" variant="outlined" />
                        <small>Don't enter a server location if you're not sure what this option does.</small>
                    </div>
                    <div className="form-group">
                        <TextField id="outlined-basic" className="form-control" label="ID *" variant="outlined" name="username" value={username} onChange={this.handleChange} />
                        <small>Use your email address to login.</small>
                    {submitted && !username &&
                        <small className="text-danger d-block">Username is required</small>
                    }
                    </div>
                    <div className="form-group">
                        <TextField id="outlined-basic" className="form-control" type="password" label="Password *" variant="outlined" name="password" value={password} onChange={this.handleChange} />
                        <small>Use your password to login.</small>
                    {submitted && !password &&
                         <small className="text-danger d-block">Password is required</small>
                    }
                    </div>
               
                    <div className="row">
                        <div className="col-lg-6">
                            <button className="btn btn-block btn-outline-dark" disabled={loading}>REQUEST ACCESS</button>
                        </div>
                        <div className="col-lg-6">
                            <button className="btn btn-block btn-primary" disabled={loading}>LOGIN</button>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                    {loading &&
                        <img src={loader} alt="Loading" />
                    }
                    
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
            </div>
        );
    }
}
  export default Login;