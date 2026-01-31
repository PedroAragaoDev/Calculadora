function criaCalculadora(){
    return {
        display: document.querySelector('.display'),

        inicia() {
            this.cliqueBotoes();
            this.pressionaEnter();
            this.bloquearEspaco();
            this.display.focus();
        },

        pressionaEnter(){
            this.display.addEventListener('keyup', e => {
                if (e.keyCode === 13) {
                    this.realizaConta();
                }
            });
        },

        bloquearEspaco() {
             this.display.addEventListener('keydown', e => {
                 if (e.key === ' ') {
                  e.preventDefault();
                 }
             });
        },

        calcularExpressao(expressao) {


             if (!/^[0-9+\-*/.()]+$/.test(expressao)) {
             return null;
            }

            try {
                return Function(`return ${expressao}`)();
            } catch {
                return null;
            }
        },

        realizaConta() {
            let conta = this.display.value;

            const resultado = this.calcularExpressao(conta);

            if (resultado === null || isNaN(resultado)) {
                alert('Conta inválida');
                return;
            }

            const resultadoFormatado = Number(resultado.toFixed(2));

            this.display.value = resultadoFormatado

        },


        clearDisplay(){
            this.display.value = ''
        },

        apagaUm(){
            this.display.value = this.display.value.slice(0, -1)
        },

        
        

        cliqueBotoes(){
            document.addEventListener('click', e => {
                const el = e.target;

                if(el.classList.contains('btn-num')){
                    this.btnParaDisplay(el.innerText);
                }

                if(el.classList.contains('btn-clear')){
                    this.clearDisplay()
                }

                if(el.classList.contains('btn-del')){
                    this.apagaUm()
                }

                if(el.classList.contains('btn-eq')){
                    this.realizaConta()
                }
                
            });
        },

        btnParaDisplay(valor) {
            const ultimoChar = this.display.value.slice(-1);
            const operadores = ['+', '-', '*', '/'];

            // Permite **
            if (valor === '*' && ultimoChar === '*') {
                this.display.value += valor;
                return;
            }

            if (operadores.includes(valor) && operadores.includes(ultimoChar)) {
                return;
            }

            if (valor === ',') {
                const ultimoNumero = this.display.value
                    .split(/[+\-*/]/)
                    .pop();

                if (ultimoNumero.includes(',')) return;
            }

            this.display.value += valor;
        }
    }
}
const calculadora = criaCalculadora(); 
calculadora.inicia();
