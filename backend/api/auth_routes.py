from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from pydantic import BaseModel, EmailStr

from database import get_db
from models import User

from auth.password_handler import (
    hash_password,
    verify_password
)

from auth.jwt_handler import (
    create_access_token
)



router = APIRouter()





# ================= SCHEMAS ================= #


class RegisterRequest(BaseModel):

    username: str

    email: EmailStr

    password: str





class LoginRequest(BaseModel):

    email: EmailStr

    password: str





# ================= REGISTER ================= #


@router.post("/register")
def register(

    user: RegisterRequest,

    db: Session = Depends(get_db)

):


    existing_user = (

        db.query(User)

        .filter(

            (User.email == user.email)

            |

            (User.username == user.username)

        )

        .first()

    )



    if existing_user:


        raise HTTPException(

            status_code=400,

            detail="User already exists"

        )





    new_user = User(

        username=user.username,

        email=user.email,

        hashed_password=hash_password(

            user.password

        )

    )



    db.add(new_user)

    db.commit()

    db.refresh(new_user)



    return {


        "message":

        "User registered successfully",


        "user":{


            "username":
            new_user.username,


            "email":
            new_user.email

        }

    }








# ================= LOGIN ================= #


@router.post("/login")
def login(

    user: LoginRequest,

    db: Session = Depends(get_db)

):



    db_user = (

        db.query(User)

        .filter(

            User.email == user.email

        )

        .first()

    )




    if not db_user:


        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"

        )






    if not verify_password(

        user.password,

        db_user.hashed_password

    ):


        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"

        )






    token = create_access_token(

        {

            "sub":

            db_user.email

        }

    )





    return {


        "access_token":

        token,


        "token_type":

        "bearer",



        "user":{


            "username":

            db_user.username,


            "email":

            db_user.email


        }

    }