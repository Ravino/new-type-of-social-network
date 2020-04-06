<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Services\SocialAccountsService;
use Carbon\Carbon;
use Domain\Pusher\WampServer;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Exception;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use JWTAuth;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
    private $expireDays = 3;

    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->guard = \Auth::guard('api');

        $this->middleware('guest')->except('logout');
    }


    /**
     * Api user login and get the token.
     * @bodyParam email string required The email of the user.
     * @bodyParam password string required The password of the user.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = $this->guard->attempt($credentials,
                ['exp' => Carbon::now()->addDays($this->expireDays)->timestamp]
            )) {
                return response()->json(['message' => 'invalid credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'could not create token'], 500);
        }
        $channel = WampServer::channelForUser($this->guard->user()->id);
        return response()->json(compact('token', 'channel'));
    }

    /**
     * @param Request $request
     * @param $provider
     * @return \Illuminate\Http\JsonResponse|null
     */
    public function socialLogin(Request $request, $provider)
    {
        $providerUser = null;
        try {
            $providerUser = Socialite::driver($provider)->userFromToken($request['token']);
        } catch (Exception $exception) {
            \Log::debug($exception);
        }

        if ($providerUser) {
            $user = (new SocialAccountsService())->findOrCreate($providerUser, $provider);
            try {
                if (!$token = JWTAuth::fromUser($user)) {
                    return response()->json(['message' => 'invalid credentials'], 400);
                }
            } catch (JWTException $e) {
                return response()->json(['message' => 'could not create token'], 500);
            }

            return response()->json(compact('token'));
        }

        return null;
    }

    /**
     * @param $provider
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectToProvider($provider)
    {
        try {
            return Socialite::driver('vkontakte')->stateless()->redirect();
        } catch (Exception $e) {
            \Log::debug($e);
        }
        return 'smth';
    }

    /**
     *
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('github')->user();

        \Log::debug($user);
    }

}
