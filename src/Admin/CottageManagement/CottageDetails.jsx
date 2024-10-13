import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { textDB } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const CottageDetails = () => {
    const [cottages, setcottages] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        const cottageCollection = collection(textDB, "cottages");
        const cottageSnapshot = await getDocs(cottageCollection);
        const cottageList = cottageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setcottages(cottageList);
    };

    const handleDelete = async (cottageId) => {
        try {
            await deleteDoc(doc(textDB, "cottages", cottageId));
            setcottages(cottages.filter(cottage => cottage.id !== cottageId));
            alert("cottage deleted successfully!");
        } catch (error) {
            console.error("Error deleting cottage: ", error);
            alert("There was an error deleting the cottage. Please try again.");
        }
    };

    const handleEdit = (cottageId) => {
        navigate(`/editcottage/${cottageId}`);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container-fluid mt-4" >
            {/* <h1 className="mb-3">cottage Details</h1> */}
            <div className="table table-responsive"  style={{boxShadow:"0px 0px 10px 5px rgba(0, 0, 0, 0.1)", padding:'1em',borderRadius:'5px',backgroundColor:'#f5f5f5'}}>
                <a className="btn btn-primary" href="/addcottage"> Add cottage</a>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">cottage_Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amenities</th>
                            <th scope="col">Price</th>
                            <th scope="col">Images</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cottages.map((cottage, index) => (
                            <tr key={cottage.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{cottage.cottagename}</td>
                                <td>{cottage.description}</td>
                                <td>
                                    <ul>
                                        {cottage.amenities.split(',').map((amenity, i) => (
                                            <li key={i}>{amenity}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>₱ {cottage.price}</td>
                                <td style={{ maxWidth: '200px' }}>
                                    <div
                                        id={`cottageCarousel${index}`}
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                        style={{ width: "100%", height: "auto" }}
                                    >
                                        <div className="carousel-inner">
                                            {cottage.images.map((image, i) => (
                                                <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                                                    <img
                                                        src={image}
                                                        className="d-block w-100"
                                                        alt={`cottage Image ${i + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            className="carousel-control-prev"
                                            type="button"
                                            data-bs-target={`#cottageCarousel${index}`}
                                            data-bs-slide="prev"
                                        >
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button
                                            className="carousel-control-next"
                                            type="button"
                                            data-bs-target={`#cottageCarousel${index}`}
                                            data-bs-slide="next"
                                        >
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn" onClick={() => handleDelete(cottage.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} />
                                        </button>
                                        <button type="button" className="btn" onClick={() => handleEdit(cottage.id)}>
                                            <FontAwesomeIcon icon={faEdit} style={{ color: '#FFA500' }} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
