import { useState } from "react";
import { Form, Alert, Button, Row, Col, FloatingLabel, Container, Modal, Tabs, Tab } from "react-bootstrap";
import { TextEditor } from "./editor/textEditor"

export function AddExposition({ t, isTeacher }) {
    if (isTeacher) {
        // This state saves if the form was processed or not
        const [validated, setValidated] = useState(false);

        // This function validates the form
        const handleSubmit = async (event) => { };

        // This state manages if the AddContent modal will be shown or not
        const [showModal, setShowModal] = useState(false);

        return (
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <AddContent t={t} show={showModal} setShow={setShowModal} />

                <h1>{t("addExposition.title")}</h1>

                <div className="editor-quote">
                    <i className="bi bi-info-circle-fill"></i>
                    {t("addExposition.help")}
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Container fluid>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    label={t("addExposition.urlName")}
                                    className="mb-3"
                                >
                                    <Form.Control name="name" required type="text" placeholder="" />
                                    <Form.Control.Feedback>{t("verify.ok")}</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{t("verify.urlName")}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    label={t("addExposition.titleES")}
                                    className="mb-3"
                                >
                                    <Form.Control name="titleES" required type="text" placeholder="" />
                                    <Form.Control.Feedback>{t("addExposition.verify.ok")}</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{t("addExposition.verify.title")}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    label={t("addExposition.titleCAT")}
                                    className="mb-3"
                                >
                                    <Form.Control name="titleCAT" required type="text" placeholder="" />
                                    <Form.Control.Feedback>{t("addExposition.verify.ok")}</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{t("addExposition.verify.title")}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    label={t("addExposition.titleEN")}
                                    className="mb-3"
                                >
                                    <Form.Control name="titleEN" required type="text" placeholder="" />
                                    <Form.Control.Feedback>{t("addExposition.verify.ok")}</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{t("addExposition.verify.title")}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="outline-primary" className="w-100 mb-2" onClick={() => setShowModal(true)}>{t("addExposition.btn") + " (Castellano)"}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="outline-primary" className="w-100 mb-2" onClick={() => setShowModal(true)}>{t("addExposition.btn") + " (Valencià/Català)"}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="outline-primary" className="w-100 mb-2" onClick={() => setShowModal(true)}>{t("addExposition.btn") + " (English)"}</Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        );
    }
    return (
        <h1>ERROR: Access Denied</h1>
    );
}

function AddContent({ t, show, setShow }) {
    return (
        <Modal show={show} onHide={() => setShow(false)} fullscreen={true}>
            <Modal.Header closeButton>
                <Modal.Title>{t("addExposition.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TabEditor t={t} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShow(false)}>
                    Save Changes
                </Button>
                <Button variant="danger" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function TabEditor({ t }) {
    return (
        <Tabs
            defaultActiveKey="description"
            className="mt-3"
        >
            <Tab className="text-center m-5 h-100" eventKey="description" title={t("exposition.description")}>
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
