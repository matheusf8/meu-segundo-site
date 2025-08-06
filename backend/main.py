from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import Base, engine
from .routers import usuario
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou coloque o endereço do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Rotas da API PRIMEIRO
app.include_router(usuario.router)

@app.get("/api")
def read_root():
    return {"message": "Bem-vindo ao backend do Meu Diário!"}

# Sirva os arquivos do React build POR ÚLTIMO
app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="static")