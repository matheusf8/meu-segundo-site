from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Para desenvolvimento local (SQLite)
if os.getenv("ENVIRONMENT") == "production":
    # PostgreSQL no Render
    SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    # SQLite local
    SQLALCHEMY_DATABASE_URL = "sqlite:///./meu_diario.db"
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()