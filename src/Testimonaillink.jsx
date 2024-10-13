import React from "react";
import { Link, Outlet } from "react-router-dom";

function TestimonialPage() {
    return (
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-md-8 text-center">
                    <h2>Testimonials</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb " style={{width:'100%'}}>
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-dark">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">About</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-20">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default TestimonialPage;
