import React, { useState } from 'react';
import { InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fileDB, textDB } from '../../firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection , getDocs} from 'firebase/firestore';
export const AddCottages = () => {
  const [files, setFiles] = useState([
    { id: Date.now(), type: 'file', preview: null, url: '' },
  ]);
  const [cottagename, setCottagename] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState(['']);
  const [price, setPrice] = useState('');
  const [pricingType, setPricingType] = useState('');
  const [cottage, setCottage] = useState([]);
  const addFileInput = () => {
    setFiles([
      ...files,
      { id: Date.now(), type: 'file', preview: null, url: '' },
    ]);
  };

  const handleRemoveFileInput = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    const file = event.target.files[0];
    const imageRef = ref(fileDB, `images/${v4()}`);

    if (file) {
      uploadBytes(imageRef, file)
        .then((data) => {
          return getDownloadURL(data.ref);
        })
        .then((url) => {
          newFiles[index] = {
            ...newFiles[index],
            [event.target.name]: file,
            preview: URL.createObjectURL(file),
            url: url,
          };
          setFiles(newFiles);
        })
        .catch((error) => {
          console.error('Error uploading file: ', error);
          alert('Error uploading file. Please try again.');
        });
    }
  };

  const handleAmenityChange = (index, event) => {
    const newAmenities = [...amenities];
    newAmenities[index] = event.target.value;
    setAmenities(newAmenities);
  };

  const addAmenity = () => {
    setAmenities([...amenities, '']);
  };

  const removeAmenity = (index) => {
    const newAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(newAmenities);
  };

  const fetchCottages = async () => {
    const querySnapshot = await getDocs(collection(textDB, 'cottages'));
    const cottages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCottages(cottages);
  };

  const handlePricingType = (eventKey) => {
    setPricingType(eventKey);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchCottages();
    const fileUrls = files.map((file) => file.url);

    const cottageData = {
      description,
      cottagename,
      amenities: amenities.join(','),
      price,
      images: fileUrls,
      pricingType,
      availability: 'not reserved',
    };

    try {
      const docRef = await addDoc(collection(textDB, 'cottages'), cottageData);
      const newCottage = { id: docRef.id, ...cottageData };
      setCottage((prevCottages) => [...prevCottages, newCottage]);
      console.log('Cottage added successfully!');
    } catch (error) {
      console.error('Error adding cottage: ', error);
      alert('There was an error adding the cottage. Please try again.');
    }
  };

  return (
    <>
      {/* <div className="container my-5">
        <div className="" style={{ backgroundColor: "#f5f5f5",  boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)" }}> */}
      {/* <div className="card-header bg-transparent  text-white">
            <h5 className="mb-0 text-dark">
              <i className="bi bi-pencil-square"></i> Add Cottage
            </h5>
          </div> */}

      <form
        className="row g-3"
        onSubmit={handleSubmit}
        style={{
          padding: '1em',
          borderRadius: '5px',
          backgroundColor: '',
        }}
      >
        {' '}
        {files.map((file, index) => (
          <div className="col-12" key={file.id}>
            {' '}
            {file.preview && (
              <img
                src={file.preview}
                alt={`Preview ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  marginTop: '10px',
                  borderRadius: '5px',
                }}
              />
            )}{' '}
            <label className="form-label">
              <i className="bi bi-upload"></i> Upload Image
            </label>
            <input
              type="file"
              className="form-control "
              name={`file${index}`}
              onChange={(e) => handleFileChange(index, e)}
            />{' '}
            <button
              type="button"
              className="btn btn-close btn-sm  mt-2"
              onClick={() => handleRemoveFileInput(file.id)}
            ></button>{' '}
          </div>
        ))}{' '}
        <div className="col-12">
          {' '}
          <button
            type="button"
            className="btn btn-sm btn-outline-dark mb-3"
            onClick={addFileInput}
          >
            <i className="bi bi-plus"></i> Add Another File
          </button>{' '}
        </div>{' '}
        <div className="col-12">
          {' '}
          <label htmlFor="cottagename" className="form-label">
            <i className="bi bi-pencil-square"></i> Cottage Name{' '}
          </label>{' '}
          <input
            type="text"
            id="cottagename"
            className="form-control "
            value={cottagename}
            onChange={(e) => setCottagename(e.target.value)}
          />{' '}
        </div>{' '}
        <div className="col-12">
          {' '}
          <label htmlFor="description" className="form-label">
            <i className="bi bi-file-text"></i> Description{' '}
          </label>{' '}
          <textarea
            id="description"
            className="form-control "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>{' '}
        </div>{' '}
        <div className="col-12">
          {' '}
          <label htmlFor="amenities" className="form-label">
            <i className="bi bi-plus-circle"></i> Amenities{' '}
          </label>{' '}
          {amenities.map((amenity, index) => (
            <div key={index} className="d-flex mb-2">
              {' '}
              <input
                type="text"
                className="form-control  me-2"
                value={amenity}
                onChange={(e) => handleAmenityChange(index, e)}
              />{' '}
              <button
                type="button"
                className="btn "
                onClick={() => removeAmenity(index)}
              >
                {' '}
                <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />{' '}
              </button>{' '}
            </div>
          ))}{' '}
          <button
            type="button"
            className="btn bg-transparent mt-1"
            onClick={addAmenity}
          >
            {' '}
            <FontAwesomeIcon className="text-dark" icon={faPlus} />{' '}
          </button>{' '}
        </div>{' '}
        <div className="col-12">
          {' '}
          <label htmlFor="price" className="form-label">
            <i className="bi bi-currency-dollar"></i> Price{' '}
          </label>{' '}
          <InputGroup className="mb-3">
            <InputGroup.Text>₱</InputGroup.Text>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              aria-label="Amount (to the nearest dollar)"
            />
            <DropdownButton
              variant="outline-primary"
              title="Pricing Type"
              id="input-group-dropdown-4"
              align="end"
              value={pricingType}
              onSelect={handlePricingType}
            >
              <Dropdown.Item eventKey="Per Person">Per Person</Dropdown.Item>
              <Dropdown.Item eventKey="Per Group">Per Group</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </div>{' '}
        <div className="col-12 d-flex justify-content-end">
          {' '}
          <button type="submit" className="btn btn-primary mt-3">
            <i className="bi bi-cloud-upload"></i> Save{' '}
          </button>{' '}
        </div>{' '}
      </form>
      {/* </div>
      </div> */}
    </>
  );
};
