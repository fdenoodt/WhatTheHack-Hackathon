const init = () => {
  const pages = ['home', 'login', 'register', 'profile', 'chat']
  for (const page of pages) {
    document.querySelector('.' + page).style.display = 'none'
  }

  router = new Router(pages)
}

const register = () => {

}

const login = () => {

}