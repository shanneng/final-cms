import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faAddressBook, faUsers, faUserCheck, faUserTimes, faSearch, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [ data, setData ] = useState([])
    const navigate = useNavigate()

    useEffect(()=> {
        axios.get('http://localhost:5000/contacts')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

    function handleDelete (id) {
        const confirm = window.confirm("Do you like to delete?");
        if(confirm) {
            axios.delete('http://localhost:5000/contacts/' + id)
            .then(res => {
                alert("Record Deleted");
                navigate('/')
            })
        }
        window.location.reload();
    }

    const totalCount        = data.length;
    const activeContact     = data.filter(contact => contact.isActive === true).length;
    const inactiveContact   = data.filter(contact => contact.isActive === false).length;

    return (
        <div>
            <header>
                <nav className="navbar navbar-light navbar-expand-md shadow py-3">
                    <div className="container"><a className="navbar-brand d-flex align-items-center pulse" href="/"><span className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><FontAwesomeIcon icon={faAddressBook} /></span><span className="fw-bold">Contact Management System</span></a><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-3"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                        <div id="navcol-3" className="collapse navbar-collapse">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item d-none"><a className="nav-link active" href="/"><i className="fas fa-home"></i><span className="ms-1">Home</span></a></li>
                            </ul>
                        </div>
                        <Link to="/create" className='btn btn-success' role="button"><FontAwesomeIcon icon={faUserPlus} /><span className="ms-1">Add Contact</span></Link>
                    </div>
                </nav>
            </header>

            <main>
                <div className='container my-5'>
                    {/* Tally Section */}
                    <div className="row gy-2 row-cols-1 row-cols-md-3 mb-5">
                        <div className="col">
                            <div className="card shadow pulse">
                                <div className="card-body p-4">
                                    <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"><FontAwesomeIcon icon={faUsers} /></div>
                                    <h4 className="text-nowrap card-title">Total Contacts</h4>
                                    <p className="card-text">{totalCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow pulse">
                                <div className="card-body p-4">
                                    <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"><FontAwesomeIcon icon={faUserCheck} /></div>
                                    <h4 className="text-nowrap card-title">Active Contacts</h4>
                                    <p className="card-text">{activeContact}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow pulse">
                                <div className="card-body p-4">
                                    <div className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center d-inline-block mb-3 bs-icon"><FontAwesomeIcon icon={faUserTimes} /></div>
                                    <h4 className="text-nowrap card-title">Deleted Contacts</h4>
                                    <p className="card-text">{inactiveContact}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="row mb-5">
                        <div className="col">
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <h4 className="card-title mb-3">List of Contacts</h4>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                                <tr className="table-primary">
                                                    <th className='text-center'>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th className='text-center'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((d, i) => (
                                                    <tr key={i}>
                                                        <td className='text-center'>{d.id}</td>
                                                        <td>{d.name}</td>
                                                        <td>{d.email}</td>
                                                        <td>{d.number}</td>
                                                        <td className='text-center'>
                                                            <div className="btn-group btn-group-sm" role="group">
                                                                <Link className='btn pulse btn-outline-primary' to={`/view/${d.id}`}><FontAwesomeIcon icon={faSearch} /></Link>
                                                                <Link className='btn pulse btn-outline-info' to={`/update/${d.id}`}><FontAwesomeIcon icon={faPen} /></Link>
                                                                <button className='btn pulse btn-outline-danger' onClick={e => handleDelete(d.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>    
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="table-primary fw-bold">
                                                    <td className='text-center'>ID</td>
                                                    <td>Name</td>
                                                    <td>Email</td>
                                                    <td>Phone Number</td>
                                                    <td className='text-center'>Actions</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home

