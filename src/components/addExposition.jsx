import { isTeacher } from "../db";

export function AddExposition({ t }) {
    if (isTeacher()) {
        return (
            <>
            </>
        );
    }
    return (
        <h1>ERROR: Access Denied</h1>
    );
}