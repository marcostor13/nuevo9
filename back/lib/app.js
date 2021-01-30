"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_route_1 = require("./routes/auth.route");
const general_routes_1 = require("./routes/general.routes");
const instagram_routes_1 = require("./routes/instagram.routes");
const cors = require("cors");
const morgan = require("morgan");
const admin = require("firebase-admin");
const serviceAccount = {
    "type": "service_account",
    "project_id": "fortuny-cd859",
    "private_key_id": "f708d8f25ddab37c295893c02659dbf66e8b7529",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5VeShBlI1+dEv\nO5gr9z/XOQCjKypt9Y2bTm1aCbhLy4YPZiSqzsbNg5PeQ9v/Fgd7gIUH4BK4BB18\nkEVPY+FeILVVI0S+u88i+hGL6ow+CMEQU1vK+UJvd2HSNMvBWJNVCv85CAsD+iOb\nTr7wsVJBKK+Q5OazOwzREEMI6U2zUPx2f2gn5DKZ6AUzieaFhGGxBfsAbp9dwLjW\nnMyDcCRAKsj6l0dpR6nAFC+y7OR8FQ+NMYBYr8F66Dr/roFvfRfj7MoYg+X3FZVK\nodqgOvX8vwQMJJw+pANnb4NEu6gVZ3F+qPBgCO5FHhBIDt3HlK/WFekmFh/Njgbi\nEK4e8B3fAgMBAAECggEADOQnE3Y7mKqIPNdR1dkMVT2PSEoz2NMoJuHVJFqhuY/u\nArsxmLnqRRg+XErvDfarzZDab/pLgwYyQNxOHeAOKHxw8HuUCApLNZ0cRFWrrJLy\nTt7ldyBQWS1+Hd9zPr8Y/GTX7NEc5wlqmZ5oFJjY5lRcpeDuFRBp607Mwt1rfKnq\ndgVx/88JTNmRMwS8NNtJYqRX957S4N7+aa2buOx59XjpcNvVFPOqbb/D50m5w9Kj\nM8XZqU4XqZi3Zb2oc9X+UzGmz6IRVXM/ogBU86yZ7ytx7eMWfCE9Ag5XZtFBsJ3a\nTUXrqnoUynbZozadvn7DOpfTp9TOTOUumCI33rzwtQKBgQDxxs/tf3fkc/OhbQuv\noVZIwOFvJZibrhd+8Hx0qoPUvnydZYJEP5rML/icZ/eBMIJjuxhsf5qWun0akYrl\nzdlv/UgL4ResiZVvwaeLeloeU+oSpR27JLpSs1qohtPFKIYjScnxV1P1IMMyFdoW\nfrSIKLaTU/GKxo2Bipxxd0/UZQKBgQDEPRIQlnNDSbUKMn14wq6E4Rt/pG4JUbbp\nuPk0vw0AaOS7wUOD5BSgKHSpq0qwremah2AtpOzKZosGdYyHo6LN8CK8LcUuiCvg\nKjY0h0E0cl1Rsjj67Avwe7wKqhnW27iffUaAF75dYgmZtPUuVHGmYTCY3Zn5ilSX\nWdLAhKZa8wKBgHweQCgARCA3ll7MiC9Fd/IpcpGIj2t8V/uGoZ2S29KfZ4G11sYK\nkQE5rzs79EeSC53/Mm6go0+1tPuqs899eZ6QPCg9CdY9W0Xf+I8V5KWlFokz0qt8\nE1rZUDUr4hNY1mPPQahv2F4Cz7IqnabmrO8pV3ESqvE/NO3HpsBpK8YxAoGBAKb4\n260Xhp2DUrKJgW9GHx5bN32lGCd/yuYViJ2TzelCVxVWfS7024PmyFUxtUydvb3J\nYFGWGhChrbtiO5+R4U3e/H8nZraQEN0craCGUTnh8Xs47Pi77fDCJ57fWzsRG4dB\nHcKR8V0dtNN/QHsaSNVrruDy9Td5tz5MpGFAvRd3AoGARPDiqGmgja/Mm6R+aMaQ\nuroWs0t8ru8z3hkaDZu7N63qcY5X9X74uBGr5YB0Ycl5ONKDKww6CRvMMCY40Glk\nU2lKeQajmYQFScsiw7w6WfTcmtsf0yUyiiEJRtcJYLbeIBGsfzjsiipnJQzdX3B7\npdBcdYNBfsWybKRKsegDX8k=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-6qtu5@fortuny-cd859.iam.gserviceaccount.com",
    "client_id": "109358361309001489170",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6qtu5%40fortuny-cd859.iam.gserviceaccount.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fortuny-cd859.firebaseio.com"
});
const app = express();
//Setting
app.set('port', 3000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//middlewares
app.use(morgan('dev'));
//Routes
app.use(auth_route_1.default);
app.use(general_routes_1.default);
app.use(instagram_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map