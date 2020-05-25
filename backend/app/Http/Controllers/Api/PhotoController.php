<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Photo\PhotoCollection;
use App\Models\Photo;
use App\Models\PhotoAlbum;
use App\Services\S3UploadService;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public $uploadService;

    public function __construct(S3UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

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
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return PhotoCollection
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $photo_ids = $this->uploadService->uploadFiles(new Photo(), 'photoAlbum', $request->allFiles());
        $photos = Photo::whereIn('id', $photo_ids)->get();

        return new PhotoCollection($photos);
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
