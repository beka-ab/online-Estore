import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
const AddProduct = () => {
  const [selectedProductType, setSelectedProductType] = useState("");
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value.trim() }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (inputs.SKU.trim() === "") {
      newErrors.SKU = "This field must be filled";
    }

    if (inputs.Name.trim() === "") {
      newErrors.Name = "This field must be filled";
    }

    if (inputs.Price.trim() === "") {
      newErrors.Price = "This field must be filled";
    }

    if (selectedProductType === "") {
      newErrors.ProductType = "Please select a product type";
    }

    if (selectedProductType === "DVD" && inputs.Size.trim() === "") {
      newErrors.Size = "This field must be filled";
    }

    if (selectedProductType === "Book" && inputs.Weight.trim() === "") {
      newErrors.Weight = "This field must be filled";
    }

    if (selectedProductType === "Furniture") {
      if (inputs.Height.trim() === "") {
        newErrors.Height = "This field must be filled";
      }

      if (inputs.Width.trim() === "") {
        newErrors.Width = "This field must be filled";
      }

      if (inputs.Length.trim() === "") {
        newErrors.Length = "This field must be filled";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post("/api/user/save", inputs, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate("/");
        setInputs({});
      });
  };
  return (
    <>
      <div className="section">
        <div>
          <div className="head-content">
            <h1>Product Add</h1>
            <div className="option-btns">
              <button form="product_form" type="submit">
                Save
              </button>
              <button id="delete-product-btn" type="button">
                <Link to="/"> Cancel</Link>
              </button>
            </div>
          </div>

          <hr></hr>
          <form id="product_form" onSubmit={handleSubmit}>
            <div className="product-info-cont">
              <label>SKU</label>
              <input
                id="sku"
                type="text"
                name="SKU"
                onChange={handleChange}
                required
              />
            </div>
            <div className="error-message">{errors.SKU}</div>

            <div className="product-info-cont">
              <label>Name</label>
              <input
                id="name"
                type="text"
                name="Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="error-message">{errors.Name}</div>

            <div className="product-info-cont">
              <label>Price ($)</label>
              <input
                id="price"
                type="text"
                name="Price"
                onChange={handleChange}
                required
              />
            </div>
            <div className="error-message">{errors.Price}</div>

            <span>Product type</span>
            <select
              id="productType"
              value={selectedProductType}
              onChange={handleProductTypeChange}
              name="ProductType"
              required
            >
              <option value="">Select product type</option>
              <option id="DVD" value="DVD">
                DVD
              </option>
              <option id="Book" value="Book">
                Book
              </option>
              <option id="Furniture" value="Furniture">
                Furniture
              </option>
            </select>
            <div className="error-message">{errors.ProductType}</div>
            <br />

            {selectedProductType === "DVD" && (
              <div>
                <label>Size (MB):</label>
                <input
                  id="size"
                  type="text"
                  name="Size"
                  onChange={handleChange}
                  required
                />
                <div className="error-message">{errors.Size}</div>
                <p className="product-descr"> *please provide size in MBs</p>
                <br />
              </div>
            )}

            {selectedProductType === "Book" && (
              <div>
                <label>Weight (Kg):</label>
                <input
                  id="weight"
                  type="text"
                  name="Weight"
                  onChange={handleChange}
                  required
                />
                <div className="error-message">{errors.Weight}</div>
                <p className="product-descr"> *please provide Weight in kg</p>
                <br />
              </div>
            )}

            {selectedProductType === "Furniture" && (
              <div>
                <div className="furniture-inp">
                  <label>Height (CM)</label>
                  <input
                    id="height"
                    type="text"
                    name="Height"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="error-message">{errors.Height}</div>
                <div className="furniture-inp">
                  <label>Width (CM)</label>
                  <input
                    id="width"
                    type="text"
                    name="Width"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="error-message">{errors.Width}</div>
                <div className="furniture-inp">
                  <label>Length (CM)</label>
                  <input
                    id="length"
                    type="text"
                    name="Length"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="error-message">{errors.Length}</div>
                <p className="product-descr">
                  *please provide dimensions in HxWxL
                </p>
              </div>
            )}
          </form>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default AddProduct;
