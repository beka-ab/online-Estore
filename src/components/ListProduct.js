import axios from "axios";
import { useEffect, useState } from "react";
import "../styles.scss";
const ListProduct = () => {
  const [users, setUsers] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios.get("http://localhost:3306/PHP/users/").then((response) => {
      setUsers(response.data);
    });
  };
  const handleCheckboxChange = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item != id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3306/PHP/users/${id}/delete`)
      .then((response) => {
        console.log(response.data);
        getUsers();
      });
  };
  const handleMassDelete = () => {
    axios
      .delete("http://localhost:3306/PHP/users/mass-delete", {
        data: { ids: checkedItems },
      })
      .then((response) => {
        console.log(response.data);
        getUsers();
        setCheckedItems([]);
      });
  };
  return (
    <>
      <div className="head-content">
        <h1>Product List</h1>
        <div className="option-btns">
          <button>ADD</button>
          <button onClick={handleMassDelete}> MASS DELETE</button>
        </div>
      </div>

      <hr></hr>
      <div className="container">
        {users.map((user, key) => (
          <div key={key}>
            <input
              type="checkbox"
              checked={checkedItems.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            ></input>
            <div className="product-data">
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.mobile}</p>
            </div>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListProduct;
