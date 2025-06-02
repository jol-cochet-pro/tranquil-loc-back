import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ZipArchive } from '@shortercode/webzip';
import { fileSchema } from './entities/file.entity';

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
    async store(key: string, body: Buffer | Uint8Array, mime: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: body,
            ContentType: mime,
        });
        try {
            await this.s3Client.send(command);
        } catch {
            throw new InternalServerErrorException();
        }
    }

    async zip(key: string, files: { name: string, content: Blob }[]) {
        const archive = new ZipArchive();
        for (const file of files) {
            await archive.set(file.name, file.content);
        }
        const data = await archive.to_blob().bytes()
        this.store(key, data, "application/zip");
        return this.retrieve(key);
    }

    async retrieve(key: string) {
        const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
        const response = await this.s3Client.send(command);
        const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
        const name = url.substring(url.lastIndexOf('/'));
        return fileSchema.parse({
            Data: await response.Body?.transformToString("base64")!,
            ContentType: response.ContentType!,
            Filename: name,
            Url: url
        });
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
