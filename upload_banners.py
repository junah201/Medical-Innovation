import requests

dumpData = [
    {
        "name": "abbott",
        "path": "Abbott.png",
        "link": "https://www.abbott.com/",
    },
    {
        "name": "bbraun",
        "path": "B.Braun.png",
        "link": "https://www.bbraun.com/",
    },
    {
        "name": "gccorp",
        "path": "GC녹십자.png",
                "link": "http://www.gccorp.com/",
    },
    {
        "name": "medtronic",
        "path": "Medtronic.png",
                "link": "https://europe.medtronic.com/",
    },
    {
        "name": "microport",
        "path": "MicroPort.png",
                "link": "https://microport.com/",
    },
    {
        "name": "organon",
        "path": "Organon.png",
                "link": "https://www.organon.com/",
    },
    {
        "name": "abbott",
        "path": "Abbott.png",
                "link": "https://www.abbott.com/",
    },
    {
        "name": "bbraun",
        "path": "B.Braun.png",
                "link": "https://www.bbraun.com/",
    },
    {
        "name": "gccorp",
        "path": "GC녹십자.png",
                "link": "http://www.gccorp.com/",
    },
    {
        "name": "medtronic",
        "path": "Medtronic.png",
                "link": "https://europe.medtronic.com/",
    },
    {
        "name": "microport",
        "path": "MicroPort.png",
                "link": "https://microport.com/",
    },
    {
        "name": "organon",
        "path": "Organon.png",
                "link": "https://www.organon.com/",
    },
    {
        "name": "abbott",
        "path": "Abbott.png",
                "link": "https://www.abbott.com/",
    },
    {
        "name": "bbraun",
        "path": "B.Braun.png",
                "link": "https://www.bbraun.com/",
    },
    {
        "name": "gccorp",
        "path": "GC녹십자.png",
                "link": "http://www.gccorp.com/",
    },
    {
        "name": "medtronic",
        "path": "Medtronic.png",
                "link": "https://europe.medtronic.com/",
    },
    {
        "name": "microport",
        "path": "MicroPort.png",
                "link": "https://microport.com/",
    },
    {
        "name": "abbott",
        "path": "Abbott.png",
                "link": "https://www.abbott.com/",
    },
    {
        "name": "bbraun",
        "path": "B.Braun.png",
                "link": "https://www.bbraun.com/",
    },
    {
        "name": "gccorp",
        "path": "GC녹십자.png",
                "link": "http://www.gccorp.com/",
    },
    {
        "name": "medtronic",
        "path": "Medtronic.png",
                "link": "https://europe.medtronic.com/",
    },
]


