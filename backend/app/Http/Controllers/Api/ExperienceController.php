<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExperienceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Experience::orderBy('order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'company'     => 'required|string|max:255',
            'role'        => 'required|string|max:255',
            'location'    => 'nullable|string|max:255',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|date',
            'description' => 'nullable|string',
            'order'       => 'integer',
        ]);
        return response()->json(Experience::create($data), 201);
    }

    public function show(Experience $experience): JsonResponse
    {
        return response()->json($experience);
    }

    public function update(Request $request, Experience $experience): JsonResponse
    {
        $data = $request->validate([
            'company'     => 'string|max:255',
            'role'        => 'string|max:255',
            'location'    => 'nullable|string|max:255',
            'start_date'  => 'date',
            'end_date'    => 'nullable|date',
            'description' => 'nullable|string',
            'order'       => 'integer',
        ]);
        $experience->update($data);
        return response()->json($experience);
    }

    public function destroy(Experience $experience): JsonResponse
    {
        $experience->delete();
        return response()->json(null, 204);
    }
}