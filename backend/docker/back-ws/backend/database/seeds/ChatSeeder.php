<?php

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countOfMessages = (App::environment() == 'testing')
            ? 10
            : $this->command->ask('How many messages are you want to generate?', 10);
        $users = \Domain\Pusher\Models\User::all()->toArray();
        $faker = Faker\Factory::create('ru_RU');
        $messages = [];
//        for ($j = 0; $j <= $countOfMessages; $j++) {
//            $messages[] = $faker->realText(70);
//        }
        // $pairs = array_chunk($users, 2);
        $this->createChats($users, $messages);
    }

    /**
     * @param $pairs
     * @param $messages
     */
    private function createChats($users, $messages)
    {
        $faker = Faker\Factory::create('ru_RU');
        $chat = \Domain\Pusher\Models\Chat::create(['user_id' => $users[0]['id'], 'name' => $faker->name]);
        foreach ($users as $user) {
            $chat->attendees()->attach($user['id']);
        }

//        $chats = \Domain\Pusher\Models\Chat::all();
//        foreach ($chats as $chat) {
//            foreach ($messages as $message) {
//                /** @var \Domain\Pusher\Models\ChatMessage $created */
//                \Domain\Pusher\Models\ChatMessage::create(
//                    ['body' => $message, 'chat_id' => $chat->id, 'user_id' => $faker->randomElement($chat->attendees)->id]
//                );
//            }
//        }
    }
}
