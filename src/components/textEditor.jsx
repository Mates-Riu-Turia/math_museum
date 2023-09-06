import { Tabs, Tab } from "react-bootstrap";

export function TabEditor({ t }) {
    return (
        <Tabs
            defaultActiveKey="description"
            className="mt-3"
        >
            <Tab className="text-center m-5" eventKey="description" title={t("exposition.description")}>
                <TextEditor t={t} />
            </Tab>

            <Tab className="text-center m-5" eventKey="history" title={t("exposition.history")}>

            </Tab>

            <Tab className="text-center m-5" eventKey="previous_knowledge" title={t("exposition.previous_knowledge")}>

            </Tab>

            <Tab className="text-center m-5" eventKey="applications" title={t("exposition.applications")}>

            </Tab>

            <Tab className="text-center m-5" eventKey="visual_workshop" title={t("exposition.visual_workshop")}>

            </Tab>

            <Tab className="text-center m-5" eventKey="math_workshop" title={t("exposition.math_workshop")}>

            </Tab>

            <Tab className="text-center m-5" eventKey="curiosities" title={t("exposition.curiosities")}>

            </Tab>
        </Tabs>

    );
}

export function TextEditor({t}) {
    return (
        <></>
    );
}