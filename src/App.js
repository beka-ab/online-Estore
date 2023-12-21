import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListProduct from "./components/ListProduct";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="/" element={<ListProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
