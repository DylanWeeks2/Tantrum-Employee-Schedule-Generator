import React, { Component } from "react";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './login.css';
import { Redirect } from 'react-router-dom';
import axios from "axios";
var i = 0;

// function myFunction() {
//   var x, text;

//   var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

//   // Get the value of the input field with id="numb"
//   x = document.getElementById("numb").value;

//   // If x is Not a Number or less than one or greater than 10
//   if (!isValidZip.test(x)) {
//       text = "Input not valid";
//   } else {
//       text = "Input OK";
//   }
//   document.getElementById("demo").innerHTML = text;
// }

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        viewCompleted: false,
        activeEmp: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          primary_location: 0,
          secondary_location: 0
        },
      employees: [],
      modal: false,
      email: "",
      password: "",
      authenticated: false
    };
  }
 

  componentDidMount() {
    this.getEmployees();
  }

  handleTextChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees/")
      .then(res => {
        this.setState({ employees: res.data });
      })
      .catch(err => console.log(err));
  };

  authenticateUser = e => {
    this.state.employees.forEach(emp => {
      if (emp.email === this.state.email && emp.password === this.state.password)  
      {
        this.setState({ authenticated: true });
        console.log("correct details");
        i = 0;
      }
      else if(this.state.email === "emily@gmail.com" && this.state.password === "manager")
      {
        this.setState({ authenticated: true });
        console.log("correct details");
        i = 1;//
      }
      else 
      {
        i = 2;
      }
    });
  }

  render() {
    return (
      <Form className ="login-form">
          <br></br>
          <br></br>
          <h1>
              <span className = "font-weight-bold"></span>
          </h1>
          <h2 className = "text-center">Tantrum Sunless Tanning</h2>
          <FormGroup>
              <Label>Email</Label>
              <Input
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter Email"
                                />
               </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
                                    type="text"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter Password"
                                />
            </FormGroup>
          <Button className = "btn-lg btn-dark btn-block" type="button" color="success" disabled={!this.state.email || !this.state.password} 
                            onClick={this.authenticateUser}>Log In</Button>
            { this.state.authenticated && i === 0 && <Redirect to="/employeeView" /> }
            { this.state.authenticated && i === 1 && <Redirect to="/ManagerView" /> }
            { this.state.authenticated === false && i === 2 && <Redirect to="/error" /> }
      </Form>

    );
  }
}
export default Login;