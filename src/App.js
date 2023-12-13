import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListProduct from "./components/ListProduct";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">AddProduct</Link>
            </li>
            <li>
              <Link to="/user/create">ListProduct</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<AddProduct />} />
          <Route path="user/create" element={<ListProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
