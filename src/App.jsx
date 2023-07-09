import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getExpositions } from "./db";

import { Nav, Footer, Logo } from "./components/basicUI";

import { Expositions } from "./components/expositions"
import { Exposition } from "./components/exposition";
import { NotFound } from "./components/notFound";

export default function App() {
    const { t, i18n } = useTranslation();

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const openOffcanvas = () => { setShowOffcanvas(true) };
    const closeOffcanvas = () => { setShowOffcanvas(false) };

    // Get the expositions list
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

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // Set the Web Page Title
    document.title = t("title");

    return (
        <Router>
            <Nav t={t} changeLanguage={changeLanguage} setShowOffcanvas={openOffcanvas} />
            <Expositions show={showOffcanvas} handleClose={closeOffcanvas} i18n={i18n} t={t} expositions={expositions}/>
            <Routes>
                <Route path="/math_museum" element={<Logo t={t} />} />
                <Route path="/math_museum/expositions/:name" element={<Exposition expositions={expositions} t={t} />} />
                <Route path="*" element={<NotFound t={t} />} />
            </Routes>
            <Footer t={t} />
        </Router>
    );
}