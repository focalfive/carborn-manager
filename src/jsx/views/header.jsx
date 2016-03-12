import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

/// Header component class
class Header extends React.Component {
    
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
    }
    
    /**
     * Render view
     */
    render() {
        // Login form
        var logoutButton = null;
        if(this.props.isLogin) {
            logoutButton = (
                <ul className="nav navbar-nav navbar-right">
                    <li><RaisedButton label="Logout" style={{margin: 7}} onTouchTap={this.props.onLogout} /></li>
                </ul>
            );
        }
        var route = this.props.route;
        if(!route) {
            route = 'home';
        }
        var menu = [
            {
                id: 'home',
                title: 'Home',
                url: '/#/home'
            },
            {
                id: 'list',
                title: 'Menu Hierarchy',
                url: '/#/list'
            },
            {
                id: 'car',
                title: 'Car data',
                url: '/#/car'
            }
        ];
        
        return (
            <nav className="navbar navbar-fixed-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#home">Carborn Manager</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            {menu.map(function(model) {
                                if(route === model.id) {
                                    return (<li key={model.id} className="active"><a href={model.url}>{model.title}</a></li>);
                                } else {
                                    return (<li key={model.id}><a href={model.url}>{model.title}</a></li>);
                                }
                            })}
                        </ul>
                        {logoutButton}
                    </div>
                </div>
            </nav>
        );
    }
    
    /**/
}

export default Header;