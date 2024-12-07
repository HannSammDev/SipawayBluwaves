import React, { useState, useEffect } from 'react';
import { InputGroup, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { textDB } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export const EditRoom = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    roomname: '',
    description: '',
    amenities: [],
    price: '',
    pricingType: '',
    images: [],
  });
  const [newImages, setNewImages] = useState([]); // Store new image files

  const getRoom = async () => {
    const docRef = doc(textDB, 'rooms', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const roomData = docSnap.data();
      setRoom({
        ...roomData,
        amenities: roomData.amenities.split(','),
      });
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  // const handlePricingTypeChange = (selectedKey) => {
  //   setRoom({ ...room, pricingtype: selectedKey });
  // };

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...room.amenities];
    newAmenities[index] = value;
    setRoom({ ...room, amenities: newAmenities });
  };

  const addAmenity = () => {
    setRoom({ ...room, amenities: [...room.amenities, ''] });
  };

  const removeAmenity = (index) => {
    const newAmenities = room.amenities.filter((_, i) => i !== index);
    setRoom({ ...room, amenities: newAmenities });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const uploadImages = async () => {
    const storage = getStorage();
    const uploadedImageUrls = await Promise.all(
      newImages.map(async (image) => {
        const imageRef = ref(storage, `rooms/${id}/${image.name}`);
        await uploadBytes(imageRef, image);
        return await getDownloadURL(imageRef);
      }),
    );
    return uploadedImageUrls;
  };

  const handleRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      setRoom({
        ...room,
        images: room.images.filter((_, i) => i !== index),
      });
    }
  };

  // const handlePricingType = (eventKey) => {
  //   setPricingType(eventKey);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedRoom = { ...room, amenities: room.amenities.join(',') };

    if (newImages.length > 0) {
      const imageUrls = await uploadImages();
      updatedRoom = { ...updatedRoom, images: [...room.images, ...imageUrls] };
    }

    const docRef = doc(textDB, 'rooms', id);
    await updateDoc(docRef, updatedRoom);
    console.log('Room updated successfully!');
    setSuccessMessage('Room updated successfully!');
    // navigate("/roomdetails");
  };

  return (
    <div className="container my-5">
      <div
        className="card "
        style={{
          backgroundColor: '#f5f5f5',
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="card-header bg-primary text-white d-flex">
          <i className="bi bi-pencil-square "></i> <h5>Edit Room</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomname" className="form-label">
                <i className="bi bi-pencil-square"></i> Room Name
              </label>
              <input
                type="text"
                className="form-control "
                id="roomname"
                name="roomname"
                value={room.roomname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <i className="bi bi-file-text"></i> Description
              </label>
              <input
                type="text"
                className="form-control "
                id="description"
                name="description"
                value={room.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amenities" className="form-label">
                <i className="bi bi-plus-circle"></i> Amenities
              </label>
              {room.amenities.map((amenity, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control  me-2"
                    value={amenity}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-transparent"
                    onClick={() => removeAmenity(index)}
                  >
                    <FontAwesomeIcon className="text-danger" icon={faTrash} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-transparent"
                onClick={addAmenity}
              >
                <FontAwesomeIcon className="text-primary" icon={faPlus} />
              </button>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="price" className="form-label">
                ₱ Price
              </label>
              <input
                type="number"
                className="form-control "
                id="price"
                name="price"
                value={room.price}
                onChange={handleChange}
              /> */}
              <InputGroup className="mb-3">
                <InputGroup.Text>₱</InputGroup.Text>
                <Form.Control
                  name="price"
                  value={room.price}
                  onChange={handleChange}
                  aria-label="Amount (to the nearest dollar)"
                />
                <Form.Select
                style={{width:'10px'}}
                className=''
                  name="pricingtype"
                  value={room.pricingType}
                  onChange={handleChange}
                  // aria-label="Select Pricing Type"
                >
                 
                  <option value="Per Person">Per Person</option>
                  <option value="Per Group">Per Group</option>
                </Form.Select>
              </InputGroup>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-upload"></i> Upload Image
              </label>
              {room.images.length === 0 && newImages.length === 0 && (
                <div>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Placeholder"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  />
                </div>
              )}
              {room.images.map((image, index) => (
                <div key={index} className="d-flex mb-2 align-items-center">
                  <img
                    src={image}
                    alt={`Existing ${index + 1}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      marginRight: '10px',
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-transparent"
                    onClick={() => handleRemoveImage(index, false)}
                  >
                    <FontAwesomeIcon className="text-danger" icon={faTrash} />
                  </button>
                </div>
              ))}
              {newImages.map((image, index) => (
                <div key={index} className="d-flex mb-2 align-items-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New ${index + 1}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      marginRight: '10px',
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-transparent"
                    onClick={() => handleRemoveImage(index, true)}
                  >
                    <FontAwesomeIcon className="text-danger" icon={faTrash} />
                  </button>
                </div>
              ))}
              <input
                type="file"
                className="form-control "
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
              />
            </div>
            {successMessage && (
              <div
                className="alert alert-dismissible fade show"
                role="alert"
                style={{ backgroundColor: '#FBCEB1' }}
              >
                {successMessage}
                <a
                  href="/roomdetails"
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage('')}
                  aria-label="Close"
                ></a>
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
