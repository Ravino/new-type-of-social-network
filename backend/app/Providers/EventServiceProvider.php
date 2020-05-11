<?php

namespace App\Providers;

//use Illuminate\Auth\Events\Registered;
//use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use App\Events\ResetPassword;
use App\Events\UserCreated;
use App\Events\UserUpdated;
use App\Listeners\Friendships\CommunityUsersNotification;
use App\Listeners\Friendships\FriendshipNotification;
use App\Listeners\Friendships\NotifyFriends;
use App\Listeners\PostAuthorsNotification;
use App\Listeners\SendPassword;
use Domain\Neo4j\Listeners\UserRelationsListener;
use Domain\Pusher\Events\DestroyMessageEvent;
use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\Events\UserTypingEvent;
use Domain\Pusher\Listeners\NewNotification;
use Domain\Pusher\Listeners\UserUpdateListener;
use Domain\PusherListeners\DestroyMessageNotification;
use Domain\PusherListeners\NewMessageNotification;
use Domain\PusherListeners\UserTypingNotification;
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
        DestroyMessageEvent::class => [
            DestroyMessageNotification::class
        ],
        UserTypingEvent::class => [
            UserTypingNotification::class
        ],
        UserCreated::class => [
            UserUpdateListener::class,
            \Domain\Neo4j\Listeners\UserUpdateListener::class
        ],
        UserUpdated::class => [
            UserUpdateListener::class
        ],
        'Illuminate\Notifications\Events\NotificationSent' => [
            NewNotification::class
        ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            'SocialiteProviders\Instagram\InstagramExtendSocialite@handle',
            'SocialiteProviders\Twitter\TwitterExtendSocialite@handle',
            'SocialiteProviders\VKontakte\VKontakteExtendSocialite@handle',
        ],
        'friendships.*' => [
            FriendshipNotification::class,
            UserRelationsListener::class
        ],
        'user.*' => [
            NotifyFriends::class
        ],
        'community.*' => [
            CommunityUsersNotification::class
        ],
        'post.*' => [
            PostAuthorsNotification::class
        ],
        ResetPassword::class => [
            SendPassword::class,
        ],
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
