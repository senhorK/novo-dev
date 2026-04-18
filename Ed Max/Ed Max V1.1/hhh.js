
















class Mundo {
	constructor() {
		this.ctx = document.getElementById("canvas1").getContext("2d");
		this.lay = lay1.getBoundingClientRect();
		this.newLoad = false;
		this.setLoad();
		
		this.ctx.canvas.addEventListener("touchstart", (e) => {
			if (e.touches.length === 1) {
				let touch = e.touches[0];
				this.isTouch = true;
				this.touchX = touch.clientX;
				this.touchY = touch.clientY;
				this.scrollX = this.offsetX;
				this.scrollY = this.offsetY;
				this.getTouch(this.touchX, this.touchY);
				this.draw();
			}
		});
		
		this.ctx.canvas.addEventListener("touchmove", (e) => {
			if (this.isTouch && e.touches.length === 1) {
				let touch = e.touches[0];
				let subX = this.scrollX - (touch.clientX - this.touchX);
				let subY = this.scrollY - (touch.clientY - this.touchY);
				
				if (btnMove.classList.contains("ativo")) {
					this.offsetX = Math.max(0, Math.min(subX, this.maxX - this.ctx.canvas.width));
					this.offsetY = Math.max(0, Math.min(subY, this.maxY - this.ctx.canvas.height));
				}
				
				this.getTouch(touch.clientX, touch.clientY);
				this.draw();
			}
		});
		
		this.ctx.canvas.addEventListener("touchend", () => {
			this.isTouch = false;
		});
	}
	
	getTouch(x, y) {
		let rect = this.ctx.canvas.getBoundingClientRect();
		let px = x - rect.left + this.offsetX;
		let py = y - rect.top + this.offsetY;
		this.tx = Math.floor(px / this.size);
		this.ty = Math.floor(py / this.size);
		
		// ID corrigido: ty (linha) * li (colunas) + tx
		this.id = this.ty * this.li + this.tx;
		
			
			
			let inMap  = this.tx >= 0 && this.tx < this.li && this.ty >= 0 && this.ty < this.co;
			let move   = btnMove.classList.contains("ativo")
			let pintar = Pintar.classList.contains("ativo");
		  let apagar = Apagar.classList.contains("ativo");
			let addcolisao = addColid.classList.contains("ativo");
      
			
			if(inMap){
			   this.id = this.ty * this.li + this.tx;
			   
			   if(pintar && !move && !apagar) this.map[this.id] = paleta.id;
			   else if(apagar) this.map[this.id] = -1;
			   
			   
			   if(addcolisao && !this.nColid.includes(paleta.id)) {
			   	  this.nColid.push(this.map[this.id])
			   }
			   else if(!addcolisao && this.nColid.includes(paleta.id)) {
						const index = this.nColid.indexOf(paleta.id);
						this.nColid.splice(index, 1);
					}
			   

			   dataAria.innerHTML = this.nColid;
			}
			
		 p1.innerHTML = `Mundo ${this.li} x ${this.co} [${this.tx}, ${this.ty}] id: [${this.id}]`;
	}
	
	setLoad() {
		this.scale = 1;
		this.map = [];
		this.nColid = [];
		
		this.size = Size_.value * this.scale;
		this.li = Li_.value * 1; // colunas
		this.co = Co_.value * 1; // linhas
		this.offsetX = 0;
		this.offsetY = 0;
		this.tx = 0;
		this.ty = 0;
		this.id = 0;
		this.maxX = this.li * this.size;
		this.maxY = this.co * this.size;
		this.renderW = this.lay.width;
		this.renderH = this.lay.height;
		
		if (this.maxX < this.renderW) this.renderW = this.maxX;
		if (this.maxY < this.renderH) this.renderH = this.maxY;
		
		if(!this.newLoad){
		    for (let i = 0; i < this.li * this.co; i++) {this.map.push(-1);}
		}
		this.ctx.canvas.width = this.renderW;
		this.ctx.canvas.height = this.renderH;
		this.ctx.canvas.style.width = this.renderW + "px";
		this.ctx.canvas.style.height = this.renderH  + "px";
		
		this.draw();
	}
	
