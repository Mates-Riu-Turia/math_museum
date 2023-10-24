import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { Toolbar } from "./textEditorToolbar";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import ListMaxIndentLevelPlugin from "./ListIndent";
import AutoLinkPlugin from "./AutoLink";
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import LinkPlugin from './Link';
import { LinkNode, AutoLinkNode } from "@lexical/link";

const theme = {
    // Theme styling goes here
    quote: "editor-quote",
    text: {
        bold: "fw-bold",
        italic: "fst-italic",
        underline: "text-decoration-underline",
    },
    list: {
        listitem: "editor-listItem",
        nested: {
            listitem: "editor-nestedListItem",
        },
        olDepth: [
            "editor-listContainer",
            "editor-listContainer editor-ol2",
            "editor-listContainer editor-ol3",
            "editor-listContainer editor-ol4",
            "editor-listContainer editor-ol5",
        ],
        ul: "editor-listContainer",
    },
}

export function TextEditor({ t }) {
    const initialConfig = {
        namespace: "MathEditor",
        theme,
        onError,
        nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode, AutoLinkNode]
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
            <ListPlugin />
            <TabIndentationPlugin />
            <ListMaxIndentLevelPlugin maxDepth={5} />
            <AutoLinkPlugin />
            <LexicalClickableLinkPlugin />
            <LinkPlugin />
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