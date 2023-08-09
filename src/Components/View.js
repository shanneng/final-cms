import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function View() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/contacts/' + id)
        .then(res => setData(res.data))
        .catch(err => console.log())
    })

  return (
    <div>
      <header>
          <nav className="navbar navbar-light navbar-expand-md shadow">
              <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                  <span className="bs-icon-md bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><FontAwesomeIcon icon={faAddressBook} /></span>
                  <span className="fw-bold">Contact Management System</span>
                </a>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-4"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
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
                            <h4 className="card-title mb-4">Contact Information</h4>
                            <form>
                                <div className="row m-0 mb-4">
                                    <div className="col">
                                        <div>
                                            <p className="fw-semibold mb-2">Name</p>
                                            <p className="m-0">{data.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-cols-1 row-cols-md-2 m-0">
                                    <div className="col mb-4 mb-md-0">
                                        <div>
                                            <p className="fw-semibold mb-2">Contact Number</p>
                                            <p className="m-0">{data.number}</p>
                                        </div>
                                    </div>
                                    <div className="col mb-4 mb-md-0">
                                        <div>
                                            <p className="fw-semibold mb-2">Email Address</p>
                                            <p className="m-0">{data.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around align-items-center mt-4"><a className="btn btn-primary" role="button" href="/"><FontAwesomeIcon icon={faArrowLeft} /><span className="ms-1">Back</span></a></div>
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

export default View