const doc = d => document.querySelector(d);   
const app ={
  doc(e){return document.querySelector(e)},
  criar(e){return document.createElement(e)},
  show        (e){e = typeof e === "string" ? this.doc(e) : e;   e.classList.add("ativo")},
  hide        (e){e = typeof e === "string" ? this.doc(e) : e;   e.classList.remove("ativo")},
  toggle      (e){e = typeof e === "string" ? this.doc(e) : e;   e.classList.toggle("ativo")},
  log         (e){console.log(e)},
  money       (e) {return e.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })},
  moneyInput  (e) {e = typeof e === "string" ? this.doc(e) : e; e.value = this.money(Number(e.value))},
  moneyLive   (e) {
     e = typeof e === "string" ? this.doc(e) : e
  
     e.addEventListener("input", () => {
         let v = e.value.replace(/\D/g, "")
         v = Number(v) / 100
         e.value = this.money(v)
    })
  },
  moneyParse(v){
     if(typeof v === "number") return v

      v = v.replace(/[^\d,]/g,"")   // remove R$ e espaços
      v = v.replace(",",".")        // troca vírgula por ponto
    
      return Number(v)
  },
  blur(e, fn){
    e = typeof e === "string" ? this.doc(e) : e;
    
    e.addEventListener("blur", ()=>{
      fn(e)
    })
  },
  on(a,b,c,d){

    // delegação
    if(typeof d === "function"){
      let parent = this.doc(a)

      parent.addEventListener(b,(ev)=>{
        let el = ev.target.closest(c)
        if(el){d(ev,el)}
      })
    }

    // evento normal
    else{

      let el = this.doc(a)

      el.addEventListener(b,c)

    }

  },
  appendChild(mae, fil){
    mae = typeof mae === "string" ? this.doc(mae) : mae;
    fil = typeof fil === "string" ? this.doc(fil) : fil;

    mae.appendChild(fil)
  },
  

  
  
  ext(nome){
     const ext = nome.split(".").pop().toLowerCase()
     return ext;
  },
  extExite(nome, tipo){
    const ext = nome.split(".").pop().toLowerCase()
    const typ = tipo.split(",")
    
    if (typ.includes(ext)) return true;
    return false;
  },
  
  
  /////css ////
  posX(e,x){
    e = typeof e === "string" ? this.doc(e) : e;
    e.style.left = x + "px"
  },
  posY(e, y) {
    e = typeof e === "string" ? this.doc(e) : e;
    e.style.top = y + "px"
  },
 
 
 
  /////Files ///////
  async salvarFile(path,conteudo){
    await fetch("http://localhost:3000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      path: decodeURIComponent(path.replace(urlFile, "")),
      content: conteudo
    })
  })
  },
  getListPastas(path, callback) {
  fetch(`http://localhost:3000/nav?cmd=${path}`)
    .then(r => r.json())
    .then(d => callback(d))
    .catch(err => {
      console.error("Erro:", err)
    })
},
  getArquivoTxt(url, f){
    fetch(url)
    .then(r => {if(!r.ok) throw new Error("arquivo nao encontrado ❌❌❌❌❌❌❌"); return r.text()})
    .then(d =>{return f(d)})
    .catch(err =>{console.log("❌❌❌❌❌")})
  },
}