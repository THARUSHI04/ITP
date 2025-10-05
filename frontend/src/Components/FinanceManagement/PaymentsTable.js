// src/Components/FinanceManagement/PaymentsTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentTable.css";

function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payment/all"); // Make sure route matches your backend
        setPayments(response.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to load payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="payments-table-container">
      <h2>All Payments</h2>
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
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.stripePaymentId}</td>
              <td>{payment.userName || "-"}</td>
              <td>{(payment.amount / 100).toFixed(2)}</td>
              <td>{payment.currency.toUpperCase()}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
              <td>
                <a
                  href={`http://localhost:5000/receipt/${payment.stripePaymentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsTable;
