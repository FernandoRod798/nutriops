from flask import jsonify, request, Blueprint
from extensions import db
from models import ClientProgram, Meal, NutritionPlan

meals_bp = Blueprint("meal", __name__, url_prefix="/")

@meals_bp.route("/nutrition-plans/<int:nutrition_plan_id>/meals", methods=["POST"])
def assign_meal_nutrition_plan(nutrition_plan_id):
    data = request.get_json()
    
    request_fields = ["name", "calories", "protein", "carbs", "fats"]
    missing = [field for field in request_fields if field not in data]
    if missing:
        return jsonify({"error": f"Faltan campos: {' ,'.join(missing)}"}), 400
    
    NutritionPlan.query.get_or_404(nutrition_plan_id)

    new_meal  = Meal(
        nutrition_plan_id = nutrition_plan_id,
        name              = data["name"],
        calories          = data["calories"],
        protein           = data["protein"],
        carbs             = data["carbs"],
        fats              = data["fats"],
        notes             = data.get("notes"),
    )

    db.session.add(new_meal)
    db.session.commit()
    return jsonify(new_meal.to_dict()), 201

@meals_bp.route("/meals/<int:id>", methods=["DELETE"])
def delete_meal(id):
    meal = Meal.query.get_or_404(id)
    db.session.delete(meal)
    db.session.commit()
    return "", 204
