"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const authRouter_1 = __importDefault(require("./src/router/authRouter"));
const passport_1 = __importDefault(require("./src/meddleware/passport"));
const PORT = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', './src/views');
const DB = 'mongodb://127.0.0.1:27017/dbTest';
mongoose_1.default.connect(DB)
    .then(() => console.log('DB Connected'))
    .catch(error => console.log('DB connection error:', error.message));
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", authRouter_1.default);
app.listen(PORT, () => {
    console.log("App running on port:" + PORT);
});
//# sourceMappingURL=index.js.map