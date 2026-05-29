// Punto de entrada de la feature clients
// Solo exporta lo que el mundo exterior necesita ver
// Los archivos internos se importan entre sí directamente

export { default as ClientList } from './components/ClientList'
export { useClients } from './hooks/useClients'
export { clientService } from './services/clientService'
export { clientProgramService } from './services/clientProgramService'
export type { Client } from './types/client'
export type { ClientProgram } from './types/clientProgram'
export type { Routine } from './types/routine'
export type { Exercise } from './types/exercise'
export type { NutritionPlan } from './types/nutritionPlan'
export type { Meal } from './types/meal'