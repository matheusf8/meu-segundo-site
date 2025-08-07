from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException
import bcrypt

# Imports que funcionam tanto local quanto no Render
try:
    # Tenta import relativo (desenvolvimento local)
    from .models import Usuario, Registro
    from . import schemas
except ImportError:
    # Se falhar, usa import absoluto (produção Render)
    from models import Usuario, Registro
    import schemas

# Configuração do contexto do CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Usuário
def criar_usuario(db: Session, email: str, senha: str):
    # Hash da senha
    senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())
    
    # Criar usuário
    usuario = Usuario(
        email=email, 
        senha=senha_hash.decode('utf-8')  # ✅ Campo correto: 'senha'
    )
    
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

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
