"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const favorites_1 = require("./favorites");
const participants_1 = require("./participants");
const participantView_1 = require("./participantView");
const project_1 = require("./project");
const projectFiles_1 = require("./projectFiles");
const user_1 = require("./user");
exports.default = [
    user_1.UserEntity,
    favorites_1.MySavedEntity,
    participants_1.ParticipantsEntity,
    participantView_1.ParticipantViewEntity,
    project_1.ProjectEntity,
    projectFiles_1.ProjectFilesEntity,
];
