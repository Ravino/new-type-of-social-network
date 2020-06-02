<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\Image;
use App\Http\Resources\User\ImagesCollection;
use App\Models\ImageUpload;
use App\Http\Requests\ImageUpload\StoreImage;
use App\Models\User;
use App\Services\S3UploadService;
use Exception;

class ImageUploadController extends Controller
{
    /**
     * @var ImageUpload
     */
    private $imageUpload;

    /**
     * @var S3UploadService
     */
    private $uploadService;

    /**
     * ImageUploadController constructor.
     * @param ImageUpload $imageUpload
     * @param S3UploadService $uploadService
     */
    public function __construct(ImageUpload $imageUpload, S3UploadService $uploadService)
    {
        $this->imageUpload = $imageUpload;
        $this->uploadService = $uploadService;
    }

    /**
     * @param StoreImage $request
     * @return Image
     * @throws Exception
     */
    public function upload(StoreImage $request)
    {
        $uploaded = $this->uploadService->singleUpload('images/originals', $request->image, 'public', [
            'normal' => [
                'size' => 600,
            ],
            'medium' => [
                'size' => [211, 211],
            ],
            'thumb' => [
                'size' => [80, 80],
            ],
        ]);
        $creatable = [
            'creatable_id' => \Auth::id(),
            'creatable_type' => User::class,
        ];
        $request->merge($uploaded);
        $request->merge($creatable);

        $image_upload = $this->imageUpload->create($request->only('original_name', 'path', 'title', 'size', 'tag', 'mime_type',
            'image_original_width',
            'image_original_height',
            'image_normal_path',
            'image_normal_width',
            'image_normal_height',
            'image_medium_path',
            'image_medium_width',
            'image_medium_height',
            'image_thumb_path',
            'image_thumb_width',
            'image_thumb_height',
            'creatable_id',
            'creatable_type'));

        return new Image($image_upload);
    }

    public function getUserImages(User $user)
    {
        $isFriend = $user->isFriendWith(auth()->user());

        if ($user->id !== \Auth::id()) {
            if (($user->privacySettings->page_type === 2 && !$isFriend) ||
                $user->privacySettings->page_type === 3) {
                return [
                    'data' => [
                        'list' => []
                    ]
                ];
            }
        }

        $images = $user->images()
            ->orderByDesc('id')
            ->limit(20)
            ->get();

        return new ImagesCollection($images);
    }
}
