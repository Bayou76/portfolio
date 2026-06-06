<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Skill::orderBy('order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'level'    => 'required|integer|min:1|max:100',
            'order'    => 'integer',
        ]);
        return response()->json(Skill::create($data), 201);
    }

    public function show(Skill $skill): JsonResponse
    {
        return response()->json($skill);
    }

    public function update(Request $request, Skill $skill): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'string|max:255',
            'category' => 'string|max:255',
            'level'    => 'integer|min:1|max:100',
            'order'    => 'integer',
        ]);
        $skill->update($data);
        return response()->json($skill);
    }

    public function destroy(Skill $skill): JsonResponse
    {
        $skill->delete();
        return response()->json(null, 204);
    }
}