<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * Autorización temporal para editar supuestos de la calculadora Bee Near.
 * La contraseña (hash bcrypt) vive exclusivamente en la configuración de Laravel.
 * No cambia los valores institucionales: se trata de una simulación local en React.
 */
class StaffingAdminController extends Controller
{
    private const SESSION_KEY = 'beenear_staffing_admin_until';
    private const DURATION_MINUTES = 30;

    public function status(Request $request): JsonResponse
    {
        return $this->noCache([
            'unlocked' => $this->isUnlocked($request),
        ]);
    }

    public function unlock(Request $request): JsonResponse
    {
        $data = $request->validate([
            'password' => ['required', 'string', 'max:256'],
        ]);

        $passwordHash = config('services.beenear_staffing_admin.password_hash');

        if (!is_string($passwordHash) || $passwordHash === '') {
            return $this->noCache(['message' => 'Administrative access is not configured.'], 503);
        }

        if (!Hash::check($data['password'], $passwordHash)) {
            return $this->noCache(['message' => 'Invalid credentials.'], 401);
        }

        // Rotate the session ID following successful authentication.
        $request->session()->regenerate();
        $request->session()->put(self::SESSION_KEY, now()->addMinutes(self::DURATION_MINUTES)->timestamp);

        return $this->noCache(['unlocked' => true]);
    }

    public function lock(Request $request): JsonResponse
    {
        $request->session()->forget(self::SESSION_KEY);

        return $this->noCache(['unlocked' => false]);
    }

    private function isUnlocked(Request $request): bool
    {
        $until = (int) $request->session()->get(self::SESSION_KEY, 0);

        if ($until <= now()->timestamp) {
            $request->session()->forget(self::SESSION_KEY);
            return false;
        }

        return true;
    }

    private function noCache(array $body, int $status = 200): JsonResponse
    {
        return response()->json($body, $status)
            ->header('Cache-Control', 'no-store, private');
    }
}
