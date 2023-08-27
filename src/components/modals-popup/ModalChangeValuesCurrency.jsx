import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { changeCurrencyHistory } from "../../store/currencies";

const ModalValuesCurrency = (props) => {
  const { currencyId, currencyHistoryId, oldValue, oldDate } = props;
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const [newValue, setValue] = useState();
  const [newDate, setDate] = useState();

  const handleSave = () => {
    dispatch(
      changeCurrencyHistory({
        currencyId,
        currencyHistoryId,
        newValue,
        newDate,
      })
    );
    handleCloseModal();
  };

  return (
    <div>
      <Button variant="warning" onClick={handleShowModal}>
        Edit
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="currencyValue" className="mb-3">
            <Form.Label>New value:</Form.Label>
            <Form.Control
              onChange={(e) => setValue(e.target.value)}
              type="number"
              min="0"
              placeholder={oldValue}
            />
          </Form.Group>
          <Form.Group controlId="currency-time" className="mb-3">
            <Form.Label>New Date:</Form.Label>
            <Form.Control
              onChange={(e) => setDate(e.target.value)}
              type="datetime-local"
              name="currencyTime"
            />
            <p>Old date: {new Date(oldDate).toLocaleString()}</p>
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
