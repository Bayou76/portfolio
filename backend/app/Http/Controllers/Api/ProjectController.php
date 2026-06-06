<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Project::orderBy('order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'url'          => 'nullable|url',
            'image'        => 'nullable|string',
            'technologies' => 'nullable|array',
            'featured'     => 'boolean',
            'order'        => 'integer',
        ]);
        return response()->json(Project::create($data), 201);
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $data = $request->validate([
            'title'        => 'string|max:255',
            'description'  => 'string',
            'url'          => 'nullable|url',
            'image'        => 'nullable|string',
            'technologies' => 'nullable|array',
            'featured'     => 'boolean',
            'order'        => 'integer',
        ]);
        $project->update($data);
        return response()->json($project);
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();
        return response()->json(null, 204);
    }
}