<?php


namespace Domain\Pusher\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;

class SendMessageToUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'userId' => 'required',
            'body' => 'required|string',
            'replyOnMessageId' => 'integer',
            'forwardFromChatId' => 'integer',
            'attachments' => 'array'
        ];
    }
}
