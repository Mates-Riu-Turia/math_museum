import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

export function Expositions({ show, handleClose }) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="mb-0">
          This is content within an <code>.offcanvas-lg</code>.
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
}