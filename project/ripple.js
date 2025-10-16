// Tiny expanding ring drawn for click feedback
function drawRipple(r) {
  const t = r.life / 26; // 1..0
  noFill();
  stroke(red(r.col), green(r.col), blue(r.col), 90 * t);
  strokeWeight(1.4);
  circle(r.x, r.y, (1 - t) * r.r * 2);
  r.life--;
}
window.drawRipple = drawRipple;