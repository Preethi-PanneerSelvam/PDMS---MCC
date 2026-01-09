from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.core.database import SessionLocal, engine, Base
from app.users.models import User
from app.auth.schemas import RegisterSchema, LoginSchema
from app.core.security import hash_password, verify_password, create_access_token
from app.auth.dependencies import get_current_user

# ------------------------------------------------------------------
# Router
# ------------------------------------------------------------------

router = APIRouter(prefix="/auth", tags=["Authentication"])



# ------------------------------------------------------------------
# DB Dependency
# ------------------------------------------------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------------------------------------------------------
# ADMIN-ONLY REGISTER
# ------------------------------------------------------------------

@router.post("/register")
def register(
    user: RegisterSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can register users"
        )

    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}

# ------------------------------------------------------------------
# LOGIN (Swagger OAuth2)
# ------------------------------------------------------------------

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user or not verify_password(
        form_data.password, db_user.hashed_password
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "user_id": db_user.id,
        "role": db_user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ------------------------------------------------------------------
# LOGIN (Frontend JSON)
# ------------------------------------------------------------------

@router.post("/login-ui")
def login_ui(
    payload: LoginSchema = Body(...),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == payload.email).first()

    if not db_user or not verify_password(
        payload.password, db_user.hashed_password
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "user_id": db_user.id,
        "role": db_user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }
