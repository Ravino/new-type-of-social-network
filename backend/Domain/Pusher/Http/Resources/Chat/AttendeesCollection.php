<?php

namespace Domain\Pusher\Http\Resources\Chat;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AttendeesCollection extends ResourceCollection
{

    /**
     * @var int
     */
    public $user_id;

    public function __construct($resource, int $user_id)
    {
        $this->user_id = $user_id;
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Support\Collection
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($attendee) {
            return [
                'id' => $attendee->user_id,
                'lastActivity' => $attendee->last_activity_dt,
                'userPic' => $attendee->user_pic,
                'firstName' => $attendee->first_name,
                'lastName' => $attendee->last_name,
                'isOnline' => $this->isOnline($attendee->last_activity_dt),
                'sex' => $attendee->sex,
            ];
        });
    }

    /**
     * @param $last_activity_dt
     * @return bool
     */
    public function isOnline($last_activity_dt) : bool
    {
        // TODO: Need to remove it from here
        $period = config('app.user_activity_margin');
        return $last_activity_dt > strtotime("-$period minutes");
    }
}
