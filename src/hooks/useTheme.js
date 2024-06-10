import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function useTheme() {
  const theme = useSelector((state) => state.themes)
  useEffect(() => {
    document.body.className = `theme-${theme}`
  })
}

export default useTheme
