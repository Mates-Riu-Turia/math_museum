import { Offcanvas, Nav } from "react-bootstrap";

export function Expositions({ show, handleClose, t, expositions }) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{t("expositionsOffcanvas.title")}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-start flex-grow-1 pe-3">
          {expositions.map((exposition) => {
            return (
              <li key={exposition._id}>
                <Nav.Link href={"/math_museum/expositions/" + exposition.name}>
                  <i className="bi bi-link"> </i>
                  {exposition.title}
                </Nav.Link>
              </li>
            );
          })}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}