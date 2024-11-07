"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = void 0;
const bodyParser = __importStar(require("body-parser"));
const tsoa_1 = require("tsoa");
const BadRequestError_1 = require("../Errors/BadRequestError");
const openAiService_1 = require("../Services/openAiService");
const postsService_1 = require("../Services/postsService");
const s3Service_1 = require("../Services/s3Service");
let apiController = class apiController extends tsoa_1.Controller {
    async generatePostMetadata(body) {
        const { transcript } = body;
        const metadata = await (0, openAiService_1.generatePostMetadata)(transcript);
        return metadata;
    }
    /**
     * Post presign
     * @param body
     * @param orgId
     */
    async getPresignedUploadUrl() {
        return await (0, s3Service_1.getPresignedUploadUrl)();
    }
    async createPost(request, body) {
        if (!request.user.username) {
            throw new BadRequestError_1.BadRequestError('invalid user');
        }
        return await (0, postsService_1.createPost)(request.user.username, body);
    }
    async getPosts(request, offset = 0, limit = 5) {
        if (isNaN(offset) || offset < 0)
            offset = 0;
        const posts = await (0, postsService_1.getAllPosts)(request.user.username, { offset, limit });
        console.log(posts);
        return posts;
    }
};
exports.apiController = apiController;
__decorate([
    (0, tsoa_1.Post)('/describe'),
    __param(0, (0, tsoa_1.Body)())
], apiController.prototype, "generatePostMetadata", null);
__decorate([
    (0, tsoa_1.Get)('/presignedUrl')
], apiController.prototype, "getPresignedUploadUrl", null);
__decorate([
    (0, tsoa_1.Post)('/createPost'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)())
], apiController.prototype, "createPost", null);
__decorate([
    (0, tsoa_1.Get)('/getPosts'),
    (0, tsoa_1.Consumes)('application/json'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)())
], apiController.prototype, "getPosts", null);
exports.apiController = apiController = __decorate([
    (0, tsoa_1.Tags)('api'),
    (0, tsoa_1.Route)('api'),
    (0, tsoa_1.Middlewares)(bodyParser.urlencoded({ extended: true }), bodyParser.json())
], apiController);
