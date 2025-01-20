document.addEventListener('DOMContentLoaded', () => {
    const treinoForm = document.getElementById('treinoForm');
    const treinoInfo = document.getElementById('treinoInfo');
    const treinoInput = document.getElementById('treinoInput');
    const resultado = document.getElementById('resultado');

    treinoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Verifica se pelo menos um dia foi selecionado
        const diasSelecionados = Array.from(document.querySelectorAll('input[name="dia"]:checked')).map(checkbox => checkbox.value);
        
        if (diasSelecionados.length > 0) {
            // Mostra a seção para inserir o treino
            treinoInfo.style.display = 'block';
        } else {
            alert('Por favor, selecione pelo menos um dia da semana.');
        }
    });

    window.salvarTreino = function() {
        const treino = treinoInput.value.trim();
        const diasSelecionados = Array.from(document.querySelectorAll('input[name="dia"]:checked')).map(checkbox => checkbox.value);
        
        if (treino === '') {
            alert('Por favor, insira o tipo de treino.');
            return;
        }
    
        // Envia os dados para o backend
        fetch('/api/v1/treinos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
            },
            body: JSON.stringify({
                treino: {
                    dias_semana: diasSelecionados,
                    tipo_treino: treino
                }
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            // Exibe o resultado
            resultado.innerHTML = `
                <p>Você treinou nos dias: ${diasSelecionados.join(', ')}</p>
                <p>Treino realizado: ${treino}</p>
            `;
            
            // Limpa o formulário
            treinoForm.reset();
            treinoInfo.style.display = 'none';
            treinoInput.value = '';
        })
        .catch(error => {
            console.error('Erro ao salvar treino:', error);
            alert(`Erro ao salvar treino: ${error.error || 'Tente novamente.'}`);
        });
    };
});