import React, { useState, useEffect, useRef } from "react";
import "./Store.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const URL = "http://localhost:5000/store";

// Fetch all products
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

// Single store item
function StoreItem({ store }) {
  const navigate = useNavigate();
  if (!store) return null;

  const { _id, name, brand, image_URL, catogary, price, stock, discription } = store;

  const deleteHandler = async () => {
    try {
      await axios.delete(`${URL}/${_id}`);
      alert("Item deleted successfully!");
      navigate("/store");
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="store-item">
      <h2>{name}</h2>
      <img src={image_URL} alt={name} style={{ width: "150px" }} />
      <p><b>ID:</b> {_id}</p>
      <p><b>Brand:</b> {brand}</p>
      <p><b>Category:</b> {catogary}</p>
      <p><b>Price:</b> {price}</p>
      <p><b>Stock:</b> {stock}</p>
      <p><b>Description:</b> {discription}</p>
      <Link to={`/store/${_id}`}><button className="update-btn">Update</button></Link>
      <button className="delete-btn" onClick={deleteHandler}>Delete</button>
    </div>
  );
}

// Printable component
const PrintableStoreGrid = React.forwardRef(({ stores }, ref) => (
  <div ref={ref} className="print-area">
    <h1>Products Store</h1>
    <div className="store-grid">
      {stores.length > 0 ? (
        stores.map((s) => <StoreItem key={s._id} store={s} />)
      ) : (
        <p>No products available.</p>
      )}
    </div>
    <p>Browse supplements, apparel, and equipment. (View-only for now)</p>
  </div>
));

function StoreList() {
  const [stores, setStores] = useState([]);
  const componentRef = useRef();

  // Download PDF via jsPDF + autoTable
  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Store Items Report", 14, 16);

      const body = (stores || []).map((s) => [
        s._id || "-",
        s.name || "-",
        s.brand || "-",
        s.catogary || s.category || "-",
        s.price ?? "-",
        s.stock ?? "-",
      ]);

      autoTable(doc, {
        startY: 22,
        head: [["ID", "Name", "Brand", "Category", "Price", "Stock"]],
        body,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [37, 99, 235] },
      });

      doc.save("Store_Items_Report.pdf");
    } catch (e) {
      alert("Failed to generate PDF");
    }
  };

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        console.log("API Response:", data);
        setStores(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="store">
      <nav className="storenavbar">
        <h2>My Store</h2>
        <div>
          <Link to="/ShowItems" className="nav-link">View Store Items</Link>
          <Link to="/AddStoreItem" className="nav-link">Add New Item</Link>
          <button className="dwn-btn" onClick={handleDownloadPdf}>Download Report</button>
        </div>
      </nav>

      {/* Pass ref to Printable component */}
      <PrintableStoreGrid ref={componentRef} stores={stores} />
    </div>
  );
}

export default StoreList;
