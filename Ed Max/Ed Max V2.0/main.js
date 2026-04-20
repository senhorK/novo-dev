/**/



const p1 = document.querySelector(".p1");

var modo = "pintar"
function bug() {
    p1.innerHTML = `
    modo: ${modo}
    
    `
   /*p1.innerHTML = `
       
      <li> isLoad: <b>${status.isLaod}</b></li> 
      <li> size: <b>${status.size}</b></li> 
      <li> linha:  <b>${status.li} </b></li> 
      <li> coluna:  <b>${status.co}</b></li>
      <li> idMundo: <b>${status.idMundo}</b></li> 
      <li> idPaleta: <b>${status.idPaleta}</b></li>  <br>
      <li> pintar : <b>${status.pintar}</b></li>
      <li> apagar : <b>${status.apagar}</b></li>

      
      <li> grid : <b>${status.grid}</b></li>
      <li> mover : <b>${status.mover}</b></li>

      
   `*/
}


function floodFill(x, y, alvo, novo) {
  if (alvo === novo) return;
  
  let stack = [[x, y]];
  
  while (stack.length) {
    let [cx, cy] = stack.pop();
    let idx = cy * this.co + cx;

    if (this.map[idx] !== alvo) continue;

    this.map[idx] = novo;

    if (cx > 0) stack.push([cx - 1, cy]);
    if (cx < this.co - 1) stack.push([cx + 1, cy]);
    if (cy > 0) stack.push([cx, cy - 1]);
    if (cy < this.li - 1) stack.push([cx, cy + 1]);
  }
}


class Mundo {
  constructor() {
    
    this.lay  = document.querySelector(".lay1");
    this.rect = this.lay.getBoundingClientRect();
    this.ctx  = document.querySelector(".canvas1").getContext("2d");
    
    
    this.size = status.size;
    this.li = status.li;
    this.co = status.co;
    this.scale = 1;
    this.map = [];
    this.renderW = 0;
    this.renderH = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.img = null;
    
  }
  