	draw() {
		this.ctx.clearRect(0, 0, this.renderW, this.renderH);
		
		
		for (let y = 0; y < this.co; y++) {
			for (let x = 0; x < this.li; x++) {
				let px = x * this.size - this.offsetX;
				let py = y * this.size - this.offsetY;
				
				if(px + this.size < 0 || py + this.size < 0 || px > this.renderW || py > this.renderH) continue;
				
				let index = y * this.li + x; // corrigido
				let ii = this.map[index];
				
				
			
				if (ii >= 0) {
					let ww = Math.floor(imgAtual.width / this.size);
					let sx = Math.floor(ii % ww) * this.size;
					let sy = Math.floor(ii / ww) * this.size;
					
					this.ctx.drawImage(
						imgAtual,
						sx, sy, this.size, this.size,
						px, py, this.size, this.size
					);
				}
				
				
				
				if (Grid.classList.contains("ativo")) {
					  this.ctx.strokeStyle = "#fff";
					  this.ctx.strokeRect(px, py, this.size, this.size);
				}
				
				
        
			 let ncolid = btnNcolid.classList.contains("ativo");
			 if (ii >= 0 && this.nColid.includes(ii)) {
					this.ctx.strokeStyle = "#f00";
					this.ctx.strokeRect(px, py, this.size, this.size);
				}
				
			}
		}
		
		// Destaque do tile selecionado
		let celetX = this.tx * this.size - this.offsetX;
		let celetY = this.ty * this.size - this.offsetY;
		this.ctx.strokeStyle = "#f00";
		this.ctx.strokeRect(celetX, celetY, this.size, this.size);
	}
}








class Paleta {
	constructor() {
		this.ctx = document.getElementById("canvas2").getContext("2d");  
		this.lay = lay2.getBoundingClientRect()
		this.setLoad()
		
		
		
		this.ctx.canvas.addEventListener("touchstart", (e)=>{
			  if(e.touches.length === 1){
			  	let touch = e.touches[0];
			  	this.isTouch = true;
			  	this.touchX  = touch.clientX;
			  	this.touchY  = touch.clientY;
			  	this.scrollX = this.offsetX;
			    this.scrollY = this.offsetY;
			  	this.getTouch(this.touchX, this.touchY)
			  	this.draw()
			  }
		});
		
		this.ctx.canvas.addEventListener("touchmove", (e) => {
	      if(this.isTouch && e.touches.length === 1){
	      	 let touch = e.touches[0];
	      	 let subX  = this.scrollX - (touch.clientX - this.touchX);
	      	 let subY  = this.scrollY - (touch.clientY - this.touchY);
	      	 
	      	 //if(btnMove.classList.contains("ativo")){
	      	 	  this.offsetX = Math.max(0, Math.min(subX, this.maxX - this.ctx.canvas.width));
	      	 	  this.offsetY = Math.max(0, Math.min(subY, this.maxY - this.ctx.canvas.height));
	      	 //}
	      	 
	      	 this.getTouch(touch.clientX, touch.clientY)
	      	 this.draw()
	      }
    });
    
    
    this.ctx.canvas.addEventListener("touchend", (e) => {this.isTouch = false;});
	}
	
	
	getTouch(x,y){
		let rect = this.ctx.canvas.getBoundingClientRect();
		let px = x - rect.left + this.offsetX;
		let py = y - rect.top + this.offsetY;
		this.tx = Math.floor(px / this.size)
		this.ty = Math.floor(py / this.size)
	  
		//this.id = (this.ty * this.li + this.tx);
		this.id = this.ty * this.li + this.tx;
    paleta.id = this.id; // garantir que o valor global esteja atualizado
		
		p2.innerHTML = `${this.li} x ${this.co} <br>
		      				  [${this.tx}, ${this.ty}] <br>	
		      				  [${this.id}]`
	}
	
	
	
	setLoad(){
		this.map = [];
		this.size = Size_.value*1;
		this.li   = Math.floor(imgAtual.width / this.size);
		this.co   = Math.floor(imgAtual.height / this.size);
		this.offsetX = 0;
		this.offsetY = 0;
		this.tx      = 0;
		this.ty      = 0;
		this.id      = 0;
		this.maxX  = this.li * this.size;
		this.maxY  = this.co * this.size;
		this.renderW = 200;
		this.renderH = 200;
		
		if(this.maxX < this.renderW) this.renderW = this.maxX;
		if(this.maxY < this.renderH) this.renderH = this.maxY;

		
		
		
		
		for (var i = 0; i < this.li * this.co; i++) {this.map.push(i);}
		
		this.ctx.canvas.width  = this.renderW;
		this.ctx.canvas.height = this.renderH;
		this.ctx.canvas.style.width  = this.renderW + "px";
		this.ctx.canvas.style.height = this.renderH + "px";

		this.draw()
	}
	
	draw() {
	this.ctx.clearRect(0, 0, this.renderW, this.renderH);
	this.ctx.drawImage(imgAtual, -this.offsetX, -this.offsetY);
	this.ctx.strokeStyle = "#fff";
	
	for (let y = 0; y < this.co; y++) {
		for (let x = 0; x < this.li; x++) {
			
			let px = x * this.size - this.offsetX;
			let py = y * this.size - this.offsetY;
			
			if (px + this.size < 0 || py + this.size < 0 || px > this.renderW || py > this.renderH) continue;
			
						
			if (Grid.classList.contains("ativo")) {
				this.ctx.strokeRect(px, py, this.size, this.size);
			}
		}
	}
	

	let celetX = this.tx * this.size - this.offsetX;
	let celetY = this.ty * this.size - this.offsetY;
	this.ctx.strokeStyle = "#f00";
	this.ctx.strokeRect(celetX, celetY, this.size, this.size);
}
	
	
}











