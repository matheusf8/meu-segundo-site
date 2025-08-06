import sys
import os

# Adiciona o diretório atual ao path
sys.path.insert(0, os.path.dirname(__file__))

# Importa a aplicação do backend
from backend.main import app

# Exporta para o Vercel
application = app