user_count = 5
message_count = 50

ActiveRecord::Base.connection.execute("TRUNCATE TABLE users RESTART IDENTITY CASCADE")

ApplicationRecord.transaction do
  user_count.times do |n|
    User.find_or_create_by!(email: "test#{n + 1}@example.com") do |user|
      user.password = 'password'
    end
  end

  user_ids = User.ids
  message_list = []
  message_count.times do |n|
    user_id = user_ids.sample
    line_count = rand(1..4)
    content = Faker::Lorem.paragraphs(number: line_count).join("\n")
    message_list << {user_id: user_id, content: content }
  end
  Message.create!(message_list)
end

puts "Data inserted successfully!"
