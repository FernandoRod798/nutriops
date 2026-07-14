export interface ClientProgram {
    id: number
    client_id: number
    program_id: number
    program_name: string
    program_type: string
    duration_months: number
    start_date: string
    end_date: string | null
    status: string
}