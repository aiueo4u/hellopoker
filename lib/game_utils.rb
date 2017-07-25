module GameUtils
  # 最後にアクションを起こしたシート番号の次のシート番号を先頭とした配列を返す。
  def self.sort_seat_nos(seat_nos, last_actioned_seat_no)
    sorted_seat_nos = seat_nos.sort
    last_actioned_seat_no ||= sorted_seat_nos.last

    if sorted_seat_nos.last == last_actioned_seat_no
      next_index = 0
    else
      prev_index = sorted_seat_nos.index(last_actioned_seat_no)
      if prev_index.nil?
        next_seat_no = sorted_seat_nos.find { |seat_no| seat_no > last_actioned_seat_no }
        next_index = sorted_seat_nos.index(next_seat_no) || 0
      else
        next_index = prev_index + 1
      end
    end
    sorted_seat_nos.slice(next_index, sorted_seat_nos.size) + sorted_seat_nos.slice(0, next_index)
  end
end
