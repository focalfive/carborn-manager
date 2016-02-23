import React from 'react';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';


/// Loading component class
class Loading extends React.Component {
    
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
            <div className="loading">
                <div className="container">
                    <RefreshIndicator
                        size={50}
                        left={0}
                        top={0}
                        loadingColor={"#FF9800"}
                        status="loading"
                    />
                    Loading
                </div>
            </div>
        );
    }
    
    /**/
}

export default Loading;