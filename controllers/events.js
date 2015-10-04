

function index(req, res){
  res.render("events/index.ejs");
}

module.exports = {
  index: index
}