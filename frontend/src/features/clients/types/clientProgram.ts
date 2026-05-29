export interface ClientProgram {
    id : number;
    client_id : number;
    program_id : number;
    start_date : string;
    end_date : string | null;
    status : string | null;
}