import React, { useState } from "react";
import { fileDB, textDB } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; // For Firestore

const AdminActivityForm = () => {
  const [activityName, setActivityName] = useState(""); // Controlled input for activity name
  const [writeAnything, setWriteAnything] = useState(""); // Controlled input for description
  const [files, setFiles] = useState([]); // To store the files and their URLs
  const [successMessage, setSuccessMessage] = useState(""); // To show success message

  // Handling file input and uploading to Firebase Storage
  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(fileDB, `images/${uuidv4()}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setFiles((prevFiles) => [
            ...prevFiles,
            { id: uuidv4(), file, preview: URL.createObjectURL(file), url },
          ]);
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
          alert("Error uploading file. Please try again.");
        });
    }
  };

  // Handling form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileUrls = files.map((file) => file.url); // Collect all file URLs
    const roomData = {
      activityName, // Key-value shorthand for activity name
      writeAnything, // Key-value shorthand for description
      images: fileUrls, // Store URLs of uploaded files
    };

    try {
      await addDoc(collection(textDB, "activity"), roomData);
      setSuccessMessage("Activity added successfully!");
      setTimeout(() => setSuccessMessage(""), 5000); // Clear message after 5 seconds
    } catch (error) {
      console.error("Error adding activity: ", error);
      alert("There was an error adding the activity. Please try again.");
    }
  };

  return (
    <>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="activityName" className="form-label">
            <i className="bi bi-clipboard"></i> Activity Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="activityName"
            placeholder="Enter activity name"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)} // Controlled input
          />
        </div>
        <div className="mb-3">
          <label htmlFor="activityDescription" className="form-label">
            <i className="bi bi-pencil"></i> Write Anything:
          </label>
          <textarea
            className="form-control"
            id="activityDescription"
            rows="3"
            placeholder="Enter details about the activity"
            value={writeAnything}
            onChange={(e) => setWriteAnything(e.target.value)} // Controlled textarea
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="uploadImage" className="form-label">
            <i className="bi bi-upload"></i> Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="uploadImage"
            onChange={handleFileInput} // Handle file input
          />
        </div>
        <div className="mb-3">
          {files.map((file, index) => (
            <div key={file.id}>
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
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-cloud-upload"></i> Submit
          </button>
          {/* <button type="reset" className="btn btn-secondary ms-2">
                <i className="bi bi-x-circle"></i> Reset
              </button> */}
        </div>
      </form>
    </>
  );
};

export default AdminActivityForm;
