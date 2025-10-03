// src/Components/Store/AdminOrders.js
// Admin Orders management table: list, view, update-status, delete, and print
// Comments added to explain key logic and UI sections
import React, { useEffect, useRef, useState } from "react"; // React + hooks
import axios from "axios"; // HTTP client for API requests
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./AdminOrders.css"; // Styles for table and details

function AdminOrders() {
  // Orders list and UI state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'view' | 'update' | null
  const [saving, setSaving] = useState(false);
  const printRef = useRef(); // retained, though PDF generation no longer uses printing
  const [editStatuses, setEditStatuses] = useState({}); // Local edits for status per order id
  const [editShipTo, setEditShipTo] = useState({}); // Local edits for shipping address
  const [editPhone, setEditPhone] = useState({}); // Local edits for contact phone

  // Generate PDF using jsPDF + autoTable
  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Orders Report", 14, 16);

      const tableBody = (orders || []).map((o) => [
        o.order_number || "-",
        o.member?.username || o.member?.userName || o.member?.email || String(o.member || "-"),
        `LKR ${o.total_amount ?? "-"}`,
        o.status || "-",
      ]);

      autoTable(doc, {
        startY: 22,
        head: [["Order No", "Customer", "Total", "Status"]],
        body: tableBody,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [37, 99, 235] },
      });

      doc.save("Orders_Report.pdf");
    } catch (e) {
      alert("Failed to generate PDF");
    }
  };

  // Load all orders for admin view
  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/orders");
      const list = res.data || [];
      setOrders(list);
      // Initialize editable status map from server data
      const initialStatuses = {};
      const initialShip = {};
      const initialPhone = {};
      list.forEach((o) => {
        initialStatuses[o._id] = o.status;
        initialShip[o._id] = o.shipping_address || "";
        initialPhone[o._id] = o.contact_phone || "";
      });
      setEditStatuses(initialStatuses);
      setEditShipTo(initialShip);
      setEditPhone(initialPhone);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete an order (admin only)
  const handleDelete = async (orderId) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      if (selected?._id === orderId) setSelected(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete order");
    }
  };

  // (Removed unused inline status update handler to resolve linter warning)

  const handleSaveUpdateModal = async () => {
    if (!selected) return;
    const orderId = selected._id;
    const payload = {
      status: editStatuses[orderId] ?? selected.status,
      shipping_address: editShipTo[orderId] ?? selected.shipping_address,
      contact_phone: editPhone[orderId] ?? selected.contact_phone,
    };
    try {
      setSaving(true);
      const res = await axios.put(`http://localhost:5000/orders/${orderId}`, payload);
      // sync lists and local edits
      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
      setSelected(null);
      setModalMode(null);
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || "Failed to update order";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  // Track status value selected in the dropdown before saving
  const handleEditChange = (orderId, value) => {
    setEditStatuses((prev) => ({ ...prev, [orderId]: value }));
  };

  // UI: header, table, and details card
  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h2>Orders</h2>
        <button className="btn pdf" onClick={handleDownloadPdf}>Download PDF</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Printable region */}
      <div ref={printRef}>
        <table>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td data-label="Order No">{o.order_number}</td>
                <td data-label="Customer">{o.member?.username || o.member?.userName || o.member?.email || o.member}</td>
                <td data-label="Total">LKR {o.total_amount}</td>
                <td data-label="Status">
                  <div className="status-cell">
                    <select
                      className="status-select"
                      value={editStatuses[o._id] ?? o.status}
                      onChange={(e) => handleEditChange(o._id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </div>
                </td>
                <td className="orders-actions" data-label="Actions">
                  <button className="btn view" onClick={() => { setSelected(o); setModalMode('view'); }}>View</button>
                  <button
                    className="btn update"
                    onClick={() => { setSelected(o); setModalMode('update'); }}
                  >
                    Update
                  </button>
                  <button className="btn danger" onClick={() => handleDelete(o._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered modal for view/update */}
      {selected && (
        <div className="modal-overlay" onClick={() => { setSelected(null); setModalMode(null); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === 'update' ? 'Update Order' : 'Order Details'} - {selected.order_number}</h3>
              <button className="modal-close" onClick={() => { setSelected(null); setModalMode(null); }}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Customer:</strong> {selected.member?.username || selected.member?.userName || selected.member?.email || selected.member}</p>
              <p><strong>Date:</strong> {new Date(selected.createdAt || selected.order_date).toLocaleString()}</p>
              <p><strong>Payment:</strong> {selected.payment_method || "-"}</p>
              <p><strong>Ship to:</strong> {selected.shipping_address || "-"}</p>
              <p><strong>Phone:</strong> {selected.contact_phone || "-"}</p>

              {modalMode === 'update' ? (
                <>
                  <div className="modal-update-row">
                    <label htmlFor="status"><strong>Status:</strong></label>
                    <select
                      id="status"
                      className="status-select"
                      value={editStatuses[selected._id] ?? selected.status}
                      onChange={(e) => handleEditChange(selected._id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </div>
                  <div className="modal-update-row">
                    <label htmlFor="ship"><strong>Ship to:</strong></label>
                    <input
                      id="ship"
                      type="text"
                      className="status-select"
                      value={editShipTo[selected._id] ?? ""}
                      onChange={(e) => setEditShipTo((prev) => ({ ...prev, [selected._id]: e.target.value }))}
                    />
                  </div>
                  <div className="modal-update-row">
                    <label htmlFor="phone"><strong>Phone:</strong></label>
                    <input
                      id="phone"
                      type="text"
                      className="status-select"
                      value={editPhone[selected._id] ?? ""}
                      onChange={(e) => setEditPhone((prev) => ({ ...prev, [selected._id]: e.target.value }))}
                    />
                  </div>
                </>
              ) : (
                <p><strong>Status:</strong> {selected.status}</p>
              )}

              <h4>Items</h4>
              <ul>
                {(selected.items || []).map((it, idx) => (
                  <li key={idx}>
                    {it.product?.name || it.product} × {it.quantity} @ LKR {it.price} = LKR {it.subtotal}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> LKR {selected.total_amount}</p>
            </div>
            <div className="modal-footer">
              {modalMode === 'update' ? (
                <button
                  className="btn update"
                  disabled={saving}
                  onClick={handleSaveUpdateModal}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              ) : null}
              <button className="btn" onClick={() => { setSelected(null); setModalMode(null); }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;


