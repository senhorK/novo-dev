
var menu1 = document.getElementsByClassName("menu1");
var menu2 = document.getElementsByClassName("menu2");

var m1    = document.getElementsByClassName("m1");
var mScore = document.getElementsByClassName("score");
var okScore = document.getElementById("okScore")
var co = null;

Random = function(min, max){
  return Math.round( min + ( Math.random() * ( max - min ) ) );
}




Vect = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.previoX = 0;
  this.previoY = 0;
}

Vect.prototype.setPos = function(x, y) {
  this.previoX = this.x;
  this.previoY = this.y;

  this.x = x;
  this.y = y;
}
Vect.prototype.Colid = function(obj) {
  if (obj.x < this.x + this.w &&
    obj.y < this.y + this.h &&
    obj.x + obj.w > this.x &&
    obj.y + obj.h > this.y) {
    return true;
  }

  return false;
}

Vect.prototype.ColidLeft = function(o) {
  if (o.x < this.x + this.w &&
      o.y < this.y + this.h &&
      o.x + o.w > this.x &&
      o.y + o.h > this.y
  ) {
    return true;
  }

  return false;
};

var Rect = function(x,y,w,h,c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.txt = null;
   
    
    this.draw = function(){
      ctx.fillStyle = this.c;
      ctx.fillRect(this.x, this.y, this.w,this.h);
      
      ctx.fillStyle = "#49FF00"
      ctx.font = '12px Arial';
      ctx.fillText(this.txt, this.x, this.y);
    }
    this.update = function(){
      
    }
}




PLAYER = function(){
   this.setPos(100,50);
   this.w = 25;
   this.h = 25;
   this.vx = 0;
   this.vy = 0;
   this.gravidade = 0.5;
   this.cor = "#fff";
   this.score = 0;
   this.record = localStorage.getItem("score");
   this.totalJump = 2;
   this.life = new Rect(10,10,50,10, "#0f0");
   
   
   this.update = function(){
      this.score++;
      this.life.txt = "HP"+this.life.w;
     
      if(this.y <= 0) this.y = 0;
      this.vy += this.gravidade;
      this.setPos(this.x + this.vx , this.y + this.vy);     
      
      
      
      if(this.y > alt || this.x + this.w < 0){
        this.vy = 0;
        this.vx = 0;
        this.x = 150;
        this.y = 300;
        this.life.w -= 50;
      }
      
      if(this.life.w <= 0){
        Visible(menu2[0], true);
        STATOS.GAMEOVER();
      }
      
      
      if(this.score > this.record){
         this.record = this.score;
         localStorage.setItem("score", this.record);
      }
      
   }
   
   this.draw = function(){
     this.life.draw();
     ctx.fillStyle = this.cor;
     ctx.fillRect(this.x , this.y, this.w, this.h)
   }
   
   this.jump = function(){
     if(play.totalJump > 0){
        play.vy = -10;
        play.totalJump--;
     }
   }
}
PLAYER.prototype = new Vect;








PLATA = function(o){
  this.x = o.x;
  this.y = o.y;
  this.w = o.w;
  this.h = o.h;
  this.c = "#0f0";
    
  this.draw = function(){
    //ctx.fillStyle = "#fff";
    //ctx.font = "15px Arial";
    //ctx.fillText(`x:${Math.floor(this.x)} \n y:${this.y}`, this.x, this.y);
    
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h); 
  }
}
PLATA.prototype = new Vect;


PLATAMeneger = function(){
  this.Max = 30;
  this.vlo = 1;
  
  this.p1 = new PLATA({x: 150, y: 200, w: 400, h: 200});
  this.p2 = new PLATA({x: (this.p1.x + this.p1.w), y: 200, w: 400, h: 200});
  this.p3 = new PLATA({x: (this.p2.x + this.p2.w), y: 200, w: 400, h: 200});

  
  
  this.p1.c = "#000"
  this.p2.c = "#000"
  this.p3.c = "#000"
  

  this.ls = [this.p1, this.p2, this.p3];
}

PLATAMeneger.prototype.resite = function(){
   this.p1.x = 150;
   this.p1.c = c[Math.floor(Math.random() * c.length)]

}

PLATAMeneger.prototype.update = function(){
    var maxY = alt*.4;
    var minY = alt*.9;
    
    this.p1.x -= this.vlo;
    if(this.p1.x + this.p1.w < 0){
       this.p1.x = (this.p3.x + this.p3.w) + Random(100,200);
       this.p1.y = Random(minY, maxY);
       this.p1.c = c[Math.floor(Math.random() * c.length)];
       
       this.vlo += .1;
    }
  
    this.p2.x -= this.vlo;
    if(this.p2.x + this.p2.w < 0){
       this.p2.x = (this.p1.x + this.p1.w) + Random(100, 200);
       this.p2.y = Random(minY, maxY);
       this.p2.c = c[Math.floor(Math.random() * c.length)];
       this.vlo += .1;
    }
    
    this.p3.x -= this.vlo;
    if (this.p3.x + this.p3.w < 0) {
      this.p3.x = (this.p2.x + this.p2.w) + Random(100, 200);
      this.p3.y = Random(minY, maxY);
      this.p3.c = c[Math.floor(Math.random() * c.length)];
      this.vlo += .1;
    }
}


play_colid_plataforma = function(){
   for (var i = 0; i < plata.ls.length; i++) {
      var ob = plata.ls[i];
      
      if(play.Colid(ob)){

        if (play.y < ob.y) {
            play.y = ob.y;
            play.vy = 0;
            play.totalJump = 2;
        }
  
        play.x = play.previoX;
        play.y = play.previoY;
  
        lsP[idxP++] = new Parti({
          x: play.x,
          y: play.y + play.h,
          c: "#f00"
        });
      }
      
      
      if(play.ColidLeft(ob)){
        play.vy = -10;
        play.vx = -20;
      } 
  
     
   }


  for (var i = 0; i < plata.ls.length; i++) {
    plata.update();
  }
}



var Parti = function(op){
    this.x = op.x;
    this.y = op.y;
    this.size = 10;
    this.vx = Random(0, -10);
    this.vy = Random(0, -10);
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










var Visible = function(ob, b){
   if(b) ob.style.display = "block";
   else  ob.style.display = "none"
}



var BootLoad = function() {
    this.isBoot = false;
    this.load = document.getElementById("bootL");   
    this.w = 200;
    this.h = 5;
    
    this.initBoot = function(){
      this.load.style.display = "block";
      this.isBoot = true;
    }
    
    this.resite = function(){
      this.w = 200;
      this.h = 5;
      this.isBoot = true;
      this.load.style.display = "none";
      
      STATOS.JOGANDO();
      game.newGame();
    }
    
    this.up = function(){
      if(this.isBoot){
        this.load.style.width  = this.w+"px";
        this.load.style.height = this.h+"px";
        
        this.w -= 2;
        if(this.w <= 0) this.resite();
      }
    }
}


dBoog = function(){
   ctx.font = "15px Arial";
   ctx.fillStyle = "#fff";
   ctx.fillText(play.score, 10,35);
   
   
   var v1 = String(plata.vlo);
   var v2 = v1.slice(0, 5);
   ctx.fillText("Vlo: "+v2, lar-80,20);
   
   ctx.fillText("Rec:"+play.record, lar-80,40);
}
