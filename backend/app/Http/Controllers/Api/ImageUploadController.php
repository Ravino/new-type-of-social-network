<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ImageUpload;
use App\Http\Requests\ImageUpload\StoreImage;
use Storage;

class ImageUploadController extends Controller
{

    /**
     * @var ImageUpload
     */
    private $imageUpload;

    /**
     * ImageUploadController constructor.
     * @param ImageUpload $imageUpload
     */
    public function __construct(ImageUpload $imageUpload)
    {
        $this->imageUpload = $imageUpload;
    }


    /**
     * @param StoreImage $request
     * @param $tag
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(StoreImage $request)
    {
        $path = Storage::disk('s3')->put('images/originals', $request->image, 'public');
        $request->merge([
            'size' => $request->image->getSize(),
            'original_name' => $request->image->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $request->image->getClientMimeType()
        ]);
        $image_upload = $this->imageUpload->create($request->only('original_name', 'path', 'title', 'size', 'tag', 'mime_type'));
        return response()->json(['data' => [
            'path' => $image_upload->url
        ]]);
    }
}
