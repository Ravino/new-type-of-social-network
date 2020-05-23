<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Sessions\SessionCollection;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function index()
    {
        $sessions = \Auth::user()->sessions()
            ->where('is_active', true)
            ->orderByDesc('id')
            ->get();

        return new SessionCollection($sessions);
    }

    public function close(Request $request)
    {
        $user_ip = $request->ip();
        $user_agent = $request->userAgent();
        $sessionsIds = \Auth::user()->sessions()
            ->where('is_active', true)
            ->where(function ($query) use ($user_ip, $user_agent) {
                return $query->where('ip', '!=', $user_ip)
                    ->where('user_agent', '!=', $user_agent);
            })
            ->orWhere(function ($query) use ($user_ip, $user_agent) {
                return $query->where('ip', $user_ip)
                    ->where('user_agent', '!=', $user_agent);
            })
            ->pluck('id');

        $sessions = Session::whereIn('id', $sessionsIds)->get();
        Session::whereIn('id', $sessionsIds)->update([
            'is_active' => false,
        ]);

        \Log::debug(json_encode($sessions));

        $sessions->each(function ($session) {
            \JWTAuth::manager()->invalidate(new \Tymon\JWTAuth\Token($session->token));
        });

        return response()->json([
            'message' => 'Успешно.'
        ]);
    }
}
