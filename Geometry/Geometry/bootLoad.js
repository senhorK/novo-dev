








      
const lsScript    = ["./js/drawMundo.js","./js/backgroude.js","./js/drawPlayer.js","./js/soms.js","./js/Objs.js","./js/Fases.js","./main.js"];
const lsImg       = ["./img/bg1.jpg","./mapa.png"];

const IMG         =[];





    function loadJs(idx =0, f){
         if(idx >= lsScript.length && f){
              f(idx);
              return;
         }

         const script = document.createElement("script");
               script.src = lsScript[idx];

               script.onload = ()=>{ loadJs(idx +1, f); return;}
               script.onerror = ()=>{
                console.log(`erro ao carregar script  ${lsScript[idx]}`);
                loadJs(idx +1, f);
                return;
               }

               document.body.appendChild(script);
    }


function loadImg(idx = 0, f){
    if(idx >= lsImg.length && f){ f(idx); return;}

    const img = new Image();
          img.src = lsImg[idx];
          img.onload = ()=>{
            console.log(`image ${lsImg[idx]} carregada`);
            IMG.push(img);
            loadImg(idx +1, f);
            return;
          }
          

          img.onerror =()=>{
            console.log(`erro image >>(${lsImg[idx]} nao carregada !)`);
            loadImg(idx+1, f);
            return;
          }
}


loadImg(0, (idx)=>{
   console.log(`${idx} imagens carregadas .`);
   loadJs(0, (id)=>{
       console.log(`${id} script carregado`);
       
   })
})




