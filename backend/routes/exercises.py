from flask import jsonify, request, Blueprint
from extensions import db
from models import Exercise, Routine

exercises_bp = Blueprint("exercise", __name__, url_prefix="/")

@exercises_bp.route("/routines/<routine_id>/exercises", methods=["POST"])
def assign_exercises_routine(routine_id):
    data = request.get_json()

    request_fields = ["name","sets","reps"]
    missing = [field for field in request_fields if field not in data]
    if missing:
        return jsonify({"error": f"Faltan campos: {' ,'.join(missing)}"})
    
    Routine.query.get_or_404(routine_id)

    new_exercise = Exercise(
        routine_id = routine_id,
        name = data ["name"],
        sets = data["sets"],
        reps = data["reps"],
        rest_seconds = data.get("rest_seconds"),
        notes = data.get("notes")
    )

    db.session.add(new_exercise)
    db.session.commit()
    return jsonify(new_exercise.to_dict()), 201

@exercises_bp.route("/exercises/<int:exercise_id>", methods=["DELETE"])
def delete_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    db.session.delete(exercise)
    db.session.commit()
    return "", 204