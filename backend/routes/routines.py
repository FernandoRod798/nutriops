from flask import jsonify, request, Blueprint
from extensions import db
from models import Routine, ClientProgram

routines_bp =  Blueprint("routine", __name__, url_prefix="/")

@routines_bp.route("/client-programs/<int:client_program_id>/routines", methods=["GET"])
def get_routines(client_program_id):
    routines = Routine.query.filter_by(client_program_id=client_program_id).all()
    return jsonify([r.to_dict() for r in routines]), 200

@routines_bp.route("/client-programs/<int:client_program_id>/routines", methods=["POST"])
def assign_routine_program(client_program_id):
    data = request.get_json()
    
    request_fields = ["name", "week_number"]
    missing = [field for field in request_fields if field not in data]
    if missing:
        return jsonify({"error": f"Faltan campos: {' ,'.join(missing)}"}), 400
    
    ClientProgram.query.get_or_404(client_program_id)

    new_routine  = Routine(
        client_program_id = client_program_id,
        name              = data["name"],
        week_number       = data["week_number"],
        notes             = data.get("notes"),
    )

    db.session.add(new_routine)
    db.session.commit()
    return jsonify(new_routine.to_dict()), 201


@routines_bp.route("/routines/<int:id>", methods=["DELETE"])
def delete_routine(id):
    routine = Routine.query.get_or_404(id)
    db.session.delete(routine)
    db.session.commit()
    return "", 204