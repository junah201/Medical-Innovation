import requests
from bs4 import BeautifulSoup
import datetime
import json

ARTICLE_BOARD_ID = 3

HEADER = {
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


def get_url(start: int = 1):
    return f"https://m.search.naver.com/search.naver?where=m_news&sm=tab_pge&query=%22%EB%AF%B8%EB%9E%98%EC%9D%98%ED%95%99%EC%97%B0%EA%B5%AC%EC%9E%AC%EB%8B%A8%22&sort=1&photo=0&field=0&pd=0&ds=&de=&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:dd,p:all,a:all&start={start}"


def new_post_checker():
    db_article = db.query(models.Post).filter(
        models.Post.board_id == ARTICLE_BOARD_ID).order_by(models.Post.created_at.desc()).limit(1).first()

    last_uploaded_at = db_article.created_at.strftime("%Y.%m.%d.")

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

            db_post = models.Post(
                title=tmp['title'],
                board_id=ARTICLE_BOARD_ID,
                content=tmp['url'],
                author_name=tmp["newspaper"],
                files=json.dumps([], ensure_ascii=False),
                created_at=datetime.datetime.strptime(
                    tmp['date'], "%Y.%m.%d."),
                updated_at=datetime.datetime.strptime(
                    tmp['date'], "%Y.%m.%d."),
            )

            db.add(db_post)
            db.commit()


def lambda_handler(event, context):
    with sessionmaker.context_session() as db:
        new_post_checker(db=db)
