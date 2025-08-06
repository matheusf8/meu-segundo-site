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

app.include_router(usuario.router)

# Sirva os arquivos do React build
app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="static")

@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao backend do Meu Diário!"}