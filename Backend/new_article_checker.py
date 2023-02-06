import requests
from bs4 import BeautifulSoup
import datetime
import json
from app.common.config import ADMIN_ACCOUNT_ID, ADMIN_ACCOUNT_PASSWORD

ARTICLE_BOARD_ID: int = 3

HEADER: dict = {
    'authority': 'm.search.naver.com',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'cache-control': 'max-age=0',
    'referer': 'https://www.naver.com',
    'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-site',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36',
}
API_URL: str = "https://port-0-medical-innovation-sop272gldbzxiqq.gksl2.cloudtype.app"


def get_url(start: int = 1):
    return f"https://m.search.naver.com/search.naver?where=m_news&sm=tab_pge&query=%22%EB%AF%B8%EB%9E%98%EC%9D%98%ED%95%99%EC%97%B0%EA%B5%AC%EC%9E%AC%EB%8B%A8%22&sort=1&photo=0&field=0&pd=0&ds=&de=&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:dd,p:all,a:all&start={start}"


def new_post_checker():
    response = requests.get(
        url=f"{API_URL}/api/v1/post/{ARTICLE_BOARD_ID}/all?skip=0&limit=1",
        headers={
            "accept": "application/json",
            "Content-Type": "application/json"
        }
    )

    last_uploaded_at = datetime.datetime.strptime(json.loads(
        response.text)["posts"][0]['created_at'].split('T')[0], "%Y-%m-%d")
    last_uploaded_at = last_uploaded_at.strftime("%Y.%m.%d.")

    response = requests.post(
        url=f"{API_URL}/api/v1/user/login",
        headers={
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data={
            "username": ADMIN_ACCOUNT_ID,
            "password": ADMIN_ACCOUNT_PASSWORD
        },
    )
    access_token = json.loads(response.text)["access_token"]

    for page in range(1, 100, 10):
        response = requests.get(
            url=get_url(page),
            headers=HEADER
        )
        soup = BeautifulSoup(response.text, 'html.parser')
        articles = soup.select('div.group_news > ul.list_news > li.bx')

        for article in articles:
            tmp = {}
            tmp["newspaper"] = article.select_one(
                "div.info_group > a.info.press").text
            tmp['title'] = article.select_one("div.api_txt_lines.tit").text
            tmp['url'] = article.select_one("a.news_tit").get('href')
            tmp['date'] = article.select_one("div.info_group > span.info").text

            if tmp['date'] <= last_uploaded_at:
                return

            print(f"{tmp['newspaper']} {tmp['title']}")

            requests.post(
                f"{API_URL}/api/v1/post/create", json={
                    "title": tmp['title'],
                    "board_id": ARTICLE_BOARD_ID,
                    "content": tmp['url'],
                    "files": []
                },
                headers={
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {access_token}"
                }
            )


def lambda_handler(event, context):
    new_post_checker()
