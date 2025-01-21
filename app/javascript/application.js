document.addEventListener('DOMContentLoaded', () => {
  const treinoForm = document.getElementById('treinoForm');
  const removeLastTreinoButton = document.getElementById('removeLastTreinoButton');

  // Validação do formulário de treino
  if (treinoForm) {
      treinoForm.addEventListener('submit', function(event) {
          const diasSelecionados = Array.from(document.querySelectorAll('input[name="treino[dias_semana][]"]:checked')).map(checkbox => checkbox.value);
          const tiposTreinoSelecionados = Array.from(document.querySelectorAll('input[name="treino[tipos_treino][]"]:checked')).map(checkbox => checkbox.value);

          if (diasSelecionados.length === 0 || tiposTreinoSelecionados.length === 0) {
              alert('Por favor, selecione pelo menos um dia da semana e um tipo de treino.');
              event.preventDefault(); // Impede o envio do formulário
          }
      });
  }

  // Lógica para remover o último treino
  if (removeLastTreinoButton && !removeLastTreinoButton.dataset.listenerAdded) {
    removeLastTreinoButton.dataset.listenerAdded = true;

    removeLastTreinoButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (confirm('Tem certeza que deseja remover o último treino adicionado?')) {
            removeLastTreinoButton.disabled = true;

            fetch(removeLastTreinoButton.dataset.url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
                }
            })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url; // Redireciona para a URL de retorno
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao remover o último treino.');
                })
                .finally(() => {
                    removeLastTreinoButton.disabled = false;
                });
        }
    });
}
});