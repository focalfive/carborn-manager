import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Cars from './cars';


/// CarView component class
class CarView extends React.Component {
    
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
            <div className="car">
                <h1>Car</h1>
                <Cars />
            </div>
        );
    }
    
    /**/
}

export default CarView;