  draw(){
    this.ctx.clearRect(0,0, this.renderW, this.renderH);   
    
    

    for (let y = 0; y < this.li; y++) {
      for (let x = 0; x < this.co; x++) {
        let px = x * this.size - this.offsetX;
        let py = y * this.size - this.offsetY;
        
        if(px + this.size < 0 || py + this.size < 0 || px > this.renderW || py > this.renderH) continue;
        
        //let idx = y * this.li + x;
        let idx = y * this.co + x;
        let ii  = this.map[idx];
        
        if(ii >= 0){
          
          let ww = status.img.width/this.size;
          let sx = Math.floor(ii % ww) * this.size;
          let sy = Math.floor(ii / ww) * this.size;
          
          this.ctx.drawImage(status.img,
            sx,sy, this.size, this.size,
            px,py, this.size, this.size,
          )
        }
        
        
        
        /// Gride////
          if(status.grid) {
             this.ctx.strokeStyle = "#FFFFFF09";
             this.ctx.lineWidth = 0.5;
             this.ctx.strokeRect(px +0.5,py + 0.5, this.size, this.size)
          }
          
          if(status.colisao.has(ii)){
            this.ctx.strokeStyle = "#F00";
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeRect(px +0.5,py + 0.5, this.size, this.size)
          }
          
        
      }
    }
    
    

    
    
    if(this.isCanvas(this.tx, this.ty)){
      const celetX = this.tx * this.size - this.offsetX;
      const celetY = this.ty * this.size - this.offsetY;
    
      this.ctx.strokeStyle = "#0f0";
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(celetX + 0.5, celetY + 0.5, this.size, this.size);
    }




    bug()
  }
  isCanvas(tx, ty){return tx >= 0 && ty >= 0 && tx < this.co && ty < this.li;}
  
  
  getTouch(x,y){
    
    let r    = this.ctx.canvas.getBoundingClientRect();
    let px   = x - r.left + this.offsetX;
    let py   = y - r.top  + this.offsetY;
    let tx  = Math.floor(px / this.size);
    let ty  = Math.floor(py / this.size);

    
    tx = Math.max(0, Math.min(tx, this.co - 1));
    ty = Math.max(0, Math.min(ty, this.li - 1));
    
    this.tx = tx;
    this.ty = ty;
    
    
    if(!this.isCanvas(this.tx,this.ty)) return;
    
    
    
    
        
    let id = this.ty * this.co + this.tx;
    status.idMundo = id;
    
    
    status.isColisao();
    if(status.pintar){
        if(status.balde) {
            this.floodFill(this.tx,this.ty,this.map[id],status.idPaleta);
        }
        else this.map[id] = status.idPaleta;
    }
    if(status.apagar){
      this.map[id] = -1;
    }
  }
  

poiterDow(e){
          const x = e.clientX;
          const y = e.clientY;
          
          this.isTouch = true;
          this.touchX  = x;
          this.touchY  = y;
          this.scrollX = this.offsetX;
          this.scrollY = this.offsetY;
          this.getTouch(this.touchX, this.touchY);
          this.draw()
        
    
}


poiterMove(e){
       const x = e.clientX;
       const y = e.clientY;

       if(this.isTouch){  
          let subX = this.scrollX - (x - this.touchX);
          let subY = this.scrollY - (y - this.touchY);
          
          
          
          if(status.mover){
             this.offsetX = Math.max(0, Math.min(subX, this.maxX - this.ctx.canvas.width))
             this.offsetY = Math.max(0, Math.min(subY, this.maxY - this.ctx.canvas.height))
          }
          
          
          this.getTouch(x, y);
          this.draw()
       }
    
}

floodFill(x, y, alvo, novo) {
  if (alvo === novo) return;

  let stack = [[x, y]];
  let visited = new Set();

  while (stack.length) {
    let [cx, cy] = stack.pop();
    let key = cx + "," + cy;

    if (visited.has(key)) continue;
    visited.add(key);

    let idx = cy * this.co + cx;

    if (this.map[idx] !== alvo) continue;

    this.map[idx] = novo;

    if (cx > 0) stack.push([cx - 1, cy]);
    if (cx < this.co - 1) stack.push([cx + 1, cy]);
    if (cy > 0) stack.push([cx, cy - 1]);
    if (cy < this.li - 1) stack.push([cx, cy + 1]);
  }
}


  init(load){
    this.lay.style.width = 100 + "%";
    this.lay.style.height = 50 + "%";
    this.rect = this.lay.getBoundingClientRect();
    this.img  = status.img;
    this.size = status.size;
    this.li   = status.li;
    this.co   = status.co;
    this.colid = document.querySelector("#seletColisao").value;
    
    
    this.maxX = this.co * this.size;
    this.maxY = this.li * this.size;
    
    this.renderW = this.rect.width;
    this.renderH = this.rect.height;
  
    
    if(this.maxX < this.renderW) this.renderW = this.maxX;
    if(this.maxY < this.renderH) this.renderH = this.maxY;
    
    this.lay.style.width  = Math.min(this.maxX, this.renderW) + "px";
    this.lay.style.height = Math.min(this.maxY, this.renderH) + "px";
    
    
    this.map = status.map;
    for (let i = 0; i < this.li * this.co; i++) {this.map.push(-1)}
    
    
    this.ctx.canvas.width        = this.renderW;
    this.ctx.canvas.height       = this.renderH;
    this.ctx.canvas.style.width  = this.renderW + "px";
		this.ctx.canvas.style.height = this.renderH + "px";
    
    this.draw()
    
  
    this.ctx.canvas.addEventListener("pointerdown", (e)=>{this.poiterDow(e)})
    this.ctx.canvas.addEventListener("pointermove", (e)=>{this.poiterMove(e);});
    this.ctx.canvas.addEventListener("pointerup", (e)=>{this.isTouch = false;})
    this.ctx.canvas.addEventListener("pointerleave", ()=>{this.isTouch = false;});
  }
  
  
  
  
  
}
class Paleta {
  constructor() {
    
    this.lay = document.querySelector(".lay2");
    this.rect = this.lay.getBoundingClientRect();
    this.ctx = document.querySelector(".canvas2").getContext("2d");
    
    
    this.size =0;
    this.li = 0;
    this.co = 0;
    this.scale = 1;
    this.map = [];
    this.renderW = 0;
    this.renderH = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.img = null;
  }
  
