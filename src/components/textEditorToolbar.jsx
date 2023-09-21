import { useState, useEffect } from "react";
import { Stack, Button, OverlayTrigger, Tooltip, ToggleButton } from "react-bootstrap";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { UNDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, CAN_REDO_COMMAND, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_CRITICAL, FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection } from "lexical";

export function Toolbar({ t }) {
    return (
        <Stack direction="horizontal" className="border rounded-2 w-100 border-primary mb-2">
            <ToolbarContainer>
                <History />
            </ToolbarContainer>
            <ToolbarContainer>
                <Format />
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
        }, COMMAND_PRIORITY_CRITICAL);
        editor.registerCommand(CAN_REDO_COMMAND, (payload) => {
            setCanRedo(payload);
            return true;
        }, COMMAND_PRIORITY_CRITICAL);
    }, []);

    const undo = () => {
        editor.dispatchCommand(UNDO_COMMAND);
    };

    const redo = () => {
        editor.dispatchCommand(REDO_COMMAND);
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

function Format() {
    const [editor] = useLexicalComposerContext();

    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderlined, setIsUnderlined] = useState(false);

    useEffect(() => {
        editor.registerCommand(SELECTION_CHANGE_COMMAND, () => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    setIsBold(selection.hasFormat("bold"));
                    setIsItalic(selection.hasFormat("italic"));
                    setIsUnderlined(selection.hasFormat("underline"));
                }
            })
            return true;
        }, COMMAND_PRIORITY_CRITICAL)
    }, [editor]);

    const setFormat = (format) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    };

    return (
        <>
            <ToolbarButton title={["Bold (", <kbd>Ctrl</kbd>, "+", <kbd>B</kbd>, ")"]} checked={isBold} onClick={() => setFormat("bold")}>
                <i className="bi bi-type-bold"></i>
            </ToolbarButton>
            <ToolbarButton title={["Italic (", <kbd>Ctrl</kbd>, "+", <kbd>I</kbd>, ")"]} checked={isItalic} onClick={() => setFormat("italic")}>
                <i className="bi bi-type-italic"></i>
            </ToolbarButton>
            <ToolbarButton title={["Underline (", <kbd>Ctrl</kbd>, "+", <kbd>U</kbd>, ")"]} checked={isUnderlined} onClick={() => setFormat("underline")}>
                <i className="bi bi-type-underline"></i>
            </ToolbarButton>
        </>
    );
}

function ToolbarContainer({ children }) {
    return (
        <>
            <div className="ms-2 me-2">
                {children}
            </div>
            <div className="vr"></div>
        </>

    );
}

function ToolbarButton({ children, title, onClick = (() => { }), disabled = false, checked = false }) {
    return (
        <OverlayTrigger overlay={<Tooltip>{title}</Tooltip>}>
            <span className={"d-inline-block " + (disabled && "cursor-not-allowed")}>
                {checked ? (<ToggleButton variant="outline-secondary m-1" onClick={onClick} disabled={disabled} checked={checked} type="radio">{children}</ToggleButton>) :
                    <Button variant="outline-secondary m-1" onClick={onClick} disabled={disabled}>{children}</Button>}
            </span>
        </OverlayTrigger>
    );
}