dumpData2 = [
    {
        "name": "제일약품",
        "path": "제일약품.png",
        "link": "http://www.jeilpharm.co.kr",
        "year": 2022
    },
    {
        "name": "dio",
        "path": "dio.png",
        "link": "http://www.dio.co.kr",
        "year": 2022
    },
    {
        "name": "건일제약",
        "path": "건일제약.png",
        "link": "http://www.kuhnil.com",
        "year": 2022
    },
    {
        "name": "innosys",
        "path": "innosys.png",
        "link": "https://inno-sys.net",
        "year": 2022
    },
    {
        "name": "대웅제약",
        "path": "대웅제약.png",
        "link": "https://daewoong.co.kr",
        "year": 2021
    },
    {
        "name": "한미약품",
        "path": "한미약품.png",
        "link": "https://www.hanmi.co.kr",
        "year": 2021
    },
    {
        "name": "유한양행",
        "path": "유한양행.png",
        "link": "https://www.yuhan.co.kr",
        "year": 2021
    },
    {
        "name": "biotronik",
        "path": "biotronik.png",
        "link": "https://www.biotronik.com",
        "year": 2021
    },
    {
        "name": "한림제약",
        "path": "한림제약.png",
        "link": "http://www.hanlim.com",
        "year": 2021
    },
    {
        "name": "유영제약",
        "path": "유영제약.png",
        "link": "http://www.yypharm.co.kr",
        "year": 2021
    },
    {
        "name": "이연제약",
        "path": "이연제약.png",
        "link": "https://www.reyonpharm.co.kr",
        "year": 2021
    },
    {
        "name": "에이엠지코리아",
        "path": "amg.png",
        "link": "http://www.amg-korea.com",
        "year": 2021
    },
    {
        "name": "한국유니팜",
        "path": "한국유니팜.png",
        "link": "http://www.unipharmkorea.co.kr",
        "year": 2020
    },
    {
        "name": "대원제약",
        "path": "대원제약.png",
        "link": "http://www.daewonpharm.com",
        "year": 2020
    },
    {
        "name": "dio",
        "path": "dio.png",
        "link": "http://www.dio.co.kr",
        "year": 2020
    },
    {
        "name": "퀄리텍코리아",
        "path": "퀄리텍코리아.png",
        "link": "http://qualitech-k.com",
        "year": 2020
    },
    {
        "name": "티엔더블유소프트웨어 주식회사",
        "path": "티엔더블유소프트웨어.png",
        "link": "https://ecrf.kr",
        "year": 2020
    },
    {
        "name": "endocor",
        "path": "ENDOCOR.png",
        "link": "https://endocor.com",
        "year": 2020
    },
    {
        "name": "아이엠티메디칼",
        "path": "아이엠티메디칼.png",
        "link": "http://www.imtmedical.kr",
        "year": 2020
    },
    {
        "name": "대웅제약",
        "path": "대웅제약.png",
        "link": "https://daewoong.co.kr",
        "year": 2019
    },
    {
        "name": "동아ST",
        "path": "동아ST.png",
        "link": "http://www.donga-st.com/",
        "year": 2019
    },
    {
        "name": "LG화학",
        "path": "LG화학.png",
        "link": "http://www.lgchem.co.kr",
        "year": 2019
    },
    {
        "name": "한림제약",
        "path": "한림제약.png",
        "link": "http://www.hanlim.com",
        "year": 2019
    },
    {
        "name": "건일제약",
        "path": "건일제약.png",
        "link": "http://www.kuhnil.com",
        "year": 2019
    },
    {
        "name": "퀄리텍코리아",
        "path": "퀄리텍코리아.png",
        "link": "http://qualitech-k.com",
        "year": 2019
    },
    {
        "name": "Bayer",
        "path": "Bayer.png",
        "link": "https://www.bayer.com/ko/kr/korea-home",
        "year": 2019
    },
    {
        "name": "대웅제약",
        "path": "대웅제약.png",
        "link": "https://daewoong.co.kr",
        "year": 2018
    },
    {
        "name": "코멧 네트워크",
        "path": "코멧.png",
        "link": "http://www.cometnet.biz",
        "year": 2018
    },
    {
        "name": "innosys",
        "path": "innosys.png",
        "link": "https://inno-sys.net",
        "year": 2018
    },
    {
        "name": "퀄리텍코리아",
        "path": "퀄리텍코리아.png",
        "link": "http://qualitech-k.com",
        "year": 2018
    },
    {
        "name": "biotronik",
        "path": "biotronik.png",
        "link": "https://www.biotronik.com",
        "year": 2018
    },
    {
        "name": "LG화학",
        "path": "LG화학.png",
        "link": "http://www.lgchem.co.kr",
        "year": 2017
    },
    {
        "name": "일동제악",
        "path": "일동제악.png",
        "link": "https://www.ildong.com",
        "year": 2017
    },
    {
        "name": "경품약품",
        "path": "경품약품.png",
        "link": "http://www.kyungpoong.com",
        "year": 2017
    },
    {
        "name": "제일약품",
        "path": "제일약품.png",
        "link": "http://www.jeilpharm.co.kr",
        "year": 2017
    },
    {
        "name": "HK이노엔",
        "path": "HK이노엔.png",
        "link": "https://www.inno-n.com",
        "year": 2017
    },
    {
        "name": "삼진제약",
        "path": "삼진제약.png",
        "link": "http://www.samjinpharm.co.kr",
        "year": 2017
    },
    {
        "name": "에이엠지코리아",
        "path": "amg.png",
        "link": "http://www.amg-korea.com",
        "year": 2017
    },
    {
        "name": "GENOSS",
        "path": "GENOSS.png",
        "link": "http://www.genoss.com/",
        "year": 2016
    },
    {
        "name": "유한양행",
        "path": "유한양행.png",
        "link": "https://www.yuhan.co.kr",
        "year": 2016
    },
    {
        "name": "한미약품",
        "path": "한미약품.png",
        "link": "https://www.hanmi.co.kr",
        "year": 2016
    },
    {
        "name": "이연제약",
        "path": "이연제약.png",
        "link": "https://www.reyonpharm.co.kr",
        "year": 2016
    },
    {
        "name": "대명GEC",
        "path": "대명GEC.png",
        "link": "http://www.dmgec.com",
        "year": 2016
    },
]

t3 = [{
    "name": "제일약품",
    "path": "제일약품.png",
    "link": "http://www.jeilpharm.co.kr",
    "year": 2022
}]

for data in t3:
    requests.post("http://localhost:8000/api/v1/file/banner",
                  headers={"accept": "application/json",
                           "content-type": "application/json"},
                  json={
                      "name": data["name"],
                      "filename": data["path"],
                      "link": data["link"],
                      "year": data["year"]
                  })