  draw() {
    this.ctx.clearRect(0,0, this.renderW, this.renderH)
  	this.ctx.drawImage(status.img, -this.offsetX, -this.offsetY)
    
    
    for (let y = 0; y < this.li; y++) {
      for (let x = 0; x < this.co; x++) {
        let px = x * this.size - this.offsetX;
        let py = y * this.size - this.offsetY;
        
        if (px + this.size < 0 || py + this.size < 0 || px > this.renderW || py > this.renderH) continue;
        
        let idx = y * this.co + x;
        let ii = this.map[idx];
        

        
        /// Gride////
        this.ctx.strokeStyle = "#FFFFFF0D";
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeRect(px -0.5, py -0.5, this.size, this.size)
        
      }
    }
    
    
    
    
    
    if (this.isCanvas(this.tx, this.ty)) {
      const celetX = this.tx * this.size - this.offsetX;
      const celetY = this.ty * this.size - this.offsetY;
      
      this.ctx.strokeStyle = "#f00";
      this.ctx.lineWidth = 0.5;
      this.ctx.strokeRect(celetX -0.5, celetY -0.5, this.size, this.size);
    }
    
    
    
    
    bug()
  }
  isCanvas(tx, ty) { return tx >= 0 && ty >= 0 && tx < this.co && ty < this.li; }
  
  
  
  
  getTouch(x, y) {
    
    let r = this.ctx.canvas.getBoundingClientRect();
    let px = x - r.left + this.offsetX;
    let py = y - r.top + this.offsetY;
    let tx = Math.floor(px / this.size);
    let ty = Math.floor(py / this.size);
    
    
    tx = Math.max(0, Math.min(tx, this.co - 1));
    ty = Math.max(0, Math.min(ty, this.li - 1));
    
    this.tx = tx;
    this.ty = ty;
    
    
    if (!this.isCanvas(this.tx, this.ty)) return;
    
    
    
    
    let id = this.ty * this.co + this.tx;
    status.idPaleta = id;
    

  }

  poiterDow(e){
        const x = e.clientX;
        const y = e.clientY;
        
        this.isTouch = true;
        this.touchX = x;
        this.touchY = y;
        this.scrollX = this.offsetX;
        this.scrollY = this.offsetY;
        this.getTouch(this.touchX, this.touchY);
        this.draw()
  }
  poiterMove(e){
      const x = e.clientX;
      const y = e.clientY;

      if (this.isTouch) {        
        let subX = this.scrollX - (x - this.touchX);
        let subY = this.scrollY - (y - this.touchY);
      
        this.offsetX = Math.max(0, Math.min(subX, Math.max(0, this.maxX - this.ctx.canvas.width)));
        this.offsetY = Math.max(0, Math.min(subY, Math.max(0, this.maxY - this.ctx.canvas.height)));      
      
        this.getTouch(x, y);
        this.draw()
      }
    
  }

      
  
