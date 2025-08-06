from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine  # SEM backend. na frente
from routers import usuario        # SEM backend. na frente
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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