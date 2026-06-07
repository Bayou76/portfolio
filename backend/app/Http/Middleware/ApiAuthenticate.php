<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiAuthenticate
{
    public function handle(Request $request, Closure $next): mixed
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token manquant'], 401);
        }

        $accessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            \Log::info('Token invalide');
            return response()->json(['message' => 'Token invalide'], 401);
        }

        auth()->setUser($accessToken->tokenable);
        \Log::info('Auth OK, appel next()', ['user' => auth()->id()]);

        $response = $next($request);
        
        \Log::info('Réponse du controller', ['status' => $response->getStatusCode()]);
        
        return $response;
    }
}