  init() {
    this.lay.style.width = 70 + "%";
    this.lay.style.height = 35 + "%";

    this.rect = this.lay.getBoundingClientRect();
    this.img = status.img;
    this.size = status.size;
    this.li = Math.floor(this.img.height/this.size);
    this.co = Math.floor(this.img.width/this.size);
    
   
    this.maxX = this.co * this.size; // largura correta
    this.maxY = this.li * this.size; // altura correta
    this.renderW = this.rect.width;
    this.renderH = this.rect.height;
    
    
    if(this.maxX < this.renderW) this.renderW = this.maxX;
    if(this.maxY < this.renderH) this.renderH = this.maxY;
      
    
    this.lay.style.width = Math.min(this.maxX, this.renderW) + "px";
    this.lay.style.height = Math.min(this.maxY, this.renderH) + "px";
    
    
    this.map = [];
    for (let i = 0; i < this.li * this.co; i++) { this.map.push(i) }
    
    this.ctx.canvas.width = this.renderW;
    this.ctx.canvas.height = this.renderH;
    this.ctx.canvas.style.width = this.renderW + "px";
    this.ctx.canvas.style.height = this.renderH + "px";
    
    
    
    this.draw()
    


    this.ctx.canvas.addEventListener('pointerdown', (e)=>{e.preventDefault(); this.poiterDow(e)});
    this.ctx.canvas.addEventListener('pointermove', (e)=>{this.poiterMove(e)});
    this.ctx.canvas.addEventListener('pointerup', (e)=>{this.isTouch = false;});
    this.ctx.canvas.addEventListener('pointerleave', (e)=>{this.isTouch = false;});

  

    
    
    
    
    
    
  }
  
  
  
  
  
}


class Data{
  constructor() {
    this.data = [];
    
      
    this.load();
  }
  
  load(){
    if (localStorage.getItem("dataMap")) {
        this.data = JSON.parse(localStorage.getItem("dataMap"))
        
        
        const ul = document.querySelector(".loadMapas ul");
        ul.innerHTML = "";
        
        this.data.forEach(e => {
          const li = document.createElement("li");
          const p = document.createElement("p");
          const b = document.createElement("b");
          const img = document.createElement("img");
          
          p.innerText = e.nome;
          b.innerText = "informação";
          img.src = lsImgs[e.idx] || "";
          
          li.appendChild(p);
          li.appendChild(b);
          li.appendChild(img);
          
          ul.appendChild(li);
        });
      }
  }
  
  
  
  salvar(){
    localStorage.setItem("dataMap", JSON.stringify(this.data, null, 2)); 

  }
}


var mundo;
var paleta;
var data;



const status = {
  isLaod: false,
  idx: 0,
  size: 16,
  li: 30,
  co: 30,
  map: [],
  colisao: new Set(),
  
  idMundo: 0,
  idPaleta: 0,
  pintar: true,
  apagar: false,
  mover: false,
  grid: true,
  balde: false,
  
  get img() {
    return imgs[this.idx];
  },
  
  
  
  
  setTool(li, item) {
			// se clicar na mesma, desliga
			if(this[item]) {
				 this[item] = false;
				 app.hide(li);
				 return;
			}
			
			// desliga todas
			this.pintar = false;
			this.apagar = false;
			this.mover = false;
			
			["#pintar", "#apagar", "#mover"].forEach(e => app.hide(e));
			
			
			modo = item;
			this[item] = true;
			app.show(li);
},


isColisao(){
  const colid = document.querySelector("#seletColisao").value;
  const id = this.idPaleta;

  if(colid === "sim"){
    this.colisao.add(id);
  }else 
  if(colid === "nao"){
    this.colisao.delete(id);
  }
}

};
function highlightJSON(json) {
  return json
    // chaves
    .replace(/"(.*?)":/g, '<span class="key">"$1"</span>:')
    
    // strings
    .replace(/: "(.*?)"/g, ': <span class="string">"$1"</span>')
    
    // números
    .replace(/\b\d+\b/g, '<span class="number">$&</span>')
    
    // boolean/null
    .replace(/\b(true|false|null)\b/g, '<span class="bool">$1</span>');
}



