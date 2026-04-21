









let backgroundShapes = [];
let estrelas = [];

/* =========================
   GERAR FORMAS GRANDES
========================= */
function gerarFormasFundo(width, height) {
  backgroundShapes = [];
  
  const numShapes = 18;
  
  for (let i = 0; i < numShapes; i++) {
    const type = Math.random() < 0.7 ? "square" : "rect";
    
    const baseSize = 80 + Math.random() * 180;
    
    const w = type === "square" ?
      baseSize :
      baseSize * (1.2 + Math.random());
    
    const h = baseSize;
    
    const x = Math.random() * width * 2;
    const y = Math.random() * (height * 0.8);
    
    const layer = Math.floor(Math.random() * 3);
    
    const speeds = [0.2, 0.5, 1.2];
    const speed = speeds[layer];
    
    const alphas = [0.03, 0.06, 0.12];
    const alpha = alphas[layer];
    
    const rotation = Math.random() * Math.PI * 2;
    
    backgroundShapes.push({
      type,
      x,
      y,
      w,
      h,
      speed,
      alpha,
      rotation,
      layer
    });
  }
}


/* =========================
   ESTRELAS / PARTÍCULAS
========================= */
function gerarEstrelas(width, height) {
  estrelas = [];
  
  for (let i = 0; i < 50; i++) {
    estrelas.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2
    });
  }
}


/* =========================
   DRAW BACKGROUND INSANO
========================= */
function desenharBackgroundGeometryDinamico(width, height) {
  const time = Date.now() * 0.001;
  
  /* =========================
     FUNDO PULSANTE
  ========================= */
  const hue = 260;
  const sat = 75;
  const light = 10 + Math.sin(time * 0.6) * 6;
  
  ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
  ctx.fillRect(0, 0, width, height);
  
  /* =========================
     GRID GEOMETRY
  ========================= */
  const grid = 64;
  const cols = Math.ceil(width / grid) + 2;
  const rows = Math.ceil(height / grid) + 2;
  
  const gridOffset = (Date.now() * 0.08) % grid;
  
  ctx.strokeStyle = `hsla(${hue}, 70%, 40%, 0.10)`;
  ctx.lineWidth = 1;
  
  ctx.save();
  ctx.translate(-gridOffset, 0);
  
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      let x = c * grid;
      let y = r * grid;
      
      ctx.beginPath();
      ctx.rect(
        x + 8,
        y + 8,
        grid - 16,
        grid - 16
      );
      ctx.stroke();
    }
  }
  
  ctx.restore();
  
  /* =========================
     ESTRELAS FLUTUANTES
  ========================= */
  if (estrelas.length === 0) {
    gerarEstrelas(width, height);
  }
  
  for (let e of estrelas) {
    e.x -= e.speed;
    
    if (e.x < -10) {
      e.x = width + 10;
      e.y = Math.random() * height;
    }
    
    ctx.save();
    ctx.globalAlpha = e.alpha;
    
    ctx.fillStyle = "#00ffff";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#00ffff";
    
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
  
  /* =========================
     FORMAS GRANDES
  ========================= */
  if (backgroundShapes.length === 0) {
    gerarFormasFundo(width, height);
  }
  
  for (let shape of backgroundShapes) {
    shape.x -= shape.speed;
    
    if (shape.x + shape.w < 0) {
      shape.x = width + Math.random() * width;
      shape.y = Math.random() * (height * 0.8);
    }
    
    ctx.save();
    
    ctx.translate(
      shape.x + shape.w / 2,
      shape.y + shape.h / 2
    );
    
    ctx.rotate(
      shape.rotation + time * (0.03 * (shape.layer + 1))
    );
    
    ctx.strokeStyle = `hsla(180, 100%, 50%, ${shape.alpha})`;
    ctx.lineWidth = 2;
    
    if (shape.layer === 2) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(0,255,255,0.4)";
    }
    
    ctx.beginPath();
    ctx.rect(
      -shape.w / 2,
      -shape.h / 2,
      shape.w,
      shape.h
    );
    ctx.stroke();
    
    ctx.restore();
  }
  
  /* =========================
     LINHA DE HORIZONTE
  ========================= */
  ctx.save();
  
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#00ffff";
  
  ctx.strokeStyle = "rgba(0,255,255,0.25)";
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(0, height * 0.88);
  ctx.lineTo(width, height * 0.88);
  ctx.stroke();
  
  ctx.restore();
}









