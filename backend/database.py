from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os



# ================= DATABASE PATH ================= #

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)


DATABASE_PATH = os.path.join(
    BASE_DIR,
    "flowmind.db"
)



DATABASE_URL = f"sqlite:///{DATABASE_PATH}"





# ================= DATABASE ENGINE ================= #

engine = create_engine(

    DATABASE_URL,

    connect_args={

        "check_same_thread": False

    }

)





# ================= SESSION ================= #

SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine

)





# ================= BASE MODEL ================= #

Base = declarative_base()







# ================= DATABASE DEPENDENCY ================= #

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()