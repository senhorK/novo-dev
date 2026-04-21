
let groundOffset = 0;

function drawChao(x, y, w, h) {
  /* velocidade do chão */
  groundOffset -= 5;
  
  const size = 40;
  
  /* reset infinito */
  if (groundOffset <= -size) {
    groundOffset = 0;
  }
  
  /* base principal */
  ctx.fillStyle = "#111";
  ctx.fillRect(0, y, w, h);
  
  /* linha neon superior */
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#00ffff";
  
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(0, y, w, 4);
  
  ctx.shadowBlur = 0;
  
  /* =====================
     PRIMEIRA LINHA
  ===================== */
  ctx.strokeStyle = "rgba(0,255,255,0.25)";
  ctx.lineWidth = 2;
  
  for (let i = -size; i < w + size; i += size) {
    ctx.strokeRect(
      i + groundOffset,
      y + 20,
      size,
      size
    );
  }
  
  /* =====================
     SEGUNDA LINHA
  ===================== */
  for (let i = -size; i < w + size; i += size) {
    ctx.strokeRect(
      i + 20 + groundOffset,
      y + 65,
      20,
      20
    );
  }
}


