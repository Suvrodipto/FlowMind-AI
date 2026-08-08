from database import engine, Base
import models

print("Creating Database...")

Base.metadata.create_all(bind=engine)

print("Database Created Successfully!")