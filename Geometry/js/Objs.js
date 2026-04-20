


Colid = function(my, other) {
  return my.x + my.w > other.x &&
    my.x <= other.x + other.w &&
    my.y + my.h > other.y &&
    my.y <= other.y + other.h;
}
getColid = function(my, others = []) {
  var touchingModel = null;
  others.forEach(otherModel => {

    if (touchingModel) {
      return;
    }

    if (this.Colid(my, otherModel)) {
      touchingModel = { ...otherModel };
    }
  });

  return touchingModel;
}





var ss = false;
class Mundo {
  constructor() {
    this.img = IMG[0];
    this.colid = [];
    
    
    
    let escala = 0.3;
    this.sprites = {
      chao: {
        sx: 0, 
        sy: 555, 
        sw: 1996,
        sh: 188,
        
        
        v: 5,
        sub: 1999 * escala, 
       
        x: 0,
        x2: 2000 * escala,
        x3: (2000 * escala) * 2,
        
        
        y: (ctx.canvas.height-(188*escala)),
        w:  2000 * escala,
        h: 188 * escala,
        
      }
    }
    
    
    
    
    
    this.colid.push({
      x: this.sprites.chao.x,
      y: this.sprites.chao.y,
      w: this.sprites.chao.w,
      h: this.sprites.chao.h
    })
  
  }
  
  update() {
      const chao = this.sprites.chao;
      
      chao.x -= chao.v;
      chao.x2 -= chao.v;
      chao.x3 -= chao.v;
      
      if (chao.x + chao.w <= 0) {
        chao.x = chao.x3 + chao.w;
      }
      
      if (chao.x2 + chao.w <= 0) {
        chao.x2 = chao.x + chao.w;
      }
      
      if (chao.x3 + chao.w <= 0) {
        chao.x3 = chao.x2 + chao.w;
      }
      
      
}
  draw(){

   const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
         gradient.addColorStop(0, "#1a0f3d");
         gradient.addColorStop(1, "#3b1d70");
    
         ctx.fillStyle = gradient;
         ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    //desenha chao
    let chao = this.sprites.chao;
   
    ctx.drawImage(
      IMG[0],
      chao.sx, chao.sy, chao.sw, chao.sh,
      chao.x, chao.y, chao.w, chao.h
    );
    ctx.drawImage(
      IMG[0],
      chao.sx, chao.sy, chao.sw, chao.sh,
      chao.x2, chao.y, chao.w, chao.h
    );
    
    ctx.drawImage(
      IMG[0],
      chao.sx, chao.sy, chao.sw, chao.sh,
      chao.x3, chao.y, chao.w, chao.h
    );
    
    
    
  }
}
class Obstacle {
  constructor(x, y, w, h, type = "block") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
  }
  
  update() {
    this.x -= 5;
    // aqui depois pode ter animação
    // glow
    // movimento
    // jump pad
    // portal
    // etc
  }
  
  draw() {
    if (this.type === "block") {
      ctx.fillStyle = "#00ffff";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    else
    
    if (this.type === "platform") {
      ctx.fillStyle = "#00ffff";
      ctx.fillRect(this.x, this.y, this.w, this.h);
      
      ctx.strokeStyle = "#000";
      ctx.beginPath()
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x ,this.y, this.w,this.h)
    }
    else
    if(this.type === "moeda"){
      
    }
    
    else
    if (this.type === "coluna") {
      ctx.fillStyle = "#00ffff";
      ctx.fillRect(this.x, this.y, this.w, this.h);
      
      ctx.strokeStyle = "#000";
      ctx.beginPath()
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x ,this.y, this.w,this.h)
    }

    
    
    
   else 
    if (this.type === "spike") {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + this.h);
      ctx.lineTo(this.x + this.w / 2, this.y);
      ctx.lineTo(this.x + this.w, this.y + this.h);
      ctx.closePath();
      ctx.fillStyle = "#ff0055";
      ctx.fill();
    }
  }
}
class Player {
  constructor() {
    this.x = 100;
    this.y = 50;
    this.size = 32;
    this.line = 1;
   
    this.jump = false;
    this.inAr = true;
    this.jjump = true;
    this.vboot = 0;
   
    
    
    this.gravity = 0.6;
    this.vy = 0;
    this.vx = 1;
    this.jumpForce = -12;
    this.onGround = false;
    
    this.colidBase = null;
    this.coyoteTime = 0;
    this.coyoteLimit = 10;
    
    this.rotation = 0;
    this.rotationSpeed = 0.2;
  }
  
  
  colidB(){
          // prever próxima posição
      let nextY = this.y + this.vy;
      
      const nextBox = {
        x: this.x, 
        y: nextY,
        w: this.size,
        h: this.size 
        
      };
      this.colidBase = getColid(nextBox, mundo.colid);
      
      
      //si o player tiver no chao
      if (this.colidBase && this.vy >= 0) {
        
        this.coyoteTime = this.coyoteLimit;
        this.y = this.colidBase.y - this.size;
        this.vy = 0;
        this.onGround = true;
        
      }
     
      else {
        // no ar
        this.coyoteTime--;
        this.y = nextY;
        this.onGround = false;
      }
      
      // pulo
      // pulo
      if (control.jump && this.coyoteTime > 0) {
          this.vy = this.jumpForce;
          this.onGround = false;
          
          // 1. Toca o som apenas UMA vez
          somPuloUooop();
          
          // 2. MATA o coyoteTime imediatamente
          // Isso impede que o loop entre aqui de novo até o player tocar o chão
          this.coyoteTime = 0; 
      }

      /*if (control.jump && this.coyoteTime > 0){
          this.vy = this.jumpForce;
          this.onGround = false;
          somPuloUooop()
         
      }*/
  }
  colidT(){
    
  }
  rotacional(){
    // si o player nao tiver no chao Gira
    if(!this.onGround) {
      
      
      
       this.rotation += this.rotationSpeed;
    } 
    else this.rotation = 0;

  }
  update() {
      // aplicar gravidade
     // this.vy += this.gravity;
      if (this.vy < 0) {
        this.vy += this.gravity; // subindo
      } else {
        this.vy += this.gravity * 1.5; // caindo
      }
            
      
      
      
      this.colidB();
      this.rotacional()
      
      
      
      
      
      if (!this.onGround && this.vy < 0){
        const headBox = {
            x: this.x + 4,
            y: this.y + this.vy,
            w: this.size - 8,
            h: 5
          };
          
          
          const colidTop = getColid(headBox, mundo.colid);
          if (colidTop && this.vy < 0) {
             this.vy = 0;
          }
      }
      
      
      
      
      
   
     
}
  
  
  

