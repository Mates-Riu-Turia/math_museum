import { React, useState } from "react";
import { Dropdown, Container, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Nav({ t, changeLanguage }) {
    const [state, setState] = useState(" " + t("chooseLang"));

    const changeLanguageHelper = (lang) => {
        changeLanguage(lang);
        setState(" " + lang.toUpperCase());
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src="images/favicon_big.gif" alt="Logo" width="180" height="60" className="d-inline-block align-text-middle me-1" />
                    {t("title")}
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
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
        </>
    );
}