import * as Realm from "realm-web";

const id = "mamu-ehyjq";
const config = {
    id
};
export const app = new Realm.App(config);

export const loginAnonymous = async () => {
    if (app.currentUser === null) {
        await app.logIn(Realm.Credentials.anonymous());
        console.log("running")
    }
};

export const getExpositions = async (lang, user) => {
    const mongo = user.mongoClient("mongodb-atlas");
    const expositions = mongo.db("Mamu").collection("expositions_" + lang);
    const data = await expositions.find({});
    return data;
};