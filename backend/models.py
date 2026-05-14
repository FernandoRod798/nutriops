from extensions import db  # antes decía "from app import db"
from datetime import datetime

class Client(db.Model):
    id                       = db.Column(db.Integer, primary_key=True)
    name                     = db.Column(db.String(100), nullable=False)
    email                    = db.Column(db.String(120), unique=True, nullable=False)
    age                      = db.Column(db.Integer, nullable=False)
    weight                   = db.Column(db.Float, nullable=False)
    height                   = db.Column(db.Float, nullable=False)
    sex                      = db.Column(db.String(10), nullable=False)
    activity_level           = db.Column(db.String(20), nullable=False)
    goal                     = db.Column(db.String(20), nullable=False)
    preferred_foods          = db.Column(db.String(200), nullable=True)
    meals_per_day            = db.Column(db.Integer, nullable=False)
    training_hours_per_week  = db.Column(db.Float, nullable=False)
    created_at               = db.Column(db.DateTime, default=datetime.utcnow)

    # Relación con ClientProgram — un cliente puede tener varios programas
    # cascade="all, delete" borra los ClientProgram si se borra el cliente
    client_programs = db.relationship("ClientProgram", backref="client", lazy=True, cascade="all, delete")

    def __repr__(self):
        return f"<Client {self.name}>"

    def to_dict(self):
        return {
            "id":                      self.id,
            "name":                    self.name,
            "email":                   self.email,
            "age":                     self.age,
            "weight":                  self.weight,
            "height":                  self.height,
            "sex":                     self.sex,
            "activity_level":          self.activity_level,
            "goal":                    self.goal,
            "preferred_foods":         self.preferred_foods,
            "meals_per_day":           self.meals_per_day,
            "training_hours_per_week": self.training_hours_per_week,
            "created_at":              self.created_at.isoformat(),
        }


class Program (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    duration_months = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relación con ClientProgram — un programa puede ser asignado a varios clientes
    client_programs = db.relationship("ClientProgram", backref="program", lazy=True, cascade="all, delete")

    def __repr__(self):
        return f"<Program {self.name}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "duration_months": self.duration_months,
            "type": self.type,
            "created_at": self.created_at.isoformat(),
        }
    

class ClientProgram(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey("client.id"), nullable=False)
    program_id = db.Column(db.Integer, db.ForeignKey("program.id"), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), nullable=False, default="active")
    
    routines = db.relationship("Routine", backref="client_program", lazy=True, cascade="all, delete")
    nutrition_plans = db.relationship("NutritionPlan", backref="client_program", lazy=True, cascade="all, delete")

    def __repr__(self):
        return f"<ClientProgram {self.id}>"

    def to_dict(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "program_id": self.program_id,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat() if self.end_date else None,
            "status": self.status,
        }
    

class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_program_id = db.Column(db.Integer, db.ForeignKey("client_program.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    week_number = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String(200), nullable=True)

    exercises = db.relationship("Exercise", backref="routine", lazy=True, cascade="all, delete")

    def __repr__(self):
        return f"<Routine {self.id}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "client_program_id": self.client_program_id,
            "name": self.name,
            "week_number": self.week_number,
            "notes": self.notes,
        }
    
class NutritionPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_program_id = db.Column(db.Integer, db.ForeignKey("client_program.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    week_number = db.Column(db.Integer, nullable=False)
    target_calories = db.Column(db.Float, nullable=False)
    notes = db.Column(db.String(200), nullable=True)

    meals = db.relationship("Meal", backref="nutrition_plan", lazy=True, cascade="all, delete")

    def __repr__(self):
        return f"<NutritionPlan {self.id}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "client_program_id": self.client_program_id,
            "name": self.name,
            "week_number": self.week_number,
            "target_calories": self.target_calories,
            "notes": self.notes,
        }
    
class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nutrition_plan_id = db.Column(db.Integer, db.ForeignKey("nutrition_plan.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    calories = db.Column(db.Float, nullable=False)
    protein = db.Column(db.Float, nullable=False)
    carbs = db.Column(db.Float, nullable=False)
    fats = db.Column(db.Float, nullable=False)
    notes = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Meal {self.id}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "nutrition_plan_id": self.nutrition_plan_id,
            "name": self.name,
            "calories": self.calories,
            "protein": self.protein,
            "carbs": self.carbs,
            "fats": self.fats,
            "notes": self.notes,
        }


class Exercise(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    routine_id  = db.Column(db.Integer, db.ForeignKey("routine.id"), nullable=False)
    name        = db.Column(db.String(100), nullable=False)
    sets        = db.Column(db.Integer, nullable=False)
    reps        = db.Column(db.Integer, nullable=False)
    rest_seconds = db.Column(db.Integer, nullable=True)
    notes       = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Exercise {self.id}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "routine_id": self.routine_id,
            "name": self.name,
            "sets": self.sets,
            "reps": self.reps,
            "rest_seconds": self.rest_seconds,
            "notes": self.notes,
        }
    