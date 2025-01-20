class TreinosController < ApplicationController
    before_action :set_treino, only: [:update, :destroy]

  def index
    @treinos = Treino.all
    render json: @treinos
  end

  def create
    dias_semana = params[:treino][:dias_semana]
    tipo_treino = params[:treino][:tipo_treino]
  
    if dias_semana.blank? || tipo_treino.blank?
      render json: { error: 'Dias da semana e tipo de treino são obrigatórios.' }, status: :unprocessable_entity
      return
    end
  
    begin
      # Cria um registro para cada dia selecionado
      dias_semana.each do |dia|
        Treino.create!(dia_semana: dia, tipo_treino: tipo_treino)
      end
  
      render json: { message: 'Treinos salvos com sucesso!' }, status: :created
    rescue => e
      render json: { error: "Erro ao salvar treinos: #{e.message}" }, status: :internal_server_error
    end
  end

  def update
    if @treino.update(treino_params)
      render json: @treino
    else
      render json: @treino.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @treino.destroy
    head :no_content
  end

  private

  def set_treino
    @treino = Treino.find(params[:id])
  end

  def treino_params
    params.require(:treino).permit(dias_semana: [], tipo_treino: [])
  end

end
