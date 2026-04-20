



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








class Cam {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = Math.floor(lar / scale);
    this.h = Math.floor(alt / scale);
    this.min = .25;
    this.max = .75;
  }
  
  left(){
    return this.x + (this.w * this.min);
  }
  
  rigth(){
    return this.x + (this.w * this.max);
  }
  
  
  top(){
    return this.y + (this.h * this.min);
  }
  
  botton(){
    return this.y + (this.h * this.max);
  }
  
  
  draw(){
    ctx.strokeStyle = "#f00"
    ctx.strokeRect(this.x + (this.min * this.w), this.y + (this.min * this.h),this.w/2,this.h/2)

  }
}




class Mundo {
  constructor() {
    var m          = lsMap[3];
    this.img       = m.img;
    this.size      = m.size;
    this.li        = m.li;
    this.co        = m.co;
    this.map       = m.map;
    this.nColid    = m.nColid;
    this.colid     =[];
    this.sw        = m.sw;
    
    
    
    for (var i = 0; i < this.map.length; i++) {
      var px = Math.floor(i % this.li) * this.size;
      var py = Math.floor(i / this.li) * this.size;
    
      if(!this.nColid.includes(this.map[i])) {
        this.colid.push({
          x: px,
          y: py,
          w: this.size,
          h: this.size
        })
      }
    }
    
    
    
    
    
    this.sizeW = this.size*this.li;
    this.sizeH = this.size*this.co;
    ctx.canvas.width  = this.sizeW;
    ctx.canvas.height = this.sizeH;
    ctx.canvas.style.width  =  this.sizeW*scale+"px";
    ctx.canvas.style.height =  this.sizeH*scale+"px";
  }
  
  draw(){
    ctx.clearRect(0,0,this.sizeW,this.sizeH);
    for(var i = 0; i< this.map.length; i++){
        var id = this.map[i];
        var sx = Math.floor(id%this.sw) * this.size;    
        var sy = Math.floor(id/this.sw) * this.size;    
        var px = Math.floor(i%this.li)  * this.size;    
        var py = Math.floor(i/this.li)  * this.size;    

        
        var obj = {
          x: px,
          y: py,
          w: this.size,
          h: this.size
        }
        
         
         if(Colid(obj, cam) && id != -1){
           
           ctx.drawImage(
             this.img,
             sx,sy,
             this.size,this.size,
             px,py,
             this.size,this.size
             );
           
        }
        
        
        
    }
  }
  
}




class Play {
  constructor() {
    this.x       = 240;
    this.y       = 130;
    this.w       = 30;
    this.h       = 30;
    this.v       = 2;
    this.jjump   = true;
    this.jump    = false;
    this.inAr    = true;
    this.vboot   = 0;
    this.gravity = 3;
    this.vy      = 6;
    this.sheet   = [[0,0]];
    this.freme   = 0;
    this.dlay    = 5;
    this.isLeft  = true;
    this.bala    = [];
    this.dlayb   = 0;
    this.fire    = false;
    this.move    = false;
  }
  
  
  addBala(vv){
    var r = vv > 0 ?  25:1;
    this.bala.push({
      x: this.x +r,
      y: this.y+16,
      w: 5,
      h: 2,
      v: vv
    })
  }
  
  
  
