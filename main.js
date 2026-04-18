








class Dev {
    constructor(parameter) {
        this.layCard   = document.querySelector(".layCard");
        this.Explorar = document.querySelector("#ExplorarP")

        this.Event();
    }


    Event(){
       //// Explorar Projetos
       this.Explorar.addEventListener("click", ()=>{
          this.layCard.scrollIntoView({
            behavior: "smooth"
          })
       })

       ////  evento click do layCard //////
       this.layCard.addEventListener("click", (e)=>{
          const     nome = e.target.innerText;
          const cls  = e.target.className;
          
       })

    }
}

const novoDev = new Dev();




