"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = require("react");
const App_module_scss_1 = __importDefault(require("./App.module.scss"));
const LoginBox_1 = require("./components/LoginBox");
const MessageList_1 = require("./components/MessageList");
const SendMessageForm_1 = require("./components/SendMessageForm");
const auth_1 = require("./contexts/auth");
function App() {
    const { user } = (0, react_1.useContext)(auth_1.AuthContext);
    return (<main className={`${App_module_scss_1.default.contentWapper} ${!!user ? App_module_scss_1.default.contentSigned : ''}`}>
    <MessageList_1.MessageList />
    {!!user ? <SendMessageForm_1.SendMessageForm /> : <LoginBox_1.LoginBox />}
   </main>);
}
exports.App = App;
