import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode } from "@lexical/rich-text";
import { Toolbar } from "./textEditorToolbar";

const theme = {
    // Theme styling goes here
    text: {
        bold: "fw-bold",
        italic: "fst-italic",
        underline: "text-decoration-underline"
    }
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