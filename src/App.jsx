import { React } from "react";
import { useTranslation } from "react-i18next";
import { Nav, Footer } from "./components/basicUI";

import { getData } from "./db";

export default function App() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    getData();

    // Set the Web Page Title
    document.title = t("title");

    return (
        <>
            <Nav t={t} changeLanguage={changeLanguage} />
            <Footer t={t} />
        </>
    );
}