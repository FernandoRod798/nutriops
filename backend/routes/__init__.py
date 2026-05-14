# routes/__init__.py
from routes.clients import clients_bp
from routes.programs import programs_bp
from routes.client_programs import client_programs_bp
from routes.routines import routines_bp
from routes.exercises import exercises_bp
from routes.nutrition_plans import nutrition_plans_bp
from routes.meals import meals_bp

def register_all_blueprints(app):
    app.register_blueprint(clients_bp)
    app.register_blueprint(programs_bp)
    app.register_blueprint(client_programs_bp)
    app.register_blueprint(routines_bp)
    app.register_blueprint(exercises_bp)
    app.register_blueprint(nutrition_plans_bp)
    app.register_blueprint(meals_bp)