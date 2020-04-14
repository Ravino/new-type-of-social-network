<?php

namespace App\Providers;

//use Illuminate\Auth\Events\Registered;
//use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use App\Listeners\Friendships\FriendshipNotification;
use Domain\Pusher\Events\NewMessageEvent;
use Domain\PusherListeners\NewMessageNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        \App\Events\Registered::class => [
            \App\Listeners\SendEmailVerificationNotification::class,
        ],
        NewMessageEvent::class => [
            NewMessageNotification::class
        ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            'SocialiteProviders\Instagram\InstagramExtendSocialite@handle',
            'SocialiteProviders\Twitter\TwitterExtendSocialite@handle',
            'SocialiteProviders\VKontakte\VKontakteExtendSocialite@handle',
        ],
        'friendships.*' => [
            FriendshipNotification::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