class Data {
	constructor() {
		this.data = {lis: [], inner: ""};
		
		if(!localStorage.getItem("mapXX")){
			  localStorage.setItem("mapXX", JSON.stringify(this.data))
		}
		
		this.data = JSON.parse(localStorage.getItem("mapXX"));
		this.load();
	}
	
	load(){
		for(var i = 0; i< this.data.lis.length; i++){
			  let d = this.data.lis[i];
			  
						items.innerHTML += `
							 	     <li>
							 	       ${d.nome}
							 	     </li>
							 	   `
		}
	}
	
	
	salvar(){
		localStorage.setItem("mapXX", JSON.stringify(this.data))
    this.data = JSON.parse(localStorage.getItem("mapXX"));
	}
}


function LoadMap() {
	
	 for(var i = 0; i < data.data.lis.length; i++) {
	 	   let d = data.data.lis[i];
	 	   items.innerHTML += `
	 	     <li>
	 	       ${d.nome}
	 	     </li>
	 	   `
	 }
}




var data = new Data();
var mundo;
var paleta;

class App {
	
	
	newApp    = ()=>{
		mundo   = new Mundo();
		paleta  = new Paleta()
	}
	

Event = () => {
	  
	
		btnNovo.addEventListener("click", () => {
			paleta.setLoad()
			mundo.setLoad()
			MENU.classList.toggle("ativo");
		})
		
		Opem.addEventListener("click", () => {
			MENU.classList.toggle("ativo");
		})
		
		
		Pintar.addEventListener("click", () => {
			Pintar.classList.toggle("ativo");
		  btnMove.classList.toggle("ativo");
		})
		
		
		Apagar.addEventListener("click", () => {
			Apagar.classList.toggle("ativo");
		 
		})
		
		addColid.addEventListener("click", () => {
			rmvColid.innerHTML = "Rmv    "
			addColid.innerHTML = "Add  ✅"
      addColid.classList.add("ativo");
      rmvColid.classList.remove("ativo");
    })
    
    rmvColid.addEventListener("click", () => {
    	rmvColid.innerHTML = "Rmv  ✅"
    	addColid.innerHTML = "Add    "
			addColid.classList.remove("ativo");
			rmvColid.classList.add("ativo");
		})
		
		
		
		
		
		
		btnNcolid.addEventListener("click", () => {
     	btnNcolid.classList.toggle("ativo");
     	laychek.classList.toggle("ativo");
      mundo.draw()
		})

		
		
		btnMove.addEventListener("click", () => {
			btnMove.classList.toggle("ativo");
		  Pintar.classList.toggle("ativo");
		})
		
		
		
		
		Grid.addEventListener("click", () => {
			Grid.classList.toggle("ativo");
			mundo.draw();
			paleta.draw();
		})
		
		btnOpenSalvar.addEventListener("click", () => {
			laySalvar.classList.toggle("ativo");
		})

		
		
	
		btnSalvar.addEventListener("click", () => {
			var obj = {
				  nome:    NomeM.value,
				  li:      mundo.li,
				  co:      mundo.co,
				  size:    mundo.size,
				  img:     imgIdx,
				  nColid:  mundo.nColid,
				  map:     mundo.map}
			
			    items.innerHTML += `<li> ${obj.nome}</li>`
    			data.data.lis.push(obj)
    			data.salvar()
    			laySalvar.classList.toggle("ativo");
    			alert("Salvo ✅")
		})
   
	  
	  items.addEventListener("click", (e) => {
						if (e.target.tagName === "LI") {
							let index = Array.from(items.children).indexOf(e.target);
							let d = data.data.lis[index];
		
							Size_.value = d.size;
							Li_.value = d.li;
							Co_.value = d.co;
							imgAtual = listImg[d.img];
							mundo.newLoad = true;
							dataAria.innerHTML = `
                  let obj = {
                  	li: ${d.li},
                  	co: ${d.co},
                  	size: ${d.size},
                  	img: ${d.img},
                  	nColid: [${d.nColid}],
                  	map: [${d.map}],
                  }`
							mundo.setLoad();
							mundo.map = d.map;
							mundo.nColid  = d.nColid;
							mundo.draw();
							paleta.setLoad();
						}
						
});

           
	  
	}
	
	
	
	
	
	
	
	init      = ()=>{
		ListImg();
		this.newApp()
		this.Event()
		
	}
	
}



var app = new App();
    app.init();





