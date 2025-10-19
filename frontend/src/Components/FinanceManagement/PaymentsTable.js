// src/Components/FinanceManagement/PaymentsTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentTable.css";

function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null); // Track which receipt is downloading

  // Function to fetch payments
  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/payment/all");
      console.log("Payments fetched:", response.data); // Debug log
      setPayments(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("❌ Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  // Fetch payments on mount & set auto-refresh
  useEffect(() => {
    fetchPayments(); // initial fetch

    const interval = setInterval(() => {
      fetchPayments(); // auto-refresh every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // Download receipt function
  const downloadReceipt = async (stripePaymentId) => {
    try {
      setDownloadingId(stripePaymentId);

      const res = await axios.get(
        `http://localhost:5000/receipt/download-receipt/${stripePaymentId}`,
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt_${stripePaymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
      alert("Download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="payments-table-container">
      <h2>All Payments</h2>

      {/* Refresh Button */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
          onClick={fetchPayments}
          style={{ padding: "6px 12px", borderRadius: "6px", backgroundColor: "#1a73e8", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Refresh
        </button>
      </div>

      <table className="payments-table">
        <thead>
          <tr>
            <th>Stripe ID</th>
            <th>User Name</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No payments found
              </td>
            </tr>
          )}
          {payments.map((payment) => {
            const formattedDate = payment.createdAt
              ? new Date(payment.createdAt).toLocaleString()
              : "-";

            return (
              <tr key={payment._id}>
                <td>{payment.stripePaymentId || "-"}</td>
                <td>{payment.userName || "-"}</td>
                <td>{payment.amount != null ? (payment.amount / 100).toFixed(2) : "-"}</td>
                <td>{(payment.currency || "usd").toUpperCase()}</td>
                <td>{payment.status || "-"}</td>
                <td>{formattedDate}</td>
                <td>
                  {payment.stripePaymentId ? (
                    <button
                      onClick={() => downloadReceipt(payment.stripePaymentId)}
                      disabled={downloadingId === payment.stripePaymentId}
                    >
                      {downloadingId === payment.stripePaymentId ? "Downloading..." : "Download"}
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsTable;
