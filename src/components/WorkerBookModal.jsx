import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function WorkerBooked(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = await JSON.parse(sessionStorage.getItem("token"))._id;
      const { workerid: workerId } = props;

      await axios.post("/api/booking", {
        date,
        time,
        address,
        userId,
        workerId,
      });
      alert("Booking successfull !");
    } catch (err) {
      alert("Something went wrong");
      console.log(err.message);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add more details to confirm booking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-item-center flex-column">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTime">
            <Form.Label>Select Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="time"
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter booking address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirm Booking
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default WorkerBooked;
