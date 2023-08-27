import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCurrencyValues } from "../../store/currencies";

const ModalValuesCurrency = (props) => {
  const { currency } = props;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const [value, setValue] = useState();
  const [date, setDate] = useState();

  const handleSave = () => {
    const idCurrency = currency.id;
    dispatch(addCurrencyValues({ idCurrency, value, date }));
    handleCloseModal();
    setValue();
    setDate();
  };

  return (
    <div className="d-flex justify-content-center">
      <Button variant="success" onClick={handleShowModal}>
        +Add Values
      </Button>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currency.name} Value Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="currencyValue" className="mb-3">
            <Form.Label>Amount in USD:</Form.Label>
            <Form.Control
              onChange={(e) => setValue(e.target.value)}
              type="number"
            />
          </Form.Group>
          <Form.Group controlId="currency-time" className="mb-3">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              onChange={(e) => setDate(e.target.value)}
              type="datetime-local"
              name="currencyTime"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalValuesCurrency;
