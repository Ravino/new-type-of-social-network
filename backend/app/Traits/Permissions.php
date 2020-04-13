<?php


namespace App\Traits;


use App\Models\User;
use App\Models\User\PrivacySettings;

trait Permissions
{

    /**
     *  Check if user can view the list of another user
     *
     * @param User $user
     * @return bool
     */
    public function canShowFriendsListTo(User $user) {
        if($this->privacySettings->view_friends_permissions === PrivacySettings::VIEW_FRIENDS_PERMISSIONS_ALL ||
            $this->privacySettings->view_friends_permissions === PrivacySettings::VIEW_FRIENDS_PERMISSIONS_DEFAULT) {
            return true;
        }
        if($this->privacySettings->view_friends_permissions === PrivacySettings::VIEW_FRIENDS_PERMISSIONS_FRIENDS_ONLY) {
            if($this->isFriendWith($user)) {
                return true;
            }
        }
        if($this->privacySettings->view_friends_permissions === PrivacySettings::VIEW_FRIENDS_PERMISSIONS_FRIENDS) {
            if($this->getFriendsOfFriends()->contains($user) || $this->isFriendWith($user)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if user can view the wall of another user
     *
     * @param User $user
     * @return bool
     */
    public function canShowWallTo(User $user) {
        if($this->privacySettings->view_wall_permissions === PrivacySettings::VIEW_WALL_PERMISSIONS_ALL ||
            $this->privacySettings->view_wall_permissions === PrivacySettings::VIEW_WALL_PERMISSIONS_DEFAULT) {
            return true;
        }
        if($this->privacySettings->view_wall_permissions === PrivacySettings::VIEW_WALL_PERMISSIONS_FRIENDS_ONLY) {
            if($this->isFriendWith($user)) {
                return true;
            }
        }
        return false;
    }

}
