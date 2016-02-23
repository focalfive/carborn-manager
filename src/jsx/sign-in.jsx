import React from 'react';
import Cookie from './utils/cookie';
import { TextField, RaisedButton } from 'material-ui';
import Loading from './loading';


/// SignIn component class
class SignIn extends React.Component {
    
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        
        this.state = {
            username: null,
            password: null,
            errorText: null,
            loading: false
        };
        
        // Bind event
        this.usernameDidChange = this.usernameDidChange.bind(this);
        this.passwordDidChange = this.passwordDidChange.bind(this);
        this.enterKeyDidDown = this.enterKeyDidDown.bind(this);
        this.submitDidTouch = this.submitDidTouch.bind(this);
        this.loginDidFinish = this.loginDidFinish.bind(this);
        this.loginDidFail = this.loginDidFail.bind(this);
    }
    
    componentDidMount() {
    
    }
    
    usernameDidChange(event) {
        var newValues = {username: event.target.value};
        if(this.state.errorText) {
            newValues.errorText = null;
        }
        this.setState(newValues);
    }
    
    passwordDidChange(event) {
        var newValues = {password: event.target.value};
        if(this.state.errorText) {
            newValues.errorText = null;
        }
        this.setState(newValues);
    }
    
    submitDidTouch() {
        this.submit();
    }
    
    enterKeyDidDown() {
        this.submit();
    }
    
    submit() {
        this.setState({loading: true});
        var appId = this.props.appId;
        var apiKey = this.props.apiKey;
        
        var url = 'https://api.parse.com/1/login?username=' + this.state.username + '&password=' + this.state.password;
        $.ajax({
            url: url,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Parse-Application-Id', appId);
                xhr.setRequestHeader('X-Parse-REST-API-Key', apiKey);
                xhr.setRequestHeader('X-Parse-Revocable-Session', '1');
            }
        })
        .done(this.loginDidFinish)
        .fail(this.loginDidFail);
    }
    
    loginDidFinish(response, state) {
        console.log('done', state, response);
        Cookie.set('sessionToken', response.sessionToken);
        
        this.setState({loading: false});
        this.props.onLoginStatusChange.call();
    }
    
    loginDidFail(xhr, state) {
        this.setState({loading: false});
        this.setState({errorText:'Check your login info'});
    }
    
    /**
     * Render view
     */
    render() {
        // Login form
        
        // Loading progress
        var loading = null;
        if(this.state.loading) {
            loading = (<Loading />);
        }
        return (
            <div className="sign-in">
                <TextField
                    ref="username"
                    hintText="ID"
                    floatingLabelText="ID for sign in"
                    errorText={this.state.errorText}
                    onChange={this.usernameDidChange}
                /><br/>
                <TextField
                    ref="password"
                    hintText="Password"
                    floatingLabelText="Password for ID"
                    type="password"
                    errorText={this.state.errorText}
                    onChange={this.passwordDidChange}
                    onEnterKeyDown={this.enterKeyDidDown}
                /><br/>
                <RaisedButton label="Go" secondary={true} onTouchTap={this.submitDidTouch} />
                {loading}
            </div>
        );
    }
    
    /**/
}

export default SignIn;