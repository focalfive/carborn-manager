import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


/// Main application class
class App extends React.Component {
    
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
        return (
            <div>
                Hello project
            </div>
        );
    }
    
    /**/
}

export default App;