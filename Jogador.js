export class Jogador {
    
    constructor(nome, simbolo) {
        this.nome = nome;       
        this.simbolo = simbolo; 
    };

    jogar(quadrado) {
        quadrado.textContent = this.simbolo;
    };

};
