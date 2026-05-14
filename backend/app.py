from flask import Flask
from flask_cors import CORS
from extensions import db
from dotenv import load_dotenv
import os
from routes import register_all_blueprints

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)
    db.init_app(app)

    register_all_blueprints(app)

    with app.app_context():
        from models import Client, Program, ClientProgram, Routine, Exercise, NutritionPlan, Meal
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)