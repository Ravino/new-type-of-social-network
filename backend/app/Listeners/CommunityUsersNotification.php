<?php


namespace App\Listeners\Friendships;

use App\Models\User;
use App\Notifications\UserSystemNotifications;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class CommunityUsersNotification implements ShouldQueue
{
    use Queueable;

    const COMMUNITY_POST_CREATED = 'community.post.created';

    /**
     * @param $event
     * @param $community
     * @param $post
     */
    public function handle($event, $data)
    {
        $community = isset($data['community']) && $data['community'] ? $data['community'] : null;
        $post = isset($data['post']) && $data['post'] ? $data['post'] : null;
        $details = $this->preparePayload($event, $community, $post);
        if($details) {
            foreach ($community->users as $user) {
                $user->notify(new UserSystemNotifications($details));
            }
        }
    }

    /**
     * @param $event
     * @param $community
     * @param $post
     * @return array|null
     */
    private function preparePayload($event, $community, $post)
    {
        if($event === self::COMMUNITY_POST_CREATED) {
            return [
                'community' => [
                    'name' => $community->name,
                    'primaryImage' => $community->primary_image,
                    'id' => $community->id,
                    'postId' => $post->id
                ],
                'body' => 'There is new post in community {0, string}',
                'notificationType' => $event,
            ];
        }
        return null;
    }
}
