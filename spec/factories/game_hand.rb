# active
# active: allin
# active: show hand
# folded
# folded: muck hand
FactoryBot.define do
 factory :game_hand do
   table { create(:table) }

   sb_size { 50 }
   bb_size { 100 }
   ante_size { 0 }
   button_seat_no { 1 }

   board_card1_id { 'Ad' }
   board_card2_id { 'Kh' }
   board_card3_id { '9d' }
   board_card4_id { '4c' }
   board_card5_id { '3s' }
 end
end
