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

  create_table "game_hand_players", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "game_hand_id"
    t.integer "player_id"
    t.integer "position"
    t.integer "bet_amount_in_state"
    t.integer "total_bet_amount"
    t.integer "state"
  end

  create_table "game_hands", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "table_id"
    t.integer "state", default: 0
    t.integer "current_seat_no"
    t.integer "button_seat_no"
    t.integer "last_aggressive_seat_no"
    t.boolean "bb_used_option"
  end

  create_table "players", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string "nickname"
  end

  create_table "table_players", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer "table_id"
    t.integer "player_id"
    t.integer "stack", default: 0
    t.integer "seat_no"
  end

  create_table "tables", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string "name"
    t.integer "sb_size", null: false, unsigned: true
    t.integer "bb_size", null: false, unsigned: true
  end

end
