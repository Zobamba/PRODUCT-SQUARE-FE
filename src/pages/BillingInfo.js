import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from '../api/axios';
import { countries } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faTruck } from '@fortawesome/free-solid-svg-icons';
import './BillingInfo.scss';

const BillingInfo = () => {
  const USER_REGEX = /^[A-z][A-z]{2,23}$/;
  const EMAIL_REGEX = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/;
  const PHONE_REGEX = /^\+(?:[0-9] ?){6,14}[0-9]$/

  const navigate = useNavigate();

  const [homeChecked, setHomeChecked] = useState(true);
  const [officeChecked, setOfficeChecked] = useState(false);

  const [standardChecked, setStandardChecked] = useState(true);
  const [expressChecked, setExpressChecked] = useState(false);

  const [paypalChecked, setPaypalChecked] = useState(false);
  const [creditChecked, setCreditChecked] = useState(true);
  const [transferChecked, setTransferChecked] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const [email, setEmail] = useState();
  const [validEMail, setValidEmail] = useState(false);

  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');

  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [zip, setZip] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const [cvv, setCvv] = useState('');
  const [currentTab, setCurrentTab] = useState('billing-info')

  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
    setValidLastName(USER_REGEX.test(lastName));
  }, [firstName, lastName, USER_REGEX])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    // document.getElementById('home').checked = false;
  }, [email, EMAIL_REGEX])

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [email, PHONE_REGEX])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { firstName, lastName, email, phone, address, city, state, zip, country, cardNumber, nameOnCard, expiryDate, cvv }

    console.log(payload)
    try {
      const response = await axios.post('/post-billing-info',
        JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true
      }
      );
      console.log(JSON.stringify(response?.data));
      navigate("/invoices");

    } catch (err) {
      console.log(err);
    }
  }

  const countryOptions = Object.keys(countries).map((countryCode) => ({
    value: countryCode,
    label: countries[countryCode].name,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '30px',
      height: '30px',
      width: '99.7%',
      fontSize: '14px',
      border: `1px solid ${state.isFocused ? 'rgba(135, 221, 232)' : 'rgba(135, 221, 232, 0.5)'}`,
      borderRadius: '4px',
      outline: 'none',
      boxShadow: state.isFocused ? 'none' : 'none',
      '&:hover': {
        border: '',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '10px',
      fontWeight: '500',
      paddingLeft: '1px',
      textAlign: 'left',
      color: '#94a2ad',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '4px',
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '14px',
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '14px',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      backgroundColor: state.isSelected ? 'rgba(135, 221, 232, 0.3)' : 'transparent',
      color: state.isSelected ? '#000' : '#333',
      '&:hover': {
        backgroundColor: 'rgba(135, 221, 232, 0.3)',
      },
    }),
  };

  const changeHandler = country => {
    setCountry(country.label)
  }

  return (
    <div className="page-wrapper">
      {currentTab === 'billing-info' ?
        <div className="container">
          <div className="content">
            <div className="info">
              <ul>
                <li className={`${currentTab === 'billing-info' ? 'active' : ''}`}>
                  <div className="list-info">
                    <span className="number">01</span>
                    <h2>Billing Info</h2>
                  </div>
                </li>
                <li>
                  <div className="list-info">
                    <span className="number">02</span>
                    <h2>Shipping Info</h2>
                  </div>
                </li>
                <li>
                  <div className="list-info">
                    <span className="number">03</span>
                    <h2>Payment Info</h2>
                  </div>
                </li>
              </ul>
              <div className="instruction">
                <h2>Billing Information</h2>
                <p>Fill the form below in order to send your order&#39;s invoice.</p>
              </div>
              <form action="">
                <div className="medium">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name:<span className={!validFirstName || !firstName ? "invalid" : "hide"}>*</span></label>
                    <input type="text" id="firstName" name="firstName" placeholder="Enter Your First Name" onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name:<span className={!validLastName || !lastName ? "invalid" : "hide"}>*</span></label>
                    <input type="text" id="lastName" name="lastName" placeholder="Enter Your Last Name" onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="medium">
                  <div className="form-group">
                    <label htmlFor="email">Email Address:<span className={!validEMail || !email ? "invalid" : "hide"}>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone:<span className={!validPhone || !phone ? "invalid" : "hide"}>*</span></label>
                    <input type="phone" id="phone" name="phone" placeholder="Enter Your Phone Number" onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="long">
                  <div className="form-group-2">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" placeholder="Enter Your Full Address" onChange={(e) => setAddress(e.target.value)} />
                  </div>
                </div>
                <div className="short">
                  <div className="form-group-3">
                    <label htmlFor="city">Town/City:</label>
                    <input type="text" id="city" name="city" placeholder="Enter Your City Name" onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="form-group-3">
                    <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="state" placeholder="Enter Your State" onChange={(e) => setState(e.target.value)} />
                  </div>
                  <div className="form-group-3">
                    <label htmlFor="zip">Zip Code:</label>
                    <input type="text" id="zip" name="zip" placeholder="Enter Your Zip Code" onChange={(e) => setZip(e.target.value)} />
                  </div>
                </div>
                <div className="long">
                  <div className="form-group-2">
                    <label htmlFor="country">Country:</label>
                    <Select
                      className="select"
                      placeholder="Select Country"
                      styles={customStyles}
                      options={countryOptions}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div className="checkbox">
                  <div className="form-group-4">
                    <input type="checkbox" id="" name="" />
                    <label htmlFor="">Ship to different address ?</label>
                  </div>
                </div>
                <div className="notes">
                  <div className="form-group-5">
                    <label htmlFor="notes">Order Notes(Optional):</label>
                    <input type="text" id="notes" name="notes" placeholder="Write Short Notes" />
                    <span><FontAwesomeIcon icon={faEdit} /></span>
                  </div>
                </div>
              </form>
              <div className="buttons">
                <button className="btn-1"><span><FontAwesomeIcon className="icon" icon={faArrowLeft} />Back to Shopping Cart</span></button>
                <button className="btn-2" onClick={() => setCurrentTab('shipping-info')}><span><FontAwesomeIcon className="icon" icon={faTruck} />Proceed to Shipping</span></button>
              </div>
            </div>
          </div>
          <div className="order-summary">
            <ul className="bill-summary">
              <li><p>Order Summary</p></li>
              <li><p>Grand Total:</p><span>$50</span></li>
              <li><p>Discount:</p><span>$15</span></li>
              <li><p>Shipping Charge:</p><span>$65</span></li>
              <li><p>Estimated Task:</p><span>$15</span></li>
              <li><p>Total:</p><span>$115</span></li>
            </ul>
          </div>
        </div>
        :
        currentTab === 'shipping-info' ?
          <div className="container">
            <div className="content">
              <div className="info">
                <ul>
                  <li>
                    <div className="list-info">
                      <span className="number">01</span>
                      <h2>Billing Info</h2>
                    </div>
                  </li>
                  <li className={`${currentTab === 'shipping-info' ? 'active' : ''}`}>
                    <div className="list-info">
                      <span className="number">02</span>
                      <h2>Shipping Info</h2>
                    </div>
                  </li>
                  <li>
                    <div className="list-info">
                      <span className="number">03</span>
                      <h2>Payment Info</h2>
                    </div>
                  </li>
                </ul>
                <div className="instruction">
                  <h2>Saved Address</h2>
                  <p>Fill the form below in order to send your order&#39;s invoice.</p>
                </div>
                <form action="">
                  <div className="shipping">
                    <div className="home">
                      <div className="checkbox">
                        <div className="form-group">
                          <input
                            type="radio"
                            id="home"
                            name="home"
                            checked={homeChecked}
                            onChange={() => {
                              setHomeChecked(!homeChecked);
                              setOfficeChecked(false); // Uncheck the "Office" radio button
                            }}
                          />
                          <label htmlFor="homeAddress">Home</label>
                          <span><FontAwesomeIcon icon={faEdit} /></span>
                        </div>
                      </div>
                      <div className="home-info">
                        <h2>Brendan Craig</h2>
                        <p>Address:<span>3559 Roosevelt Wilson Lane San Bernardino, CA 92405</span></p>
                        <p>Phone:<span>(123) 456-7890</span></p>
                        <p>Mobile:<span>(+01) 123456789</span></p>
                      </div>
                    </div>
                    <div className="office">
                      <div className="checkbox">
                        <div className="form-group">
                          <input
                            type="radio"
                            id="office"
                            name="office"
                            checked={officeChecked}
                            onChange={() => {
                              setOfficeChecked(!officeChecked);
                              setHomeChecked(false); // Uncheck the "Home" radio button
                            }}
                          />
                          <label htmlFor="officeAddress">Office</label>
                          <span><FontAwesomeIcon icon={faEdit} /></span>
                        </div>
                      </div>
                      <div className="office-info">
                        <h2>Brendan Craig</h2>
                        <p>Address:<span>3559 Roosevelt Wilson Lane San Bernardino, CA 92405</span></p>
                        <p>Phone:<span>(123) 456-7890</span></p>
                        <p>Mobile:<span>(+01) 123456789</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="delivery-method">
                    <div className="instruction">
                      <h2>Shipping Method</h2>
                      <p>Fill the form below in order to send your order&#39;s invoice.</p>
                    </div>
                    <div className="delivery">
                      <div className="standard">
                        <div className="form-group">
                          <input
                            type="radio"
                            id="standard"
                            name="standard"
                            checked={standardChecked}
                            onChange={() => {
                              setStandardChecked(!standardChecked);
                              setExpressChecked(false); // Uncheck the "Office" radio button
                            }}
                          />
                          <label htmlFor="express">Standard Delivery - FREE</label>
                        </div>
                        <div className="delivery-info">
                          <p>Estimated 5-7 days shipping (Duties and task may be due upon delivery)</p>
                        </div>
                      </div>
                      <div className="express">
                        <div className="form-group">
                          <input
                            type="radio"
                            id="express"
                            name="express"
                            checked={expressChecked}
                            onChange={() => {
                              setExpressChecked(!expressChecked);
                              setStandardChecked(false); // Uncheck the "Office" radio button
                            }}
                          />
                          <label htmlFor="express">Express Delivery - PAID</label>
                        </div>
                        <div className="delivery-info">
                          <p>Estimated 1-3 days shipping (Duties and task may be due upon delivery)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="buttons m-top">
                  <button className="btn-1" onClick={() => setCurrentTab('billing-info')}><span><FontAwesomeIcon className="icon" icon={faArrowLeft} />Back to Billing Info</span></button>
                  <button className="btn-2" onClick={() => setCurrentTab('payment-info')}><span><FontAwesomeIcon className="icon" icon={faCreditCard} />Proceed to Payment</span></button>
                </div>
              </div>
            </div>
            <div className="order-summary">
              <ul className="bill-summary">
                <li><p>Order Summary</p></li>
                <li><p>Grand Total:</p><span>$50</span></li>
                <li><p>Discount:</p><span>$15</span></li>
                <li><p>Shipping Charge:</p><span>$65</span></li>
                <li><p>Estimated Task:</p><span>$15</span></li>
                <li><p>Total:</p><span>$115</span></li>
              </ul>
            </div>
          </div>
          :
          currentTab === 'payment-info' ?
            <div className="container">
              <div className="content">
                <div className="info">
                  <ul>
                    <li>
                      <div className="list-info">
                        <span className="number">01</span>
                        <h2>Billing Info</h2>
                      </div>
                    </li>
                    <li>
                      <div className="list-info">
                        <span className="number">02</span>
                        <h2>Shipping Info</h2>
                      </div>
                    </li>
                    <li className={`${currentTab === 'payment-info' ? 'active' : ''}`}>
                      <div className="list-info">
                        <span className="number">03</span>
                        <h2>Payment Info</h2>
                      </div>
                    </li>
                  </ul>
                  <div className="instruction">
                    <h2>Payment Section</h2>
                    <p>Fill the form below in order to send your order&#39;s invoice.</p>
                  </div>
                  <form action="">
                    <div className="payment-method">
                      <div className="paypal">
                        <div className="form-group">
                          <input
                            type="radio"
                            id="paypal"
                            name="paypal"
                            checked={paypalChecked}
                            onChange={() => {
                              setPaypalChecked(!paypalChecked);
                              setCreditChecked(false);
                              setTransferChecked(false);
                            }}
                          />
                          <label htmlFor="paypal">Pay with Paypal</label>
                        </div>
                        <div className="delivery-info">
                          <p>You will be redirected to PayPal website to complete your payment securely.</p>
                        </div>
                      </div>
                      <div className="credit-card">
                        <div className="form-group">
                          <input
                            type="radio"
                            id="credit-card"
                            name="credit-card"
                            checked={creditChecked}
                            onChange={() => {
                              setCreditChecked(!creditChecked);
                              setPaypalChecked(false);
                              setTransferChecked(false);
                            }}
                          />
                          <label htmlFor="credit-card">Credit / Debit Card</label>
                        </div>
                        <div className="delivery-info credit-crd">
                          <p>Safe money transfer using your bank account. We support Mastercard, Visa, Discover and Strip.</p>
                        </div>
                        <div className="long">
                          <div className="form-group-2">
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="4242 4242 4242 4242" onChange={(e) => setCardNumber(e.target.value)} />
                          </div>
                        </div>
                        <div className="short">
                          <div className="form-group-3">
                            <label htmlFor="name">Name on card:</label>
                            <input type="text" id="name" name="name" placeholder="Enter Cardholder name" onChange={(e) => setNameOnCard(e.target.value)} />
                          </div>
                          <div className="form-group-3">
                            <label htmlFor="expiry">Expiry Date:</label>
                            <input type="text" id="expiry" name="expiry" placeholder="MM/YY" onChange={(e) => setExpiryDate(e.target.value)} />
                          </div>
                          <div className="form-group-3">
                            <label htmlFor="zip">CVV Code:</label>
                            <input type="text" id="zip" name="zip" placeholder="012" onChange={(e) => setCvv(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <div className="bank-transfer">
                        <div className="form-group frm">
                          <input
                            type="radio"
                            id="bank-transfer"
                            name="bank-transfer"
                            checked={transferChecked}
                            onChange={() => {
                              setTransferChecked(!transferChecked);
                              setCreditChecked(false);
                              setPaypalChecked(false);
                            }}
                          />
                          <label htmlFor="bank-transfer">Bank Transfer</label>
                        </div>
                        <h2>Bank Details: 00012345678965 ZENITH BANK</h2>
                        <div className="delivery-info bank-tfr">
                          <p>Kindly add description when transferring.</p>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="buttons m-top">
                    <button className="btn-1" onClick={() => setCurrentTab('shipping-info')}><span><FontAwesomeIcon className="icon" icon={faArrowLeft} />Back to Shipping Info</span></button>
                    <button className="btn-2" type='submit' onClick={handleSubmit}><span><FontAwesomeIcon className="icon" icon={faCreditCard} />Complete Payment</span></button>
                  </div>
                </div>
              </div>
              <div className="order-summary">
                <ul className="bill-summary">
                  <li><p>Order Summary</p></li>
                  <li><p>Grand Total:</p><span>$50</span></li>
                  <li><p>Discount:</p><span>$15</span></li>
                  <li><p>Shipping Charge:</p><span>$65</span></li>
                  <li><p>Estimated Task:</p><span>$15</span></li>
                  <li><p>Total:</p><span>$115</span></li>
                </ul>
              </div>
            </div>
            :
            ''
      }
    </div>
  );
}

export default BillingInfo;
