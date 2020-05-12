<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Community\Community as CommunityRequest;
use App\Http\Requests\Community\CreateCommunity;
use App\Http\Requests\Community\UploadFileRequest;
use App\Http\Resources\Community\CommunityCollection;
use App\Http\Resources\Community\Community as CommunityResource;
use App\Http\Resources\Community\CommunityUserCollection;
use App\Models\Community;
use App\Models\CommunityAttachment;
use App\Models\CommunityHeader;
use App\Models\CommunityTheme;
use App\Services\CommunityService;
use App\Services\S3UploadService;
use Exception;
use Illuminate\Http\Request;
use App\Http\Resources\Post\AttachmentsCollection;

class CommunityController extends Controller
{

    /**
     * @var Community
     */
    public $community;

    /**
     * @var CommunityService
     */
    public $communityService;

    /**
     * @var S3UploadService
     */
    public $uploadService;

    /**
     * CommunityController constructor.
     * @param Community $community
     * @param CommunityService $communityService
     * @param S3UploadService $uploadService
     */
    public function __construct(Community $community, CommunityService $communityService, S3UploadService $uploadService)
    {
        $this->community = $community;
        $this->communityService = $communityService;
        $this->uploadService = $uploadService;
    }

    /**
     * @return CommunityCollection
     */
    public function index() {
        /**
         * TODO: Нужно будет что-то придумать с оптимизацией (дернормализовать таблицы или.... пока не ясно)
         */
        $communities = Community::with('role', 'members', 'attachment')->get();
        $communities->each(function($community) {
            $community->load('onlyFiveMembers');
        });
        return new CommunityCollection($communities);
    }

    /**
     * @param int $id
     * @return CommunityResource|\Illuminate\Http\JsonResponse
     */
    public function get(int $id) {
        $community = Community::with(['users' => function($u) {
            $u->limit(5);
        }, 'users.profile', 'members'])->find($id);
        if($community) {
            return new CommunityResource($community);
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return CommunityUserCollection|\Illuminate\Http\JsonResponse
     */
    public function members(Request $request, int $id) {
        $role = $request->query('role');
        $community = Community::with(['users' => function($query) use ($role) {
            if($role) {
                $query->wherePivot('role', $role);
            }
        }])->find($id);
        if($community) {
            return new CommunityUserCollection($community->users);
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }

    /**
     * @param CreateCommunity $request
     * @return CommunityResource
     */
    public function store(CreateCommunity $request) {
        return new CommunityResource($this->communityService->createCommunity($request));
    }

    /**
     * @param CommunityRequest $request
     * @param int $id
     * @return CommunityResource|\Illuminate\Http\JsonResponse
     */
    public function update(CommunityRequest $request, int $id) {
        $community = Community::find($id);
        if($community) {
            if($community->authors->contains(auth()->user()->id)) {
                return new CommunityResource($this->communityService->updateCommunity($request, $community));
            }
            return response()->json(['message' => 'Недостаточно прав для редактирования данного сообщества'], 403);
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribe(int $id) {
        $community = Community::find($id);
        if($community) {
            if(!$community->users->contains(auth()->user()->id)) {
                $community->users()->attach(auth()->user()->id, ['role' => Community::ROLE_USER]);
                return response()->json([
                    'data' => [
                        'message' => 'Вы были успешно добавлены в сообщество',
                        'id' => $community->id
                    ]
                ], 200);
            } else {
                return response()->json(['message' => 'Вы уже являетесь участником данного сообщества'], 422);
            }
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function unsubscribe(int $id) {
        $community = Community::find($id);
        if($community) {
            if($community->users->contains(auth()->user()->id)) {
                $community->users()->detach(auth()->user()->id);
                return response()->json([
                    'data' => [
                        'message' => 'Вы успешно отписались из данного сообщества',
                        'id' => $community->id
                    ]
                ], 200);
            } else {
                return response()->json(['message' => 'Вы не являетесь участником данного сообщества'], 422);
            }
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }

    /**
     * @param UploadFileRequest $request
     * @return AttachmentsCollection
     * @throws Exception
     */
    public function uploadAvatar(UploadFileRequest $request) {
        $uploaded = $this->uploadService->singleUpload('community/attachments', $request->file('file'), 'public', [
            'normal' => [
                'size' => 600,
            ],
            'medium' => [
                'size' => 250,
            ],
            'thumb' => [
                'size' => [80, 80],
            ],
        ]);

        $community_id = request()->input('id');
        $uploaded['community_id'] = $community_id;
        $attachment = CommunityAttachment::updateOrCreate(['community_id' => $community_id], $uploaded);
        return new AttachmentsCollection([$attachment]);
    }

    public function uploadHeaderImage(UploadFileRequest $request)
    {
        $uploaded = $this->uploadService->singleUpload('community/headers', $request->file('file'), 'public', [
            'normal' => [
                'size' => 600,
            ],
            'medium' => [
                'size' => 250,
            ],
            'thumb' => [
                'size' => [80, 80],
            ],
        ]);

        $community_id = request()->input('id');
        $uploaded['community_id'] = $community_id;
        $attachment = CommunityHeader::updateOrCreate(['community_id' => $community_id], $uploaded);
        return new AttachmentsCollection([$attachment]);
    }

    public function themeList()
    {
        return response()->json([
            'data' => CommunityTheme::getTree(),
        ]);
    }
}
