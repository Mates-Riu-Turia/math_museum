import { Stack, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export function Toolbar({ t }) {
    return (
        <Stack direction="horizontal" className="border rounded-2 w-100 border-primary mb-2">
            <ToolbarContainer>
                <ToolbarButton title={["Undo (", <kbd>Ctrl</kbd>, "+", <kbd>Z</kbd>, ")"]}>
                    <i className="bi bi-arrow-counterclockwise"></i>
                </ToolbarButton>
                <ToolbarButton title={["Redo (", <kbd>Ctrl</kbd>, "+", <kbd>Y</kbd>, ")"]}>
                    <i className="bi bi-arrow-clockwise"></i>
                </ToolbarButton>
            </ToolbarContainer>
        </Stack>
    );
}

function ToolbarContainer({ children }) {
    return (
        <>
            <div className="me-2">
                {children}
            </div>
            <div className="vr"></div>
        </>

    );
}

function ToolbarButton({ children, title }) {
    return (
        <OverlayTrigger overlay={<Tooltip>{title}</Tooltip>}>
            <Button variant="outline-secondary m-1">{children}</Button>
        </OverlayTrigger>
    );
}