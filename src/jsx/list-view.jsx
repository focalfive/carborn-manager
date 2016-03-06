import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';
import Loading from './loading';


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
            parentLink: null,
            parentDidLoad: false,
            listDidLoad: false,
            list: []
        };
        
        this.loadParentDidSuccess = this.loadParentDidSuccess.bind(this);
        this.loadParentDidFinish = this.loadParentDidFinish.bind(this);
        this.loadListDidSuccess = this.loadListDidSuccess.bind(this);
        this.loadListDidFinish = this.loadListDidFinish.bind(this);
    }
    
    /**
     * Component did mount handler
     */
    componentDidMount() {
        console.log('componentDidMount');
/*         this.loadList(); */
    }
    
    componentWillReceiveProps (props) {
        console.log('componentWillReceiveProps', props);
/*         this.loadList(); */
		this.setState({
			parentId: props.parentId,
			parentName: null,
			parentLink: null,
			parentDidLoad: false,
			listDidLoad: false
		}, function() {
			this.loadList();
		});
    }
    
    /**
     * Load parent
     */
    loadParent(id) {
        
        var appId = this.props.appId;
        var apiKey = this.props.apiKey;
        
        var url = 'https://api.parse.com/1/classes/list/' + id;
        
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Parse-Application-Id', appId);
                xhr.setRequestHeader('X-Parse-REST-API-Key', apiKey);
            }
        })
        .done(this.loadParentDidSuccess)
        .fail(this.loadParentDidFail)
        .always(this.loadParentDidFinish);
    }
    
    loadParentDidFinish() {
    	this.setState({
    		parentDidLoad: true
    	});
    }
    
    loadParentDidSuccess(response, state) {
        console.log(state, response);
        var grandParent = response.parent;
        var parentLink = null;
        if(grandParent) {
        	if(grandParent === 'root') {
        		parentLink = '#list';
        	} else {
	        	parentLink = '#list/' + grandParent;
        	}
        }
        this.setState({parentName: response.name, parentLink: parentLink});
    }
    
    loadParentDidFail(xhr, state) {
        console.log(state, xhr);
    }
    
    /**
     * Load list
     */
    loadList() {
        
        var appId = this.props.appId;
        var apiKey = this.props.apiKey;
        var parent = this.state.parentId;
        console.log('loadList', parent);
        if(parent) {
        	this.loadParent(parent);
        } else {
            parent = 'root';
            this.loadParentDidFinish();
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
        .done(this.loadListDidSuccess)
        .fail(this.loadListDidFail)
        .always(this.loadListDidFinish);
    }
    
    loadListDidFinish() {
    	this.setState({
    		listDidLoad: true
    	});
    }
    
    loadListDidSuccess(response, state) {
        console.log(state, response);
        this.setState({list: response.results});
    }
    
    loadListDidFail(xhr, state) {
        console.log(state, xhr);
    }
    
    listDidSelect(objectId) {
    	console.log(objectId);
    	location.href = '#list/' + objectId;
    }
    
    addListDidSelect() {
    	console.log('addCarDidSelect');
    }
    
    addCarDidSelect() {
    	console.log('addCarDidSelect');
    }
    
    /**
     * Render view
     */
    render() {
        var collection = this.state.list;
        var listDidSelectHandler = this.listDidSelect;
        var parentLinkButton = null;
        if(this.state.parentLink) {
        	parentLinkButton = (
            	<FlatButton label="< Parent" linkButton={true} href={this.state.parentLink} />
	        );
        }
        
        var loading = null;
        console.log('render', this.state.parentDidLoad, this.state.listDidLoad);
        if(!this.state.parentDidLoad || !this.state.listDidLoad) {
            loading = (<Loading />);
        }
        const iconButtonElement = (
			<IconButton
				touch={true}
				tooltip="more"
				tooltipPosition="bottom-left"
			>
				<MoreVertIcon color={Colors.grey400} />
			</IconButton>
		);
        return (
            <div className="list">
                <h1>List</h1>
                {loading}
                {parentLinkButton}
                <List>
                    {collection.map(function(model) {
				        const rightIconMenu = (
							<IconMenu iconButtonElement={iconButtonElement}>
								<MenuItem onTouchTap={listDidSelectHandler.bind(this, model.objectId)}>Go</MenuItem>
								<MenuItem>Edit</MenuItem>
								<MenuItem>Delete</MenuItem>
							</IconMenu>
						);
                        return (
                            <ListItem
                            	key={model.objectId}
                            	primaryText={model.name}
                            	onTouchTap={listDidSelectHandler.bind(this, model.objectId)}
                            	rightIconButton={rightIconMenu} />
                        );
                    })}
                </List>
                <TextField
                	ref="inputListNameToAdd"
					hintText="List name"
					floatingLabelText="Insert a list"
				/>
                <RaisedButton label="Add list" secondary={true} onTouchTap={this.addListDidSelect} />
                <br />
                <TextField
                	ref="inputCarNameToAdd"
					hintText="Car name"
					floatingLabelText="Insert a car"
				/>
                <RaisedButton label="Add car" secondary={true} onTouchTap={this.addCarDidSelect} />
            </div>
        );
    }
    
    /**/
}

export default ListView;