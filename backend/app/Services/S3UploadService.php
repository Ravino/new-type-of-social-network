<?php


namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Facades\Image;
use Intervention\Image\Image as InterventionImage;
use Ramsey\Uuid\Uuid;
use Storage;

class S3UploadService
{
    /**
     * @param Model $model
     * @param $path
     * @param $files
     * @param string $visibility
     * @return array
     */
    public function uploadFiles(Model $model, $path, $files, $visibility = 'public')
    {
        $attachment_ids = [];
        foreach ($files['files'] as $file) {
            $imageName = Uuid::uuid4() . '.' . $file->getClientOriginalExtension();
            $original = Storage::disk('s3')->put("$path/originals", $file, $visibility);

            if(@is_array(getimagesize($file))) {
                $original_img = Image::make($file);
                $normal = $this->prepareImage($file, 600);
                $medium = $this->prepareImage($file, 250);
                $thumb = $this->prepareImage($file, 60);
                Storage::disk('s3')->put("$path/normals/$imageName", $normal->stream(), $visibility);
                Storage::disk('s3')->put("$path/mediums/$imageName", $medium->stream(), $visibility);
                Storage::disk('s3')->put("$path/thumbs/$imageName", $thumb->stream(), $visibility);
                $original_width = $original_img->getWidth();
                $original_height = $original_img->getHeight();

                $medium_width = $medium->getWidth();
                $medium_height = $medium->getHeight();

                $normal_width = $normal->getWidth();
                $normal_height = $normal->getHeight();

                $thumb_width = $thumb->getWidth();
                $thumb_height = $thumb->getHeight();
            } else {
                $normal_width = null;
                $normal_height = null;
                $thumb_width = null;
                $thumb_height = null;
                $medium_width = null;
                $medium_height = null;
                $original_width = null;
                $original_height = null;
            }
            $data = [
                'size' => $file->getSize(),
                'original_name' => $file->getClientOriginalName(),
                'path' => $original,
                'image_normal_path' => "$path/normals/$imageName",
                'image_medium_path' => "$path/mediums/$imageName",
                'image_thumb_path' => "$path/thumbs/$imageName",
                'mime_type' => $file->getClientMimeType(),
                'image_normal_width' => $normal_width,
                'image_normal_height' => $normal_height,
                'image_thumb_width' => $thumb_width,
                'image_thumb_height' => $thumb_height,
                'image_medium_width' => $medium_width,
                'image_medium_height' => $medium_height,
                'image_original_width' => $original_width,
                'image_original_height' => $original_height,
            ];
            $attachment = $model::create($data);
            array_push($attachment_ids, $attachment->id);
        }
        return $attachment_ids;
    }

    /**
     * @param $image
     * @param $size
     * @return InterventionImage
     */
    public function prepareImage($image, $size) : InterventionImage {
        $new_image = Image::make($image);
        if($new_image->width() > $new_image->height()) {
            $width = $size;
            $height = null;
        } else if($new_image->width() < $new_image->height()){
            $width = null;
            $height = $size;
        } else {
            $width = $size;
            $height = $size;
        }
        $new_image->resize($width, $height, function ($constraint) {$constraint->aspectRatio();$constraint->upsize();});
        return $new_image;
    }
}
