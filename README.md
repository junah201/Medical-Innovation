# 미래의학연구재단

> https://medicalinnovation.or.kr


## Install and Run

> Frontend

```powershell
cd .\Frontend\
npm install
npm start
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
