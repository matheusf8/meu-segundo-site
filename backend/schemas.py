from pydantic import BaseModel, EmailStr

class UsuarioCreate(BaseModel):
    email: EmailStr
    senha: str

class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str

class RegistroBase(BaseModel):
    email: EmailStr
    texto: str
    data: str

class RegistroCreate(RegistroBase):
    pass

class RegistroUpdate(BaseModel):
    texto: str

class RegistroOut(RegistroBase):
    id: int

    class Config:
        orm_mode = True