const delegar = {
   idxMap: null,
   Pronpt(n,f){
        const propt    = document.querySelector(".propt");
        const nome     = propt.querySelector("p");
        const proptKil = propt.querySelector("#proptKil");
        const proptOk  = propt.querySelector("#proptOk");
        
        app.show(propt)
        nome.textContent = n;
        
        proptKil.onclick =()=>{
          app.hide(propt);
        }
        proptOk.onclick  = ()=>{
          const input    =  propt.querySelector("input").value;
          
          app.hide(propt);
          return f(input)
        }
  },
   opsMap(e){
     const li = e.target.closest("li");
     if(!li) return;
     
     const nome = li.textContent;
     
     if(!data.data[this.idxMap]) return alert(`Mapa nao Encontrado =>>> Erro ???data.data[this.idxMap]?? <== nao encontrado`)

     
     if(nome === "apagar"){
        alert(`(${data.data[this.idxMap].nome}) Apagado`)
        app.hide(".opsMap")
        data.data.splice(this.idxMap, 1);
        data.salvar();
        data.load();
     }
     else   
     if(nome === "renomear") {
       
        
        let nomePront = `Renomeando => ${data.data[this.idxMap].nome}`;
        this.Pronpt(`${nomePront}`, (val)=>{
     
          const existe = data.data.some(i => i.nome === val);
        
          if(val === "" || existe) return alert("nome Invalido ou Ja existe!");
          
            data.data[this.idxMap].nome = val;
            data.salvar();
            data.load()
            alert("Renomear com susseso ✅")
            app.hide(".opsMap")
        })
     }
     else  
     if(nome === "ver data") app.show(".layText");
     else
     if(nome === "Salvar Imagem"){
       
     }
     else  
     if (nome === "sair") app.hide(".opsMap");
     
       
     
     
     
     
     
     //alert(data.data[idx].nome)
   },
   
   baixarCanvas(canvas){
      const link = document.createElement("a");
            link.download = "mapa.png"; // nome do arquivo
            link.href = canvas.toDataURL("image/png");
            link.click();
   }
}



class Super {
  constructor() {
     this.Criar = document.querySelector(".Criar")
     this.boxImg = document.querySelector(".boxImg")
     this.menu1 = document.querySelector(".menu1")
     this.loadMapas = document.querySelector(".loadMapas")
     this.mapFeito  = document.querySelector(".mapFeito")
     this.layText   = document.querySelector(".layText")
     this.opsMap  = document.querySelector(".opsMap")
     this.Download = document.querySelector(".Download")
     
     
     mundo  = new Mundo();
     paleta = new Paleta();
     data   = new Data();
     mundo.init();
     paleta.init();
    
     this.Event()
  }
  
  Pronpt(f){
    const propt = document.querySelector(".propt");
    const proptKil = propt.querySelector("#proptKil");
    const proptOk = propt.querySelector("#proptOk");
    
    app.show(propt)
    
    proptKil.onclick =()=>{
      app.hide(propt);
    }
    proptOk.onclick  = ()=>{
      const input    =  propt.querySelector("input").value;
      
      app.hide(propt);
      return f(input)
    }
  }
  
  
  
