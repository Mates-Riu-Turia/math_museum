import * as Realm from "realm-web";

const id = "mamu-ehyjq";
const config = {
    id
};
const app = new Realm.App(config);

export const loginAnonymous = async () => {
    await app.logIn(Realm.Credentials.anonymous());
};

export const getData = async (user) => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const expositions = mongo.db("Mamu").collection("expositions");
    const data = await expositions.findOne({title: "Pitagoras"});
    console.log(data)
};