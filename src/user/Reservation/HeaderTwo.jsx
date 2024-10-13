import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export const Headertwo = () => {
    return (
        <header id='home'>
            <nav className="navbar navbar-expand-lg navbar-light" style={{
                backgroundColor: 'whitesmoke',
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: '0.5rem 1rem',
                position: 'relative',
                zIndex: 1000,
            }}>
                <div className="container-fluid">
                    {/* Logo Section */}
                    <a className="navbar-brand d-flex align-items-center" href="#" style={{ textDecoration: 'none' }}>
                        <img className='logo' src="../img/newlogofinal.png" alt="Blue Waves Logo" width="50" height="auto" style={{ marginRight: '10px' }} />
                        <span style={{
                            color: '#000',
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}>Blue Waves Resort</span>
                    </a>

                    {/* Navbar Toggler for Mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links and Social Icons */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item ">
                                <a className="nav-link text-dark" style={{
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    padding: '10px 15px',
                                    transition: 'color 0.3s ease'
                                }}
                                    aria-current="page" href="/">Home</a>
                            </li>
                        </ul>

                        {/* Social Media Icons */}
                        <div className="d-flex align-items-center ms-3">
                            <a href="https://facebook.com" className="text-dark mx-2" style={{
                                fontSize: '1.2rem',
                                transition: 'color 0.3s ease',
                            }} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://twitter.com" className="text-dark mx-2" style={{
                                fontSize: '1.2rem',
                                transition: 'color 0.3s ease',
                            }} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://instagram.com" className="text-dark mx-2" style={{
                                fontSize: '1.2rem',
                                transition: 'color 0.3s ease',
                            }} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
