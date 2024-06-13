export const themes = {
  // state: window?.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light',
  state: 'light',
  reducers: {
    setTheme(_, theme) {
      return theme
    }
  }
}
