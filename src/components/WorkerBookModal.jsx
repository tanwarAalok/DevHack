
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function WorkerBooked(props) {
    const router = useRouter();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Booking Successfully Completed !
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-item-center flex-column">
        <h5>Successfully booked worker ! You can check booking details in by clicking below button.</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => router.push("/profile")}>See details</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WorkerBooked;
