


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
     // chao.x2 -= chao.v;
      //chao.x3 -= chao.v;
      
      /*if (chao.x + chao.w <= 0) {
        chao.x = chao.x3 + chao.w;
      }
      
      if (chao.x2 + chao.w <= 0) {
        chao.x2 = chao.x + chao.w;
      }
      
      if (chao.x3 + chao.w <= 0) {
        chao.x3 = chao.x2 + chao.w;
      }
      */
      
}
  draw(){
    desenharBackgroundGeometryDinamico(ctx.canvas.width, ctx.canvas.height)
   
  /* const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
         gradient.addColorStop(0, "#1a0f3d");
         gradient.addColorStop(1, "#3b1d70");
    
         ctx.fillStyle = gradient;
         ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    */



    let chao = this.sprites.chao;

    drawChao(chao.x,chao.y, chao.w, chao.h)

    /*
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
    */
    
    
  }
}
class Obstacle {
  constructor(x, y, w, h, type = "block") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    //this.offsetY = Math.sin(Date.now() * 0.005) * 5;
    
  }
  
  update() {
    if (this.type === "moeda") {
       this.scaleX = Math.abs(Math.sin(Date.now() * 0.01));
       this.offsetY = Math.sin(Date.now() * 0.005) * 5;
     }
    
    
    
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
    if (this.type === "moeda") {
        const cx = this.x + this.w / 2;
        const cy = this.y + this.h / 2 + this.offsetY;
        const r = this.w / 2;
        
        ctx.save();
        
        // move pro centro
        ctx.translate(cx, cy);
        
        // achata no eixo X
        ctx.scale(this.scaleX, 1);
        
        // desenha moeda centralizada
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = "#FFD700";
        ctx.fill();
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFAA00";
        ctx.stroke();
        
        ctx.restore();
      }
    /*if (this.type === "moeda") {
        
        const cx = this.x + this.w / 2;
        const cy = this.y + this.h / 2 + this.offsetY;
        const r = this.w / 2;
        
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "#FFD700";
        ctx.fill();

      }*/
   
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
    if(this.type === "spike") {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + this.h);
      ctx.lineTo(this.x + this.w / 2, this.y);
      ctx.lineTo(this.x + this.w, this.y + this.h);
      ctx.closePath();
      ctx.fillStyle = "#ff0055";
      ctx.fill();
    }
    else
    if(this.type === "spikeTop"){
        ctx.beginPath();
      // canto superior esquerdo
      ctx.moveTo(this.x, this.y);
      
      // ponta pra baixo (meio inferior)
      ctx.lineTo(this.x + this.w / 2, this.y + this.h);
      
      // canto superior direito
      ctx.lineTo(this.x + this.w, this.y);
      
      ctx.closePath();
      
      ctx.fillStyle = "#ff0055";
      ctx.fill();
          }
    
    
  }
}
class Player {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.size = 32;
    this.line = 1;
   
    this.jump = true;
    this.inAr = true;
    
    this.maxJump = 2;
    this.jjump = this.maxJump;
    
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
    
    this.db = document.querySelector("#p1");
  }
  
  
  
  
  rotacional(){
    // si o player nao tiver no chao Gira
    if(!this.onGround) {
      
      
      
       this.rotation += this.rotationSpeed;
    } 
    else this.rotation = 0;

  }
  colisaoBase(){
          //Prever Próximo posicionamento eixo Y>>>
          let preY = {
            x: this.x,
            y: this.y + this.vy,
            w: this.size,
            h: this.size
          }
          
          const colidB = getColid(preY, mundo.colid);
          
          //colisão na base do player     
          if(colidB && this.vy >= 0){
            this.vy = 0;
            this.y = colidB.y - this.size;
            //this.jump = true;
            this.inAr = false;
          }
          else{
            this.y = preY.y;
            //this.jump = false;
            
            this.inAr = true;
          }

  }
  colisaoTop(){
          //colisão no top do player
          if (this.inAr) {
            const preB = {
              x: this.x,
              y: this.y + this.vy,
              w: this.size,
              h: 5
            }
            
            const colidB = getColid(preB, mundo.colid);
            if (colidB) this.vy = 0;
            
          }
  }
  jummp(){
      if (!this.inAr) this.jjump = this.maxJump;

      if (control.jump && !this.jump) {
        if (this.jjump > 0) {
          this.jjump--;
          this.vy = -12;
          somPuloUooop();
        }
        
        this.jump = true;
      }

      else if (!control.jump) this.jump = false;
  }
  update() {
      // aplicar gravidade

      if (this.vy < 0) this.vy += this.gravity;
      else             this.vy += this.gravity * 1.5; // caindo
      
      
      
      
      this.colisaoBase();   
      this.colisaoTop();
      this.rotacional()
      this.jummp();
}
  
  
  


   draw(){
     drado(this.x,this.y,this.size,this.rotation)

     //CristalTri(this.x,this.y,this.size,this.rotation)
     //SharinganClassico(this.x,this.y,this.size,this.rotation)
     //Sharingan(this.x,this.y,this.size,this.rotation)
     
   }
}



   
