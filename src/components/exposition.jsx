import { useParams } from "react-router-dom";
import { Tabs, Tab, ListGroup } from "react-bootstrap";
import { NotFound } from "./notFound"

export function Exposition({ expositions, t }) {
    const { name } = useParams();

    const exposition = expositions.find(exposition => exposition.name == name);

    if (exposition === undefined) {
        return (
            <NotFound t={t} />
        );
    }

    return (
        <>
            <h2 className="text-center mt-3">{exposition.title}</h2>
            <Tabs
                defaultActiveKey="description"
                className="mt-3"
            >
                <Tab className="text-center m-5" eventKey="description" title={t("exposition.description")}
                    dangerouslySetInnerHTML={{ __html: exposition.description }}>
                </Tab>
                <Tab className="text-center m-5" eventKey="history" title={t("exposition.history")}
                    dangerouslySetInnerHTML={{ __html: exposition.history }}>
                </Tab>
                <Tab className="text-center m-5" eventKey="previous_knowledge" title={t("exposition.previous_knowledge")}
                    dangerouslySetInnerHTML={{ __html: exposition.knowledge }}>
                </Tab>
                <Tab className="text-center m-5" eventKey="applications" title={t("exposition.applications")}>
                    <ListGroup>
                        {exposition.applications.map(application => {
                            return (
                                <ListGroup.Item key={self.crypto.randomUUID()}
                                    dangerouslySetInnerHTML={{ __html: application }}>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Tab>
                <Tab className="text-center m-5" eventKey="visual_workshop" title={t("exposition.visual_workshop")}
                    dangerouslySetInnerHTML={{ __html: exposition.visual_workshop }}>
                </Tab>
                <Tab className="text-center m-5" eventKey="math_workshop" title={t("exposition.math_workshop")}
                    dangerouslySetInnerHTML={{ __html: exposition.math_workshop }}>
                </Tab>
                <Tab className="text-center m-5" eventKey="curiosities" title={t("exposition.curiosities")}>
                    <ListGroup>
                        {exposition.curiosities.map(curiosity => {
                            return (
                                <ListGroup.Item key={self.crypto.randomUUID()}
                                    dangerouslySetInnerHTML={{ __html: curiosity }}>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Tab>
            </Tabs>
        </>
    );
}