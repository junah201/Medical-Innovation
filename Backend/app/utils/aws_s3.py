from fastapi import UploadFile
from app.common.config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME
from datetime import datetime
import boto3


def upload_file(file: UploadFile, folder: str) -> str:
    filename = f"{int(datetime.utcnow().timestamp())}-{file.filename}"
    s3 = boto3.resource(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        config=boto3.session.Config(signature_version='s3v4')
    )
    s3.Bucket(AWS_S3_BUCKET_NAME).put_object(
        Key=f"{folder}/{filename}", Body=file.file)

    return filename


def delete_file(filename: str, folder: str):
    s3 = boto3.resource(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        config=boto3.session.Config(signature_version='s3v4')
    )
    s3.Object(AWS_S3_BUCKET_NAME, f"{folder}/{filename}").delete()
