import { React, useState } from "react";
import { Dropdown, Container, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Nav({ t, changeLanguage }) {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src="images/favicon_big.gif" alt="Logo" width="180" height="60" className="d-inline-block align-text-middle me-1" />
                    {t("title")}
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <LanguageSelector t={t} changeLanguage={changeLanguage}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function LanguageSelector({ t, changeLanguage }) {
    const [state, setState] = useState(" " + t("chooseLang"));

    const changeLanguageHelper = (lang) => {
        changeLanguage(lang);
        setState(" " + lang.toUpperCase());
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" className="rounded-pill">
                <i className="bi bi-globe-americas"></i>
                <span id="langSelector">{state}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguageHelper("ca")}>Valencià/Català</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguageHelper("es")}>Castellano</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguageHelper("en")}>English</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function Footer({t}) {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top fixed-bottom bg-body-tertiary">
          <p className="col-md-4 mb-1 ms-2 text-body-secondary">{t("orgName")}</p>
    
          <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none me-3">
            <img src="images/favicon_org.ico" alt="Logo" width="30" height="24" className="align-text-top" />
          </a>
        </footer>
    );
}

export default function App() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // Set the Web Page Title
    document.title = t("title");

    return (
        <>
            <Nav t={t} changeLanguage={changeLanguage} />
            <Footer t={t} />
        </>
    );
}