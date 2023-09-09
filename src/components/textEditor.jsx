import { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { $getSelection, $isRangeSelection } from "lexical";
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

export function TextEditor({ t }) {
    const initialConfig = {
        namespace: "MathEditor",
        theme,
        onError,
        nodes: [HeadingNode]
    };

    const [editorState, setEditorState] = useState();
    function onChange(editorState) {
        console.log(`Current editor state: ${JSON.stringify(editorState)}`)
        setEditorState(editorState);
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <AddHeader />
            <RichTextPlugin
                contentEditable={<ContentEditable className="h-100 position-relative border rounded-5 text-start p-3" />}
                placeholder={
                    <div className="position-absolute top-50 start-50 translate-middle">{t("editor.placeholder")}</div>
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocus />
            <OnChangePlugin onChange={onChange} />
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

// When the editor changes
function OnChangePlugin({ onChange }) {
    // Access the editor through the LexicalComposerContext
    const [editor] = useLexicalComposerContext();
    // Wrap our listener in useEffect to handle the teardown and avoid stale references.
    useEffect(() => {
        // most listeners return a teardown function that can be called to clean them up.
        return editor.registerUpdateListener(({ editorState }) => {
            // call onChange here to pass the latest state up to the parent.
            onChange(editorState);
        });
    }, [editor, onChange]);
}