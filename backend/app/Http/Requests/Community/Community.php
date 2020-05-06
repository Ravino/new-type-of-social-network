<?php


namespace App\Http\Requests\Community;


use App\Http\Requests\Request;

class Community extends Request
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
            'name' => 'required|string|max:255|unique:App\Models\Community,name',
            'description' => 'required|string',
            'notice' => 'string|max:255',
            'url' => 'string|max:255|unique:App\Models\Community,url',
            'website' => 'url|nullable',
            'location' => 'string|max:255',
        ];
    }
}
