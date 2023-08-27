import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { addCurrency } from "../../store/currencies";

const ModalCurrency = (props) => {
  const { type } = props;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const [name, setName] = useState();
  const [file, setFile] = useState();
  const handleInputImg = (e) => setFile(URL.createObjectURL(e.target.files[0]));

  const handleSave = () => {
    dispatch(addCurrency({ name, file }));
    setName();
    handleCloseModal();
  };

  return (
    <div className="d-flex justify-content-center">
      <Button
        className={type ? "mt-4" : null}
        variant={type ? "success" : "link"}
        onClick={handleShowModal}
      >
        Add Currency
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Currency Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="currencyName" className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="currencyImg" className="mb-3">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" onChange={handleInputImg} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCurrency;
