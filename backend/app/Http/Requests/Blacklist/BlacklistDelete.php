<?php

namespace App\Http\Requests\Blacklist;

use Illuminate\Foundation\Http\FormRequest;

class BlacklistDelete extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'userId' => 'required|exists:users_blacklisted,blacklisted_id',
        ];
    }
}
