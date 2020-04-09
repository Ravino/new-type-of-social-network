<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{

    /**
     * Search user api method.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $search = $request->get('search', '');
        if (!empty($search)) {
            $users = \DB::table('users')
                ->select('id', \DB::raw('CONCAT(lastname, " ", firstname) AS fullname'))
                ->join('profiles', 'users.id', '=', 'profiles.user_id')
                ->where('users.email', 'LIKE', '%' . $search . '%')
                ->orWhere('profiles.firstname', 'LIKE', '%' . $search . '%')
                ->orWhere('profiles.lastname', 'LIKE', '%' . $search . '%')
                ->limit(10)
                ->orderBy('profiles.lastname')
                ->get();
            if (count($users)) {
                return response()->json($users, 200);
            }
        }
        return response()->json(['message' => 'No found'], 200);
    }
}
