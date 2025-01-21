document.addEventListener('DOMContentLoaded', () => {
    const treinoForm = document.getElementById('treinoForm');
    const treinoInfo = document.getElementById('treinoInfo');
    const treinoInput = document.getElementById('treinoInput');
    const resultado = document.getElementById('resultado');

    treinoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Verifica se pelo menos um dia foi selecionado
        treinoForm.addEventListener('submit', function(event) {
            const diasSelecionados = Array.from(document.querySelectorAll('input[name="treino[dias_semana][]"]:checked')).map(checkbox => checkbox.value);
    
            if (diasSelecionados.length === 0) {
                alert('Por favor, selecione pelo menos um dia da semana.');
                event.preventDefault(); // Impede o envio do formulário
            }
    });
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


document.addEventListener('DOMContentLoaded', () => {
    const removeLastTreinoButton = document.getElementById('removeLastTreinoButton');
  
    if (removeLastTreinoButton && !removeLastTreinoButton.dataset.listenerAdded) {
      removeLastTreinoButton.dataset.listenerAdded = true; // Marca o botão como "com listener"
  
      removeLastTreinoButton.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do botão
  
        // Confirmação antes de enviar a requisição
        if (confirm('Tem certeza que deseja remover o último treino?')) {
          // Desabilita o botão para evitar múltiplos cliques
          removeLastTreinoButton.disabled = true;
  
          // Envia a requisição DELETE para o backend
          fetch(removeLastTreinoButton.dataset.url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert(data.message); // Exibe a mensagem de sucesso
                removeLastRowFromTable(); // Remove a última linha da tabela
              } else {
                alert(data.message); // Exibe a mensagem de erro
              }
            })
            .catch(error => {
              console.error('Erro:', error);
              alert('Erro ao remover o último treino.');
            })
            .finally(() => {
              // Reabilita o botão após a requisição
              removeLastTreinoButton.disabled = false;
            });
        }
      });
    }
  
    // Função para remover a última linha da tabela
    function removeLastRowFromTable() {
      const table = document.querySelector('table tbody');
      const rows = table.querySelectorAll('tr');
  
      if (rows.length > 0) {
        table.removeChild(rows[0]); // Remove a última linha
      }
    }
  });