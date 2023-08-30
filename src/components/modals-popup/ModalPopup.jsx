import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrency,
  addCurrencyValues,
  changeCurrencyHistory,
} from "store/currencies";

import {ADD_CURRENCY, ADD_CURRENCY_HISTORY, CHANGE_CURRENCY_HISTORY} from "constants/constants-modal"

const ModalPopup = (props) => {
  const [currencyName, setCurrencyName] = useState();
  const [currencyImage, setCurrencyImage] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [currencyDate, setCurrencyDate] = useState();
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const { typeFunc, currencyId, currencyHistoryId } = props;

  const currency = useSelector((state) => state.currencyList.currencies).find(
    (cur) => cur.id === currencyId
  );

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const typeButton = () => {
    if (typeFunc === ADD_CURRENCY) {
      return "primary";
    } else if (typeFunc === ADD_CURRENCY_HISTORY) {
      return "success";
    } else if (typeFunc === CHANGE_CURRENCY_HISTORY) {
      return "warning";
    }
  };

  const nameButton = () => {
    if (typeFunc === ADD_CURRENCY) {
      return "Add Currency";
    } else if (typeFunc === ADD_CURRENCY_HISTORY) {
      return "+Add Values";
    } else if (typeFunc === CHANGE_CURRENCY_HISTORY) {
      return "edit";
    }
  };

  const modalTitle = () => {
    if (typeFunc === ADD_CURRENCY) return "Add Currency";
    else if (typeFunc === ADD_CURRENCY_HISTORY)
      return `${currency.name} add currency history value`;
    else if (typeFunc === CHANGE_CURRENCY_HISTORY)
      return `${currency.name} change currency history`;
  };

  const modalInputs = () => {
    if (typeFunc === ADD_CURRENCY) {
      return (
        <Modal.Body>
          <Form.Group controlId="currencyName" className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={(e) => setCurrencyName(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="currencyImg" className="mb-3">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" onChange={handleInputImg} />
          </Form.Group>
        </Modal.Body>
      );
    } else {
      return (
        <Modal.Body>
          <Form.Group controlId="currencyValue" className="mb-3">
            <Form.Label>Amount in USD:</Form.Label>
            <Form.Control
              onChange={(e) => setCurrencyValue(e.target.value)}
              type="number"
            />
          </Form.Group>
          <Form.Group controlId="currency-time" className="mb-3">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              onChange={(e) => setCurrencyDate(e.target.value)}
              type="datetime-local"
              name="currencyTime"
            />
          </Form.Group>
        </Modal.Body>
      );
    }
  };

  const handleInputImg = (e) =>
    setCurrencyImage(URL.createObjectURL(e.target.files[0]));

  const handleSave = () => {
    if (typeFunc === ADD_CURRENCY)
      dispatch(addCurrency({ currencyName, currencyImage }));
    else if (typeFunc === ADD_CURRENCY_HISTORY)
      dispatch(
        addCurrencyValues({
          currencyId,
          currencyValue,
          currencyDate,
        })
      );
    else if (typeFunc === CHANGE_CURRENCY_HISTORY)
      dispatch(
        changeCurrencyHistory({
          currencyId,
          currencyHistoryId,
          currencyValue,
          currencyDate,
        })
      );

    setCurrencyName();
    setCurrencyDate();
    setCurrencyImage();
    handleCloseModal();
  };

  return (
    <div className="d-flex justify-content-center">
      <Button variant={typeButton()} onClick={handleShowModal}>
        {nameButton()}
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle()}</Modal.Title>
        </Modal.Header>
        {modalInputs()}
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalPopup;
