<?php


namespace App\Http\Requests\Profile;


use App\Http\Requests\Request;
use Illuminate\Validation\Rule;
use App\Models\Profile as ProfileModel;

class Profile extends Request
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
            'firstName' => 'sometimes|required|string|min:1|max:255',
            'lastName' => 'sometimes|required|string|min:1|max:255',
            'birthday' => 'date_format:Y-m-d|nullable|before:today',
            'sex' => Rule::in(array_keys(ProfileModel::SEX_VARIANTS)),
            'geoCityId' => 'exists:geo_cities,id',
            'relationshipId' => Rule::exists('profile_relationships', 'id') . '|nullable',
            'relationshipUserId' => 'nullable',
        ];
    }
}
