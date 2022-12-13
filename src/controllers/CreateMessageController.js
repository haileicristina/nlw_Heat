"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageController = void 0;
const CreateMessageService_1 = require("../services/CreateMessageService");
class CreateMessageController {
    async handle(request, response) {
        const { message } = request.body;
        const { user_id } = request;
        const service = new CreateMessageService_1.CreateMessageService();
        const result = await service.execute(message, user_id);
        return response.json(result);
    }
}
exports.CreateMessageController = CreateMessageController;
