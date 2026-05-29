export interface NutritionPlan {
    id : number;
    client_program_id : number;
    name : string;
    week_number : number;
    target_calories: number;
    notes : string;
}