  draw(){
    var f = this.sheet[this.freme] || this.sheet[0];
  
    ctx.drawImage(mm,f[0],f[1],this.w, this.h,this.x, this.y ,this.w, this.h);
    
    for(var i = 0; i< this.bala.length; i++){
        var bala = this.bala[i];
            bala.x += bala.v;
        
            ctx.fillStyle = "#f00";
            ctx.fillRect(bala.x, bala.y, bala.w, bala.h);
            if(!Colid(cam,bala)){
              this.bala.splice(i,1)
            }
    }
  }
  
  
  getFrame(){
     
     if (this.fire && this.inAr) {
       return this.isLeft ? [[826, 18]] : [[825, 66]];
     }
     
     else if(this.inAr){
        return this.isLeft ? [[443,19]]  :  [[445,67]];
      }
      
     else if (this.fire && this.jump && !this.move) {
       return this.isLeft ? [[638, 13]] : [[629, 61]];
     }
      
     else if(this.fire && this.move) {
        return this.isLeft ? [[683, 13],[730,13],[779,13]] : [[680, 61],[728,61],[776,62]];
      }
     
      else if(joystick.key.left || joystick.key.right){
        return this.isLeft ? [[299,13],[344,13],[392,13]]  :  [[301,61],[352,61],[401,61]];
      }
      
      else return this.isLeft ? [[155,13]] : [[158,61]];
}

  
  update(){
    
    
    const nexDow = {
      x: this.x,
      y: this.y + this.gravity,
      w: this.w,
      h: this.h,
    }
    const colidSuface = getColid(nexDow, mundo.colid);
    const suface = colidSuface && colidSuface.y >= this.y ? colidSuface : null;
    
    
    
    if (!suface) {
      this.inAr = true;
      this.jump = false;
      this.y += this.gravity;
    }
    else {
      this.inAr = false;
      this.jump = true;
      this.y = suface.y - this.h;
    }
    
    
    
    if(contro.key.btn3 || contro.key.btn4){
      
      this.fire = true;
      this.dlayb--;
      if(this.dlayb <= 0){
        this.isLeft ? this.addBala(7):this.addBala(-7);
        this.dlayb = 9;
        lsSom[0].currentTime = 0;
        lsSom[0].play();
      }
      
      
    }
    else this.fire = false;
    
    
    if(joystick.key.left) {
      this.isLeft = false;
      this.move    = true;
      const nexL = {
        x: this.x - this.v,
        y: this.y,
        w: this.w,
        h: this.h
      }
    
      const colidL = getColid(nexL, mundo.colid);
      if (!colidL) {
        this.x -= this.v;
      }
    }
    
    if(joystick.key.right) {
      this.isLeft = true;
      this.move    = true;
      const nexR = {
        x: this.x + this.v,
        y: this.y,
        w: this.w,
        h: this.h
      }
    
      const colidR = getColid(nexR, mundo.colid);
      if (!colidR) {
        this.x += this.v;
      }
    }
    
    
    if(!joystick.key.left && !joystick.key.right){
      this.move    = false;
    }
    
    
    
   
    if (contro.key.btn2 && this.jump && this.jjump) {
      this.jjump = false;
      this.vboot = -100;
    }
    else if(!contro.key.btn2){
      this.jjump = true;
    }
    
    
    
    
    
    if (this.vboot < 0) {
   
      const up = this.y -= this.vy;
    
      const colidUp = {
        x: this.x,
        y: up,
        w: this.w,
        h: this.h
      }
    
      const sufaceUp = getColid(colidUp, mundo.colid);
      if (!sufaceUp) {
        this.y = up;
        this.vboot = this.vboot + this.vy;
      }
      else this.vboot = 0;
    }
    
    
    this.sheet = this.getFrame()

    
    this.dlay--;
    if(this.dlay <= 0){
      this.freme++;
      this.dlay = 5;
      if(this.freme > this.sheet.length) {
        this.freme = 0;
      }
    }
    
    
    
    
    
    
    
    if(this.x < 0) this.x = 0;
    if(this.y < 0) this.y = 0;
    if(this.x + this.w > mundo.sizeW) this.x = mundo.sizeW - this.w;
    if(this.y + this.h > mundo.sizeH) this.y = mundo.sizeH - this.h;

    
    if (this.x < cam.left()) {
       cam.x = this.x - (cam.w * cam.min);
     }
    if (this.x + this.w > cam.rigth()) {
       cam.x = this.x + this.w - (cam.w * cam.max);
     }
     
    if(this.y < cam.top()) {
       cam.y = this.y - (cam.h * cam.min);
    }
    if(this.y + this.h > cam.botton()) {
      cam.y = this.y + this.h - (cam.h * cam.max);
    }
     
     
     if(cam.x <= 0) cam.x = 0;
     if(cam.y <= 0) cam.y = 0;
     if(cam.x + cam.w >= mundo.sizeW) cam.x = mundo.sizeW - cam.w;
     if(cam.y + cam.h >= mundo.sizeH) cam.y = mundo.sizeH - cam.h;

  }
}










function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
















var scale = 1.7;
var ctx = document.querySelector("canvas").getContext("2d");
var lar = 400;//window.innerWidth;
var alt = 400;//window.innerWidth;
    divCanvas.style.width  = lar+"px";
    divCanvas.style.height = alt+"px";


var joystick = new Joystick(10, 20,100);
var contro = new Contro();

var cam    = new Cam();
var mundo  = new Mundo();
var play   = new Play();

class Game {
  constructor() {
  this.full = false;
  
  document.addEventListener("click", ()=>{if(!this.full) toggleFullScreen(); this.full = true;})
  }
  
  draw(){
    ctx.save()
    ctx.canvas.style.transform = `translate3d(${-cam.x*scale}px, ${-cam.y*scale}px, 0px)`;
    
    mundo.draw();
    play.draw();
    //cam.draw();
    ctx.restore();
  }
  
  update(){
    play.update();
    
   /*p1.innerHTML = `
    X: ${play.x} ___y: ${play.y}<br>  
    
    playVboot: ${play.vboot}<br>  
    playjump: ${play.jump}<br>  
    playInAr: ${play.inAr}<br>  
    lsSom: ${play.bala.length}<br>  
    `*/
  }
  
  loop(){
      game.draw();
      game.update();
      
      window.requestAnimationFrame(game.loop);
  }
}







var game = new Game(); game.loop();