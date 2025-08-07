from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from .database import Base  # Adicionar ponto
from sqlalchemy.orm import relationship
from datetime import datetime

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(120), unique=True, nullable=False)
    senha = Column(String(6), nullable=False)

class Registro(Base):
    __tablename__ = "registros"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(120), nullable=False)
    texto = Column(String, nullable=False)
    data = Column(String(10), nullable=False)