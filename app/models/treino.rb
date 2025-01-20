class Treino < ApplicationRecord
    validates :dia_semana, presence: true
    validates :tipo_treino, presence: true
end
