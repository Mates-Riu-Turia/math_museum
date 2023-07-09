import { useState, useEffect } from "react";
import { Offcanvas, Navbar, Container, Nav } from "react-bootstrap";

import { getExpositions } from "../db";

export function Expositions({ show, handleClose, t, i18n }) {
  const [lang, setLang] = useState(i18n.language);
  const [expositions, setExpositions] = useState(null);

  if (lang != i18n.language) {
    setLang(i18n.language);
  }

  useEffect(() => {
    const expositionsSync = async () => {
      const expos = await getExpositions(lang.split('-')[0]);
      setExpositions(expos);
    };
    expositionsSync();
  }, [lang]);


  if (expositions === null) {
    return (<></>);
  }

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{t("expositionsOffcanvas.title")}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Navbar>
          <Container>
            <Nav className="me-auto">
              {expositions.map((exposition) => {
                return (<Nav.Link href={exposition.name} key={exposition._id}>{exposition.title}</Nav.Link>);
              })}
            </Nav>
          </Container>
        </Navbar>
      </Offcanvas.Body>
    </Offcanvas>
  );
}