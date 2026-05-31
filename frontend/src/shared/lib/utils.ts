// Genera iniciales de un nombre completo
// "Carlos López" → "CL"
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

// Traduce el goal a español
export function goalLabel(goal: string): string {
    if (goal === 'gain_muscle') return 'Ganar músculo'
    if (goal === 'lose_fat') return 'Perder grasa'
    return 'Mantener'
}