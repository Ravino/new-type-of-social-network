<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Pusher\Http\Requests\SendMessageRequest;
use Domain\Pusher\Repositories\ChatRepository;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * @var ChatRepository
     */
    protected $repository;

    /**
     * ChatController constructor.
     * @param ChatRepository $repository
     */
    public function __construct(ChatRepository $repository)
    {
        $this->repository = $repository;
        parent::__construct();
    }


    /**
     * Возвращает список диалогов
     * @return \Illuminate\Http\JsonResponse
     */
    public function dialogs()
    {
        $dialogs = $this->repository->getAllChatsByUserId(1);
        return response()->json($dialogs);
    }

    /**
     * @param int $chat_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages(int $chat_id)
    {
        $messages = $this->repository->getMessagesOfChatById($chat_id, 1);
        return response()->json($messages);
    }

    /**
     * Отправка сообщения пользователю
     * @param SendMessageRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function send(SendMessageRequest $request)
    {
        /**
         * Всё это должно быть вынесено в сервис. Что бы этот код мог быть
         * выполнен откуда угодно. API, HTTP, CLI
         * 1. Найти диалог или создать его
         * 2. Положить в БД сообщение
         * 3. Вернуть ID диалога сообщить об успехе
         * 4. Бросить уведомление об отправке соообщения
         */
        return response()->json(['status' => 'OK', 'data' => $request->all()]);
    }
}
