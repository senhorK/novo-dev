





/****

Carregar Imgs    =>>>>
carregar script  =>>>>

***/






const boot ={
	 b: document.querySelector(".boot"),
   p: document.querySelector("#bootP"),
   s: document.querySelector("#bootS"),
   
   Set(pr, a){
   	this.p.innerText = `carregando \n ${a}`;
   	this.s.style.width = pr +"px"
   },
   full(){
   	this.s.style.width = 200 +"px"
   	
   	setTimeout(()=>{
   		this.b.classList.remove("ativo")
   	},0)
   }
   
   
}





const lsScript = ["./js/app.js","./main.js"];

var lsImgs = [
	"./img/mapa.png",
	"./imgg/tile_1.png",
	"./imgg/tile_2.png",
	"./imgg/tile_3.png",
	"./imgg/tile_4.png",
	"./imgg/tile_5.png",
	"./imgg/tile_6.png",
	"./imgg/tile_7.png",
	"./imgg/tile_8.png",
	"./imgg/tile_9.png",
	"./imgg/tile_10.png",
	"./imgg/tile_11.png",
	"./imgg/tile_12.png",
	"./imgg/tile_13.png",
	"./imgg/tile_14.png",
	"./imgg/tile_15.png",

	
	
	
	
    "./imgg/tile_1.png",
	"./img/TilesCityDay.png",
	"./img/TilesCityNight.png",
	"./img/yyy.jpeg",
	"./img/6.png",
	"./img/Game Boy.png",
	"./img//imjhhhh.jpg",
	"./img/destroy_block.png",
	"./img/Tileset_1.png",
	"./img/Tileset_2.png",
	"./img/Tileset_3.png",
	"./img/Tileset_4.png",
	"./img/Tileset_5.png",
	"./img/Tileset_6.png",
	"./img/Tileset_7.png",
	"./img/TilesArray.png",
	"./img/TilesCyclone.png",
	"./img/TilesFinal.png",
	"./img/TilesEarthquake.png",
	"./img/TilesFlood.png",
	"./img/TilesHail.png",
	"./img/TilesLab.png",
	"./img/TilesLightning.png",
	"./img/TilesRockslide.png",
	"./img/TilesVolcano.png",
	"./img/BlockBurstable.png",
	"./img/images.png" 
]

const imgs = [];


function LoadScript(idx = 0, f) {
	 if(idx >= lsScript.length){ 
	 	  if(f) f();
	 	  return;
	 }
	 
	 const script = document.createElement("script");
	       script.src = lsScript[idx];
	       script.onload = ()=>{
	         
	         
	          let pro   = (idx/lsScript.length) * 100;
         	  let atual = lsScript[idx];
         	  boot.Set(pro, atual)
	       	 LoadScript(idx +1, f);
	       }
	       script.onerror = ()=>{
	       	  console.log(`erro ao carregar o script ${lsScript[idx]}`)
	         	LoadScript(idx +1, f);
	       }
	       
	       document.body.appendChild(script);
	       
}
function LoadImg(idx = 0, f){
	 if(idx >= lsImgs.length){
	 	if(f) f(idx);
	 	
	 	
	 	return;
	 }
	 
	 const img = new Image();
         img.src = lsImgs[idx];
         img.onload = ()=>{
         	  imgs.push(img)
         	  
         	  document.querySelector(".boxImg").appendChild(img)
         	  
         	 
         	  let pro   = (idx/lsImgs.length) * 100;
         	  let atual = lsImgs[idx];
         	  boot.Set(pro, atual)
         	  LoadImg(idx +1 , f);
         	  
         	  
         	  return;
         }
	       img.onerror = ()=>{
	         console.log(`erro ao carregar imagen ${lsImgs[idx]}`)
	       	 LoadImg(idx +1, f);
	       }
	       
}



LoadImg(0, (idx)=>{
	   console.log(`${idx} imagens carregadas`)
	   //boot.full()
	   LoadScript(0, (id)=>{
	   	 boot.full()
	   })
});








