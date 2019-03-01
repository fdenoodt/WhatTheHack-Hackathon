class Router {
  constructor(lsPages) {
    this.lsPages = lsPages
    this.goTo('home')
    // this.event = new Event('build')
  }

  // Routing
  goTo = (page) => {
    location.href = '#page=' + page
    this.updatePage();
    $('.sidenav').sidenav();
  }

  //Method copied from online and changed "? into #"
  getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(/[#&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }

  updatePage = () => {
    this.lsPages.forEach(element => {
      document.querySelector('.' + element).style.display = 'none';
    });

    let pageToDisplay = this.getUrlVars().page;
    if (pageToDisplay == null)
    pageToDisplay = 'home';
    
    document.querySelector('.' + pageToDisplay).style.display = 'block';


    if(pageToDisplay == 'game')
      findGame()
    //TODO: page events
  }
}