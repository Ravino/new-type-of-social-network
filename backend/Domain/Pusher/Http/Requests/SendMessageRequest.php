<?php


namespace Domain\Pusher\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'chatId' => 'required',
            'body' => 'required|string',
            'replyOnMessageId' => 'integer',
            'forwardFromChatId' => 'integer',
            'attachmentIds' => 'array'
        ];
    }
}
