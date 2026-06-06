<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Message::latest()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'subject' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);
        return response()->json(Message::create($data), 201);
    }

    public function show(Message $message): JsonResponse
    {
        $message->update(['read' => true]);
        return response()->json($message);
    }

    public function destroy(Message $message): JsonResponse
    {
        $message->delete();
        return response()->json(null, 204);
    }
}