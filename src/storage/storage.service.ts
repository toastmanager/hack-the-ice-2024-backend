import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.getOrThrow<string>('s3.accessKeyId'),
      secretAccessKey:
        this.configService.getOrThrow<string>('s3.secretAccessKey'),
    },
    endpoint: this.configService.getOrThrow<string>('s3.endpoint'),
    forcePathStyle:
      this.configService.getOrThrow<string>('s3.forcePathStyle') === 'true',
    region: this.configService.get<string>('s3.region'),
  });

  constructor(
    private readonly configService: ConfigService,
    @Inject('BucketName') private bucketName: string,
  ) {}

  async put(
    filename: string,
    file: Buffer,
    generateFilename?: boolean,
  ): Promise<string> {
    if (generateFilename === undefined || generateFilename === true) {
      filename = filename.replace(' ', '_');
      filename = `${randomUUID()}-${filename}`;
    }
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: filename,
          Body: file,
        }),
      );
      return filename;
    } catch (error) {
      throw error;
    }
  }

  async get(imageKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: imageKey,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return url;
  }
}
