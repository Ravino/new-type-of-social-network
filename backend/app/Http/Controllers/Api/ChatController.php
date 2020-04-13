<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Pusher\Http\Requests\SendMessageRequest;
use Domain\Pusher\Repositories\ChatRepository;
use Domain\Pusher\Repositories\MessageRepository;
use Domain\Pusher\Services\ChatService;
use Auth;
use Illuminate\Http\Request;
use Laravel\Passport\Bridge\UserRepository;

class ChatController extends Controller
{
    /**
     * @var ChatRepository
     */
    protected $repository;

    /**
     * @var MessageRepository
     */
    protected $messageRepository;

    /**
     * @var ChatService
     */
    protected $chatService;

    /**
     * ChatController constructor.
     * @param ChatRepository $repository
     */
    public function __construct(ChatRepository $repository, MessageRepository $messageRepository, ChatService $chatService)
    {
        $this->repository = $repository;
        $this->messageRepository = $messageRepository;
        $this->chatService = $chatService;
        parent::__construct();
    }


    /**
     * Возвращает список диалогов
     * @return \Illuminate\Http\JsonResponse
     */
    public function dialogs()
    {
        $dialogs = $this->repository->getChatsByUserId(Auth::user()->id);
        return response()->json([
            'list' => $dialogs
        ]);
    }

    /**
     * @param int $chat_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages(int $chat_id)
    {
        $messages = $this->messageRepository->getAllOfChatById($chat_id, Auth::user()->id);
        return response()->json([
            'list' => $messages
        ]);
    }

    /**
     * Отправка сообщения пользователю
     * @param SendMessageRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function send(SendMessageRequest $request)
    {
        $this->chatService->send($request->get('body'), $request->get('chat_id'), Auth::user()->id);
        return response()->json(['status' => 'OK']);
    }
}
