# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "game_actions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "game_hand_id", null: false, unsigned: true
    t.integer "order_id", null: false, unsigned: true
    t.integer "state", null: false, unsigned: true
    t.integer "player_id", null: false, unsigned: true
    t.integer "action_type", null: false, unsigned: true
    t.integer "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_hand_id"], name: "index_game_actions_on_game_hand_id"
  end

  create_table "game_hand_players", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "game_hand_id", unsigned: true
    t.integer "player_id", unsigned: true
    t.index ["game_hand_id"], name: "index_game_hand_players_on_game_hand_id"
  end

  create_table "game_hands", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "table_id", unsigned: true
    t.integer "button_seat_no", unsigned: true
    t.index ["table_id"], name: "index_game_hands_on_table_id"
  end

  create_table "other_service_accounts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "player_id", null: false, unsigned: true
    t.integer "provider", null: false, unsigned: true
    t.string "uid", null: false
    t.index ["player_id", "provider"], name: "index_other_service_accounts_on_player_id_and_type", unique: true
    t.index ["uid"], name: "index_other_service_accounts_on_uid", unique: true
  end

  create_table "players", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string "nickname", null: false
    t.string "image_url"
  end

  create_table "table_players", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "table_id", null: false, unsigned: true
    t.integer "player_id", null: false, unsigned: true
    t.integer "stack", default: 0, null: false, unsigned: true
    t.integer "seat_no", null: false, unsigned: true
    t.index ["player_id"], name: "index_table_players_on_player_id"
    t.index ["table_id", "player_id"], name: "index_table_players_on_table_id_and_player_id", unique: true
    t.index ["table_id", "seat_no"], name: "index_table_players_on_table_id_and_seat_no", unique: true
  end

  create_table "tables", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string "name", null: false
    t.integer "sb_size", null: false, unsigned: true
    t.integer "bb_size", null: false, unsigned: true
  end

end
