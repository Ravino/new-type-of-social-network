<?php


namespace Domain\Pusher\Models;


class Dialog
{
    public $id;

    public $name;

    public $userPic;

    public $lastMessageText;

    public $lastMessageDT;

    public $isRead = false;

    public $isLastFromMe = false;

    public $isOnline = false;
}
