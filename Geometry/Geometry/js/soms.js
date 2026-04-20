



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
function somMoeda() {
  const osc1 = audio.createOscillator();
  const osc2 = audio.createOscillator();
  const gain = audio.createGain();

  const agora = audio.currentTime;
  const duracao = 0.18;

  /*
  =====================
  OSCILADOR PRINCIPAL
  =====================
  */
  osc1.type = "triangle";
  osc1.frequency.setValueAtTime(800, agora);
  osc1.frequency.exponentialRampToValueAtTime(
    1600,
    agora + duracao
  );

  /*
  =====================
  BRILHO EXTRA
  =====================
  */
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(1200, agora);
  osc2.frequency.exponentialRampToValueAtTime(
    2200,
    agora + duracao
  );

  /*
  =====================
  VOLUME
  =====================
  */
  gain.gain.setValueAtTime(0, agora);
  gain.gain.linearRampToValueAtTime(
    0.12,
    agora + 0.02
  );
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    agora + duracao
  );

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audio.destination);

  osc1.start(agora);
  osc2.start(agora);

  osc1.stop(agora + duracao);
  osc2.stop(agora + duracao);
}
function somMoeda1() {
  const osc1 = audio.createOscillator();
  const osc2 = audio.createOscillator();
  const gain = audio.createGain();

  const agora = audio.currentTime;
  const duracao = 0.18;

  // OSCILADOR 1: O corpo do som (Triangle)
  osc1.type = "triangle";
  osc1.frequency.setValueAtTime(800, agora);
  osc1.frequency.exponentialRampToValueAtTime(1600, agora + duracao);

  // OSCILADOR 2: O brilho (Sine)
  // Dica: Começar 0.02s depois cria um efeito de "clique" mais satisfatório
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(1200, agora + 0.02); 
  osc2.frequency.exponentialRampToValueAtTime(2200, agora + duracao);

  /* VOLUME */
  gain.gain.setValueAtTime(0, agora);
  gain.gain.linearRampToValueAtTime(0.12, agora + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, agora + duracao);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audio.destination);

  osc1.start(agora);
  osc2.start(agora + 0.02); // O segredo está aqui!

  osc1.stop(agora + duracao);
  osc2.stop(agora + duracao);
}


function tocarEfeitoRitmo(tempo) {
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = "square"; // Som de "click" eletrônico
  osc.frequency.setValueAtTime(2000, tempo);
  osc.frequency.exponentialRampToValueAtTime(100, tempo + 0.05);
  g.gain.setValueAtTime(0.02, tempo);
  g.gain.linearRampToValueAtTime(0, tempo + 0.05);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(tempo);
  osc.stop(tempo + 0.05);
}




const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 1. A sua base: O som do pulo que você criou
function tocarPulo(tempo, frequenciaBase = 600) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "square"; // "square" dá aquele som de 8-bit clássico
    osc.frequency.setValueAtTime(frequenciaBase, tempo);
    osc.frequency.exponentialRampToValueAtTime(frequenciaBase * 2, tempo + 0.1);
    
    gain.gain.setValueAtTime(0.1, tempo);
    gain.gain.exponentialRampToValueAtTime(0.001, tempo + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(tempo);
    osc.stop(tempo + 0.1);
}

// 2. A Trilha Sonora: Um loop que calcula frequências musicais
/*function startTrilha() {
    let bpm = 130;
    let tempoPorBatida = 60 / bpm;
    let agora = audioCtx.currentTime;

    // Notas de uma escala menor (frequências em Hz)
    const notas = [261.63, 311.13, 349.23, 392.00]; // Dó, Ré#, Fá, Sol

    for (let i = 0; i < 16; i++) {
        let tempoNota = agora + (i * tempoPorBatida);
        
        // Toca uma nota da escala a cada batida
        let freq = notas[i % notas.length];
        
        // Cria um sintetizador rítmico
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        
        osc.type = "sawtooth"; // Som mais "rasgado" tipo EDM
        osc.frequency.setValueAtTime(freq, tempoNota);
        
        g.gain.setValueAtTime(0.05, tempoNota);
        g.gain.exponentialRampToValueAtTime(0.001, tempoNota + 0.2);
        
        osc.connect(g);
        g.connect(audioCtx.destination);
        
        osc.start(tempoNota);
        osc.stop(tempoNota + 0.2);

        // A cada 4 batidas, adiciona o seu "uooop" agudo no fundo
        if (i % 4 === 0) {
            tocarPulo(tempoNota, 800);
        }
    }
}*/
function startTrilha() {
  let bpm = 140;
  let tempoPorBatida = 60 / bpm;
  let agora = audioCtx.currentTime;
  
  // escala mais “Geometry Dash”
  const melodia = [
    392.00, // Sol
    523.25, // Dó
    587.33, // Ré
    698.46, // Fá
    587.33, // Ré
    523.25, // Dó
    392.00, // Sol
    349.23 // Fá
  ];
  
  // baixo pesado
  const baixo = [
    130.81, // Dó grave
    146.83, // Ré
    174.61, // Fá
    196.00 // Sol
  ];
  
  for (let i = 0; i < 32; i++) {
    let t = agora + (i * tempoPorBatida);
    
    /*
    =====================
    MELODIA PRINCIPAL
    =====================
    */
    const oscLead = audioCtx.createOscillator();
    const gainLead = audioCtx.createGain();
    
    oscLead.type = "sawtooth";
    oscLead.frequency.setValueAtTime(
      melodia[i % melodia.length],
      t
    );
    
    gainLead.gain.setValueAtTime(0.03, t);
    gainLead.gain.exponentialRampToValueAtTime(
      0.001,
      t + 0.25
    );
    
    oscLead.connect(gainLead);
    gainLead.connect(audioCtx.destination);
    
    oscLead.start(t);
    oscLead.stop(t + 0.25);
    
    /*
    =====================
    BASS / KICK SYNTH
    =====================
    */
    if (i % 2 === 0) {
      const oscBass = audioCtx.createOscillator();
      const gainBass = audioCtx.createGain();
      
      oscBass.type = "square";
      oscBass.frequency.setValueAtTime(
        baixo[Math.floor(i / 2) % baixo.length],
        t
      );
      
      gainBass.gain.setValueAtTime(0.06, t);
      gainBass.gain.exponentialRampToValueAtTime(
        0.001,
        t + 0.18
      );
      
      oscBass.connect(gainBass);
      gainBass.connect(audioCtx.destination);
      
      oscBass.start(t);
      oscBass.stop(t + 0.18);
    }
    
    /*
    =====================
    SOM AGUDO DE IMPACTO
    =====================
    */
    if (i % 4 === 0) {
      tocarPulo(t, 900);
    }
    
    /*
    =====================
    HI-HAT ELETRÔNICO
    =====================
    */
    if (i % 1 === 0) {
      const oscHat = audioCtx.createOscillator();
      const gainHat = audioCtx.createGain();
      
      oscHat.type = "triangle";
      oscHat.frequency.setValueAtTime(2000, t);
      
      gainHat.gain.setValueAtTime(0.008, t);
      gainHat.gain.exponentialRampToValueAtTime(
        0.001,
        t + 0.05
      );
      
      oscHat.connect(gainHat);
      gainHat.connect(audioCtx.destination);
      
      oscHat.start(t);
      oscHat.stop(t + 0.05);
    }
  }
}




