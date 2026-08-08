from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base

# Import models so tables are created
import models


# Import routers
from api.auth_routes import router as auth_router
from api.upload import router as upload_router
from api.candidates import router as candidates_router
from api.job_routes import router as job_router
from api.job_upload import router as job_upload_router



# Create database tables
Base.metadata.create_all(bind=engine)
# ==============================
# CREATE DEMO USER
# ==============================

from database import SessionLocal
from models import User
from auth.password_handler import hash_password


def create_demo_user():

    db = SessionLocal()

    try:

        existing_user = (
            db.query(User)
            .filter(
                User.email == "demo@flowmind.ai"
            )
            .first()
        )


        if not existing_user:

            demo_user = User(

                username="demo",

                email="demo@flowmind.ai",

                hashed_password=hash_password(
                    "Demo@123"
                )

            )


            db.add(demo_user)

            db.commit()


            print(
                "Demo user created successfully"
            )


        else:

            print(
                "Demo user already exists"
            )


    except Exception as e:

        print(
            "Demo user creation failed:",
            e
        )


    finally:

        db.close()



create_demo_user()



app = FastAPI(

    title="FlowMind AI ATS",

    version="1.0.0"

)



# ==============================
# CORS CONFIGURATION
# ==============================

app.add_middleware(

    CORSMiddleware,

    # Allow frontend from any origin
    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)





# ==============================
# ROUTERS
# ==============================


app.include_router(auth_router)

app.include_router(upload_router)

app.include_router(candidates_router)

app.include_router(job_router)

app.include_router(job_upload_router)






# ==============================
# BASIC ROUTES
# ==============================


@app.get("/")
def home():

    return {

        "message": "FlowMind AI Backend Running"

    }





@app.get("/health")
def health():

    return {

        "status": "OK"

    }