


var random  = function(min, max){return min  +  Math.floor(Math.random()  * max);}
var randomC = function(){
    return `rgba(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}






































var ctx = document.querySelector("canvas").getContext("2d");      
var lar = window.innerWidth;
var alt = window.innerHeight;
    ctx.canvas.width  = lar;
    ctx.canvas.height = alt;
var cores =["#599", "#08FF21", "#08CEFF", "#FFFFFF"];
var delta = 7;
var acele = 0.01;
var POPULACAO = 500;
var VIVOS     = POPULACAO;
var geracao   = 1;


var lsP = [];
var idxP = 0;
var versao = 0;
var R = ""
var B = true;









class Game {
  constructor() {
     this.gameOver = false;
     this.play = [];
     
     this.plata    = new plataForma();
     
     for(var i = 0; i< POPULACAO; i++){
         this.play.push(new Play());
     }
     this.family = new Geracao(this.play)
     
     
     
     document.addEventListener("touchstart", ()=>{
       this.play[0].JUMP();
     })
  }
  
 
   reset(a = false){
     this.gameOver = true;
     this.plata    = new plataForma();
     this.family.nextGeneration(a);
     VIVOS = POPULACAO;
     geracao++;
     versao = 0;
     this.gameOver = false;
   }
  
  
  
  draw(){
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0,lar, alt);
    
    this.plata.draw();
    
    for (var i = 0; i < this.play.length; i++) {
         this.play[i].draw(i);
    }
   // this.play.forEach((e) =>{e.draw(e);})
    
    //lsP.forEach((e) =>{e.draw();})
  }
  
  
  
  update(){
    this.plata.update();
    this.play.forEach((e) => {e.update();})
   
    //lsP.forEach((e) =>{e.update();})
   
   

    
    this.play.forEach((e) =>{
      if(e.vivo){
          
         
          for(var i = 0; i < this.plata.lsF.length; i++) {
              var obj = this.plata.lsF[i];
              e.decidir(obj);
              
              
              if(Colid(e, obj) || e.y > alt){
                 e.vy = 0
                 e.y = 0;
                 e.x = 50;
                
                e.kill();
                
                if(VIVOS <= 0) this.reset();
              }
          }
      }
    });
    
    
    
    
    
    
   
    
    
    
   for(var i = 0; i< this.play.length; i++){
        if(this.play[i].vivo  && VIVOS <= 5 &&  B){
           
           
           R += `<li>id:   ${i}</li>`
           B = false;
        }
        
        
        if(this.play[i].vivo){
          let play = this.play[i];
             
          
          for(var j = 0; j < this.plata.ls.length; j++){
             let plata = this.plata.ls[j];
             
             
             
             if(Colid(play, plata)){
               play.vy = 0;
               play.y = (plata.y - play.h);
               play.jump = 2;
               
               
               
               /*lsP[idxP++] = new Parti({
                 x: play.x,
                 y: play.y + play.h,
                 c: "#f00"
               });*/
             }
          }
        }
    }
    
    p2.innerHTML = R;
    
    
    
   // delta+= acele;
    
      
    

    
    
    p1.innerHTML = `
                   POPULAÇÃO: ${POPULACAO}  <br>
                   Vivos:    ${VIVOS} <br>
                   Geração:  ${geracao}
                   `
  }
  
  
  loop(){
    if(!game.gameOver){
       game.draw();
       game.update();
    }
    
    
    
    window.requestAnimationFrame(game.loop);
  }
}











var game = new Game();var init = ()=>{game.loop()}; init();