  draw() {
  ctx.save();
  
  // centro do player
  const centerX = this.x + this.size / 2;
  const centerY = this.y + this.size / 2;
  
  // mover origem pro centro
  ctx.translate(centerX, centerY);
  
  // girar
  ctx.rotate(this.rotation);
  
  // desenhar relativo ao centro
  const x = -this.size / 2;
  const y = -this.size / 2;
  
  // corpo
  ctx.fillStyle = "#0f0";
  ctx.fillRect(x, y, this.size, this.size);
  
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = this.line;
  ctx.strokeRect(x, y, this.size, this.size);
  
  // olhos
  ctx.fillStyle = "#0f0";
  ctx.fillRect(x + this.size * 0.1, y + this.size * 0.2, this.size / 5, this.size / 5);
  ctx.fillRect(x + this.size * 0.7, y + this.size * 0.2, this.size / 5, this.size / 5);
  
  ctx.strokeRect(x + this.size * 0.1, y + this.size * 0.2, this.size / 5, this.size / 5);
  ctx.strokeRect(x + this.size * 0.7, y + this.size * 0.2, this.size / 5, this.size / 5);
  
  // boca
  ctx.fillRect(x + this.size * 0.25, y + this.size * 0.7, this.size / 2, this.size / 6);
  ctx.strokeRect(x + this.size * 0.25, y + this.size * 0.7, this.size / 2, this.size / 6);
  
  
  
  
  ctx.restore();
  
  
  ctx.fillStyle = "#f00";
  ctx.fillRect(this.x, this.y, this.size, this.size);

  
}
  
}



   
/******
    x -- y --  quantidade -- espaço 
     
*******/
function addMoeda(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 32;
  let h = 32;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"moeda"));
  }

  return lista;
}

