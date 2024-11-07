import type { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomBytes } from 'crypto';

import env from '../environment';

const s3Client = new S3Client({
  region: env.AWS_REGION,
});

// const hasNonSimpleCharacters = (str: string) => /[^-_.0-9A-Za-z]/.test(str);

export const getPresignedDownloadUrl = (path: string, file: string): Promise<string> => {
  if (!env.UPLOAD_BUCKET) {
    throw new Error('AWS not configured.');
  }
  const command = new GetObjectCommand({
    Bucket: env.UPLOAD_BUCKET,
    Key: path + file,
  });
  return getSignedUrl(s3Client, command, { expiresIn: 300000 });
};

export const getPresignedUploadUrl = async () => {
  if (!env.UPLOAD_BUCKET) throw new Error('AWS not configured.');

  const random = randomBytes(16);
  const key = random.toString('hex');
  const putObjectParams: PutObjectCommandInput = {
    Bucket: env.UPLOAD_BUCKET,
    Key: key + '.mp4',
  };

  const command = new PutObjectCommand(putObjectParams);
  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  return { presignedUrl, key };
};
