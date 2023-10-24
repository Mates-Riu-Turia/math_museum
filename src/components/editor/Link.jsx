import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import * as React from 'react';

const SUPPORTED_URL_PROTOCOLS = new Set([
    'http:',
    'https:',
    'mailto:',
    'sms:',
    'tel:',
]);

export function sanitizeUrl(url) {
    try {
        const parsedUrl = new URL(url);
        if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
            return 'about:blank';
        }
    } catch {
        return url;
    }
    return url;
}

// Source: https://stackoverflow.com/a/8234912/2013580
const urlRegExp = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
);
export function validateUrl(url) {
    // TODO Fix UI for link insertion; it should never default to an invalid URL such as https://.
    // Maybe show a dialog where they user can type the URL before inserting it.
    return url === 'https://' || urlRegExp.test(url);
}

export default function LinkPlugin() {
    return <LexicalLinkPlugin validateUrl={validateUrl} />;
}