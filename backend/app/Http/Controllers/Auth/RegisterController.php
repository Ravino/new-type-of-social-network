<?php

namespace App\Http\Controllers\Auth;

use App\Events\RegisteredConfirm;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Events\Registered;
use Illuminate\Validation\Rule;
use Mail;
use Illuminate\Http\Request;
use Auth;
use App\Events\UserCreated;

use JWTAuth;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    private $rawPassword;

    /**
     * Create a new controller instance.
     *
     * @return void
     */


    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = $this->validator($request->all());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $this->create($request->all());
        $user = User::find($user->id);

        event(new Registered($user, $this->rawPassword));
        event(new UserCreated($user));

        return response()->json([
            'message' => 'Please confirm email',
            'email' => $user->email
        ], 201);

    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|string|email|max:255|unique:users',
            'firstName' => 'required|string|min:1|max:255',
            'lastName' => 'required|string|min:1|max:255',
            'birthday' => 'date_format:Y-m-d|nullable',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $this->rawPassword = uniqid();

        $data['token'] = $token = bcrypt($this->rawPassword);

        $user = User::create($data);
        $user->password = $token; // password is not filable
        $user->save();

        $user->profile()->create([
            'email' => $data['email'],
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'birthday' => isset($data['birthday']) ? $data['birthday'] : null,
        ]);

        return $user;
    }


    /**
     * confirm email
     *
     * @param $code
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function confirm($code)
    {

        $user = User::where('token', $code)->first();

        if (!$user) {
            return response()->json(['message' => 'user not found'], 404);

        } elseif ($user->email_verified_at) {

            return response()->json(['message' => 'already confirmed'], 301);
        }

        $user->email_verified_at = Carbon::now();
        $user->save();

        $this->guard()->login($user);

        return redirect($this->redirectTo);

    }
}
