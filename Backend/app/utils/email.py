from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

import smtplib
from fastapi import UploadFile
from app.common.config import MAIL_SENDER, MAIL_PASSWARD
from typing import List


def send_email(receiver_address: str, subject: str, content: str, images: List[MIMEImage] = list()) -> None:
    message = MIMEMultipart()
    message['From'] = "재단"
    message['To'] = receiver_address
    message['Subject'] = subject

    for _ in range(5):
        content += f'<br/>'

    for idx, image in enumerate(images):
        message.attach(image)
        content += f'<img src="cid:image{idx}" width="600px"/>'

    message.attach(MIMEText(content, 'html'))

    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls()
    session.login(MAIL_SENDER, MAIL_PASSWARD)
    text = message.as_string()
    session.sendmail(MAIL_SENDER, receiver_address, text)
    session.quit()
    print(f"Mail Sent - {subject} - {receiver_address}")
