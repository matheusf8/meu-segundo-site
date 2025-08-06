from sqlalchemy.orm import Session
from .models import Usuario, Registro
from .schemas import UsuarioCreate, RegistroCreate, RegistroUpdate
from fastapi import HTTPException

# Usuário
def criar_usuario(db: Session, usuario: UsuarioCreate):
    if db.query(Usuario).filter(Usuario.email == usuario.email).first():
        return None  # E-mail já existe
    db_usuario = Usuario(email=usuario.email, senha=usuario.senha)
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def autenticar_usuario(db: Session, email: str, senha: str):
    return db.query(Usuario).filter(Usuario.email == email, Usuario.senha == senha).first()

# Registro
def criar_registro(db: Session, registro: RegistroCreate):
    db_registro = Registro(email=registro.email, texto=registro.texto, data=registro.data)
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)
    return db_registro

def listar_registros(db: Session, email: str):
    return db.query(Registro).filter(Registro.email == email).order_by(Registro.id.desc()).all()

def obter_registro_por_id(db: Session, id: int):
    return db.query(Registro).filter(Registro.id == id).first()

def editar_registro(db: Session, id: int, registro: RegistroUpdate):
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
