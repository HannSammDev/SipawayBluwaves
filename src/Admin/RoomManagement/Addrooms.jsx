import React, { useState } from "react";

import { fileDB, textDB } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export const Addrooms = () => {
  const [files, setFiles] = useState([
    { id: Date.now(), type: "file", preview: null, url: "" },
  ]);
  const [roomname, setRoomname] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([""]);
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const addFileInput = () => {
    setFiles([
      ...files,
      { id: Date.now(), type: "file", preview: null, url: "" },
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
        .then((data) => getDownloadURL(data.ref))
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
          console.error("Error uploading file: ", error);
          alert("Error uploading file. Please try again.");
        });
    }
  };

  const handleAmenityChange = (index, event) => {
    const newAmenities = [...amenities];
    newAmenities[index] = event.target.value;
    setAmenities(newAmenities);
  };

  const addAmenity = () => {
    setAmenities([...amenities, ""]);
  };

  const removeAmenity = (index) => {
    const newAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(newAmenities);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileUrls = files.map((file) => file.url);

    const roomData = {
      description,
      roomname,
      amenities: amenities.join(","),
      price,
      images: fileUrls,
      // availability: "not reserved",
    };

    try {
      await addDoc(collection(textDB, "rooms"), roomData);
      console.log("Room added successfully!");
      setSuccessMessage("Room added successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 8000);
    } catch (error) {
      console.error("Error adding room: ", error);
      alert("There was an error adding the room. Please try again.");
    }
  };

  return (
    <>
      <div className="container my-3">
        <div
          // className="card "
          style={{
            backgroundColor: "white",
            // boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* <div className="card-header bg-none text-white">
            <h5 className="mb-0 text-dark">
              <i className="bi bi-pencil-square"></i> Add Room
            </h5>
          </div> */}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {files.map((file, index) => (
                <div className="mb-3" key={file.id}>
                  {file.preview && (
                    <img
                      src={file.preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        borderRadius: "5px",
                      }}
                    />
                  )}

                  <label className="form-label">
                    <i className="bi bi-upload"></i> Upload Image
                  </label>
                  <input
                    type="file"
                    className="form-control "
                    name={`file${index}`}
                    onChange={(e) => handleFileChange(index, e)}
                  />

                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-close mt-2"
                      onClick={() => handleRemoveFileInput(file.id)}
                    >
                      {/* <i className="bi bi-trash"></i>  */}
                      {/* Remove File */}
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-outline-dark mb-3"
                onClick={addFileInput}
              >
                <i className="bi bi-plus"></i> Add Another File
              </button>

              <div className="mb-3">
                <label htmlFor="roomname" className="form-label">
                  <i className="bi bi-pencil-square"></i> Room Name
                </label>
                <input
                  type="text"
                  id="roomname"
                  className="form-control "
                  value={roomname}
                  onChange={(e) => setRoomname(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <i className="bi bi-file-text"></i> Description
                </label>
                <textarea
                  id="description"
                  className="form-control "
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="amenities" className="form-label">
                  <i className="bi bi-plus-circle"></i> Amenities
                </label>
                {amenities.map((amenity, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      className="form-control  me-2"
                      value={amenity}
                      onChange={(e) => handleAmenityChange(index, e)}
                    />
                    {amenities.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeAmenity(index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  onClick={addAmenity}
                >
                  <i className="bi bi-plus-circle"></i> Add Amenity
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  <i className="bi bi-currency-dollar"></i> Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {successMessage && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {successMessage}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccessMessage("")}
                  ></button>
                </div>
              )}

              <div className="">
                <button type="submit" className="btn btn-primary btn-sm">
                  <i className="bi bi-cloud-upload"></i> Submit
                </button>
                {/* <button type="reset" className="btn btn-secondary btn-sm ms-2">
                  <i className="bi bi-x-circle"></i> Reset
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
