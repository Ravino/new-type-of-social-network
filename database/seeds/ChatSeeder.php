<?php

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{
    private $user_id;

    private $admin_id;

    private $tester_id;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createUsers();
        $id = $this->createChat('userWithAdmin', $this->user_id, $this->admin_id);
        $this->createMessagesForChat($id, $this->user_id, $this->admin_id, [
            'Привет, как дела?',
            'Спасибо, хорошо. Как сам?',
            'Как работа?'
        ]);

        $id = $this->createChat('testerWithAdmin', $this->tester_id, $this->user_id);
        $this->createMessagesForChat($id, $this->tester_id, $this->user_id, [
            'Привет, у нас всё еще не работает сообщества. Так и должно быть?',
            'Да, так и должно быть.',
            'Хорошо, спасибо.'
        ]);

        $id = $this->createChat('testerWithUser', $this->tester_id, $this->user_id);
        $this->createMessagesForChat($id, $this->tester_id, $this->user_id, [
            'Привет, как тебе приложение?',
            'Хорошо, спасибо.',
            'Как настроение?'
        ]);
    }

    private function createUsers()
    {
        $email = 'user@mail.com';

        $user = User::where('email', $email)->first();

        if(!$user) {

            $user = User::create([
                'email' => $email,
                'password' => bcrypt('secret'),
                'token' => bcrypt('secret'),
                'last_activity_dt' => time(),
                'created_at' => time(),
                'updated_at' => time()
            ]);

            $user->profile()->create(factory(Profile::class)->make()->toArray());
        }

        $this->user_id = $user->id;

        $email = 'admin@mail.com';

        $user = User::where('email', $email)->first();

        if(!$user) {

            $user = User::create([
                'email' => $email,
                'password' => bcrypt('secret'),
                'token' => bcrypt('secret'),
                'last_activity_dt' => time(),
                'created_at' => time(),
                'updated_at' => time()
            ]);

            $user->profile()->create(factory(Profile::class)->make()->toArray());
        }
        $this->admin_id = $user->id;


        $email = 'test@gmail.com';

        $user = User::where('email', $email)->first();

        if(!$user) {

            $user = User::create([
                'email' => $email,
                'password' => bcrypt('secret'),
                'token' => bcrypt('secret'),
                'last_activity_dt' => time(),
                'created_at' => time(),
                'updated_at' => time()
            ]);

            $user->profile()->create(factory(Profile::class)->make()->toArray());

        }

        $this->tester_id = $user->id;
    }

    /**
     * @param string $name имя чата
     * @param int $user_id автор чата
     * @param int $recipient_id собеседник
     * @return int
     */
    private function createChat(string $name, int $user_id, int $recipient_id): int
    {
        $chat = DB::table('chat')
            ->join('chat_party', 'chat.id', '=', 'chat_party.chat_id')
            ->where('chat.name', '=', $name)
            ->get('id')->first();
        if(!$chat){
            $id = DB::table('chat')->insertGetId(
                ['user_id' => $user_id, 'name' => $name, 'created_at' => time(), 'updated_at' => time()]
            );
            DB::table('chat_party')->insert([
                ['chat_id' => $id, 'user_id' => $user_id, 'created_at' => time()],
                ['chat_id' => $id, 'user_id' => $recipient_id, 'created_at' => time()]
            ]);
        }else{
            $id = $chat->id;
        }
        return $id;
    }

    /**
     * @param int $id
     * @param int $user_id
     * @param int $recipient_id собеседник
     * @param array $messages
     */
    private function createMessagesForChat(int $id, int $user_id, int $recipient_id, array  $messages)
    {
        if(count($messages) !== 3){
            throw new InvalidArgumentException("Count messages should be 3");
        }
        $m1 = DB::table('chat_messages')->insertGetId(
            ['chat_id' => $id, 'user_id' => $user_id, 'body' => $messages[0], 'created_at' => time(), 'updated_at' => time()]
        );
        $m2 = DB::table('chat_messages')->insertGetId(
            ['chat_id' => $id, 'user_id' => $recipient_id, 'body' => $messages[1], 'created_at' => time(), 'updated_at' => time()]
        );
        $m3 = DB::table('chat_messages')->insertGetId(
            ['chat_id' => $id, 'user_id' => $user_id, 'body' => $messages[2], 'created_at' => time(), 'updated_at' => time()]
        );
        DB::table('chat_message_status')->insert([
            ['message_id' => $m1, 'user_id' => $recipient_id, 'is_read' => true],
            ['message_id' => $m2, 'user_id' => $user_id, 'is_read' => true],
            ['message_id' => $m3, 'user_id' => $recipient_id, 'is_read' => false]
        ]);
    }
}
