"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginBox = void 0;
const react_1 = require("react");
const vsc_1 = require("react-icons/vsc");
const auth_1 = require("../../contexts/auth");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
function LoginBox() {
    const { signInUrl, user } = (0, react_1.useContext)(auth_1.AuthContext);
    return (<div className={styles_module_scss_1.default.loginBoxWapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles_module_scss_1.default.signInWithGithub}>
                <vsc_1.VscGithubInverted size='24'/>
                Entrar com Github
            </a>
        </div>);
}
exports.LoginBox = LoginBox;
