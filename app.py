import sys
import os

# Adiciona o backend ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Importa a aplicação
from backend.main import app

# Exporta para o Vercel
application = app