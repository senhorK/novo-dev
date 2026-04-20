



/*function somPulo() {
  const audio = new (window.AudioContext || window.webkitAudioContext)();

  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = "square"; // square, sine, triangle, sawtooth
  osc.frequency.setValueAtTime(600, audio.currentTime);

  gain.gain.setValueAtTime(0.1, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + 0.15
  );

  osc.connect(gain);
  gain.connect(audio.destination);

  osc.start();
  osc.stop(audio.currentTime + 0.15);
}*/

const audio = new(window.AudioContext || window.webkitAudioContext)();

function somPulo() {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  
  osc.type = "square";
  osc.frequency.setValueAtTime(600, audio.currentTime);
  
  gain.gain.setValueAtTime(0.1, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + 0.09
  );
  
  osc.connect(gain);
  gain.connect(audio.destination);
  
  osc.start();
  osc.stop(audio.currentTime + 0.9);
}
function somPuloOriginal() {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  
  // Usar "triangle" deixa o som menos "ardido" que o square, mais nostálgico
  osc.type = "triangle"; 
  
  const agora = audio.currentTime;
  
  // Começa em 150Hz e sobe para 600Hz em 0.1 segundos
  osc.frequency.setValueAtTime(150, agora);
  osc.frequency.exponentialRampToValueAtTime(600, agora + 0.1);
  
  gain.gain.setValueAtTime(0.2, agora);
  gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.2);
  
  osc.connect(gain);
  gain.connect(audio.destination);
  
  osc.start(agora);
  osc.stop(agora + 0.2);
}
function somPuloEstiloso() {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  
  osc.type = "sawtooth";
  const agora = audio.currentTime;

  // Curva de frequência: sobe e depois desce um pouco
  osc.frequency.setValueAtTime(200, agora);
  osc.frequency.linearRampToValueAtTime(800, agora + 0.05);
  osc.frequency.linearRampToValueAtTime(400, agora + 0.15);
  
  gain.gain.setValueAtTime(0.1, agora);
  gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.15);
  
  osc.connect(gain);
  gain.connect(audio.destination);
  
  osc.start(agora);
  osc.stop(agora + 0.15);
}
function somPuloUooop() {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  
  // "sine" dá aquele tom limpo de desenho animado/flauta
  osc.type = "sine"; 
  
  const agora = audio.currentTime;
  const duracao = 0.5; // Um pouco mais longo para dar tempo de ouvir o "uooop"

  // O efeito "uooop": começa em 200Hz e desliza até 800Hz
  // Usamos linearRamp para dar uma sensação de subida constante
  osc.frequency.setValueAtTime(400, agora);
  osc.frequency.linearRampToValueAtTime(800, agora + duracao);
  
  // Envelope de Volume
  gain.gain.setValueAtTime(0, agora);
  // Sobe o volume rápido no início (o "u")
  gain.gain.linearRampToValueAtTime(0.9, agora + 0.05); 
  // Mantém e desce suave no final (o "p" mudo)
  gain.gain.exponentialRampToValueAtTime(0.01, agora + duracao);
  
  osc.connect(gain);
  gain.connect(audio.destination);
  
  osc.start(agora);
  osc.stop(agora + duracao);
}
function somPuloUooopAgudo() {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  
  osc.type = "sine"; 
  
  const agora = audio.currentTime;
  // Diminuir a duração faz o "uooop" ser mais rápido e energético
  const duracao = 0.25; 

  // Começamos em 600Hz (bem mais agudo) e saltamos para 1200Hz
  osc.frequency.setValueAtTime(600, agora);
  osc.frequency.exponentialRampToValueAtTime(1200, agora + duracao);
  
  gain.gain.setValueAtTime(0, agora);
  gain.gain.linearRampToValueAtTime(0.15, agora + 0.03); 
  gain.gain.exponentialRampToValueAtTime(0.001, agora + duracao);
  
  osc.connect(gain);
  gain.connect(audio.destination);
  
  osc.start(agora);
  osc.stop(agora + duracao);
}







const control ={
      jump: false
}



var scale = 1;
var lar = window.innerWidth;
var alt = window.innerWidth;


var lay;
var ctx;
var mundo;
var obstaculos;
var player;


const som1 = new Audio();
      som1.src ="./som/jump1.mp3"
      
      



class Game {
  constructor() {
    this.p = document.querySelector("#p1")
    this.init()
  }
  
  newGame(){
    
    
    
    mundo  = new Mundo();
    //obstaculos = FaseTeste();
    //obstaculos = tribunalDoCaos()
    //obstaculos = sofrimento_Sangrento()
    obstaculos = espinhos_Sangrentos()
    const typ = ["platform", "coluna", "block"]
    obstaculos.forEach(obs => {
      if (typ.includes(obs.type)) {
        mundo.colid.push(obs);
      }
    });
    
    
    player = new Player();
    
  }
  
  colidPlayerEspinho(){
    ////colisão com player e espinhos
    const objPlayer = {
      x: player.x,
      y: player.y,
      w: player.size,
      h: player.size
    }
    
    const colidSpike = obstaculos.find(obs => obs.type === "spike" && Colid(objPlayer, obs));
    
    if (colidSpike) { this.newGame() }
  }
  colidLateral(){
    const tipos = ["platform", "coluna","block"]
    const nextBoxX = {
      x: player.x + player.size,
      y: player.y,
      w: 4,
      h: player.size
    };
    
    const colidR = obstaculos.find(obs => {
      if(tipos.includes(obs.type)){
      const sideLeft = {x: obs.x,y: obs.y, w: 4,h: obs.h};
      return Colid(nextBoxX, sideLeft);
      }
      
      return;
    });
    
    
    if (colidR) {
      this.newGame();
    }
  }
  update(){
    
    mundo.update();
    obstaculos.forEach(obs => {obs.update();});
    player.update();
    
    
    
    
    this.colidPlayerEspinho();
    this.colidLateral();
  }
  draw(){
     ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
     mundo.draw();
     obstaculos.forEach(obs => {obs.draw();});
     
     
     player.draw();
  }
  
  dbug(){
    this.p.innerHTML = `
    control jump: ${control.jump} <br>
    vy: ${player.vy} <br>
    onGround: ${player.onGround} <br>
    colidBase: ${JSON.stringify(player.colidBase)} <br>
    rotation: ${player.rotation}
    `
  }
  
  loop = ()=>{
    this.update()
    this.draw()
    
    //this.dbug()
    window.requestAnimationFrame(this.loop)
  }
  
  
  init(){
    lay = document.querySelector(".lay");
    ctx = document.querySelector("canvas").getContext("2d");
    
    
    if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      scale = 1;
      lar = window.innerWidth;
      alt = window.innerWidth;
      
      
      console.log("Celular");
    } else {
      scale = 0.8;
      lar = window.innerWidth;
      alt = window.innerHeight;
      console.log("PC");
    }
    
    
    lay.style.width  = lar+"px";
    lay.style.height = lar+"px";
    
    ctx.canvas.width = lar*scale;
    ctx.canvas.height = alt*scale;
    ctx.canvas.style.width = (lar*scale) + "px";
    ctx.canvas.style.height = (alt*scale) + "px";
    
        
    
    


    
    
    this.newGame()
    this.loop()
    

     

    document.body.addEventListener("pointerdown", (e)=>{
      e.preventDefault()
      control.jump = true;
      //somPuloUooop()
      if (audio.state === "suspended") {
        audio.resume();
      }
    })
     
     
    document.body.addEventListener("pointerup", ()=>{
      control.jump = false;
    })
  }
}
som1.onload = ()=>{console.log("som carregado")}
const game = new Game()




