"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = require("./App");
const auth_1 = require("./contexts/auth");
require("./styles/global.css");
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
    <auth_1.AuthProvider>
      <App_1.App />
    </auth_1.AuthProvider>
    
  </react_1.default.StrictMode>);
