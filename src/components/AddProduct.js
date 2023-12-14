import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3306/PHP/user/save", JSON.stringify(inputs), {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate("/");
        console.log(response);
      });
  };
  return (
    <>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange}></input>
        <br />

        <label>Email:</label>
        <input type="text" name="Email" onChange={handleChange}></input>
        <br />

        <label>Mobile:</label>
        <input type="text" name="Mobile" onChange={handleChange}></input>
        <br />

        <button>SAVE</button>
      </form>
    </>
  );
};

export default AddProduct;
