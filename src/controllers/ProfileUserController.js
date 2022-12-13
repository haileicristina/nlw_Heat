"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileUserController = void 0;
const ProfileUserService_1 = require("../services/ProfileUserService");
class ProfileUserController {
    async handle(request, response) {
        const { user_id } = request;
        const service = new ProfileUserService_1.ProfileUserService();
        const result = await service.execute(user_id);
        return response.json(result);
    }
}
exports.ProfileUserController = ProfileUserController;
