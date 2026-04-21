


/******
    x -- y --  quantidade -- espaço 
     
*******/
function addMoeda(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 32;
  let h = 32;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"moeda"));
  }

  return lista;
}
function addSpikes(inicio,altura, quantidade, espacamento) {
  let lista = [];
  let size = 32;
    
  let w = 32;
  let h = 32;
  let espaco = w * espacamento;
  let alt    = h * altura;
  
  
  
  for (let i = 0; i < quantidade; i++) {
    
    let x = inicio + (i * espaco);
    let y = mundo.sprites.chao.y - h - alt;
    
    lista.push(
      new Obstacle(x,y,w,h,"spike")
    );
  }

  return lista;
}
function addSpikesR(inicio,altura, quantidade, espacamento) {
  let lista = [];
  let size = 32;
    
  let w = 32;
  let h = 32;
  let espaco = w * espacamento;
  let alt    = h * altura;
  
  
  
  for (let i = 0; i < quantidade; i++) {
    
    let x = inicio + (i * espaco);
    let y = mundo.sprites.chao.y - h - alt;
    
    lista.push(
      new Obstacle(x,y,w,h,"spikeTop")
    );
  }

  return lista;
}
function addBlocos(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 32;
  let h = 32;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"block"));
  }

  return lista;
}
function addPlataforma(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 100;
  let h = 32;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"platform"));
  }

  return lista;
}
function addColunas(inicio, altura, quantidade, espacamento) {
  let lista = [];
  let w = 32;
  let h = 95;
  
  let espaco = w * espacamento;
  let alt    = h * altura;
  

  for (let i = 0; i < quantidade; i++) {
    
    
    let x= inicio + (i * espaco);
    let y= mundo.sprites.chao.y - h - alt;
    
    
    
    lista.push(new Obstacle(x,y,w,h,"coluna"));
  }

  return lista;
}


/*********Fazes**********************/
function oterro() {
  let init = 600;
  
  return [
    
    /* começo leve */
    ...addMoeda(init, 1, 3, 1.5),
    
    /* spikes simples */
    ...addSpikes(init + 250, 0, 2, 1),
    
    /* respiro */
    ...addMoeda(init + 420, 2, 4, 1),
    
    /* bloco com moeda */
    ...addBlocos(init + 650, 0, 2, 1),
    ...addMoeda(init + 650, 2, 2, 1),
    
    /* sequência de spikes */
    ...addSpikes(init + 900, 0, 3, 1),
    
    /* plataforma alta */
    ...addPlataforma(init + 1200, 3, 1, 1),
    ...addMoeda(init + 1220, 5, 3, 1),
    
    /* coluna + spike */
    ...addColunas(init + 1500, 0, 1, 1),
    ...addSpikes(init + 1580, 0, 2, 1),
    
    /* teto com spike invertido */
    ...addSpikesR(init + 1850, 5, 2, 1),
    
    /* bloco de apoio */
    ...addBlocos(init + 2100, 1, 3, 1),
    
    /* sequência final mais rápida */
    ...addSpikes(init + 2400, 0, 4, 1),
    
    /* recompensa */
    ...addMoeda(init + 2700, 3, 5, 1),
    
    /* final com plataforma */
    ...addPlataforma(init + 3000, 2, 2, 1.2),
    ...addMoeda(init + 3050, 4, 4, 1)
    
  ];
}




