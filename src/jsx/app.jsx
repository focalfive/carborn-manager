import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Cookie from './utils/cookie';
import Header from './views/header';
import SignIn from './views/sign-in';
import Loading from './views/loading';

injectTapEventPlugin();


/// Main application class
class App extends React.Component {
    
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            appId: 'IvBZLAh4TFKfiG7vewerHgZpuWAjNMHowGSg2PMZ',
            apiKey: 'kJbBe3wvZnh75A1GThWK15M27QomYQZhWxdIDTFO',
            sessionToken: '',
            loginStatus: -1,
            loading: true
        };
        
        this.checkLogin = this.checkLogin.bind(this);
        this.checkLoginDidFinish = this.checkLoginDidFinish.bind(this);
        this.checkLoginDidFail = this.checkLoginDidFail.bind(this);
        this.logoutDidFinish = this.logoutDidFinish.bind(this);
        this.logoutDidFail = this.logoutDidFail.bind(this);
        this.userDidLogin = this.userDidLogin.bind(this);
        this.userDidLogout = this.userDidLogout.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    componentDidMount() {
        
        this.checkLogin();
    }
    
    checkLogin() {
        var appId = this.state.appId;
        var apiKey = this.state.apiKey;
        
        var token = Cookie.get('sessionToken');
        if(token) {
            // Todo check session
            var url = 'https://api.parse.com/1/users/me';
            $.ajax({
                url: url,
                dataType: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-Parse-Application-Id', appId);
                    xhr.setRequestHeader('X-Parse-REST-API-Key', apiKey);
                    xhr.setRequestHeader('X-Parse-Session-Token', token);
                }
            })
            .done(this.checkLoginDidFinish)
            .fail(this.checkLoginDidFail);
        } else {
            this.setState({loginStatus: 0, loading: false});
        }
    }
    
    logout() {
        console.log('logout');
        
        this.setState({loading: true}, this.render);
        
        var appId = this.state.appId;
        var apiKey = this.state.apiKey;
        
        var token = Cookie.get('sessionToken');
        if(token) {
            // Todo logout
            var url = 'https://api.parse.com/1/logout';
            $.ajax({
                url: url,
                dataType: 'json',
                method: 'post',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-Parse-Application-Id', appId);
                    xhr.setRequestHeader('X-Parse-REST-API-Key', apiKey);
                    xhr.setRequestHeader('X-Parse-Session-Token', token);
                }
            })
            .done(this.userDidLogout)
            .fail(this.checkLogin);
        } else {
            this.setState({loginStatus: 0, loading: false});
        }
    }
    
    checkLoginDidFinish(response, state) {
        console.log('success to check login', state, response);
        var token = Cookie.get('sessionToken');
        if(response.sessionToken === token) {
            this.userDidLogin();
        } else {
            this.userDidLogout();
        }
    }
    
    checkLoginDidFail(xhr, state) {
        console.log('fail to check login', state, xhr);
        this.userDidLogout();
    }
    
    logoutDidFinish(response, state) {
        console.log('success to logout', state, response);
        this.userDidLogout();
    }
    
    logoutDidFail(xhr, state) {
        console.log('fail to logout', state, xhr);
        this.checkLogin();
    }
    
    userDidLogin() {
        this.setState({loginStatus: 1, loading: false});
    }
    
    userDidLogout() {
        Cookie.delete('sessionToken');
        this.setState({loginStatus: 0, loading: false});
    }
    
    /**
     * Render view
     */
    render() {
        var loading = null;
        var view = null;
        var isLogin = false;
        
        // Login form
        if(this.state.loginStatus == 0) {
            view = (
                <SignIn
                    appId={this.state.appId}
                    apiKey={this.state.apiKey}
                    onLoginStatusChange={this.checkLogin}
                />
            );
        } else {
            isLogin = true;
            view = this.props.children;
        }
            
        if(this.state.loading) {
            loading = (<Loading />);
        }
        
        return (
            <div className="container">
                <Header onLogout={this.logout} isLogin={isLogin} />
                {loading}
                {view}
            </div>
        );
    }
    
    /**/
}

export default App;