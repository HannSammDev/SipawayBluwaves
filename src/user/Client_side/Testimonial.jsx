import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Testimonials() {
    const [showModal, setShowModal] = useState(false);

    const handleSeeAllClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div id="testimonial" className="container mt-5" >
            <div className="row">

            <div className="col-md-6  ">
                    <div className="card mb-4 border border-primary">
                        <div className="card-body d-flex flex-column align-items-center">
                            <img style={{ width: '5em', height: 'auto' }} src="./img/profile.png" alt="Client 2" className="img-fluid rounded-circle mb-3" />

                        </div>
                        <p className="card-text" style={{ textAlign: 'center' }}>"Very nice, I love the place so much!"</p>
                        <div className="">
                            <div className="star-ratings" >
                                <span className="text-warning fs-3 " style={{ float: 'right' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="card mb-4 border border-primary">
                        <div className="card-body d-flex flex-column align-items-center">
                            <img style={{ width: '5em', height: 'auto' }} src="./img/profile.png" alt="Client 2" className="img-fluid rounded-circle mb-3" />

                        </div>
                        <p className="card-text" style={{ textAlign: 'center' }}>"Very nice, I love the place so much!"</p>
                        <div className="">
                            <div className="star-ratings" >
                                <span className="text-warning fs-3 " style={{ float: 'right' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="card mb-4 border border-primary">
                        <div className="card-body d-flex flex-column align-items-center">
                            <img style={{ width: '5em', height: 'auto' }} src="./img/profile.png" alt="Client 2" className="img-fluid rounded-circle mb-3" />

                        </div>
                        <p className="card-text" style={{ textAlign: 'center' }}>"Very nice, I love the place so much!"</p>
                        <div className="">
                            <div className="star-ratings" >
                                <span className="text-warning fs-3 " style={{ float: 'right' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="card mb-4 border border-primary">
                        <div className="card-body d-flex flex-column align-items-center">
                            <img style={{ width: '5em', height: 'auto' }} src="./img/profile.png" alt="Client 2" className="img-fluid rounded-circle mb-3" />

                        </div>
                        <p className="card-text" style={{ textAlign: 'center' }}>"Very nice, I love the place so much!"</p>
                        <div className="">
                            <div className="star-ratings" >
                                <span className="text-warning fs-3 " style={{ float: 'right' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mb-5" >
                <button className="btn btn-primary" style={{ float: 'right' }} onClick={handleSeeAllClick}>See all</button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>All Testimonials</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
} export default Testimonials;

