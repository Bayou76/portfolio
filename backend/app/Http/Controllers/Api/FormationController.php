<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Formation::latest('year_start')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'school'      => 'required|string|max:255',
            'diploma'     => 'required|string|max:255',
            'field'       => 'nullable|string|max:255',
            'year_start'  => 'required|integer|min:1900|max:2100',
            'year_end'    => 'nullable|integer|min:1900|max:2100',
            'description' => 'nullable|string',
        ]);
        return response()->json(Formation::create($data), 201);
    }

    public function show(Formation $formation): JsonResponse
    {
        return response()->json($formation);
    }

    public function update(Request $request, Formation $formation): JsonResponse
    {
        $data = $request->validate([
            'school'      => 'string|max:255',
            'diploma'     => 'string|max:255',
            'field'       => 'nullable|string|max:255',
            'year_start'  => 'integer|min:1900|max:2100',
            'year_end'    => 'nullable|integer|min:1900|max:2100',
            'description' => 'nullable|string',
        ]);
        $formation->update($data);
        return response()->json($formation);
    }

    public function destroy(Formation $formation): JsonResponse
    {
        $formation->delete();
        return response()->json(null, 204);
    }
}