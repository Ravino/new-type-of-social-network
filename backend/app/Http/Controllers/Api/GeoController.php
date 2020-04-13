<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Geo\CitiesCollection;
use Illuminate\Http\Request;

class GeoController extends Controller
{

    /**
     * @param Request $request
     * @return CitiesCollection|\Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $search = $request->get('search', '');
        if (!empty($search)) {
            $result = \DB::table('geo_cities')
                ->where('title_ru', 'LIKE', "%{$search}%")
                ->where('title_ua', 'LIKE', "%{$search}%")
                ->where('title_en', 'LIKE', "%{$search}%")
                ->limit(10)
                ->orderBy('title_ru')
                ->get();
            if (count($result)) {
                return new CitiesCollection($result);
            }
        }
        return response()->json(['message' => 'No found'], 200);
    }
}
