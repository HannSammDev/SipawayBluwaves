import React from "react";

function Contact() {
    return (
        <>
            <h2 className="text-center" id="contact">Contacts</h2>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6" >

                        <h3 className="text-primary" >Bluewaves Beach Resort</h3>
                        <p><strong>ADDRESS:</strong><br /><small >Brgy. Ermita Sipaway Island Negros Occidental</small> </p>
                        <p><strong>PHONE:</strong> <br /><small>0987654321</small></p>
                        <p><strong>EMAIL:</strong><br /><small> bluewaves@gmail.com</small></p>
                        <p className="border" style={{ padding: '30px', boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)" }}>For reservations or inquiries, please contact our reservations team:</p>
                        <p><strong>RESERVATIONS PHONE:</strong> +1(0987654321)</p>
                    </div>
                    <div className="col-md-6">


                        <form className=" " style={{ maxWidth: '400px', margin: '0 auto', padding: '5%', borderRadius: '10px', boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)" }}>
                            <div className="logo" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className='logo' src="../img/newlogofinal.png" alt="Blue Waves Logo" width="80" height="auto" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">Firstname</label>
                                <input type="text" className="form-control" id="firstname" placeholder="Enter your firstname" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="surname" className="form-label">Surname</label>
                                <input type="text" className="form-control" id="surname" placeholder="Enter your surname" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Send message</label>
                                <textarea className="form-control" id="message" rows="3" placeholder="Type your message"></textarea>
                            </div>
                            <div className="text-center">
                                <button style={{ width: '70%' }} type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
