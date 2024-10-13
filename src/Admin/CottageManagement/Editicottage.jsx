import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { textDB } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export const EditCottage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [cottage, setCottage] = useState({
    cottagename: "",
    description: "",
    amenities: [],
    price: "",
    images: [], // Store URLs of existing images from Firebase
  });
  const [newImages, setNewImages] = useState([]); // Store new image files

  const getCottage = async () => {
    const docRef = doc(textDB, "cottages", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const cottageData = docSnap.data();
      setCottage({
        ...cottageData,
        amenities: cottageData.amenities.split(","),
      });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getCottage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCottage({ ...cottage, [name]: value });
  };

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...cottage.amenities];
    newAmenities[index] = value;
    setCottage({ ...cottage, amenities: newAmenities });
  };

  const addAmenity = () => {
    setCottage({ ...cottage, amenities: [...cottage.amenities, ""] });
  };

  const removeAmenity = (index) => {
    const newAmenities = cottage.amenities.filter((_, i) => i !== index);
    setCottage({ ...cottage, amenities: newAmenities });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const uploadImages = async () => {
    const storage = getStorage();
    const uploadedImageUrls = await Promise.all(
      newImages.map(async (image) => {
        const imageRef = ref(storage, `cottages/${id}/${image.name}`);
        await uploadBytes(imageRef, image);
        return await getDownloadURL(imageRef);
      })
    );
    return uploadedImageUrls;
  };

  const handleRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      setCottage({
        ...cottage,
        images: cottage.images.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedCottage = { ...cottage, amenities: cottage.amenities.join(",") };

    if (newImages.length > 0) {
      const imageUrls = await uploadImages();
      updatedCottage = { ...updatedCottage, images: [...cottage.images, ...imageUrls] };
    }

    const docRef = doc(textDB, "cottages", id);
    await updateDoc(docRef, updatedCottage);
    console.log("Cottage updated successfully!");
    setSuccessMessage("Cottage updated successfully!");
    // navigate("/cottagedetails");
  };

  return (
    <div className="container my-5">
      <div
        className="card "
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="card-header bg-primary text-white d-flex">
          <i className="bi bi-pencil-square "></i> <h5>Edit Cottage</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cottagename" className="form-label">
                <i className="bi bi-pencil-square"></i> Cottage Name
              </label>
              <input
                type="text"
                className="form-control "
                id="cottagename"
                name="cottagename"
                value={cottage.cottagename}
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
                value={cottage.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amenities" className="form-label">
                <i className="bi bi-plus-circle"></i> Amenities
              </label>
              {cottage.amenities.map((amenity, index) => (
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
              <label htmlFor="price" className="form-label">
                ₱ Price
              </label>
              <input
                type="number"
                className="form-control "
                id="price"
                name="price"
                value={cottage.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-upload"></i> Upload Image
              </label>
              {cottage.images.length === 0 && newImages.length === 0 && (
                <div>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Placeholder"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              )}
              {cottage.images.map((image, index) => (
                <div key={index} className="d-flex mb-2 align-items-center">
                  <img
                    src={image}
                    alt={`Existing ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "10px",
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
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "10px",
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
                style={{ backgroundColor: "#FBCEB1" }}
              >
                {successMessage}
                <a
                  href="/cottagedetails"
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage("")}
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
