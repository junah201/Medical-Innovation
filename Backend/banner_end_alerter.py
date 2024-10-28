import requests
from bs4 import BeautifulSoup
import datetime
import json
from app.common.config import ADMIN_ACCOUNT_ID, ADMIN_ACCOUNT_PASSWORD, API_URL
from app.utils.email import send_email

RECEIVER_ADDRESS = [
    "medicalinnovation.or@gmail.com",
    "support@medicalinnovation.or.kr",
]


def banner_end_checker() -> list[tuple[str, int]]:
    response = requests.get(
        url=f"{API_URL}/api/v1/banner/all/active",
        headers={
            "accept": "application/json",
            "Content-Type": "application/json"
        }
    )

    result: list[tuple[str, int]] = list()

    banners: list = json.loads(response.text)

    for banner in banners:
        remaining_days: int = (datetime.datetime.strptime(
            banner['banner_end_at'].split('T')[0], "%Y-%m-%d") - datetime.datetime.now()).days

        # 30 day
        if remaining_days == 30:
            result.append((banner['name'], 30))
        # 15 day
        elif remaining_days == 10:
            result.append((banner['name'], 15))
        # 7 day
        elif remaining_days == 7:
            result.append((banner['name'], 7))
        # 3 day
        elif remaining_days == 3:
            result.append((banner['name'], 3))
        # 1 day
        elif remaining_days == 1:
            result.append((banner['name'], 1))

    return result


def lambda_handler(event, context):
    banners = banner_end_checker()

    if not banners:
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "No banner is ending anytime soon."
            }),
        }

    print(banners)

    for address in RECEIVER_ADDRESS:
        send_email(
            receiver_address=address,
            subject=f"[자동발신] 곧 종료되는 배너 (총 {len(banners)}건)",
            content=f"아래와 같은 배너들이 곧 종료됩니다.\n\n" +
            "\n".join(
                [f"\"{banner[0]}\" ({banner[1]}일 남음)" for banner in banners]) + "\n\n이 데이터는 DB 저장 데이터를 기준으로 하며, 실제 종료일은 엑셀 파일을 참고해주세요.\n종료 알림은 1, 3, 7, 15, 30일 전에 발송됩니다."
        )

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": f"Successfully sent email (total {len(banners)})."
        }),
    }
