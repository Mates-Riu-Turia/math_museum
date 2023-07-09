import { useParams } from "react-router-dom";
import { Tabs, Tab, ListGroup } from "react-bootstrap";

export function Exposition({ expositions, t }) {
    const { name } = useParams();

    const exposition = expositions.find(exposition => exposition.name == name);

    return (
        <>
            <h2 className="text-center mt-3">{exposition.title}</h2>
            <Tabs
                defaultActiveKey="description"
                className="mt-3"
            >
                <Tab className="text-center mt-2" eventKey="description" title={t("exposition.description")}>
                    {exposition.description}
                </Tab>
                <Tab className="text-center mt-2" eventKey="history" title={t("exposition.history")}>
                    {exposition.history}
                </Tab>
                <Tab className="text-center mt-2" eventKey="previous_knowledge" title={t("exposition.previous_knowledge")}>
                    {exposition.previous_knowledge}
                </Tab>
                <Tab className="text-center mt-2" eventKey="applications" title={t("exposition.applications")}>
                    <ListGroup>
                        {exposition.applications.map(application => {
                            return (
                                <ListGroup.Item key={self.crypto.randomUUID()}>
                                    {application}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Tab>
                <Tab className="text-center mt-2" eventKey="visual_workshop" title={t("exposition.visual_workshop")}>
                    {exposition.visual_workshop}
                </Tab>
                <Tab className="text-center mt-2" eventKey="math_workshop" title={t("exposition.math_workshop")}>
                    {exposition.math_workshop}
                </Tab>
                <Tab className="text-center mt-2" eventKey="curiosities" title={t("exposition.curiosities")}>
                    <ListGroup>
                        {exposition.curiosities.map(curiosity => {
                            return (
                                <ListGroup.Item key={self.crypto.randomUUID()}>
                                    {curiosity}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Tab>
            </Tabs>
        </>
    );
}