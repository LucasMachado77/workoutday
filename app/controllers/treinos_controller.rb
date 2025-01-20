class TreinosController < ApplicationController
  def index
    @treinos = Treino.all.order(created_at: :desc) # Ordena por data de criação (mais recente primeiro)
    @treino = Treino.new
  end

  def create
 

    # Verifica se params[:treino] existe
    if params[:treino].nil?
      flash[:alert] = 'Por favor, selecione pelo menos um dia e um treino.'
      redirect_to treinos_path
      return
    end

    # Obtém os dias e treinos selecionados
    dias_semana = params[:treino][:dias_semana] || []
    tipos_treino = params[:treino][:tipos_treino] || []

    # Verifica se pelo menos um dia e um treino foram selecionados
    if dias_semana.empty? || tipos_treino.empty?
      flash[:alert] = 'Por favor, selecione pelo menos um dia e um treino.'
      redirect_to treinos_path
      return
    end

    begin
      dias_semana.each do |dia|
        # Salva todos os treinos selecionados como uma única entrada
        Treino.create!(
          dia_semana: dia,
          tipo_treino: tipos_treino.join(', ') # Junta os treinos em uma única string
        )
      end

      flash[:notice] = 'Treinos salvos com sucesso!'
      redirect_to treinos_path
    rescue => e
      flash[:alert] = "Erro ao salvar treinos: #{e.message}"
      redirect_to treinos_path
    end
  end
end