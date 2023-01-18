```powershell
cd .\Frontend\
npm start
```

```powershell
cd .\Backend\
uvicorn app.main:app --reload
```

```powershell
cd .\Backend\
alembic revision --autogenerate -m "migration message"
alembic upgrade head
```
