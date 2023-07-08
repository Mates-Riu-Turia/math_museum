import { React, useState } from "react";
import { useTranslation } from "react-i18next";
import { Nav, Footer } from "./components/basicUI";

import { getData } from "./db";

import { Expositions } from "./components/expositions"

export default function App() {
    const { t, i18n } = useTranslation();

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const openOffcanvas = () => {setShowOffcanvas(true)};
    const closeOffcanvas = () => {setShowOffcanvas(false)};

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    //getData();

    // Set the Web Page Title
    document.title = t("title");

    return (
        <>
            <Nav t={t} changeLanguage={changeLanguage} setShowOffcanvas={openOffcanvas} />
            <Expositions show={showOffcanvas} handleClose={closeOffcanvas}/>
            <Footer t={t} />
        </>
    );
}