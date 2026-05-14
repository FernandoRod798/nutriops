from flask import jsonify, request, Blueprint
from extensions import db
from models import ClientProgram, NutritionPlan

nutrition_plans_bp = Blueprint("nutrition_plan", __name__, url_prefix="/")

@nutrition_plans_bp.route("/client-programs/<int:client_program_id>/nutrition-plans", methods=["GET"])
def get_nutrition_plans(client_program_id):
    plans = NutritionPlan.query.filter_by(client_program_id=client_program_id).all()
    return jsonify([p.to_dict() for p in plans]), 200

@nutrition_plans_bp.route("/client-programs/<int:client_program_id>/nutrition-plans", methods=["POST"])
def assign_nutrition_plan_program(client_program_id):
    data = request.get_json()
    
    request_fields = ["name", "week_number", "target_calories"]
    missing = [field for field in request_fields if field not in data]
    if missing:
        return jsonify({"error": f"Faltan campos: {' ,'.join(missing)}"}), 400
    
    ClientProgram.query.get_or_404(client_program_id)

    new_plan  = NutritionPlan(
        client_program_id = client_program_id,
        name              = data["name"],
        week_number       = data["week_number"],
        target_calories   = data["target_calories"],
        notes             = data.get("notes"),
    )

    db.session.add(new_plan)
    db.session.commit()
    return jsonify(new_plan.to_dict()), 201

@nutrition_plans_bp.route("/nutrition-plans/<int:id>", methods=["DELETE"])
def delete_nutrition_plan(id):
    plan = NutritionPlan.query.get_or_404(id)
    db.session.delete(plan)
    db.session.commit()
    return "", 204