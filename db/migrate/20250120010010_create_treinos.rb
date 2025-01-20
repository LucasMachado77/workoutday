class CreateTreinos < ActiveRecord::Migration[8.0]
  def change
    create_table :treinos do |t|
      t.string :dia_semana
      t.text :tipo_treino

      t.timestamps
    end
  end
end
