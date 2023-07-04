from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email import encoders
from fastapi import UploadFile
import smtplib
from app.common.config import MAIL_SENDER, MAIL_PASSWARD
from typing import List
from email.mime.base import MIMEBase


def send_email(receiver_address: str, subject: str, content: str, files: List[UploadFile] = list()) -> None:
    message = MIMEMultipart()
    message['From'] = "미래의학연구재단"
    message['To'] = receiver_address
    message['Subject'] = subject

    with open("app/static/content-styles.css", 'r') as css_file:
        css_content = css_file.read()

    html_content = f'<html><head><style>{css_content}</style></head><body>{content}</body></html>'

    message.attach(MIMEText(html_content, 'html'))

    for file in files:
        attachment = MIMEBase('application', 'octet-stream')
        attachment.set_payload(file.file.read())

        # 파일 이름과 확장자 추출
        filename = file.filename
        ext = filename.split('.')[-1]

        # MIME 타입 지정
        if ext == 'pdf':
            attachment.add_header('Content-Disposition',
                                  'attachment', filename=filename)
            mime_type = 'application/pdf'
        elif ext == 'png':
            attachment.add_header('Content-Disposition',
                                  'attachment', filename=filename)
            mime_type = 'image/png'
        elif ext == 'jpg' or ext == 'jpeg':
            attachment.add_header('Content-Disposition',
                                  'attachment', filename=filename)
            mime_type = 'image/jpeg'
        elif ext == 'gif':
            attachment.add_header('Content-Disposition',
                                  'attachment', filename=filename)
            mime_type = 'image/gif'
        else:
            attachment.add_header('Content-Disposition',
                                  'attachment', filename=filename)
            mime_type = 'application/octet-stream'

        # MIME 타입 설정
        attachment.set_type(mime_type)
        encoders.encode_base64(attachment)
        message.attach(attachment)

    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls()
    session.login(MAIL_SENDER, MAIL_PASSWARD)
    text = message.as_string()
    session.sendmail(MAIL_SENDER, receiver_address, text)
    session.quit()
    print(f"Mail Sent - {subject} - {receiver_address}")
