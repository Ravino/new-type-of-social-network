<?php

namespace App\Http\Resources\Geo;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CitiesCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($city) {
                return [
                    'id' => $city->id,
                    'title' => [
                        'ru' => $city->title_ru,
                        'ua' => $city->title_ua,
                        'en' => $city->title_en,
                    ],
                    'region' => new Region(\App\Models\Geo\City::find($city->id)->region),
                    'country' => new Country(\App\Models\Geo\City::find($city->id)->country),
                ];
            }),
        ];
    }
}
