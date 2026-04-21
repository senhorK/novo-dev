
const SERVIVOR = 0.5;
const MUTATION_RATE = 0.5;
const SURVIVOR_RATE = 0.1;
const STEP_SIZE = 0.01;





class ReLu
{
    F(x)
    {
        return Math.max(0, x);
    }

    dF(x)
    {
        return x > 0 ? 1 : 0;
    }
}

class Linear
{
    F(x)
    {
        return Math.min(Math.max(0, x),1);
    }

    dF(x)
    {
        return x > 0 ? 1 : 0;
    }
}

class Sigmoid
{
    F(x)
    {
        return 1 / (1 + Math.exp(-x));
    }

    dF(x)
    {
        return this.F(x)*(1-this.F(x));
    }
}

class TransferFunction
{
    F(x)
    {
        if(x<0.33) return -1;
        if(x<0.66) return 0;
        return 1;
    }
}









class Brain{
    constructor()
    {
        this.weightX = (Math.random() * 2 - 1) * 0.15;
        this.weightY = (Math.random() * 2 - 1) * 0.15;
        this.bias = 1;
        this.activation = new Linear();
        this.transfer = new TransferFunction();
    }

    mutate(){

        this.weightX += Math.random() * 2 * STEP_SIZE - STEP_SIZE;
        this.weightY += Math.random() * 2 * STEP_SIZE - STEP_SIZE;
   
    }
    
    
    

    getOutput(player, enemy){
        let deltaX = player.x - enemy.x;
        let deltaY = player.y - enemy.y;
        let out = this.activation.F(deltaX * this.weightX + deltaY * this.weightY + this.bias);
        return this.transfer.F(out);
    }
}














class Geracao
{
  constructor(players)
  {
    this.generation = 1;
    this.SURVIVORS = SURVIVOR_RATE * POPULACAO;
    this.players = players;
  }

  kill(a){
 
    
    this.players.sort(function(a, b) {return b.meters - a.meters});
    
    
    for (let i = 0; i < POPULACAO - this.SURVIVORS; i++)
    {
      this.players.pop();
    }
    
  }


  procreate()
  {
    let baby = new Play();
    let brain = new Brain();
    let father = this.players[Math.floor(Math.random() * this.SURVIVORS)];
    let mother = this.players[Math.floor(Math.random() * this.SURVIVORS)];
    brain.weightX = Math.random() > 0.5 ? father.ia.weightX : mother.ia.weightX;
    brain.weightY = Math.random() > 0.5 ? father.ia.weightY : mother.ia.weightY;
    baby.brain = this.mutate(brain);
    this.players.push(baby);
  }

  mutate(brain)
  {
    if (Math.random() < MUTATION_RATE)
    {
      brain.mutate();
    }
    return brain;
  }

  
  nextGeneration(a = false)
  {
    this.kill(a);
    for (let i = this.SURVIVORS; i < POPULACAO; i++)
    {
      this.procreate();
    }
    this.players.forEach((e) => e.reset());
    this.generation++;
    /*
    * weightX: 0.004861720926817647
      weightY: 0.0039266401669850026*/
  }
}
