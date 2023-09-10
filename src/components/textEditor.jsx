import { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { $getSelection, $isRangeSelection, UNDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, CAN_REDO_COMMAND } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, HeadingNode } from "@lexical/rich-text"
import { Button } from 'react-bootstrap';

const theme = {
    // Theme styling goes here
}

function AddHeader() {
    const [editor] = useLexicalComposerContext();
    const onClick = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode("h1"))
            }
        });
    };

    return (
        <Button onClick={onClick}>Add H1</Button>
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

    // Check if undo can be triggered

    const undo = () => {
        editor.dispatchCommand(UNDO_COMMAND);
    };

    const redo = () => {
        editor.dispatchCommand(REDO_COMMAND)
    }

    return (
        <>
            <Button onClick={undo} disabled={!canUndo}>Undo</Button>
            <Button onClick={redo} disabled={!canRedo}>Redo</Button>
        </>
    );
}

function Toolbar({ t }) {
    return (
        <div className="border rounded-2 w-100 border-info mb-2">
            <AddHeader />
            <History />
        </div>
    );
}

export function TextEditor({ t }) {
    const initialConfig = {
        namespace: "MathEditor",
        theme,
        onError,
        nodes: [HeadingNode]
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <Toolbar t={t} />
            <RichTextPlugin
                contentEditable={<ContentEditable className="h-100 position-relative border rounded-5 text-start p-3" />}
                placeholder={
                    <div className="position-absolute top-50 start-50 translate-middle">{t("editor.placeholder")}</div>
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocus />
        </LexicalComposer>
    );
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    console.error(error);
}

function AutoFocus() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}