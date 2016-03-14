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
import CreateNewFolderIcon from 'material-ui/lib/svg-icons/file/create-new-folder';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import Loading from './loading';
import Cars from './cars';


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
            list: [],
            folderCreateDialogOpen: false,
            folderCreateDialogLoading: false,
            folderCreateDialogInputNameErrorMessage: null,
            folderCreateDialogInputNameValue: '',
            carAddDialogOpen: false,
            carAddDialogLoading: false,
            carAddDialogInputNameErrorMessage: null,
            carAddDialogInputNameValue: ''
        };
        
        this.loadParentDidSuccess = this.loadParentDidSuccess.bind(this);
        this.loadParentDidFinish = this.loadParentDidFinish.bind(this);
        this.loadListDidSuccess = this.loadListDidSuccess.bind(this);
        this.loadListDidFinish = this.loadListDidFinish.bind(this);
        this.createFolderDidSuccess = this.createFolderDidSuccess.bind(this);
        this.createFolderDidFail = this.createFolderDidFail.bind(this);
        this.folderCreateButtonDidSelect = this.folderCreateButtonDidSelect.bind(this);
        this.folderCreateDialogOkButtonDidSelect = this.folderCreateDialogOkButtonDidSelect.bind(this);
        this.folderCreateDialogCloseButtonDidSelect = this.folderCreateDialogCloseButtonDidSelect.bind(this);
        this.folderCreateDialogInputDidChange = this.folderCreateDialogInputDidChange.bind(this);
        this.carAddButtonDidSelect = this.carAddButtonDidSelect.bind(this);
        this.carAddDialogOkButtonDidSelect = this.carAddDialogOkButtonDidSelect.bind(this);
        this.carAddDialogCloseButtonDidSelect = this.carAddDialogCloseButtonDidSelect.bind(this);
        this.carAddDialogInputDidChange = this.carAddDialogInputDidChange.bind(this);
    }
    
    /**
     * Component did mount handler
     */
    componentDidMount() {
        console.log('componentDidMount');
/*         this.loadList(); */
		this.setState({
			parentId: this.props.params.parentId,
			parentName: null,
			parentLink: null,
			parentDidLoad: false,
			listDidLoad: false
		}, function() {
			this.loadList();
		});
    }
    
    componentWillReceiveProps (props) {
        console.log('componentWillReceiveProps', props);
		this.setState({
			parentId: props.params.parentId,
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
        
        var appId = this.props.route.appId;
        var apiKey = this.props.route.apiKey;
        
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
        
        var appId = this.props.route.appId;
        var apiKey = this.props.route.apiKey;
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
    
    loadListDidSuccess(response, state) {
        console.log(state, response);
        this.setState({list: response.results});
    }
    
    loadListDidFail(xhr, state) {
        console.log(state, xhr);
    }
    
    loadListDidFinish() {
    	this.setState({
    		listDidLoad: true
    	});
    }
    
    createFolder(name) {
    
        var appId = this.props.route.appId;
        var apiKey = this.props.route.apiKey;
        var parentId = this.state.parentId;
        if(!parentId) {
            parentId = 'root';
        }
        
        var url = 'https://api.parse.com/1/classes/list/';
        var data = JSON.stringify({
            parent: parentId,
            name: name,
            isTerminal: false
        });
        
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: data,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Parse-Application-Id', appId);
                xhr.setRequestHeader('X-Parse-REST-API-Key', apiKey);
            }
        })
        .done(this.createFolderDidSuccess)
        .fail(this.createFolderDidFail);
    }
    
    createFolderDidSuccess(response, state) {
        console.log('Success', response);
        this.setState({
            folderCreateDialogOpen: false,
            folderCreateDialogLoading: false,
            folderCreateDialogInputNameErrorMessage: null
        });
    }
    
    createFolderDidFail(xhr, state) {
        console.log('Fail');
        this.setState({
            folderCreateDialogLoading: false,
            folderCreateDialogInputNameErrorMessage: 'error'
        });
    }
    
    listDidSelect(objectId) {
    	console.log(objectId);
    	location.href = '#/list/' + objectId;
    }
    
    folderCreateButtonDidSelect() {
        this.setState({folderCreateDialogOpen: true});
    }
    
    folderCreateDialogOkButtonDidSelect() {
        console.log('folderCreateDialogOkButtonDidSelect');
        var name = this.state.folderCreateDialogInputNameValue;
        if(name.length < 1) {
            console.log('folderCreateDialogInputNameErrorMessage');
            this.setState({folderCreateDialogInputNameErrorMessage: 'This field is required'});
        } else {
            this.setState({
                folderCreateDialogLoading: true,
                folderCreateDialogInputNameErrorMessage: null
            });
            this.createFolder(name);
        }
    }
    
    folderCreateDialogCloseButtonDidSelect() {
        this.setState({folderCreateDialogOpen: false});
    }
    
    folderCreateDialogInputDidChange(event) {
        this.setState({folderCreateDialogInputNameValue: event.target.value});
    }
    
    carAddButtonDidSelect() {
        this.setState({carAddDialogOpen: true});
    }
    
    carAddDialogOkButtonDidSelect() {
        console.log('carAddDialogOkButtonDidSelect');
        var carId = this.state.carAddDialogSelectedCarId;
/*         this.addCar(carId); */
    }
    
    carAddDialogCloseButtonDidSelect() {
        this.setState({carAddDialogOpen: false});
    }
    
    carAddDialogInputDidChange(event) {
        this.setState({carAddDialogInputNameValue: event.target.value});
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
		const folderCreateDialogActions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.folderCreateDialogOkButtonDidSelect}
            />,
        ];
        const folderCreateDialogContent = this.state.folderCreateDialogLoading ? (
            <div style={{position: 'relative', height: 72, left: '50%'}}>
                <RefreshIndicator
                    size={50}
                    left={-25}
                    top={11}
                    loadingColor={"#FF9800"}
                    status="loading"
                />
            </div>
        ) : (
            <TextField
            	ref="inputListNameToAdd"
				hintText="List name"
				floatingLabelText="Insert a list"
                errorText={this.state.folderCreateDialogInputNameErrorMessage}
                value={this.state.folderCreateDialogInputNameValue}
                onChange={this.folderCreateDialogInputDidChange}
			/>
        );
		const carAddDialogActions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.carAddDialogOkButtonDidSelect}
            />,
        ];
        const carAddDialogContent = this.state.carAddDialogLoading ? (
            <div style={{position: 'relative', height: 72, left: '50%'}}>
                <RefreshIndicator
                    size={50}
                    left={-25}
                    top={11}
                    loadingColor={"#FF9800"}
                    status="loading"
                />
            </div>
        ) : (
            <Cars />
        );
        const floatingActionButtonStyle = {margin: 5};
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
                <FloatingActionButton style={floatingActionButtonStyle} onTouchTap={this.folderCreateButtonDidSelect}>
    				<CreateNewFolderIcon />
                </FloatingActionButton>
                <Dialog
                    title="Create new folder"
                    actions={folderCreateDialogActions}
                    modal={this.state.folderCreateDialogLoading}
                    open={this.state.folderCreateDialogOpen}
                    onRequestClose={this.folderCreateDialogCloseButtonDidSelect}
                >
                    {folderCreateDialogContent}
                </Dialog>
                
                <FloatingActionButton style={floatingActionButtonStyle} onTouchTap={this.carAddButtonDidSelect}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Add car"
                    actions={carAddDialogActions}
                    modal={this.state.carAddDialogLoading}
                    open={this.state.carAddDialogOpen}
                    onRequestClose={this.carAddDialogCloseButtonDidSelect}
                >
                    {carAddDialogContent}
                </Dialog>
            </div>
        );
    }
    
    /**/
}

export default ListView;