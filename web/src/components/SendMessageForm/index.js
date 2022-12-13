"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageForm = void 0;
const react_1 = require("react");
const vsc_1 = require("react-icons/vsc");
const auth_1 = require("../../contexts/auth");
const api_1 = require("../../services/api");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const SendMessageForm = () => {
    const { user, signOut } = (0, react_1.useContext)(auth_1.AuthContext);
    const [message, setMessage] = (0, react_1.useState)('');
    async function handleSendMessage(event) {
        event.preventDefault();
        if (!message.trim()) {
            return;
        }
        await api_1.api.post('messages', { message });
        setMessage('');
    }
    return (<div className={styles_module_scss_1.default.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles_module_scss_1.default.signOutButton}>
                <vsc_1.VscSignOut size="32"/>
            </button>

            <header className={styles_module_scss_1.default.userInformation}>
                <div className={styles_module_scss_1.default.userImage}>
                    <img src={user === null || user === void 0 ? void 0 : user.avatar_url} alt={user === null || user === void 0 ? void 0 : user.name}/>
                </div>
                <strong className={styles_module_scss_1.default.userName}>{user === null || user === void 0 ? void 0 : user.name}</strong>
                <span className={styles_module_scss_1.default.userGithub}>
                    <vsc_1.VscGithubInverted size='16'/>
                    {user === null || user === void 0 ? void 0 : user.login}
                </span>
            </header>

            <form onSubmit={handleSendMessage} className={styles_module_scss_1.default.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                
                <textarea name="message" id="message" placeholder="Qual sua expectativa para o evento?" onChange={event => setMessage(event.target.value)} value={message}/>
                
                <button type="submit">Enviar mensagem</button>
            </form>   
        </div>);
};
exports.SendMessageForm = SendMessageForm;
