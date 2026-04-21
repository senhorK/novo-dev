// Armazena as formas do fundo para não re-gerar a cada frame (melhor performance)
let backgroundShapes = []; 

function gerarFormasFundo(width, height) {
  backgroundShapes = [];
  const numShapes = 15; // Quantidade de formas grandes

  for (let i = 0; i < numShapes; i++) {
    // Define se é quadrado (0) ou retângulo (1)
    const type = Math.random() < 0.7 ? "square" : "rect";
    
    // Tamanhos grandes e variados
    const baseSize = 80 + Math.random() * 150; 
    const w = type === "square" ? baseSize : baseSize * (1.5 + Math.random());
    const h = baseSize;

    // Posição inicial aleatória (fora da tela à direita para entrarem depois)
    const x = Math.random() * width * 2; 
    const y = Math.random() * (height * 0.8); // Mantém na parte superior/média

    // Camada (determina velocidade, tamanho e transparência)
    // 0: Mais distante (lento, pequeno, transparente)
    // 1: Média (médio, médio, médio)
    // 2: Mais próxima (rápido, grande, menos transparente)
    const layer = Math.floor(Math.random() * 3);
    
    // Velocidades diferentes baseadas na camada (Parallax)
    const speeds = [0.2, 0.5, 1.0]; 
    const speed = speeds[layer];

    // Transparências diferentes baseadas na camada
    const alphas = [0.03, 0.06, 0.1];
    const alpha = alphas[layer];

    // Rotação inicial aleatória
    const rotation = Math.random() * Math.PI * 2;

    backgroundShapes.push({ type, x, y, w, h, speed, alpha, rotation, layer });
  }
}

function desenharBackgroundGeometryDinamico(width, height) {
  const time = Date.now() * 0.001; // Tempo em segundos

  // 1. Limpa o fundo com a cor neon sólida pulsante (Habilidade HSL)
  const baseHue = 260; // Roxo
  const baseSaturation = 70;
  const lightness = 12 + Math.sin(time * 0.5) * 8; // Oscila entre 4% e 20%
  ctx.fillStyle = `hsl(${baseHue}, ${baseSaturation}%, ${lightness}%)`;
  ctx.fillRect(0, 0, width, height);

  // 2. Configurações para o Padrão do Grid (igual ao anterior)
  const gridSize = 64;
  const numCols = Math.ceil(width / gridSize) + 1;
  const numRows = Math.ceil(height / gridSize) + 1;

  // Cor do padrão: Um tom ligeiramente mais claro que o fundo, com transparência
  const patternLightness = lightness + 5;
  ctx.strokeStyle = `hsla(${baseHue}, ${baseSaturation}%, ${patternLightness}%, 0.12)`;
  ctx.lineWidth = 1;

  // Efeito Parallax Sutil para o Grid
  const gridOffset = (Date.now() * 0.1) % gridSize;

  // Desenha o Padrão de Quadrados do Grid
  ctx.save();
  ctx.translate(-gridOffset, 0);
  for (let c = 0; c < numCols; c++) {
    for (let r = 0; r < numRows; r++) {
      const x = c * gridSize;
      const y = r * gridSize;
      ctx.beginPath();
      ctx.rect(x + 10, y + 10, gridSize - 20, gridSize - 20);
      ctx.stroke();
    }
  }
  ctx.restore();

  // 3. Desenha as Formas Geométricas Flutuantes Grandes (com Parallax)
  
  // Garante que as formas foram geradas
  if (backgroundShapes.length === 0) gerarFormasFundo(width, height);

  for (let shape of backgroundShapes) {
    // Atualiza a posição X baseada na velocidade da camada
    shape.x -= shape.speed;

    // Se a forma sair da tela à esquerda, re-posiciona à direita
    if (shape.x + shape.w < 0) {
      shape.x = width + Math.random() * width;
      shape.y = Math.random() * (height * 0.8);
    }

    // Cor da forma: Ciano neon com transparência baseada na camada
    ctx.strokeStyle = `hsla(180, 100%, 50%, ${shape.alpha})`;
    ctx.lineWidth = 2;

    // Opcional: Adicionar brilho neon (Glow) sutil às formas mais próximas
    if (shape.layer === 2) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(0, 255, 255, 0.3)";
    } else {
        ctx.shadowBlur = 0;
    }

    ctx.save();
    // Translate para o centro da forma para rotação
    ctx.translate(shape.x + shape.w / 2, shape.y + shape.h / 2);
    // Pequena rotação baseada no tempo para as formas mais próximas
    if (shape.layer > 0) {
        ctx.rotate(shape.rotation + time * (0.05 * shape.layer));
    } else {
        ctx.rotate(shape.rotation);
    }

    // Desenha a forma (quadrado ou retângulo)
    ctx.beginPath();
    if (shape.type === "square") {
      ctx.rect(-shape.w / 2, -shape.h / 2, shape.w, shape.h);
    } else {
      ctx.rect(-shape.w / 2, -shape.h / 2, shape.w, shape.h);
    }
    ctx.stroke();
    ctx.restore();
  }

  // 4. Linha de Horizonte Neon Sutil (igual ao anterior)
  ctx.save();
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0, 255, 255, 0.4)";
  ctx.strokeStyle = "rgba(0, 255, 255, 0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.9);
  ctx.lineTo(width, height * 0.9);
  ctx.stroke();
  ctx.restore();
}
