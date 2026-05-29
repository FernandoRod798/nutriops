import { useState, useEffect } from 'react'

// Hook personalizado para manejar el tema dark/light
// Guarda la preferencia en localStorage para que persista
// entre sesiones — si cierras el navegador y vuelves,
// recuerda el tema que tenías
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Inicializa leyendo localStorage
    // Si no hay nada guardado, usa dark por defecto
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    // Cada vez que isDark cambia, actualiza la clase del html
    // y guarda la preferencia en localStorage
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Alterna entre dark y light
  function toggleTheme() {
    setIsDark(prev => !prev)
  }

  return { isDark, toggleTheme }
}