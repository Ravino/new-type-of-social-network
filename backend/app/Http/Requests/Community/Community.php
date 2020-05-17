<?php


namespace App\Http\Requests\Community;


use App\Http\Requests\Request;
use App\Models\Community as CommunityModel;
use App\Models\CommunityTheme;
use Illuminate\Validation\Rule;

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
            'name' => 'string|min:2|max:255|unique:App\Models\Community,name',
            'description' => 'string',
            'notice' => 'string|max:255',
            'url' => 'string|max:255|unique:App\Models\Community,url',
            'website' => 'url|nullable',
            'location' => 'exists:geo_cities,id',
            'privacy' => [
                Rule::in(array_keys(CommunityModel::getPrivacyList())),
            ],
            'type' => [
                Rule::in(array_keys(CommunityModel::getTypeList())),
            ],
            'themeId' => [
                Rule::in(CommunityTheme::getAllChildren()->pluck('id')->toArray()),
            ],
        ];
    }
}
