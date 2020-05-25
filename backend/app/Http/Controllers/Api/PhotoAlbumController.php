<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PhotoAlbum\PhotoAlbumStore;
use App\Models\Community;
use App\Models\PhotoAlbum;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PhotoAlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PhotoAlbumStore $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(PhotoAlbumStore $request)
    {
        PhotoAlbum::create([
            'author_id' => \Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'creatable_id' => $request->communityId ? $request->communityId : \Auth::id(),
            'creatable_type' => $request->communityId ? Community::class : User::class,
        ]);

        return response()->json([
           'message' => 'Фотоальбом успешно создан.',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
