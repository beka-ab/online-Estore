import axios from "axios";
import { useEffect, useState } from "react";
import "../styles.scss";
import { Link } from "react-router-dom";
import Footer from "./Footer";
axios.defaults.http2 = false;
const ListProduct = () => {
  const [users, setUsers] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios
      .get("/api/products/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
          setLoading(false);
        } else {
          console.error("Unexpected API response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleCheckboxChange = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleMassDelete = () => {
    axios
      .post("/api/products/mass-delete", {
        deleteOperation: true,
        ids: checkedItems,
      })
      .then((response) => {
        getUsers();
        setCheckedItems([]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="section">
        <div>
          <div className="list-product-header">
            <h1 className="list-product-headline">Product List</h1>
            <div className="list-product-btns">
              <button>
                <Link to="/add-product">ADD</Link>
              </button>
              <button onClick={handleMassDelete}>MASS DELETE</button>
            </div>
          </div>
          <hr></hr>
          {loading ? (
            <p>loading...</p>
          ) : (
            <div className="container">
              {users.length !== 0 &&
                users.map((user, key) => (
                  <div className="product-list" key={user.id}>
                    <input
                      className="delete-checkbox"
                      type="checkbox"
                      checked={checkedItems.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    ></input>
                    <div className="product-data">
                      <p> {user.SKU}</p>
                      <p> {user.Name}</p>
                      <p>{user.Price} $</p>
                      {user.Size && <p>Size:{user.Size} MB </p>}
                      {user.Weight && <p>Weight:{user.Weight} KG</p>}
                      {user.Height && (
                        <div className="furniture-demin">
                          Deminsion:{user.Height}x{user.Width}x{user.Length}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ListProduct;
