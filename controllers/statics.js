function lander(req, res) {  
  res.render('lander.ejs');
}

function home(req, res) {
  res.render('home.ejs');
}


module.exports = {
  lander: lander,
  home: home,
}