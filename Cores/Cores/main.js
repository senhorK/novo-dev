


var ctx = document.querySelector("canvas").getContext("2d");     
var cv  = document.createElement("canvas").getContext("2d")


class Cores {
  constructor() {
    this.lsCores = [];
    this.size = 50;
    this.li = 7;
    this.co = 0;
    this.efeito = 6;
    this.time= null;
    
    
    
    this.efeitos = {
  1: (i, j) => ({
    hue: j * 30,
    sat: 80 + Math.sin(i) * 10,
    light: 40 + i * 5
  }),

  2: (i, j) => ({
    hue: (j * 30) + i * 10,
    sat: 80 + Math.sin(i) * 10,
    light: 40 + i * 5
  }),

  3: (i, j) => ({
    hue: j * 30,
    sat: 80 + Math.sin(i) * 10,
    light: 50 + Math.sin(i + j) * 20
  }),

  4: (i, j) => ({
    hue: (j * 30) + (i * 20),
    sat: 90,
    light: 50
  }),

  5: (i, j) => ({
    hue: j * 20,
    sat: 60,
    light: 30 + i * 4
  }),

  6: (i, j) => {
    let time = Date.now() * 0.002;
    return {
      hue: (j * 30 + time * 50) % 360,
      sat: 80 + Math.sin(i) * 10,
      light: 40 + i * 5
    };
  }
};
    
    
    
    
    
    
    
    
    
    this.input = document.querySelector("#inputt");
    this.btn   = document.querySelector("#btnGera");




    
    
    this.btn.addEventListener("click", (e)=>{
       const input = document.querySelector("#inputt");
       this.efeito = Number(input.value);
       
       if(this.efeito === 6){
            if(this.time) clearInterval(this.time)
            this.time = setInterval(() => {
              this.lsCores = []
              this.add();
            }, 50);
      }

      else{
        this.lsCores =[];
        this.add();
      }
    })
    


 if(this.efeito === 6){
      this.time = setInterval(() => {
            this.lsCores = []
            this.add();
      }, 50);
 }

 else clearInterval(this.time)
  }
  
  draw(){
    var co = Math.max(...this.lsCores.map(g => g.length));
    var li = this.lsCores.length;
    var w = co * this.size;
    var h = li * this.size;
    
    cv.clearRect(0,0, w,h)
    ctx.clearRect(0,0, w,h)
    
    cv.canvas.width   = co * this.size;
    cv.canvas.height  = li * this.size;
    ctx.canvas.width  = co * this.size;
    ctx.canvas.height = li * this.size;

    this.lsCores.forEach((linha, y) => {
      linha.forEach((cor, x) => {
        cv.fillStyle = cor;
        cv.fillRect(x * this.size, y * this.size, this.size, this.size);
      });
    });
    
    ctx.drawImage(cv.canvas, 0, 0)
  }
  
  
  
  add(){
    var max = 255;
    var min = 0;
    var sub = max/this.li;
    
    for (let i = 0; i < this.li; i++) {
      let linha = [];
    
      for (let j = 0; j < 12; j++) {
         
       // let hue;
       // let light;
       // let sat;
        let { hue, sat, light } = this.efeitos[this.efeito](i, j);
        
        /*
        if(this.efeito === 1){
           hue = (j * 30);
           light = 40 + i * 5;
           sat = 80 + Math.sin(i) * 10;
        }
        else  
        if(this.efeito === 2){
           hue = (j * 30) + i * 10;
           light = 40 + i * 5;
           sat = 80 + Math.sin(i) * 10;
        }
        else  
        if(this.efeito === 3){
           sat = 80 + Math.sin(i) * 10;
           hue = (j * 30);
           light = 50 + Math.sin(i + j) * 20;
        }
        else  
        if(this.efeito === 4){
           hue = (j * 30) + (i * 20);
           sat = 90;
           light = 50;
        }
        else   
        if(this.efeito === 5){
           hue = (j * 20);
           sat = 60;
           light = 30 + i * 4;
        } 
        else  
        if(this.efeito === 6){
          let time = Date.now() * 0.002;
          hue = (j * 30 + time * 50) % 360;
          light = 40 + i * 5;
          sat = 80 + Math.sin(i) * 10;
        }*/
        


        linha.push(`hsl(${hue}, ${sat}%, ${light}%)`);
        linha.push(`hsl(${hue}, 70%, ${light}%)`);
      }
    
      this.lsCores.push(linha);
      
      if(i >= this.li-1) this.draw()
    }
    
    
  }
  
  
}

new Cores()


