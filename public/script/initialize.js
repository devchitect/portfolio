if(typeof window !== 'undefined'){

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('class','dark')
  } else {
    document.documentElement.setAttribute('class','light')
  }
  
}