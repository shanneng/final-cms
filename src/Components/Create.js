import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

function Create() {
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        number: ''
    }) 

    const navigate = useNavigate(); 

    const validateName = (name) => {
        console.log(name);
        return /^[A-Za-z\s]{4,}$/.test(name);
    }
    const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const validateNumber = (number) => {
        return /^\d{10,}$|^(\+\d{1,2}\s?)?(\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/.test(number);
    };

    const validationError = {};

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationError = {};
        if (!validateName(inputData.name)) {
            validationError.name = 'This field requires a minimum of four letters';
        }
        if (!validateEmail(inputData.email)) {
            validationError.email = 'The email should be valid';
        }
        if (!validateNumber(inputData.number)) {
            validationError.number = 'This field require numbers only and it should be 11 digits';
        }
        if (validationError !== true)

        axios.post('http://localhost:5000/contacts', {'name': inputData.name,  'email': inputData.email, 'number': inputData.number, 'isActive': true})
        .then(res=> {
            setInputData(res.data)
            alert("Data has been recorded")
            navigate('/')
        })
    }


    
  return (
    <div>
        <header>
            <nav className="navbar navbar-light navbar-expand-md shadow">
                <div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><span className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><FontAwesomeIcon icon={faAddressBook} /></span><span className="fw-bold">Contact Management System</span></a><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-4"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div id="navcol-4" className="collapse navbar-collapse flex-grow-0 order-md-first">
                        <ul className="navbar-nav me-auto"></ul>
                        <div className="d-md-none my-2"><button className="btn btn-light me-2" type="button">Button</button><button className="btn btn-primary" type="button">Button</button></div>
                    </div>
                    <div className="d-none d-md-block"></div>
                </div>
            </nav>
        </header>

        <main>
            <div className="container my-5">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Contact Information</h4>
                                <h6 className="text-muted card-subtitle mb-4">Please fill in all the inputs below</h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="row m-0">
                                        <div className="col">
                                            <div className="mb-3">
                                                <p className="mb-2" htmlFor="name">Name</p>
                                                <input className="form-control" type="text" name='name' value= {inputData.name} onChange = {e => setInputData({...inputData, name: e.target.value})}/>
                                                <small className="text-danger">{validationError.name}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row-cols-1 row-cols-md-2 m-0">
                                        <div className="col">
                                            <div className="mb-3">
                                                <p className="mb-2" htmlFor="number">Contact Number</p>
                                                <input className="form-control" type="number" name='number' value = {inputData.number} onChange = {e => setInputData({...inputData, number: e.target.value})}/>
                                                <small className="text-danger">{validationError.name}</small>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <p className="mb-2" htmlFor="email">Email Address</p>
                                                <input className="form-control" type="email" value = {inputData.email} onChange = {e => setInputData({...inputData, email: e.target.value})}/>
                                                <small className="text-danger">{validationError.email}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <a className="btn btn-outline-danger" role="button" href="/"><FontAwesomeIcon icon={faTimes} /><span className="ms-1">Cancel</span></a>
                                        <button className="btn btn-success"><FontAwesomeIcon icon={faCheck} /><span className="ms-1">Save</span></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Create