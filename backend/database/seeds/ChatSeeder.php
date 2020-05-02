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
        for ($j = 0; $j <= $countOfMessages; $j++) {
            $messages[] = $faker->realText(70);
        }
        $pairs = array_chunk($users, 2);
        $this->createChats($pairs, $messages);
    }

    /**
     * @param $pairs
     * @param $messages
     */
    private function createChats($pairs, $messages)
    {
        $faker = Faker\Factory::create('ru_RU');
        foreach ($pairs as $pair) {
            if(isset($pair[0]) && isset($pair[1])) {
                /** @var \Domain\Pusher\Models\Chat $chat */
                $chat = \Domain\Pusher\Models\Chat::create(['user_id' => $pair[0]['id'], 'name' => $faker->name]);
                $chat->attendees()->attach($pair[0]['id']);
                $chat->attendees()->attach($pair[1]['id']);
            }
        }

        $chats = \Domain\Pusher\Models\Chat::all();
        foreach ($chats as $chat) {
            foreach ($messages as $message) {
                /** @var \Domain\Pusher\Models\ChatMessage $created */
                $created = \Domain\Pusher\Models\ChatMessage::create(
                    ['body' => $message]
                );
                $created->user()->associate($faker->randomElement($chat->attendees));
                $chat->messages()->save($created);
            }
        }
    }
}
