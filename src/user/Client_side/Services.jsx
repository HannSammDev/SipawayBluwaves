import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Services() {
    return (
        <>
            <h2 id="services" className="mb-4">Our Services</h2>
            <div className="row" style={{ marginLeft: '5em', marginRight: '5em' }}>
                <div className="col-lg-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <i className="fas fa-campground service-icon fa-5x"></i>
                        </div>
                        <div className="col-8 " style={{textAlign:'justify'}}>
                            <h4>Tent and Table Setup</h4>
                            <p>Enjoy hassle-free outdoor events with our tent and table setup service. We'll take care of all the arrangements so you can focus on making memories with your loved ones.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <i className="fas fa-umbrella-beach service-icon fa-5x"></i>
                        </div>
                        <div className="col-8"  style={{textAlign:'justify'}}>
                            <h4>Beach Umbrella Rental</h4>
                            <p>Stay cool and shaded under our beach umbrellas. Perfect for lounging by the sea while enjoying refreshing drinks and stunning views.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-4">
                          
                        <i class="fas fa-regular services-icon fa-map fa-5x"></i>
                        </div>
                        <div className="col-8"  style={{textAlign:'justify'}}>
                            <h4>Kayak Adventure</h4>
                            <p>Embark on an exciting kayak adventure and explore the beauty of the ocean. Paddle through calm waters and discover hidden gems along the coastline.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <i className="fas fa-utensils service-icon fa-5x"></i>
                        </div>
                        <div className="col-8"  style={{textAlign:'justify'}}>
                            <h4>Sugba-anan</h4>
                            <p>Indulge in a delectable beachside dining experience with our Sugba anan service. Enjoy fresh seafood and local delicacies while soaking up the sun and sea breeze.</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}

export default Services;
