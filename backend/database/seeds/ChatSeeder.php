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
        $count_of_messages = $this->command->ask('How many messages are you want to generate?', 10);
        $users = User::all();
        $faker = Faker\Factory::create('ru_RU');
        $pairs = [];
        $messages = [];
        for ($j = 0; $j <= $count_of_messages; $j++) {
            $messages[] = $faker->realText(70);
        }
        for ($i = 0; $i <= count($users); $i++) {
            for ($j = $i + 1; $j <= count($users); $j++) {
                if ($j < count($users)) {
                    $pairs[] = [
                        'first_user_id' => $users[$i]->id,
                        'second_user_id' => $users[$j]->id
                    ];
                }
            }
        }
        foreach ($pairs as $pair) {
            $id = $this->createChat($faker->name, $pair['first_user_id'], $pair['second_user_id']);
            $this->createMessagesForChat($id, $pair['first_user_id'], $pair['second_user_id'], $messages);
        }
    }

    /**
     * @param string $name имя чата
     * @param int $user_id автор чата
     * @param int $recipient_id собеседник
     * @return int
     */
    private function createChat(string $name, int $user_id, int $recipient_id): int
    {
        $id = DB::table('chat')->insertGetId(
            ['user_id' => $user_id, 'name' => $name, 'created_at' => time(), 'updated_at' => time()]
        );
        DB::table('chat_party')->insert([
            ['chat_id' => $id, 'user_id' => $user_id, 'created_at' => time()],
            ['chat_id' => $id, 'user_id' => $recipient_id, 'created_at' => time()]
        ]);
        return $id;
    }

    /**
     * @param int $id
     * @param int $user_id
     * @param int $second_user_id
     * @param array $messages
     */
    private function createMessagesForChat(int $id, int $user_id, int $second_user_id, array $messages)
    {
        $faker = Faker\Factory::create('ru_RU');
        foreach ($messages as $message) {
            $message_id = DB::table('chat_messages')->insertGetId(
                ['chat_id' => $id, 'user_id' => rand($user_id, $second_user_id), 'body' => $message, 'created_at' => time(), 'updated_at' => time()]
            );
            DB::table('chat_message_status')->insert([
                ['message_id' => $message_id, 'user_id' => $user_id, 'is_read' => $faker->boolean],
            ]);
        }
    }
}
