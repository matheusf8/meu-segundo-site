# Meu Diário

Este projeto é um sistema web para registro de sentimentos e experiências pessoais, desenvolvido com **React + Vite** no frontend e **FastAPI** no backend.

## Funcionalidades

- Cadastro e login de usuários
- Registro de textos diários com data
- Edição e exclusão de registros
- Feedback visual para ações (salvar, excluir)
- Interface responsiva e amigável

## Como rodar localmente

### 1. Instalar dependências do backend

```bash
cd backend
pip install -r requirements.txt
```

### 2. Instalar dependências do frontend

```bash
cd frontend
npm install
```

### 3. Rodar o backend

```bash
uvicorn backend.main:app --reload
```

### 4. Rodar o frontend (modo desenvolvimento)

```bash
cd frontend
npm run dev
```

## Estrutura de pastas

```
meu_diario/
├── backend/
│   ├── main.py
│   ├── routers/
│   ├── models.py
│   ├── crud.py
│   ├── requirements.txt
├── frontend/
│   ├── src/
│   ├── dist/
│   ├── package.json
```

## Observações

- O banco padrão é SQLite, fácil para testes locais.
- Para produção, prefira PostgreSQL (Railway/Render oferecem banco grátis).
- O sistema é ideal para uso pessoal ou pequenos grupos.

---

**Dúvidas ou sugestões?**  
Abra uma issue ou entre em contato!
