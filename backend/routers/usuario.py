from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Imports que funcionam tanto local quanto no Render
try:
    # Tenta import relativo (desenvolvimento local)
    from ..database import SessionLocal
    from ..models import Usuario
    from .. import schemas
    from .. import crud
except ImportError:
    # Se falhar, usa import absoluto (produção Render)
    from database import SessionLocal
    from models import Usuario
    import schemas
    import crud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/cadastro")
def cadastrar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    try:
        # Verificar se usuário já existe
        usuario_existente = db.query(Usuario).filter(Usuario.email == usuario.email).first()
        if usuario_existente:
            raise HTTPException(status_code=400, detail="Email já cadastrado.")
        
        # Criar usuário
        novo_usuario = crud.criar_usuario(db, usuario.email, usuario.senha)
        return {"mensagem": "Usuário cadastrado com sucesso!"}
    
    except Exception as e:
        print(f"Erro no cadastro: {e}")  # Log do erro
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.post("/login")
def login(usuario: schemas.UsuarioLogin, db: Session = Depends(get_db)):
    user = crud.autenticar_usuario(db, usuario.email, usuario.senha)
    if not user:
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")
    return {"mensagem": "Login realizado com sucesso!"}

@router.post("/registro")
def criar_registro(registro: schemas.RegistroCreate, db: Session = Depends(get_db)):
    novo_registro = crud.criar_registro(db, registro)
    return novo_registro

@router.get("/registros", response_model=List[schemas.RegistroOut])
def listar_registros(email: str, db: Session = Depends(get_db)):
    return crud.listar_registros(db, email)

@router.put("/registro/{id}")
def editar_registro(id: int, registro: schemas.RegistroUpdate, db: Session = Depends(get_db)):
    registro_existente = crud.obter_registro_por_id(db, id)
    if not registro_existente:
        raise HTTPException(status_code=404, detail="Registro não encontrado.")
    registro_atualizado = crud.editar_registro(db, id, registro)
    return registro_atualizado

@router.delete("/registro/{id}")
def deletar_registro(id: int, db: Session = Depends(get_db)):
    registro = crud.obter_registro_por_id(db, id)
    if not registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado.")
    crud.deletar_registro(db, id)
    return {"mensagem": "Registro deletado com sucesso!"}

@router.get("/admin/usuarios")
def ver_usuarios_admin(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()
    return [{"id": u.id, "email": u.email} for u in usuarios]

@router.get("/admin/registros")
def ver_todos_registros_admin(db: Session = Depends(get_db)):
    try:
        from models import Registro
    except ImportError:
        from .models import Registro
    
    registros = db.query(Registro).all()
    return registros