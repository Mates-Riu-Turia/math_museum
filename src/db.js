import * as Realm from "realm-web";

const id = "mamu-ehyjq";
const config = {
    id
};
export const app = new Realm.App(config);

const id_login = "login-hjvlc";
const config_login = {
    id: id_login
};
export const app_login = new Realm.App(config_login);

export const loginAnonymous = async () => {
    if (app.currentUser === null) {
        return (await app.logIn(Realm.Credentials.anonymous()));
    }
};

export const getExpositions = async (lang) => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const expositions = mongo.db("Mamu").collection("expositions_" + lang);
    const data = await expositions.find({});
    return data;
};