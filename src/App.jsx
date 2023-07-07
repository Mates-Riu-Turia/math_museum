import { React } from "react";
import { useTranslation } from "react-i18next";
import { Nav, Footer } from "./basicUI";

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