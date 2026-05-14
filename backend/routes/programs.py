from flask import Blueprint, request, jsonify
from extensions import db
from models import Program

programs_bp = Blueprint("programs", __name__, url_prefix="/programs")

@programs_bp.route("/", methods=["GET"])
def get_programs():
    programs = Program.query.order_by(Program.created_at.desc()).all()
    return jsonify([cp.to_dict() for cp in programs]), 200

@programs_bp.route("/", methods=["POST"])
def create_program():
    data = request.get_json()

    required_fields = ["name", "description", "duration_months", "type"]

    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({"error": f"Faltan campos: {', '.join(missing)}"}), 400

    program = Program(
        name            = data["name"],
        description     = data["description"],
        duration_months = data["duration_months"],
        type            = data["type"],
    )
    
    db.session.add(program)
    db.session.commit()
    return jsonify(program.to_dict()), 201

@programs_bp.route("/<int:program_id>", methods=["GET"])
def get_program(program_id):
    program = Program.query.get_or_404(program_id)
    return jsonify(program.to_dict()), 200

@programs_bp.route("/<int:program_id>", methods=["DELETE"])
def delete_program(program_id):
    program = Program.query.get_or_404(program_id)
    db.session.delete(program)
    db.session.commit()
    return "", 204