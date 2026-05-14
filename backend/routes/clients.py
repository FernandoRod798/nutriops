from flask import Blueprint, request, jsonify
from extensions import db
from models import Client

# Blueprint — le damos un nombre único "clients" y le decimos
# en qué módulo vive (__name__) para que Flask pueda localizarlo
# url_prefix agrega /clients antes de todas las rutas de este archivo
# Entonces "/" aquí equivale a "/clients" en la URL final
clients_bp = Blueprint("clients", __name__, url_prefix="/clients")


@clients_bp.route("/", methods=["GET"])
def get_clients():
    clients = Client.query.order_by(Client.created_at.desc()).all()
    return jsonify([c.to_dict() for c in clients]), 200


@clients_bp.route("/", methods=["POST"])
def create_client():
    data = request.get_json()

    required_fields = [
        "name", "email", "age", "weight", "height",
        "sex", "activity_level", "goal", "meals_per_day",
        "training_hours_per_week"
    ]
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({"error": f"Faltan campos: {', '.join(missing)}"}), 400

    client = Client(
        name                    = data["name"],
        email                   = data["email"],
        age                     = data["age"],
        weight                  = data["weight"],
        height                  = data["height"],
        sex                     = data["sex"],
        activity_level          = data["activity_level"],
        goal                    = data["goal"],
        preferred_foods         = data.get("preferred_foods"),
        meals_per_day           = data["meals_per_day"],
        training_hours_per_week = data["training_hours_per_week"],
    )
    db.session.add(client)
    db.session.commit()
    return jsonify(client.to_dict()), 201


@clients_bp.route("/<int:client_id>", methods=["GET"])
def get_client(client_id):
    client = Client.query.get_or_404(client_id)
    return jsonify(client.to_dict()), 200


@clients_bp.route("/<int:client_id>", methods=["DELETE"])
def delete_client(client_id):
    client = Client.query.get_or_404(client_id)
    db.session.delete(client)
    db.session.commit()
    return "", 204