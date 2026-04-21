
var Parti = function(op){
    this.x = op.x;
    this.y = op.y;
    this.size = 10;
    this.vx = random(0, -10);
    this.vy = random(0, -10);
    this.c = op.c
}

Parti.prototype.update = function(){
  this.x += this.vx;
  this.y += this.vy;
  this.size *= 0.89;
}

Parti.prototype.draw = function(){
  ctx.fillStyle = this.c;
  ctx.fillRect(this.x, this.y, this.size, this.size);  
}









class Play {
  constructor() {
    this.reset();
    
    this.ia = new Brain();
  }

  reset() {
    this.x = random(0,100);
    this.y = 50;
    this.w = 30;
    this.h = 30;
    this.c = randomC();//cores[random(0, cores.length)];
    this.vy = 0;
    this.gravity = 0.5;
    this.jump = 2;
    this.vivo = true;
  }

  draw(e) {
    if (this.vivo) {
      ctx.fillStyle = this.c;
      ctx.fillRect(this.x, this.y, this.w, this.h)
      
      ctx.fillStyle = "#fff";
      ctx.font = "10px Arial";
      ctx.fillText(e, this.x-10 + (this.w/2), this.y + (this.h/2));
      
    }
  }

  update() {
    
    if (this.vivo) {
      
      this.y += this.vy;
      this.vy += this.gravity;
    }
    
    
  }


  JUMP() {
    if (this.jump > 0) {
      this.vy = -12;
      this.jump--;
      this.abaixar = false;
    }
  }
  
  Baixar(){
    this.abaixar = true;
  }
  
  
  decidir(obj){
    let o = this.ia.getOutput(this, obj);
    
    switch(o){
      case 1:
        this.JUMP();
        break;
      //case -1:
        //this.Baixar();
        //break
       
    }
  }
  
  

  kill() {
    this.vivo = false;
    VIVOS--;
  }
}







class plataFilha {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = (y - h);
    this.w = w;
    this.h = h;

    this.c = c;
  }

  draw() {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {

  }
}




class plataForma {
  constructor() {
    this.ls   = [new plataFilha( 0, alt, (lar * 2),  250,  "#999")];
    this.lsF  = [new plataFilha( 0, 0, 0, 0, "#999")]
    this.time = 100;
    this.dlay = 200;
    this.sizeW = [200, 400];
    this.sizeH = [300, 350];
  }


  add(){
      var w = this.sizeW[random(0, this.sizeW.length)];//random(150, 300);
      var h = this.sizeH[random(0, this.sizeH.length)];//random(100, 200);
      var x = lar;
      var y = alt;
      var c = randomC();//cores[random(0, cores.length)];
      

    this.ls.push(new plataFilha(x, y, w, h, c));
    this.lsF.push(new plataFilha(x-.5, y+5, 1, h, "#f00"));
    this.time = 100;
  }

  draw() {
    for(let i = 0; i< this.ls.length; i++){
        this.ls[i].draw();
       
    }



  }

  update() {

    this.time--;
    if (this.time <= 0) this.add();


    for (var i = 0; i < this.ls.length; i++) {
      let obj1 = this.lsF[i];
      let obj2 = this.ls[i];
      
      obj1.x -= delta;
      obj2.x -= delta;
      

      if (obj2.x + obj2.w <= 0){
        this.ls.splice(i, 1);
        this.lsF.splice(i, 1);
      }
    }



  }
  
  
  
  Colid(e) {
    if (Colid(e, this)) {
      e.kill(e.y);
  
    }
  
    return !e.vivo;
  }


}










