"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const keys_1 = require("./keys");
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
mongoose.connect(keys_1.mongodb.DB.URI, dbOptions);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Start');
});
connection.once('Error', (e) => {
    console.log('MongoDB Error', e);
});
//# sourceMappingURL=database.js.map