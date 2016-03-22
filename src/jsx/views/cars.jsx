import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import backboneReact from 'backbone-react-component';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import CarList from '../models/car-list';


/// Cars component class
class Cars extends React.Component {
    
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        
        this.state = {
            collection: new CarList()
        };
        this.selectedIds = [];
        
        this.rowDidSelect = this.rowDidSelect.bind(this);
    }
    
    componentWillMount() {
        backboneReact.on(this, {
            collections: {
                carList: this.state.collection
            }
        });
        this.state.collection.fetch();
    }
    
    rowDidSelect(rows) {
        var selected = [];
        var i;
        var count = rows.length;
        for(i = 0; i < count; ++i) {
            selected.push(this.state.carList[i].objectId);
        }
        this.selectedIds = selected;
        console.log(selected);
    }
    
    /**
     * Render view
     */
    render() {
        var height = this.props.height;
        if(typeof height != 'string') {
            height = '200';
        }
        return (
            <Table
                multiSelectable={true}
                height={height}
                onRowSelection={this.rowDidSelect}
            >
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Maker</TableHeaderColumn>
                        <TableHeaderColumn>Model</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.carList.map((model) => {
                        var name = model.maker + ' - ' + model.model;
                        return (
                            <TableRow key={model.objectId}>
                                <TableRowColumn>{model.maker}</TableRowColumn>
                                <TableRowColumn>{model.model}</TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
    
    /**/
}

export default Cars;