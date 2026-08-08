from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base

# Import models
import models


# Import APIs
from api.auth_routes import router as auth_router
from api.upload import router as upload_router
from api.candidates import router as candidates_router
from api.job_routes import router as job_router
from api.job_upload import router as job_upload_router



# ================= CREATE DATABASE TABLES ================= #

Base.metadata.create_all(bind=engine)





# ================= FASTAPI APP ================= #

app = FastAPI(

    title="FlowMind AI ATS",

    version="1.0.0"

)







# ================= CORS CONFIGURATION ================= #

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        # Local frontend

        "http://localhost:5173",

        "http://127.0.0.1:5173",

        "http://localhost:5175",

        "http://127.0.0.1:5175",


        # Add your Vercel URL after deployment

        # Example:
        # "https://flowmind-ai.vercel.app"

    ],


    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)







# ================= ROUTERS ================= #

app.include_router(auth_router)

app.include_router(upload_router)

app.include_router(candidates_router)

app.include_router(job_router)

app.include_router(job_upload_router)








# ================= BASIC ROUTES ================= #


@app.get("/")
def home():

    return {

        "message":"FlowMind AI Backend Running"

    }





@app.get("/health")
def health():

    return {

        "status":"OK"

    }