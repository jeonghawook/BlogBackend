import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
    constructor(private readonly configService:ConfigService){}
    private readonly s3Client= new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION')
    })
    async upload(fileName:string,file:Buffer,fileExt:string){
        const uniqueId = uuidv4(); // Generate a unique UUID
        const objectKey = `image/${uniqueId}_${fileName}`

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket:'blogbucket2',
                Key:objectKey,
                Body:file,
                ContentType:fileExt,
                ContentDisposition: 'inline',
            })
        )
        const s3Region = this.configService.getOrThrow('AWS_S3_REGION');
        const s3ObjectUrl = `https://blogbucket2.s3.${s3Region}.amazonaws.com/${objectKey}`;
        return s3ObjectUrl
    }
}