function tunel() {
   let init = 500;
   let space = 7;
   return [
     
      // quando e bom o santo desconfia 
       //...addPlataforma(init, 3, 15,1),
       ...addMoeda(init, 3, 5, 7),
       ...addMoeda(init+90, 0, 5, 7),
       ...addSpikes(init+1200, 0, 5, 6),
       
       
       //garganta do sofrimento
       ...addPlataforma(init+2000, 0, 15,1),
       ...addSpikes(init+2000, 1, 8, 6),
       ...addPlataforma(init+2000, 6, 15,1),
       ...addSpikesR(init+2100, 5, 8, 6),
       
       ...addPlataforma(init+4000, 8, 6,1),
       ...addSpikesR(init+4000, 7, 3, space),
       
       ...addPlataforma(init+4000, 2, 6,1),
       ...addSpikes(init+4080, 3, 3, space),
       
       // espinhos sangretos
       ...addBlocos(init+5000, 0, 2, 1),
       ...addBlocos(init+5200, 3, 4, 14),
       ...addBlocos(init+5450, 1, 4, 14),
       ...addSpikes(init+5200, 0, 20, 2),
   ]
}
function gargataColosal() {
    let init = 800;
    
    
    return [
      // garganta do disfacer
      
      ...addMoeda(400, 3, 10, 3),
      ...addPlataforma(init, 9, 10, 1),
      ...addSpikesR(init, 8, 5, 7),
      
      //plataforma da garganta
      //...addPlataforma(init + 400, 3, 5, 1),
      
      ...addPlataforma(init, 0, 10, 1),
      ...addSpikes(init, 1, 5, 7)
    ]
}
function sofrimentoSupremo() {
  let init = 1000;

  return [

    /*
    =========================
    entrada falsa de paz
    =========================
    */
    ...addMoeda(300, 2, 5, 2),
    ...addPlataforma(500, 1, 3, 1.2),

    /*
    =========================
    corredor da ganância
    =========================
    */
    ...addMoeda(900, 3, 6, 1.5),
    ...addBlocos(950, 2, 1,1),
    ...addSpikes(850, 0, 8, 1.1),

    /*
    =========================
    teto da humilhação
    =========================
    */
    ...addPlataforma(1400, 0, 4, 1.2),
    ...addSpikesR(1450, 4, 4, 1.3),
    ...addMoeda(1500, 2, 3, 2),

    /*
    =========================
    coluna da tristeza
    =========================
    */
    ...addColunas(1900, 0, 2, 6),
    ...addSpikes(2000, 0, 4, 1.2),

    /*
    =========================
    pulo obrigatório do capeta
    =========================
    */
    ...addPlataforma(2300, 3, 2, 2),
    ...addSpikes(2550, 0, 5, 1),
    ...addMoeda(2600, 5, 2, 2),

    /*
    =========================
    túnel da desgraça
    =========================
    */
    ...addPlataforma(3200, 0, 6, 1),
    ...addSpikesR(3250, 3, 5, 1.5),
    ...addSpikes(3200, 0, 5, 1.2),

    /*
    =========================
    escada da humilhação
    =========================
    */
    ...addBlocos(4000, 1, 1, 1),
    ...addBlocos(4150, 2, 1, 1),
    ...addBlocos(4300, 3, 1, 1),
    ...addBlocos(4450, 4, 1, 1),
    ...addMoeda(4500, 6, 1, 1),

    /*
    =========================
    tribunal das escolhas ruins
    =========================
    */
    ...addSpikes(5000, 0, 10, 0.9),
    ...addMoeda(5100, 2, 4, 1.5),
    ...addBlocos(5000, 2, 3, 1),

    /*
    =========================
    portal da mentira
    =========================
    */
    ...addColunas(6000, 0, 3, 3),
    ...addSpikesR(5900, 3, 3, 2),

    /*
    =========================
    final que parece fácil
    =========================
    */
    ...addPlataforma(6500, 2, 3, 1.5),
    ...addMoeda(6600, 4, 5, 1.2),

    /*
    =========================
    pegadinha final
    =========================
    */
    ...addSpikes(7200, 0, 14, 0.8),
    ...addSpikesR(7300, 4, 6, 1.2),

    /*
    =========================
    última moeda da soberba
    =========================
    */
    ...addMoeda(7800, 6, 1, 1)

  ];
}





