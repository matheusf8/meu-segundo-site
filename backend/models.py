from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

# Imports que funcionam tanto local quanto no Render
try:
    # Tenta import relativo (desenvolvimento local)
    from .database import Base
except ImportError:
    # Se falhar, usa import absoluto (produção Render)
    from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(120), unique=True, nullable=False)
    senha = Column(String(255), nullable=False)  # ✅ Para comportar hash bcrypt

class Registro(Base):
    __tablename__ = "registros"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(120), nullable=False)
    texto = Column(String, nullable=False)
    data = Column(String(10), nullable=False)