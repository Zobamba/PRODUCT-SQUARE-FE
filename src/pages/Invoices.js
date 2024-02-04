import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Invoices.scss";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await axios.get('/invoices');

        console.log(response.data.invoices);
        setInvoices(response.data.invoices);

      } catch (err) {
        console.error(err);
      }
    }

    getInvoices();

  }, []);

  const formatDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      formattedDate: formattedDate.replace(',', ''),
      formattedTime,
    };
  };

  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const paginationButtons = [];

  for (let i = startPage; i <= 5; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={currentPage === i ? 'active' : ''}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className="invoice">
      <div className="container">
        <div className="body">
          <div className="content-hdr">
            <div className="filter">
              <div className="search">
                <input type="text" placeholder="Search..." />
              </div>
              <div className="status">
                <label>Status
                  <select id="status" name='status'>
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="buttons">
              <button className="btn-1"><span>Add New Order</span></button>
              <button className="btn-2"><span>Export</span></button>
            </div>
          </div>
          <div className="content">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center text-secondary ">
                      <div className="form-group">
                        <input type="checkbox" id="checkbox" name="" />
                      </div>
                    </th>
                    <th className="text-center text-secondary ">Order ID</th>
                    <th className="text-center text-secondary ">Billing Name</th>
                    <th className="text-center text-secondary">Date</th>
                    <th className="text-center text-secondary ">Payment Status</th>
                    <th className="text-center text-secondary ">Total</th>
                    <th className="text-center text-secondary ">Payment Methods</th>
                    <th className="text-center text-secondary ">Order Status</th>
                  </tr>
                </thead>
                {invoices &&
                  <tbody>
                    {invoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((invoice, i) => {
                      const formattedDateTime = formatDate(new Date(invoice.createdAt));
                      return (
                        <tr key={i}>
                          <td className="align-middle">
                            <div className="form-group">
                              <input type="checkbox" id={`checkbox-${i}`} name="" />
                            </div>
                          </td>
                          <td className="align-middle">
                            <p>#EM204{invoice.id}</p>
                          </td>
                          <td className="align-middle">
                            <p>{invoice.billingName}</p>
                          </td>
                          <td className="align-middle">
                            <span className="font-weight-bold date">{formattedDateTime.formattedDate}</span>
                            <span className="font-weight-bold time">{formattedDateTime.formattedTime}</span>
                          </td>
                          <td className="align-middle align-left">
                            <span className={`status ${invoice.paymentStatus === 'Paid' ? 'paid' :
                              invoice.paymentStatus === 'Awaiting Authorization' ? 'auth' :
                                invoice.paymentStatus === 'Payment Failed' ? 'failed' : ''}`}>
                              {invoice.paymentStatus}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span className="font-weight-bold">${invoice.total}</span>
                          </td>
                          <td className="align-middle">
                            <span className="font-weight-bold">{invoice.paymentMethod}</span>
                          </td>
                          <td className="align-middle">
                            <span className={`order-status ${invoice.orderStatus === 'Delivered' ? 'delivered' :
                              invoice.orderStatus === 'Shipped' ? 'shipped' :
                                invoice.orderStatus === 'Cancelled' ? 'cancelled' :
                                  invoice.orderStatus === 'Processing' ? 'processing' : ''}`}>
                              {invoice.orderStatus}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>}

              </table>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="count">
            <p>{`Showing orders ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              invoices.length
            )} of ${invoices.length}`}</p>
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span><FontAwesomeIcon icon={faAngleDoubleLeft} /></span>
            </button>
            {paginationButtons}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span><FontAwesomeIcon icon={faAngleDoubleRight} /></span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Invoices;
