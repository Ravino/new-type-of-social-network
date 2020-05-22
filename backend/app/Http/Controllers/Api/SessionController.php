<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Sessions\SessionCollection;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function index()
    {
        $sessions = \Auth::user()->sessions()->where('is_active', true)->get();

        return new SessionCollection($sessions);
    }
}