  Event(){
     
     
     this.Download.addEventListener("click", (e)=>{
       delegar["baixarCanvas"](mundo.ctx.canvas)
     });
     this.Criar.addEventListener("click", (e)=>{
        const tag = e.target.tagName;
        const cla = e.target.className;
        const size = this.Criar.querySelector("#sizeIp").value;
        const li   = this.Criar.querySelector("#linhaIp").value;
        const co   = this.Criar.querySelector("#colunaIp").value;
        //const div  = this.Criar.querySelector(".boxImg")
        
        if(cla === "criarBtn"){
          status.isLaod = false;
          status.size = size;
          status.li   = li;
          status.co   = co;
          status.map  = [];
          
          //Mundo.init()
          app.hide(this.Criar)
          mundo.init();
          paleta.init();
        }
        
        
     })
     this.boxImg.addEventListener("click", (e)=>{
     	  const img = e.target.closest("img");
     	  if(!img) return;
     	  
     	  const parent = img.parentElement;
     	  const idx    = Array.from(parent.children).indexOf(img);    
     	  status.idx   = idx;
     	  
     })
     this.menu1.addEventListener("click", (e)=>{
        const li = e.target.closest("li")
        if(!li) return;
        
        //const nome = li.textContent;
        const nome =  li.id;
        
        if(nome === "pintar")status.setTool(li, "pintar")
        
        else  
        if(nome === "apagar") status.setTool(li, "apagar")
        else 
        if(nome === "grid"){
          if(status.grid){
             status.grid = false;
             app.hide(li)
          }
          else{
            status.grid = true
            app.show(li)
          }
          
          mundo.draw()
        }
        else  
        if(nome === "mover") status.setTool(li, "mover")
        else
        if(nome === "novo") app.show(this.Criar);
        else  
        if(nome === "salvar") {
         
          this.Pronpt((val)=>{
           const mapa = {
                    nome: val,
                    idx: status.idx,
                    size: status.size,
                    li: status.li,
                    co: status.co,
                    
                    colisao: [...status.colisao], // 🔥 importante (Set → Array)
                    
                    idMundo: status.idMundo,
                    idPaleta: status.idPaleta,
                    pintar: status.pintar,
                    apagar: status.apagar,
                    mover: status.mover,
                    grid: status.grid,
                    map: status.map,
                  };
                  
               
            const map = new Map(data.data.map(i => [i.nome, i]));
                  map.set(val, mapa);
                  
                  data.data = [...map.values()];
                  data.salvar();
                  data.load()
                  console.log(map);
          })
        }
        else  
        if(nome === "loadMap"){
          app.show(".loadMapas");
        }
        else  
        if(nome === "apagarAll") {
          status.map =[];
          mundo.init();
          alert("limpo 🫧 ")
        }
        else 
        if(nome === "balde"){
          if(!status.balde){
            status.balde = true;
            app.show(li)
          }
          else {
            status.balde = false;
            app.hide(li)
          }
                
        }
       
        
        bug()
     })
     this.loadMapas.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        const tag = e.target.tagName;
        const pare = li.parentElement;
        const idx = Array.from(pare.children).indexOf(li);
        
        
        
        
        const json = JSON.stringify(data.data[idx], null, 2);
        document.querySelector("#txtMapa").value = json;
        document.querySelector("#preJson").innerHTML = highlightJSON(json); 
        
        
        
        
        
        
        if(tag === "IMG"){
            const loadD = data.data[idx];
            
            // 🔥 aqui é o segredo
            status.isLaod = true;
            status.idx = loadD.idx;
            status.size = loadD.size;
            status.li = loadD.li;
            status.co = loadD.co;
            status.map = loadD.map;
            
            status.colisao = new Set(loadD.colisao); // 🔥 volta pro Set
            
            status.idMundo = loadD.idMundo;
            status.idPaleta = loadD.idPaleta;
            status.pintar = false;
            status.apagar = false;
            status.mover = true;
            status.grid = loadD.grid;
            
            // 🔥 reinicia o mundo
            document.querySelector(".propt input").value = loadD.nome;
            app.hide("#pintar")
            app.hide("#apagar")
            app.show("#mover")
            mundo.init();
            paleta.init();
        }
        else  
        if(tag === "B"){
          delegar.idxMap = idx;
          app.show(".opsMap")
        }
        
      });
     this.mapFeito.addEventListener("click", (e) => {app.hide(".loadMapas");});
     this.layText.addEventListener("click", (e)=>{
         const nome = e.target.innerText;
         
         if(nome === "Copiar"){
           const txt = document.querySelector("#txtMapa");
                 navigator.clipboard.writeText(txt.value);
                 alert("Copiado!");
         }
         else  
         if(nome === "Fechar"){
           app.hide(".layText")
         }
     })
     this.opsMap.addEventListener("click", (e)=>{if(delegar["opsMap"]) delegar["opsMap"](e);})
     
  }
}

new Super()





