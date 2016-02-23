import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';


/// Home component class
class Home extends React.Component {
    
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
        return (
            <div className="home">
                <h1>This is Carborn Manager service</h1>
                <hr />
                <RaisedButton href="#list" label="Manage Menu Hierarchy" linkButton={true} secondary={true} />
                <br />
                <br />
                <RaisedButton href="#car" label="Manage Car Specs" linkButton={true} secondary={true} />
            </div>
        );
    }
    
    /**/
}

export default Home;