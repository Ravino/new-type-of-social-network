<?php

namespace App\Listeners;

use App\Events\Registered;
use Illuminate\Support\Facades\Mail;

class SendEmailVerificationNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param \App\Events\Registered $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $user = $event->user;

        $data = [
            'confirmLink' => route('auth.confirm', $user->token),
            'password' => $event->rawPassword,
            'restoreLink' => route('password.reset.token', $user->token)
        ];

        Mail::send('emails.register', $data, function ($message) use ($user) {
            $message->from(config('mail.from.address', 'info@example.com'), config('mail.from.name', 'PLIZI'));
            $message->subject('PLIZI: Социальная сеть');
            $message->to($user->email);
        });

    }
}