function espinhos_Sangrentos() {
  let fase = [];
  let base = 600; // Um ponto de partida no X para a fase começar

  fase.push(
    // 1. Aquecimento: Alguns blocos para saltar
    ...addBlocos(base, 0, 3, 1), 
    
    // 2. O primeiro perigo: Espinhos entre blocos (altura 0)
    ...addSpikes(base + 150, 0, 2, 1.5),
    
    // 3. Plataformas altas com espinhos embaixo
    ...addPlataforma(base + 400, 2, 2, 1.2),
    ...addSpikes(base + 400, 0, 5, 1), 
    
    // 4. Seção de Colunas: Saltos precisos (altura das colunas varia)
    ...addColunas(base + 800, 0, 1, 0),
    ...addColunas(base + 950, 0.5, 1, 0),
    ...addColunas(base + 1100, 1, 1, 0),
    
    // 5. O corredor de espinhos: Muitos espinhos com pouco espaço
    ...addSpikes(base + 1200, 0, 8, 0.8),
    
    // 6. Final: Uma plataforma de descanso e o último salto
    ...addBlocos(base + 1550, 2, 1, 0),
    ...addSpikes(base + 1550, 0, 1, 0)
  );

  return fase;
}
function tribunalDoCaos() {
  return [
    
    // entrada calma (mentira)
    ...addBlocos(200, 6, 5, 50),
    
    // primeiros espinhos
    ...addSpikes(500, 3, 200),
    
    // bloco seguro + spike traiçoeiro
    ...addBlocos(800, 2, 2, 80),
    ...addSpikes(980, 2, 100),
    
    // escada da humilhação
    ...addBlocos(1300, 1, 1, 50),
    ...addBlocos(1400, 1, 1, 100),
    ...addBlocos(1500, 1, 1, 150),
    ...addPlataforma(1650, 1, 1, 200),
    
    // salto da fé
    ...addSpikes(1900, 4, 90),
    ...addPlataforma(2300, 2, 180, 160),
    
    // tutorial mentiroso
    ...addBlocos(2800, 3, 2, 120),
    ...addSpikes(3100, 3, 100),
    
    // corredor da morte
    ...addSpikes(3500, 8, 80),
    
    // descanso falso
    ...addPlataforma(4300, 2, 220, 100),
    
    // escada do desespero
    ...addBlocos(5000, 1, 1, 60),
    ...addBlocos(5100, 1, 1, 120),
    ...addBlocos(5200, 1, 1, 180),
    ...addBlocos(5300, 1, 1, 240),
    
    // pulo da traição
    ...addSpikes(5700, 5, 90),
    ...addPlataforma(6200, 1, 1, 220),
    
    // fase do capeta
    ...addSpikes(6800, 10, 70),
    ...addBlocos(7600, 3, 2, 150),
    ...addPlataforma(8000, 2, 200, 200),
    
    // portal da tristeza
    ...addSpikes(8700, 12, 60),
    
    // final "parece fácil"
    ...addBlocos(9600, 4, 2, 100),
    ...addSpikes(10000, 4, 110),
    
    // último aviso
    ...addSpikes(10600, 15, 55)
    
  ];
}
function FaseTeste() {
  /******
   x -- y -- quantidade -- espaço
  *******/
  
  return [
    
    // entrada falsa de paz
    ...addPlataforma(300, 1, 3, 1.2),
    ...addMoeda(300, 3, 5, 1.2),
    // primeiros espinhos do destino
    ...addSpikes(500, 0, 4, 1.5),
    
    // plataforma alta + spike embaixo
    ...addPlataforma(800, 3, 2, 1.5),
    ...addMoeda(800, 4, 3, 1.2),
    ...addSpikes(850, 0, 3, 1.2),
    
    // coluna da humilhação
    ...addColunas(1100, 0, 1, 0),
    
    // corredor da maldade
    ...addSpikes(1300, 0, 3, 1.1),
    
    // salto obrigatório
    ...addPlataforma(1700, 2, 2, 2),
    ...addSpikes(1750, 0, 4, 1),
    
    // falsa segurança
    ...addBlocos(2100, 2, 3, 1.5),
    
    // dupla traição
    ...addColunas(2500, 0, 2, 6),
    ...addSpikes(2600, 0, 3, 1.2),
    
    // escada do sofrimento
    ...addBlocos(3000, 1, 1, 1),
    ...addBlocos(3200, 2, 1, 1),
    ...addBlocos(3400, 3, 1, 1),
    
    // plataforma mentirosa
    ...addPlataforma(3600, 4, 1, 1),
    ...addSpikes(3600, 0, 2, 1),
    
    // tribunal oficial do caos
    ...addBlocos(4200, 1, 1, 1),
    ...addBlocos(4400, 2, 1, 1),
    ...addBlocos(4600, 3, 1, 1),
    ...addSpikes(4000, 0, 10, 0.9),
    
    // coluna apertada
    ...addColunas(4600, 0, 3, 3),
    
    // pulo do desespero
    ...addPlataforma(5000, 3, 2, 2.2),
    ...addSpikes(5100, 0, 6, 1),
    
    // final “parece fácil”
    ...addBlocos(5600, 2, 4, 1.3),
    
    // mentira final
    // pulo da salvação 
    ...addSpikes(6000, 0, 12, 0.8)
    
  ];
}
function sofrimento_Sangrento() {
  /******
   x -- y -- quantidade -- espaço
  *******/
  let left = 200;
  
  return [

    // começo inocente (mentira)
    ...addPlataforma(left+250, 1, 2, 1.5),

    // espinhos de boas-vindas
    ...addSpikes(left+450, 0, 5, 1.2),

    // primeira humilhação
    ...addColunas(left+800, 0, 2, 3),

    // salto desconfiado
    ...addPlataforma(left+950, 2, 2, 1.8),
    ...addSpikes(left+1000, 0, 4, 1),

    // corredor do arrependimento
    ...addSpikes(left+1300, 0, 7, 0.95),

    // blocos da falsa esperança
    ...addBlocos(left+1800, 1, 3, 1.4),

    // coluna assassina
    ...addColunas(left+2200, 0, 1, 0),
    ...addSpikes(left+2300, 0, 3, 1.1),

    // escada da vergonha
    ...addBlocos(left+2600, 1, 1, 1),
    ...addBlocos(left+2750, 2, 1, 1),
    ...addBlocos(left+2900, 3, 1, 1),
    ...addBlocos(left+3050, 4, 1, 1),

    // plataforma mentirosa
    ...addPlataforma(left+3400, 4, 2, 1.5),
    ...addSpikes(left+3500, 0, 5, 1),

    // tribunal sangrento
    ...addSpikes(left+3900, 0, 10, 0.85),

    // passagem apertada do capeta
    ...addColunas(left+4600, 0, 3, 2.5),

    // salto impossível (quase)
    ...addPlataforma(left+5100, 3, 2, 2),
    ...addSpikes(left+5200, 0, 6, 1),

    // final falso
    ...addBlocos(left+5700, 2, 4, 1.2),

    // sofrimento real
    ...addSpikes(left+6200, 0, 14, 0.75),

    // última humilhação
    ...addColunas(left+7000, 0, 2, 4),
    ...addSpikes(left+7200, 0, 8, 0.9)

  ];
}

function gargataColosal() {
    let init = 800;
    
    
    return [
      // garganta do disfacer
      
      ...addMoeda(400, 3, 10, 3),
      ...addPlataforma(init, 9, 10, 1),
      ...addSpikesR(init, 8, 5, 7),
      
      //plataforma da garganta
      //...addPlataforma(init + 400, 3, 5, 1),
      
      ...addPlataforma(init, 0, 10, 1),
      ...addSpikes(init, 1, 5, 7)
    ]
}