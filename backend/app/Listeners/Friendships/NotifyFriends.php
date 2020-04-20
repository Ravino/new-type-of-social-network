<?php


namespace App\Listeners\Friendships;

use App\Models\User;
use App\Notifications\UserSystemNotifications;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyFriends implements ShouldQueue
{
    use Queueable;

    const PROFILE_IMAGE_UPDATE = 'user.profile.image.updated';
    const PROFILE_IMAGE_CREATE = 'user.profile.image.created';

    /**
     * @param $event
     * @param $user_id
     */
    public function handle($event, $user_id)
    {
        $user = User::find($user_id)->first();
        $friends = $user->getFriends();
        $details = $this->preparePayload($event, $user);
        foreach ($friends as $friend) {
            \Log::debug($friend);
            $friend->notify(new UserSystemNotifications($details));
        }
    }

    private function preparePayload($event, $user)
    {
        if($event === self::PROFILE_IMAGE_CREATE || $event === self::PROFILE_IMAGE_UPDATE) {
            return [
                'sender' => [
                    'firstName' => $user->profile->first_name,
                    'lastName' => $user->profile->last_name,
                    'sex' => $user->profile->sex,
                    'userPic' => $user->profile->user_pic,
                    'lastActivity' => $user->last_activity_dt,
                    'id' => $user->id
                ],
                'body' => $event === self::PROFILE_IMAGE_CREATE ? 'User {0, string} uploaded new photo' : 'User {0, string} updated profile photo',
                'notificationType' => $event,
            ];
        }
        return null;
    }
}
