import { useState, useEffect } from "react";
import { Stack, Button, OverlayTrigger, Tooltip, ToggleButton, Dropdown } from "react-bootstrap";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { UNDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, CAN_REDO_COMMAND, COMMAND_PRIORITY_CRITICAL, FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, $getSelection, $isRangeSelection, $isElementNode } from "lexical";

export function Toolbar({ t }) {
    const [editor] = useLexicalComposerContext();

    const [elementFormat, setElementFormat] = useState("left");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    const updateToolbar = () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
            const node = selection.anchor.getNode();
            const parent = node.getParent();

            const format = $isElementNode(node) ? node.getFormatType() : parent.getFormatType();

            setElementFormat(format ? format : "left");

            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
        }
    };

    useEffect(() => {
        editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                updateToolbar();
            });

            editor.registerCommand(CAN_UNDO_COMMAND, (payload) => {
                setCanUndo(payload);
            }, COMMAND_PRIORITY_CRITICAL);

            editor.registerCommand(CAN_REDO_COMMAND, (payload) => {
                setCanRedo(payload);
            }, COMMAND_PRIORITY_CRITICAL);
        });

    }, [editor, updateToolbar, setIsBold, setIsItalic, setIsUnderline]);

    return (
        <Stack direction="horizontal" className="border rounded-2 w-100 border-primary mb-2">
            <History t={t} editor={editor} canUndo={canUndo} canRedo={canRedo} />
            <Format t={t} editor={editor} isBold={isBold} isItalic={isItalic} isUnderline={isUnderline} />
            <Alignement t={t} editor={editor} elementFormat={elementFormat} />
        </Stack>
    );
}

function History({ t, editor, canUndo, canRedo }) {
    const undo = () => {
        editor.dispatchCommand(UNDO_COMMAND);
    };

    const redo = () => {
        editor.dispatchCommand(REDO_COMMAND);
    }

    return (
        <ToolbarContainer>
            <ToolbarButton title={["Undo (", <kbd>Ctrl</kbd>, "+", <kbd>Z</kbd>, ")"]} disabled={!canUndo} onClick={undo}>
                <i className="bi bi-arrow-counterclockwise"></i>
            </ToolbarButton>
            <ToolbarButton title={["Redo (", <kbd>Ctrl</kbd>, "+", <kbd>Y</kbd>, ")"]} disabled={!canRedo} onClick={redo}>
                <i className="bi bi-arrow-clockwise"></i>
            </ToolbarButton >
        </ToolbarContainer>
    );
}

function Format({ t, editor, isBold, isItalic, isUnderline }) {
    const setFormat = (format) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    };

    return (
        <ToolbarContainer>
            <ToolbarButton title={["Bold (", <kbd>Ctrl</kbd>, "+", <kbd>B</kbd>, ")"]} checked={isBold} onClick={() => setFormat("bold")}>
                <i className="bi bi-type-bold"></i>
            </ToolbarButton>
            <ToolbarButton title={["Italic (", <kbd>Ctrl</kbd>, "+", <kbd>I</kbd>, ")"]} checked={isItalic} onClick={() => setFormat("italic")}>
                <i className="bi bi-type-italic"></i>
            </ToolbarButton>
            <ToolbarButton title={["Underline (", <kbd>Ctrl</kbd>, "+", <kbd>U</kbd>, ")"]} checked={isUnderline} onClick={() => setFormat("underline")}>
                <i className="bi bi-type-underline"></i>
            </ToolbarButton>
        </ToolbarContainer>
    );
}

function Alignement({ t, editor, elementFormat }) {
    const setFormat = (format) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
    }

    const iconName = (format) => {
        return (format == "justify" ? "justify" : ("text-" + format));
    }

    return (
        <ToolbarContainer>
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                    <i className={"bi bi-" + iconName(elementFormat)}></i>
                    {t("editor.align." + elementFormat)}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFormat("left")}>
                        <i className="bi bi-text-left"> </i>
                        Left Align
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFormat("center")}>
                        <i className="bi bi-text-center"> </i>
                        Center Align
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFormat("right")}>
                        <i className="bi bi-text-right"> </i>
                        Right Align
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFormat("justify")}>
                        <i className="bi bi-justify"> </i>
                        Justify Align
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </ToolbarContainer>
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