function addSpikes(inicio,altura, quantidade, espacamento) {
  let lista = [];
  let size = 32;
    
  let w = 32;
  let h = 32;
  let espaco = w * espacamento;
  let alt    = h * altura;
  
  
  
  for (let i = 0; i < quantidade; i++) {
    
    let x = inicio + (i * espaco);
    let y = mundo.sprites.chao.y - h - alt;
    
    lista.push(
      new Obstacle(x,y,w,h,"spike")
    );
  }

  return lista;
}
function addBlocos(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 32;
  let h = 32;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"block"));
  }

  return lista;
}
function addPlataforma(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 100;
  let h = 32;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"platform"));
  }

  return lista;
}
function addColunas(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 32;
  let h = 95;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"coluna"));
  }

  return lista;
}


function espinhos_Sangrentos() {
  let fase = [];
  let base = 600; // Um ponto de partida no X para a fase começar

  fase.push(
    // 1. Aquecimento: Alguns blocos para saltar
    ...addBlocos(base, 0, 3, 1), 
    
    // 2. O primeiro perigo: Espinhos entre blocos (altura 0)
    ...addSpikes(base + 150, 0, 2, 1.5),
    
    // 3. Plataformas altas com espinhos embaixo
    ...addPlataforma(base + 400, 2, 2, 1.2),
    ...addSpikes(base + 400, 0, 5, 1), 
    
    // 4. Seção de Colunas: Saltos precisos (altura das colunas varia)
    ...addColunas(base + 800, 0, 1, 0),
    ...addColunas(base + 950, 0.5, 1, 0),
    ...addColunas(base + 1100, 1, 1, 0),
    
    // 5. O corredor de espinhos: Muitos espinhos com pouco espaço
    ...addSpikes(base + 1200, 0, 8, 0.8),
    
    // 6. Final: Uma plataforma de descanso e o último salto
    ...addBlocos(base + 1550, 2, 1, 0),
    ...addSpikes(base + 1550, 0, 1, 0)
  );

  return fase;
}


