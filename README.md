# 미래의학연구재단

> https://medicalinnovation.or.kr > ![image](https://user-images.githubusercontent.com/75025529/229030286-f8f53a9a-72f7-442a-8f84-00723c3e7957.png)

## Install and Run

> Frontend

```powershell
cd .\Frontend\
yarn install
yarn dev --port 3000
```

> Backend

```powershell
cd .\Backend\
uvicorn app.main:app --reload
```

> DB migration

```powershell
cd .\Backend\
alembic revision --autogenerate -m "migration message"
alembic upgrade head
```

## Contribute

Contributions are welcome!
