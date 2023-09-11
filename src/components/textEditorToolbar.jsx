import { useState, useEffect } from "react";
import { Stack, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { UNDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, CAN_REDO_COMMAND } from "lexical";

export function Toolbar({ t }) {
    return (
        <Stack direction="horizontal" className="border rounded-2 w-100 border-primary mb-2">
            <ToolbarContainer>
                <History />
            </ToolbarContainer>
        </Stack>
    );
}

function History() {
    const [editor] = useLexicalComposerContext();

    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    useEffect(() => {
        editor.registerCommand(CAN_UNDO_COMMAND, (payload) => {
            setCanUndo(payload);
            return true;
        }, 4);
        editor.registerCommand(CAN_REDO_COMMAND, (payload) => {
            setCanRedo(payload);
            return true;
        }, 4);
    }, []);

    const undo = () => {
        editor.dispatchCommand(UNDO_COMMAND);
    };

    const redo = () => {
        editor.dispatchCommand(REDO_COMMAND)
    }

    return (
        <>
            <ToolbarButton title={["Undo (", <kbd>Ctrl</kbd>, "+", <kbd>Z</kbd>, ")"]} disabled={!canUndo} onClick={undo}>
                <i className="bi bi-arrow-counterclockwise"></i>
            </ToolbarButton>
            <ToolbarButton title={["Redo (", <kbd>Ctrl</kbd>, "+", <kbd>Y</kbd>, ")"]} disabled={!canRedo} onClick={redo}>
                <i className="bi bi-arrow-clockwise"></i>
            </ToolbarButton >
        </>
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

function ToolbarButton({ children, title, onClick = (() => { }), disabled = false }) {
    return (
        <OverlayTrigger overlay={<Tooltip>{title}</Tooltip>}>
            <span className={"d-inline-block" + disabled && "cursor-not-allowed"}>
                <Button variant="outline-secondary m-1" onClick={onClick} disabled={disabled}>{children}</Button>
            </span>
        </OverlayTrigger>
    );
}