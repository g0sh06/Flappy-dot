function Dot() {
  this.y = innerHeight / 2
  this.x = innerWidth / 2

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 12, 12);
  }


}