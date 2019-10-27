import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PianoService from '../service/PianoService';

class LoginComponent extends Component {

    constructor(props) {
        super(props)
       
        this.state = {
            user: '',
            pwd: ''
        }
        
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        //TODO
            
    }

    onSubmit(values) {
        /*TODO
        PianoService.login(values.user, values.pwd)
            .then(
                response => {
                    this.setState({ message: `Auth app. : OK` })
                }
            
        )*/

        this.props.history.push(`/pianos`)

    }

    validate(values) {
        let errors = {}
        if (!values.user) {
            errors.user = 'Enter user'
        } 
        if (!values.pwd) {
            errors.pwd = 'Enter password'
        } 
        
        return errors
    }

    

    render() {

        let { user, pwd } = this.state
        console.log("NAME:" + user + " PWD:" + pwd)
        
        return (
            
            <div>
                <h3>&nbsp;&nbsp;Login</h3>
                
                <div className="container"  >
                
                    <Formik enableReinitialize 
                            initialValues={{ user, pwd }} 
                            onSubmit={this.onSubmit} 
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}
                            >
                        

                        {
                            (props) => (
                                <Form>
                                    
                                    <fieldset className="form-group">
                                        <label>User</label>
                                        <ErrorMessage name="user" component="div" className="alert alert-warning" />
                                        <Field className="form-control" type="text" name="user" />
                                        
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <ErrorMessage name="pwd" component="div" className="alert alert-warning" />
                                        <Field className="form-control" type="password" name="pwd" />
                                        
                                    </fieldset>
                                   
                                    <button className="btn btn-success" type="submit">Save</button>
                                    
                                    
                                </Form>
                                
                                
                            )
                        }
                    </Formik>  
    
                </div>
            </div>
            
        )
                        
    }
    
}


export default LoginComponent