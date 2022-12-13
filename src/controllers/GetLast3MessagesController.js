"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLast3MessagesController = void 0;
const GetLast3MessagesService_1 = require("../services/GetLast3MessagesService");
class GetLast3MessagesController {
    async handle(request, response) {
        const service = new GetLast3MessagesService_1.GetLast3MessagesService();
        const result = await service.execute();
        return response.json(result);
    }
}
exports.GetLast3MessagesController = GetLast3MessagesController;
