<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

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
            'technologies' => 'nullable|array',
            'featured'     => 'nullable|boolean',
            'order'        => 'nullable|integer',
            'image'        => 'nullable|string',
        ]);

        $project = Project::create($data);
        return response()->json($project, 201);
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $data = $request->validate([
            'title'        => 'nullable|string|max:255',
            'description'  => 'nullable|string',
            'url'          => 'nullable|url',
            'technologies' => 'nullable|array',
            'featured'     => 'nullable|boolean',
            'order'        => 'nullable|integer',
            'image'        => 'nullable|string',
        ]);

        $project->update($data);
        return response()->json($project);
    }

    public function destroy(Project $project): JsonResponse
    {
        if ($project->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $project->image));
        }
        $project->delete();
        return response()->json(null, 204);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate(['image' => 'required|image|max:2048']);
        $path = $request->file('image')->store('projects', 'public');
        return response()->json(['path' => '/storage/' . $path]);
    }
}