from flask import Blueprint, request, jsonify
from extensions import db
from models import ClientProgram, Client, Program
from datetime import date

client_programs_bp = Blueprint("client_programs", __name__, url_prefix="/")

@client_programs_bp.route("/clients/<int:client_id>/programs", methods=["GET"])
def get_client_programs(client_id):
    client_programs_list = ClientProgram.query.filter(ClientProgram.client_id == client_id).all()
    return jsonify([cp.to_dict() for cp in client_programs_list]), 200


@client_programs_bp.route("/clients/<int:client_id>/programs", methods=["POST"])
def assigment_program_client(client_id):
    data = request.get_json()
    required_fields = ["program_id"]
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({"error": f"Faltan campos: {', '.join(missing)}"}), 400
    
    # Verifica que el cliente existe — si no, regresa 404
    Client.query.get_or_404(client_id)
    # Verifica que el programa existe
    Program.query.get_or_404(data["program_id"])

    program_to_client = ClientProgram(
        client_id = client_id,
        program_id = data["program_id"],
    )

    db.session.add(program_to_client)
    db.session.commit()
    return jsonify(program_to_client.to_dict()), 201

@client_programs_bp.route("/client-programs/<int:client_program_id>", methods=["DELETE"])
def delete_client_program(client_program_id):
    # Busca la asignación — si no existe regresa 404
    client_program = ClientProgram.query.get_or_404(client_program_id)
    db.session.delete(client_program)
    db.session.commit()
    return "", 204
