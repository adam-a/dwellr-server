"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresignedUploadUrl = exports.getPresignedDownloadUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = require("crypto");
const environment_1 = __importDefault(require("../environment"));
const s3Client = new client_s3_1.S3Client({
    region: environment_1.default.AWS_REGION,
});
// const hasNonSimpleCharacters = (str: string) => /[^-_.0-9A-Za-z]/.test(str);
const getPresignedDownloadUrl = (path, file) => {
    if (!environment_1.default.UPLOAD_BUCKET) {
        throw new Error('AWS not configured.');
    }
    const command = new client_s3_1.GetObjectCommand({
        Bucket: environment_1.default.UPLOAD_BUCKET,
        Key: path + file,
    });
    return (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 300000 });
};
exports.getPresignedDownloadUrl = getPresignedDownloadUrl;
const getPresignedUploadUrl = async () => {
    if (!environment_1.default.UPLOAD_BUCKET)
        throw new Error('AWS not configured.');
    const random = (0, crypto_1.randomBytes)(16);
    const key = random.toString('hex');
    const putObjectParams = {
        Bucket: environment_1.default.UPLOAD_BUCKET,
        Key: key + '.mp4',
    };
    const command = new client_s3_1.PutObjectCommand(putObjectParams);
    const presignedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
        expiresIn: 3600,
    });
    return { presignedUrl, key };
};
exports.getPresignedUploadUrl = getPresignedUploadUrl;
