



const Heli = {
     x: 50,
     y: 50,
     v: 7,
     scale: 0.16,
     frame: 0,
     balas:  [],

     sprite: {
        sw: 502,
        sh: 247,

        frames: [
            [0,0],
            [0,372],
            [643,0],
            [643,372]
        ]

     },
     

     Addfire(){
          this.balas.push({
            x: this.x ,
            y: this.y,
            w: 20,
            h: 5
          })
     },
     

     update(){
        this.frame += 0.2;
        if(this.frame >= this.sprite.frames.length) this.frame = 0;



        const h = (this.sprite.sh*this.scale); 

        if(controle.up && this.y >= 0){
         this.y -= this.v;
        }
        else
        if(controle.dow && this.y + h <= (alt -5)) {
          this.y += this.v;
        }

        


        if (controle.x) {
          this.Addfire();
          som1.currentTime =0;
         som1.play();

        }
     },

     draw(){
         const f = this.sprite.frames[Math.floor(this.frame)];

         
         
         
         const sx = f[0];
         const sy = f[1];

        const sw = this.sprite.sw;
        const sh = this.sprite.sh;

        const w  = sw * this.scale;
        const h  = sh * this.scale;
        


        ctx.drawImage(IMG[0],
           sx,sy, sw,sh,
           this.x, this.y, w,h

        )
        
        
        ctx.fillStyle = "#d61d1d"

        this.balas.forEach(b =>{
            
            b.x += 10;

            ctx.fillRect(b.x, b.y,   b.w, b.h);


        });
     },




}


const controle = {
   up: false,
   dow: false,
   left: false,
   right: false,
   x: false,

   init(){
      window.addEventListener("keydown", (e)=>{
           if(e.key === "ArrowUp") this.up       = true;
           if(e.key === "ArrowDown") this.dow    = true;
           if(e.key === "ArrowLeft") this.left     = true;
           if(e.key === "ArrowRight") this.right    = true;
           if(e.key === "x") this.x    = true;


      });


      window.addEventListener("keyup", (e)=>{
           if(e.key === "ArrowUp") this.up       = false;
           if(e.key === "ArrowDown") this.dow    = false;
           if(e.key === "ArrowLeft") this.left     = false;
           if(e.key === "ArrowRight") this.right    = false;
           if(e.key === "x") this.x    = false;

      });
   }
}



var ctx;
var lar = window.innerWidth;
var alt = window.innerHeight/2;



class Gama {
    constructor(parameters) {
        this.init();
    }


    newGame = ()=>{}
    update  = ()=>{
       Heli.update();
    }
    draw    = ()=>{
       //ctx.clearRect(0,0,lar,alt);
       ctx.fillStyle = "#76b1ff";
       ctx.fillRect(0,0,lar,alt)
       //ctx.drawImage(IMG[2], 0,0,lar, alt -30)
       //ctx.drawImage(IMG[1], 0,alt -30,  lar,30)
       Heli.draw(ctx)

    }
    loop    = ()=>{

        this.update();
        this.draw();
        
        window.requestAnimationFrame(this.loop);
    }
    init    = ()=>{
 
       ctx  = document.querySelector("canvas").getContext("2d")
       ctx.canvas.width   = lar;
       ctx.canvas.height  = alt;
       ctx.canvas.style.lar  = lar+"px";
       ctx.canvas.style.height  = alt+"px";
      

       
       

       this.newGame();
       this.loop();
       controle.init();
    }
    
}


const game = new Gama();