function tribunalDoCaos() {
  return [
    
    // entrada calma (mentira)
    ...addBlocos(200, 6, 5, 50),
    
    // primeiros espinhos
    ...addSpikes(500, 3, 200),
    
    // bloco seguro + spike traiçoeiro
    ...addBlocos(800, 2, 2, 80),
    ...addSpikes(980, 2, 100),
    
    // escada da humilhação
    ...addBlocos(1300, 1, 1, 50),
    ...addBlocos(1400, 1, 1, 100),
    ...addBlocos(1500, 1, 1, 150),
    ...addPlataforma(1650, 1, 1, 200),
    
    // salto da fé
    ...addSpikes(1900, 4, 90),
    ...addPlataforma(2300, 2, 180, 160),
    
    // tutorial mentiroso
    ...addBlocos(2800, 3, 2, 120),
    ...addSpikes(3100, 3, 100),
    
    // corredor da morte
    ...addSpikes(3500, 8, 80),
    
    // descanso falso
    ...addPlataforma(4300, 2, 220, 100),
    
    // escada do desespero
    ...addBlocos(5000, 1, 1, 60),
    ...addBlocos(5100, 1, 1, 120),
    ...addBlocos(5200, 1, 1, 180),
    ...addBlocos(5300, 1, 1, 240),
    
    // pulo da traição
    ...addSpikes(5700, 5, 90),
    ...addPlataforma(6200, 1, 1, 220),
    
    // fase do capeta
    ...addSpikes(6800, 10, 70),
    ...addBlocos(7600, 3, 2, 150),
    ...addPlataforma(8000, 2, 200, 200),
    
    // portal da tristeza
    ...addSpikes(8700, 12, 60),
    
    // final "parece fácil"
    ...addBlocos(9600, 4, 2, 100),
    ...addSpikes(10000, 4, 110),
    
    // último aviso
    ...addSpikes(10600, 15, 55)
    
  ];
}
function FaseTeste() {
  /******
   x -- y -- quantidade -- espaço
  *******/
  
  return [
    
    // entrada falsa de paz
    ...addPlataforma(300, 1, 3, 1.2),
    
    // primeiros espinhos do destino
    ...addSpikes(500, 0, 4, 1.5),
    
    // plataforma alta + spike embaixo
    ...addPlataforma(800, 3, 2, 1.5),
    ...addSpikes(850, 0, 3, 1.2),
    
    // coluna da humilhação
    ...addColunas(1100, 0, 1, 0),
    
    // corredor da maldade
    ...addSpikes(1300, 0, 3, 1.1),
    
    // salto obrigatório
    ...addPlataforma(1700, 2, 2, 2),
    ...addSpikes(1750, 0, 4, 1),
    
    // falsa segurança
    ...addBlocos(2100, 2, 3, 1.5),
    
    // dupla traição
    ...addColunas(2500, 0, 2, 4),
    ...addSpikes(2600, 0, 3, 1.2),
    
    // escada do sofrimento
    ...addBlocos(3000, 1, 1, 1),
    ...addBlocos(3150, 2, 1, 1),
    ...addBlocos(3300, 3, 1, 1),
    
    // plataforma mentirosa
    ...addPlataforma(3500, 4, 1, 1),
    ...addSpikes(3600, 0, 2, 1),
    
    // tribunal oficial do caos
    ...addSpikes(4000, 0, 10, 0.9),
    
    // coluna apertada
    ...addColunas(4600, 0, 3, 3),
    
    // pulo do desespero
    ...addPlataforma(5000, 3, 2, 2.2),
    ...addSpikes(5100, 0, 6, 1),
    
    // final “parece fácil”
    ...addBlocos(5600, 2, 4, 1.3),
    
    // mentira final
    ...addSpikes(6000, 0, 12, 0.8)
    
  ];
}
function sofrimento_Sangrento() {
  /******
   x -- y -- quantidade -- espaço
  *******/
  let left = 200;
  
  return [

    // começo inocente (mentira)
    ...addPlataforma(left+250, 1, 2, 1.5),

    // espinhos de boas-vindas
    ...addSpikes(left+450, 0, 5, 1.2),

    // primeira humilhação
    ...addColunas(left+800, 0, 2, 3),

    // salto desconfiado
    ...addPlataforma(left+950, 2, 2, 1.8),
    ...addSpikes(left+1000, 0, 4, 1),

    // corredor do arrependimento
    ...addSpikes(left+1300, 0, 7, 0.95),

    // blocos da falsa esperança
    ...addBlocos(left+1800, 1, 3, 1.4),

    // coluna assassina
    ...addColunas(left+2200, 0, 1, 0),
    ...addSpikes(left+2300, 0, 3, 1.1),

    // escada da vergonha
    ...addBlocos(left+2600, 1, 1, 1),
    ...addBlocos(left+2750, 2, 1, 1),
    ...addBlocos(left+2900, 3, 1, 1),
    ...addBlocos(left+3050, 4, 1, 1),

    // plataforma mentirosa
    ...addPlataforma(left+3400, 4, 2, 1.5),
    ...addSpikes(left+3500, 0, 5, 1),

    // tribunal sangrento
    ...addSpikes(left+3900, 0, 10, 0.85),

    // passagem apertada do capeta
    ...addColunas(left+4600, 0, 3, 2.5),

    // salto impossível (quase)
    ...addPlataforma(left+5100, 3, 2, 2),
    ...addSpikes(left+5200, 0, 6, 1),

    // final falso
    ...addBlocos(left+5700, 2, 4, 1.2),

    // sofrimento real
    ...addSpikes(left+6200, 0, 14, 0.75),

    // última humilhação
    ...addColunas(left+7000, 0, 2, 4),
    ...addSpikes(left+7200, 0, 8, 0.9)

  ];
}