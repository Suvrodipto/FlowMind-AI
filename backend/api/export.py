from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from openpyxl import Workbook

from database import get_db
from models import Candidate

import os

router = APIRouter()

EXPORT_DIR = "exports"
os.makedirs(EXPORT_DIR, exist_ok=True)


@router.get("/export/excel")
def export_excel(db: Session = Depends(get_db)):
    candidates = db.query(Candidate).all()

    wb = Workbook()
    ws = wb.active
    ws.title = "Candidates"

    # Header
    ws.append([
        "Rank",
        "Name",
        "Email",
        "Phone",
        "ATS Score",
        "JD Match",
        "Status",
    ])

    # Sort by ATS + JD Match
    sorted_candidates = sorted(
        candidates,
        key=lambda c: (c.ats_score or 0) + (c.match_score or 0),
        reverse=True,
    )

    for rank, candidate in enumerate(sorted_candidates, start=1):
        ws.append([
            rank,
            candidate.name,
            candidate.email,
            candidate.phone,
            candidate.ats_score,
            candidate.match_score,
            candidate.status,
        ])

    filepath = os.path.join(EXPORT_DIR, "Candidates.xlsx")
    wb.save(filepath)

    return FileResponse(
        filepath,
        filename="Candidates.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )