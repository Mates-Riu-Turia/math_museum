export function NotFound({ t }) {
    return (
        <div className="d-flex align-items-center justify-content-center position-absolute top-50 end-50 start-50 translate-middle">
            <div className="text-center">
                <p className="fs-3">
                    <span className="text-danger">{t("notFound.onomatopoeia")}</span>{t("notFound.error")}
                </p>
                <h1 className="display-1 fw-bold">404</h1>
                <p className="lead">
                    {t("notFound.description")}
                </p>
                <a href="/math_museum/" className="btn btn-primary">
                    {t("notFound.home")}
                    <i className="bi bi-house-fill ms-1"></i>
                </a>
            </div>
        </div>
    );
}   