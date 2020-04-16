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
            'chat_id' => 'required',
            'body' => 'required|string',
            'replyOnMessageId' => 'integer',
            'forwardFromChatId' => 'integer',
        ];
    }
}
