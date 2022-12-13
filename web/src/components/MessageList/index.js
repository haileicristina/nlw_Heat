"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageList = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const logo_svg_1 = __importDefault(require("../../assets/logo.svg"));
const api_1 = require("../../services/api");
const react_1 = require("react");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const messsageQueue = [];
const socket = (0, socket_io_client_1.default)('http://localhost:4000');
socket.on('new message', (newMessage) => {
    messsageQueue.push(newMessage);
});
const MessageList = () => {
    const [messages, setMessages] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => {
            if (messsageQueue.length > 0) {
                setMessages(prevState => [
                    messsageQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean));
                messsageQueue.shift();
            }
        }, 3000);
    }, []);
    (0, react_1.useEffect)(() => {
        api_1.api.get('messages/last3').then(response => {
            setMessages(response.data);
        });
    }, []);
    return (<div className={styles_module_scss_1.default.messageListWapper}>
            <img src={logo_svg_1.default} alt="DoWhile 2021"/>
            <ul className={styles_module_scss_1.default.messageList}>
                {messages.map(message => {
            return (<li key={message.id} className={styles_module_scss_1.default.message}>
                        <p className={styles_module_scss_1.default.messageContent}>{message.text}</p>
                        <div className={styles_module_scss_1.default.messageUser}>
                            <div className={styles_module_scss_1.default.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name}/>
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>);
        })}
                      
            </ul>
        </div>);
};
exports.MessageList = MessageList;
