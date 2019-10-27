import React, {Component} from 'react';
import PianoService from '../service/PianoService';

class ListPianosComponent extends Component {

    

    constructor(props) {
        super(props)
        this.state = {
            pianos: [],
            message: null
        }
        this.refreshList = this.refreshList.bind(this)
        this.deleteItemClicked = this.deleteItemClicked.bind(this)
        this.updateItemClicked = this.updateItemClicked.bind(this)
        this.createItemClicked = this.createItemClicked.bind(this)
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        PianoService.retrieveAll()
            .then(
                response => {
                    console.log(response);
                    this.setState ({pianos: response.data})
                }
            )
    }

    deleteItemClicked(id) {
        PianoService.deleteItem(id)
            .then(
                response => {
                    this.setState({ message: `Delete piano ${id} Successful` })
                    this.refreshList()
                }
            )
    
    }

    updateItemClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/pianos/update/${id}`)
    
    }

    createItemClicked() {
        console.log('create ')
        this.props.history.push(`/pianos/add/-1`)
    
    }
    render() {
        
        return (
            <div className="container">
                <div style={{height: 30}}></div>
                <h3>All Pianos</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Model</th>
                                <th>Text</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.pianos.map(
                                    piano =>
                                        <tr key={piano.pianoId}>
                                            <td>{piano.pianoId}</td>
                                            <td>{piano.name}</td>
                                            <td>{piano.model}</td>
                                            <td>{piano.text}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateItemClicked(piano.pianoId)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteItemClicked(piano.pianoId)}>Delete</button></td>
                                        </tr>
                                )
                            }
                            <tr><button className="btn btn-success" onClick={() => this.createItemClicked()}>Add</button></tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
        )
    }
}

export default ListPianosComponent