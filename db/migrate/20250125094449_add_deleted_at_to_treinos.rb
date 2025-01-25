class AddDeletedAtToTreinos < ActiveRecord::Migration[8.0]
  def change
    add_column :treinos, :deleted_at, :datetime
  end
end
