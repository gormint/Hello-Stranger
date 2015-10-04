
function index(req, res){
  console.log(req);
  console.log(req.query);

  res.send("done");
}

module.exports = {
  index: index
}