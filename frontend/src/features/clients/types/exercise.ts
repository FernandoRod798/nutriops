export interface Exercise {
    id: number;
    routine_id: number;
    name: string;
    sets: number;
    reps: number;
    rest_seconds: number | null;
    notes: string | null;
}