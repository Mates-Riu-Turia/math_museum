import { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, HeadingNode } from "@lexical/rich-text"
import { Button } from 'react-bootstrap';
import { Toolbar } from "./textEditorToolbar"

const theme = {
    // Theme styling goes here
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