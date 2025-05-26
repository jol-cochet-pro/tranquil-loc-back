import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class FilesService {
    private s3Client: S3Client;
    private bucket: string;

    constructor() {
        const public_key = process.env.CF_APIKEY_PUBLIC;
        const private_key = process.env.CF_APIKEY_PRIVATE;
        const endpoint = process.env.CF_ENDPOINT;
        this.bucket = process.env.CF_BUCKET ?? "";
        if (!public_key || !private_key || !endpoint || this.bucket == "") {
            throw Error("Cloudflare keys are not setup.");
        }
        this.s3Client = new S3Client({
            region: "auto",
            endpoint: endpoint,
            credentials: {
                accessKeyId: public_key,
                secretAccessKey: private_key
            }
        })
    }

    async store(key: string, body: string, mime: string) {
        const buffer = Buffer.from(body, "base64");
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: mime,
        });
        try {
            await this.s3Client.send(command);
        } catch {
            throw new InternalServerErrorException();
        }
    }

    async retrieveUrl(key: string) {
        const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
        const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
        return url;
    }

    async retrieveContent(key: string) {
        const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
        const response = await this.s3Client.send(command);
        return {
            data: await response.Body?.transformToString("base64"),
            type: response.ContentType,
        };
    }

    async delete(key: string) {
        const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
        try {
            await this.s3Client.send(command);
        } catch {
            throw new InternalServerErrorException();
        }
    }
}
