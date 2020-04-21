<?php


namespace App\Services;

use Illuminate\Database\Eloquent\Model;
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
            $path = Storage::disk('s3')->put($path, $file, $visibility);
            $data = [
                'size' => $file->getSize(),
                'original_name' => $file->getClientOriginalName(),
                'path' => $path,
                'mime_type' => $file->getClientMimeType()
            ];
            $attachment = $model::create($data);
            array_push($attachment_ids, $attachment->id);
        }
        return $attachment_ids;
    }
}
