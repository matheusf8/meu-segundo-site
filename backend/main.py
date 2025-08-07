from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Imports que funcionam tanto local quanto no Render
try:
    # Tenta import relativo (desenvolvimento local)
    from .database import Base, engine
    from .routers import usuario
except ImportError:
    # Se falhar, usa import absoluto (produção Render)
    from database import Base, engine
    from routers import usuario

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://meu-diario-e513c.web.app", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Rotas da API
app.include_router(usuario.router)

@app.get("/")
def read_root():
    return {"message": "Backend do Meu Diário funcionando!"}

@app.get("/api")
def api_root():
    return {"message": "API funcionando!"}