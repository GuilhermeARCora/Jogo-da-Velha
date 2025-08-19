'use strict';

import { Jogador } from './Jogador.js';
import { JogoDaVelha } from './JogoDaVelha.js';

const quadrados = document.querySelectorAll('.quadrado');
const recomecarBtn = document.querySelector('.btn');

const jogador1 = new Jogador("Valentina", "X");
const jogador2 = new Jogador("Alberto", "O");
const jogo = new JogoDaVelha(jogador1, jogador2);

jogo.quadradoClicado(quadrados);
jogo.recomecar(recomecarBtn, quadrados);
    




