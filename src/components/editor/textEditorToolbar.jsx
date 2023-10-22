import { useState, useEffect } from "react";
import { Stack, Button, OverlayTrigger, Tooltip, ToggleButton, Dropdown } from "react-bootstrap";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { UNDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, CAN_REDO_COMMAND, COMMAND_PRIORITY_CRITICAL, FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, $getSelection, $isRangeSelection, $isElementNode, $isRootOrShadowRoot } from "lexical";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $isHeadingNode, $createParagraphNode, $createQuoteNode, $isQuoteNode } from "@lexical/rich-text";
import { $isListNode, INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $findMatchingParent } from "@lexical/utils";

const FONT_FAMILY_OPTIONS = [
    ["Arial", "Arial"],
    ["Courier New", "Courier New"],
    ["Georgia", "Georgia"],
    ["Times New Roman", "Times New Roman"],
    ["Trebuchet MS", "Trebuchet MS"],
    ["Verdana", "Verdana"],
];

const FONT_SIZE_OPTIONS = [
    ["10px", "10px"],
    ["11px", "11px"],
    ["12px", "12px"],
    ["13px", "13px"],
    ["14px", "14px"],
    ["15px", "15px"],
    ["16px", "16px"],
    ["17px", "17px"],
    ["18px", "18px"],
    ["19px", "19px"],
    ["20px", "20px"],
    ["21px", "21px"],
    ["22px", "23px"],
    ["24px", "24px"]
];

export function Toolbar({ t }) {
    const [editor] = useLexicalComposerContext();

    const [elementFormat, setElementFormat] = useState("left");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [fontSize, setFontSize] = useState("16px");
    const [blockType, setBlockType] = useState("paragraph");

    const updateToolbar = () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
            const node = selection.anchor.getNode();
            const parent = node.getParent();
            const element = node.getKey() === 'root'
                ? node
                : $findMatchingParent(node, (e) => {
                    const parent = e.getParent();
                    return parent !== null && $isRootOrShadowRoot(parent);
                });

            const format = $isElementNode(node) ? node.getFormatType() : parent.getFormatType();

            setElementFormat(format ? format : "left");

            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));

            if ($isHeadingNode(element)) {
                setBlockType(element.getTag());
            }
            else if ($isListNode(element)) {
                setBlockType(element.getListType());
            }
            else if ($isQuoteNode(element)) {
                setBlockType("quote");
            }
            else {
                setBlockType("paragraph");
            }
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

    }, [editor, updateToolbar, setIsBold, setIsItalic, setIsUnderline, setBlockType]);

    return (
        <Stack direction="horizontal" className="border rounded-2 border-primary mb-2">
            <History t={t} editor={editor} canUndo={canUndo} canRedo={canRedo} />
            <ToolbarContainer>
                <FontFormat t={t} editor={editor} style="font-family" value={fontFamily} set={setFontFamily} />
                <span className="ms-1 me-1"></span>
                <FontFormat t={t} editor={editor} style="font-size" value={fontSize} set={setFontSize} />
            </ToolbarContainer>
            <Format t={t} editor={editor} isBold={isBold} isItalic={isItalic} isUnderline={isUnderline} />
            <Alignement t={t} editor={editor} elementFormat={elementFormat} />
            <ParagraphFormat t={t} editor={editor} blockType={blockType} />
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

function FontFormat({ t, editor, style, value, set }) {
    const setFormat = (option) => {
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                set(option);
                $patchStyleText(selection, {
                    [style]: option
                })
            }
        })
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
                {value}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    (style == "font-size" ? FONT_SIZE_OPTIONS : FONT_FAMILY_OPTIONS).map((option) => {
                        return (
                            <Dropdown.Item onClick={() => setFormat(option[0])}>
                                {option[1]}
                            </Dropdown.Item>
                        );
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

function ParagraphFormat({ t, editor, blockType }) {
    const setParagraph = (blockFunction) => {
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, blockFunction);
            }
        })
    }

    const list = (listType) => {
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                if (blockType === listType) {
                    editor.dispatchCommand(REMOVE_LIST_COMMAND);
                }
                else if (listType === "bullet") {
                    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
                }
                else {
                    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
                }
            }
        })
    }

    return (
        <ToolbarContainer>
            <Dropdown>
                <Dropdown.Toggle>
                    {t("editor.blockType." + blockType)}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setParagraph(() => { $createParagraphNode() })}>Paragraph</Dropdown.Item>
                    <Dropdown.Item onClick={() => setParagraph(() => $createHeadingNode("h1"))}>Heading 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => setParagraph(() => $createHeadingNode("h2"))}>Heading 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => setParagraph(() => $createHeadingNode("h3"))}>Heading 3</Dropdown.Item>
                    <Dropdown.Item onClick={() => list("bullet")}>Unordered List</Dropdown.Item>
                    <Dropdown.Item onClick={() => list("number")}>Ordered List</Dropdown.Item>
                    <Dropdown.Item onClick={() => setParagraph(() => $createQuoteNode())}>Quote</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </ToolbarContainer>
    );
}

function ToolbarContainer({ children }) {
    return (
        <>
            <Stack direction="horizontal" className="ms-2 me-2">
                {children}
            </Stack>
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