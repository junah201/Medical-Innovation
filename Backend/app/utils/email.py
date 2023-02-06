from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

from app.common.config import MAIL_SENDER, MAIL_PASSWARD


def send_email(receiver_address: str, subject: str, content: MIMEText) -> None:
    message = MIMEMultipart()
    message['From'] = MAIL_SENDER
    message['To'] = receiver_address
    message['Subject'] = subject
    message.attach(content)
    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls()
    session.login(MAIL_SENDER, MAIL_PASSWARD)
    text = message.as_string()
    session.sendmail(MAIL_SENDER, receiver_address, text)
    session.quit()
    print(f"Mail Sent - {subject} - {receiver_address}")
