




function defull(x,y,size,rotation) {
  ctx.save();
  
  // centro do player
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  
  // mover origem pro centro
  ctx.translate(centerX, centerY);
  
  // girar
  ctx.rotate(rotation);
  
  // desenhar relativo ao centro
  const px = -size / 2;
  const py = -size / 2;
  
  // corpo
  ctx.fillStyle = "#0f0";
  ctx.fillRect(px, py, size, size);
  
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.strokeRect(px, py, size, size);
  
  // olhos
  ctx.fillStyle = "#0f0";
  ctx.fillRect(px + size * 0.1, py + size * 0.2, size / 5, size / 5);
  ctx.fillRect(px + size * 0.7, py + size * 0.2, size / 5, size / 5);
  
  ctx.strokeRect(px + size * 0.1, py + size * 0.2, size / 5, size / 5);
  ctx.strokeRect(px + size * 0.7, py + size * 0.2, size / 5, size / 5);
  
  // boca
  ctx.fillRect(px + size * 0.25, py + size * 0.7, size / 2, size / 6);
  ctx.strokeRect(px + size * 0.25, py + size * 0.7, size / 2, size / 6);
  
  
  
  
  ctx.restore();
  
  ctx.fillStyle = "#f00";
  ctx.fillRect(px,  py, size, size);

  
  
}
function drado(x,y,size, rotation){
  ctx.save();
      const cx = x + size / 2;
      const cy = y + size / 2;
      
      ctx.translate(cx,cy);
      ctx.rotate(rotation);
      
      ///Desenhar relativo ao centro///
      const px = -size/2;
      const py = -size/2;
      
      
      ctx.fillStyle = "#F9C4FF";
      ctx.fillRect(px,py, size,size)
      
      ctx.strokeStyle = "#E400FF"
      ctx.strokeRect(px,py,size,size)
      
      
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill()
  ctx.restore();
}
function Sharingan(x,y,size,rotation) {
  
  
  
  ctx.save();
  
  const cx = x + size / 2;
  const cy = y + size / 2;
  
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  
  const s = size / 2;
  
  /* =====================
     PONTAS SHURIKEN
  ===================== */
  ctx.fillStyle = "#F041FF";
  ctx.strokeStyle = "#F00";
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  
  // cima
  ctx.moveTo(0, -s - 12);
  ctx.lineTo(-10, -s + 5);
  ctx.lineTo(10, -s + 5);
  
  // direita
  ctx.moveTo(s + 12, 0);
  ctx.lineTo(s - 5, -10);
  ctx.lineTo(s - 5, 10);
  
  // baixo
  ctx.moveTo(0, s + 12);
  ctx.lineTo(-10, s - 5);
  ctx.lineTo(10, s - 5);
  
  // esquerda
  ctx.moveTo(-s - 12, 0);
  ctx.lineTo(-s + 5, -10);
  ctx.lineTo(-s + 5, 10);
  
  ctx.fill();

  /* centro */
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}
function CristalCore(x, y, size, rotation) {
  ctx.save();
  
  const cx = x + size / 2;
  const cy = y + size / 2;
  
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  
  const s = size / 2;
  
  /* =====================
     CRISTAL EXTERNO
  ===================== */
  ctx.fillStyle = "#00e5ff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  
  // topo
  ctx.moveTo(0, -s - 12);
  
  // direita cima
  ctx.lineTo(s * 0.8, -s * 0.3);
  
  // direita baixo
  ctx.lineTo(s * 0.6, s * 0.8);
  
  // baixo
  ctx.lineTo(0, s + 12);
  
  // esquerda baixo
  ctx.lineTo(-s * 0.6, s * 0.8);
  
  // esquerda cima
  ctx.lineTo(-s * 0.8, -s * 0.3);
  
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  /* =====================
     NÚCLEO INTERNO
  ===================== */
  ctx.fillStyle = "#111";
  
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.45, 0, Math.PI * 2);
  ctx.fill();
  
  /* =====================
     ANEL DE ENERGIA
  ===================== */
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 3;
  
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.65, 0, Math.PI * 2);
  ctx.stroke();
  
  /* =====================
     PONTOS DE ENERGIA
  ===================== */
  ctx.fillStyle = "#ffffff";
  
  for (let i = 0; i < 4; i++) {
    let ang = (Math.PI * 2 / 4) * i + rotation;
    
    let px = Math.cos(ang) * (s * 0.65);
    let py = Math.sin(ang) * (s * 0.65);
    
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  /* =====================
     CENTRO
  ===================== */
  ctx.fillStyle = "#00ffff";
  
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}
function CristalTri(x, y, size, rotation) {
  ctx.save();

  const cx = x + size / 2;
  const cy = y + size / 2;

  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  const s = size / 2;

  /* =====================
     CRISTAL 3 PONTAS
  ===================== */
  ctx.fillStyle = "#00e5ff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;

  ctx.beginPath();

  for (let i = 0; i < 3; i++) {
    let ang = (Math.PI * 2 / 3) * i - Math.PI / 2;

    // ponta externa
    let px = Math.cos(ang) * (s + 12);
    let py = Math.sin(ang) * (s + 12);

    // base lateral esquerda
    let lx = Math.cos(ang - 0.35) * (s * 0.55);
    let ly = Math.sin(ang - 0.35) * (s * 0.55);

    // base lateral direita
    let rx = Math.cos(ang + 0.35) * (s * 0.55);
    let ry = Math.sin(ang + 0.35) * (s * 0.55);

    ctx.moveTo(px, py);
    ctx.lineTo(lx, ly);
    ctx.lineTo(rx, ry);
  }

  ctx.fill();
  ctx.stroke();

  /* =====================
     NÚCLEO CENTRAL
  ===================== */
  ctx.fillStyle = "#111";

  ctx.beginPath();
  ctx.arc(0, 0, s * 0.45, 0, Math.PI * 2);
  ctx.fill();

  /* =====================
     ANEL DE ENERGIA
  ===================== */
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.arc(0, 0, s * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  /* =====================
     3 ORBES INTERNOS
  ===================== */
  ctx.fillStyle = "#ffffff";

  for (let i = 0; i < 3; i++) {
    let ang = (Math.PI * 2 / 3) * i + rotation;

    let px = Math.cos(ang) * (s * 0.45);
    let py = Math.sin(ang) * (s * 0.45);

    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  /* =====================
     CENTRO
  ===================== */
  ctx.fillStyle = "#00ffff";

  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
function CyberDroninja(x, y, size, rotation) {
  ctx.save();
  
  const cx = x + size / 2;
  const cy = y + size / 2;
  const s = size / 2;
  
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  // Efeito de brilho externo (Glow)
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#00ffff";

  /* =====================
     LÂMINAS DE PLASMA
  ===================== */
  ctx.fillStyle = "#00ffff";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;

  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2); // Rotaciona 90 graus para cada lâmina
    ctx.beginPath();
    ctx.moveTo(0, -s - 15);      // Ponta da lâmina
    ctx.lineTo(-s / 3, -s / 2);  // Base esquerda
    ctx.lineTo(s / 3, -s / 2);   // Base direita
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  /* =====================
     CORPO MECÂNICO
  ===================== */
  ctx.shadowBlur = 0; // Desliga o glow para o corpo sólido
  
  // Anel Externo
  ctx.beginPath();
  ctx.arc(0, 0, s - 5, 0, Math.PI * 2);
  ctx.fillStyle = "#222";
  ctx.fill();
  ctx.strokeStyle = "#00ff66";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Detalhes de "Parafuso" no anel
  ctx.fillStyle = "#00ff66";
  for (let i = 0; i < 8; i++) {
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(s - 8, -2, 4, 4);
  }

  /* =====================
     O OLHO CIBERNÉTICO
  ===================== */
  // Fundo do olho
  ctx.beginPath();
  ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  
  // Íris Neon (tipo o seu Sharingan, mas tech)
  ctx.beginPath();
  ctx.arc(0, 0, s / 3, 0, Math.PI * 2);
  ctx.strokeStyle = "#ff0033";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Pupila Hexagonal
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    let ang = (Math.PI * 2 / 6) * i;
    let px = Math.cos(ang) * (s / 6);
    let py = Math.sin(ang) * (s / 6);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = "#ff0033";
  ctx.fill();

  // Reflexo de lente
  ctx.beginPath();
  ctx.arc(-s/8, -s/8, 2, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.restore();
}
function BolinhaDeAco(x, y, size, rotation) {
  ctx.save();
  
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size / 2;
  
  ctx.translate(cx, cy);
  // Como é uma bola perfeita, a rotação não muda o desenho,
  // mas vamos manter para o caso de você querer adicionar texturas depois.
  ctx.rotate(rotation);

  /* =====================
     A ESFERA DE AÇO
  ===================== */
  // Criamos o gradiente. O segredo é ter um ponto de luz fora do centro.
  // Os parâmetros são: (x_luz, y_luz, r_luz, x_centro, y_centro, r_esfera)
  // (-r/3, -r/3) coloca a luz no canto superior esquerdo.
  const gradiente = ctx.createRadialGradient(-r/3, -r/3, 0, 0, 0, r);
  
  // Cores do Gradiente (Branco -> Prata Claro -> Cinza Médio -> Preto/Sombra)
  gradiente.addColorStop(0,   "#ffffff"); // O ponto de reflexo máximo da luz
  gradiente.addColorStop(0.2, "#f0f0f0"); // Transição suave
  gradiente.addColorStop(0.5, "#a0a0a0"); // A cor principal do aço
  gradiente.addColorStop(0.9, "#404040"); // Sombra na borda oposta à luz
  gradiente.addColorStop(1,   "#000000"); // A borda final (quase preta)

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = gradiente;
  ctx.fill();

  /* =====================
     DETALHES DE USINAGEM
  ===================== */
  // Para dar um ar mais "industrial", vamos adicionar algumas linhas circulares finas,
  // como se ela tivesse sido usinada em um torno.
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"; // Branco bem transparente
  ctx.lineWidth = 1;
  
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, r * (i / 4), 0, Math.PI * 2);
    ctx.stroke();
  }

  /* =====================
     CONTORNO FINAL
  ===================== */
  // Um contorno bem fino e escuro ajuda a separar a bolinha do fundo do jogo.
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}
function SharinganClassico(x, y, size, rotation) {
  ctx.save();
  
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size / 2;
  
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  /* =====================
     FUNDO VERMELHO E BORDA
  ===================== */
  // Círculo Principal Vermelho
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = "#cc0000"; // Um vermelho mais "sangue"
  ctx.fill();
  
  // Borda Externa Preta
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = size * 0.04; // Espessura proporcional ao tamanho
  ctx.stroke();

  /* =====================
     ANEL INTERNO E PUPILA
  ===================== */
  // Anel fininho onde ficam os tomoes
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // Preto meio transparente
  ctx.lineWidth = 1;
  ctx.stroke();

  // Pupila Central Preta
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();

  /* =====================
     OS 3 TOMOES (VÍRGULAS)
  ===================== */
  ctx.fillStyle = "#000000";

  for (let i = 0; i < 3; i++) {
    ctx.save();
    
    // Rotaciona cada tomoe 120 graus (360/3)
    const anguloTomoe = (Math.PI * 2 / 3) * i;
    ctx.rotate(anguloTomoe);
    
    // Move para a posição no anel interno
    ctx.translate(0, -r * 0.65);

    // --- DESENHO DO TOMOE (Usando Curvas de Bézier) ---
    // Começa na ponta da "cabeça" do tomoe
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.12);
    
    // Curva da "cabeça" (lado direito)
    // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    ctx.bezierCurveTo(r * 0.15, -r * 0.12, r * 0.15, r * 0.12, 0, r * 0.12);
    
    // Curva da "cauda" (estreitando para a esquerda)
    ctx.bezierCurveTo(-r * 0.08, r * 0.12, -r * 0.20, r * 0.05, -r * 0.25, -r * 0.05);
    
    // Volta para fechar a cabeça (lado esquerdo)
    ctx.bezierCurveTo(-r * 0.15, r * 0.02, -r * 0.08, -r * 0.12, 0, -r * 0.12);
    
    ctx.fill();
    
    ctx.restore();
  }

  ctx.restore();
}
function Sharingann(x, y, size, rotation) {
  
  
  
  ctx.save();
  
  const cx = x + size / 2;
  const cy = y + size / 2;
  
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  
  const s = size / 2;
  
  /* =====================
     PONTAS SHURIKEN
  ===================== */
  ctx.fillStyle = "#00ff66";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  
  // cima
  ctx.moveTo(0, -s - 12);
  ctx.lineTo(-10, -s + 5);
  ctx.lineTo(10, -s + 5);
  
  // direita
  ctx.moveTo(s + 12, 0);
  ctx.lineTo(s - 5, -10);
  ctx.lineTo(s - 5, 10);
  
  // baixo
  ctx.moveTo(0, s + 12);
  ctx.lineTo(-10, s - 5);
  ctx.lineTo(10, s - 5);
  
  // esquerda
  ctx.moveTo(-s - 12, 0);
  ctx.lineTo(-s + 5, -10);
  ctx.lineTo(-s + 5, 10);
  
  ctx.fill();
  ctx.stroke();
  
  /* =====================
     NÚCLEO CENTRAL
  ===================== */
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(0, 0, s - 4, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = "#00ff99";
  ctx.lineWidth = 3;
  ctx.stroke();
  
  /* =====================
     SHARINGAN INTERNO
  ===================== */
  ctx.fillStyle = "#ff0000";
  
  for (let i = 0; i < 3; i++) {
    let ang = (Math.PI * 2 / 3) * i;
    
    let px = Math.cos(ang) * 10;
    let py = Math.sin(ang) * 10;
    
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  /* centro */
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}


