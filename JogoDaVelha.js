    const linhasVencedoras = [
        [0,1,2],[3,4,5],[6,7,8],       // linhas
        [0,3,6],[1,4,7],[2,5,8],       // colunas
        [0,4,8],[2,4,6]                // diagonais
    ];

export class JogoDaVelha {

    constructor(jogador1, jogador2) {
        this.jogador1 = jogador1;
        this.jogador2 = jogador2;
        this.turno = 1;               
        this.jogoFinalizado = false;  
    }

    atualizarStatus(texto){
        const status = document.getElementById('status');
        status.textContent = texto;
    }

    lerTabuleiro(quadrados){
        return Array.from(quadrados).map(quad => quad.textContent.trim());
    }

    jogadorVenceu(simbolo, quadrados){
        const valores = this.lerTabuleiro(quadrados);
        const linhaVencedora = linhasVencedoras.find(([a,b,c]) =>
            valores[a] === simbolo && valores[b] === simbolo && valores[c] === simbolo
        ); 
        return linhaVencedora || null;
    }

    tabuleiroCheio(quadrados){
        return this.lerTabuleiro(quadrados).every(quad => quad !== "");
    }

    destacarVitoria(indices, quadrados){
        indices.forEach(i => Array.from(quadrados)[i].classList.add('vencedor'));
    }

    quadradoClicado(quadrados){
        
        quadrados.forEach((quadrado) => {
            quadrado.addEventListener('click', () => {

            if (quadrado.textContent.trim() !== "") return;

            if(this.jogoFinalizado) return this.atualizarStatus('Reinicie o jogo');

            const jogadorDaVez = this.turno === 1 ? this.jogador1 : this.jogador2;
            jogadorDaVez.jogar(quadrado);
            quadrado.classList.add('ocupado');

            const simbolo = quadrado.textContent.trim();
            const linhaVencedora = this.jogadorVenceu(simbolo, quadrados);

            if (linhaVencedora){
                this.destacarVitoria(linhaVencedora, quadrados);
                const nomeVencedor = jogadorDaVez.simbolo === "X" ? this.jogador1.nome : this.jogador2.nome;
                this.atualizarStatus(`Vitória de ${nomeVencedor}`);
                this.jogoFinalizado = true;
                return;
            }

            if (this.tabuleiroCheio(quadrados)){
                this.atualizarStatus('Empate');
                return;
            }

            this.turno = this.turno === 1 ? 2 : 1;
            this.atualizarStatus(this.turno === 1 ? 'Vez do X' : 'Vez do O');
            });
        });
    }

    recomecar(recomecarBtn, quadrados){

        recomecarBtn.addEventListener('click', () => {
            quadrados.forEach(quad => {
                quad.textContent = '';
                quad.classList.remove('ocupado', 'vencedor');
            });
            this.turno = 1;
            this.jogoFinalizado = false;
            this.atualizarStatus('Vez do X');
        });

    }

}
