<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use Mail;
use Illuminate\Http\Request;
use Auth;
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
    * Handle a registration request for the application.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
   public function register(Request $request)
   {
       $this->validator($request->all())->validate();

       event(new Registered($user = $this->create($request->all())));

       return $user;
   }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $code = mt_rand(100000, 999999);
        // Mail::send('emails.register', ['code' => $code], function ($message) use($data) {
        //     $message->from('us@example.com', 'Registration Confirmation');
        //     $message->to($data['email']);
        // });
        return User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'confirm_code' => $code
        ]);
    }

    protected function verify(Request $request)
    {   $data = $request->all();

        if($user = User::where('confirm_code', $data['confirm_code'] . 'dfsdf')->first()){
            if($data['password'] === $data['password_confirm']){
                dd($user);
                $loginData = [
                    'email' => $user->email,
                    'password' => $data['password']
                ];
                $data['password'] = Hash::make($data['password']);
                //$data['birthday'] = date('Y-m-d H:i:s', strtotime($data['birthday']));
                unset($data['password_confirm']);
                unset($data['_token']);
                unset($data['birthday']);
                $user->update($data);

                if (Auth::attempt($loginData)) {
                    echo 'SUCCESS!';
                } else {
                    return Redirect::to('login');
                }
            }
        }else{
            return Redirect::back()->with('error', 'Confirmation code is not valid!');
        }

        //$this->guard()->login($user);
    }
}
