import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';


/// ListItemView component class
class ListItemView extends React.Component {
    
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        
        this.listDidSelect = this.listDidSelect.bind(this);
    }
    
    /**
     * List did select handler
     */
    listDidSelect(event) {
        event.currentTarget = this;
        this.props.onTouchTap.call(this, event);
    }
    
    /**
     * Render view
     */
    render() {
        return (
            <ListItem key={this.props.objectId} primaryText={this.props.name} onTouchTap={this.listDidSelect} />
        );
    }
    
    /**/
}

export default ListItemView;