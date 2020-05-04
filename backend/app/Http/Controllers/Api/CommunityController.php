<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Community\Community as CommunityRequest;
use App\Http\Resources\Community\CommunityCollection;
use App\Http\Resources\Community\Community as CommunityResource;
use App\Http\Resources\Community\CommunityUserCollection;
use App\Http\Resources\User\UserCollection;
use App\Models\Community;
use App\Services\CommunityService;
use Illuminate\Http\Request;

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
     * CommunityController constructor.
     * @param Community $community
     * @param CommunityService $communityService
     */
    public function __construct(Community $community, CommunityService $communityService)
    {
        $this->community = $community;
        $this->communityService = $communityService;
    }

    /**
     * @return CommunityCollection
     */
    public function index() {
        /**
         * TODO: Нужно будет что-то придумать с оптимизацией (дернормализовать таблицы или.... пока не ясно)
         */
        $communities = Community::with('role', 'members')->get();
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
     * @param CommunityRequest $request
     * @return CommunityResource
     */
    public function store(CommunityRequest $request) {
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
}
