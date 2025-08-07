from sqlalchemy.orm import Session
from .models import Usuario, Registro  # Adicionar ponto
from . import schemas                  # Adicionar ponto
from passlib.context import CryptContext
from fastapi import HTTPException  # Adicionar esta linha

# Configuração do contexto do CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Usuário
def criar_usuario(db: Session, usuario: schemas.UsuarioCreate):
    if db.query(Usuario).filter(Usuario.email == usuario.email).first():
        return None  # E-mail já existe
    db_usuario = Usuario(email=usuario.email, senha=pwd_context.hash(usuario.senha))
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def autenticar_usuario(db: Session, email: str, senha: str):
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if not usuario:
        return None
    
    try:
        # Tentar verificar senha hasheada
        if pwd_context.verify(senha, usuario.senha):
            return usuario
    except:
        # Se der erro, pode ser senha em texto puro (dados antigos)
        if usuario.senha == senha:
            # Atualizar para hash
            usuario.senha = pwd_context.hash(senha)
            db.commit()
            return usuario
    
    return None

# Registro
def criar_registro(db: Session, registro: schemas.RegistroCreate):
    db_registro = Registro(email=registro.email, texto=registro.texto, data=registro.data)
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)
    return db_registro

def listar_registros(db: Session, email: str):
    return db.query(Registro).filter(Registro.email == email).order_by(Registro.id.desc()).all()

def obter_registro_por_id(db: Session, id: int):
    return db.query(Registro).filter(Registro.id == id).first()

def editar_registro(db: Session, id: int, registro: schemas.RegistroUpdate):
    db_registro = db.query(Registro).filter(Registro.id == id).first()
    if db_registro:
        db_registro.texto = registro.texto
        db.commit()
        db.refresh(db_registro)
        return {"mensagem": "Registro salvo com sucesso!"}
    raise HTTPException(status_code=404, detail="Registro não encontrado")

def deletar_registro(db: Session, id: int):
    db_registro = db.query(Registro).filter(Registro.id == id).first()
    if not db_registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado")
    db.delete(db_registro)
    db.commit()
    return {"mensagem": "Registro deletado com sucesso"}
