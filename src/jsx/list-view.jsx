import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListItemView from './list-item-view';


/// ListView component class
class ListView extends React.Component {
    
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        
        this.state = {
            parentId: null,
            parentName: null,
            list: []
        };
        
        this.loadListDidFinish = this.loadListDidFinish.bind(this);
        this.listDidSelect = this.listDidSelect.bind(this);
    }
    
    /**
     * Component did mount handler
     */
    componentDidMount() {
        console.log('componentDidMount');
        this.loadList();
    }
    
    /**
     * Load list
     */
    loadList() {
        
        var appId = this.props.appId;
        var apiKey = this.props.apiKey;
        var parent = this.state.parentId;
        if(!parent) {
            parent = 'root';
        }
        
        var url = 'https://api.parse.com/1/classes/list/';
        var data = 'where=' + JSON.stringify({parent: parent});
        
        $.ajax({
            url: url,
            method: 'GET',
            data: data,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Parse-Application-Id', appId);
                xhr.setRequestHeader('X-Parse-REST-API-Key', apiKey);
            }
        })
        .done(this.loadListDidFinish)
        .fail(this.loadListDidFail);
    }
    
    loadListDidFinish(response, state) {
        console.log(state, response);
        this.setState({list: response.results});
    }
    
    loadListDidFail(xhr, state) {
        console.log(state, xhr);
    }
    
    listDidSelect(event, key) {
        var objectId = event.currentTarget.props.objectId;
        var name = event.currentTarget.props.name;
        if(objectId) {
            this.setState({parentId: objectId, parentName: name, list: []}, this.loadList);
        }
    }
    
    /**
     * Render view
     */
    render() {
        var listDidSelectHandler = this.listDidSelect;
        var collection = [];
        if(this.state.parentId) {
            var label = '< ' + this.state.parentName;
            collection.push({
                objectId: this.state.parentId,
                name: '..'
            });
        }
        collection = collection.concat(this.state.list);
        console.log(collection);
        return (
            <div className="list">
                <h1>List</h1>
                <List>
                    {collection.map(function(model) {
                        return (
                            <ListItemView key={model.objectId} objectId={model.objectId} name={model.name} onTouchTap={listDidSelectHandler} />
                        );
                    })}
                </List>
                <RaisedButton label="Add list" primary={true} />
                <br />
                <br />
                <RaisedButton label="Add car" primary={true} />
            </div>
        );
    }
    
    /**/
}

export default ListView;