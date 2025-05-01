<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
                'password' => ['required', 'string', 'min:6'],
            ], [
                'name.required' => 'Nama wajib diisi.',
                'email.required' => 'Email wajib diisi.',
                'email.email' => 'Format email tidak valid.',
                'email.unique' => 'Email sudah digunakan.',
                'password.required' => 'Password wajib diisi.',
                'password.min' => 'Password minimal 6 karakter.',
            ]);
        } catch (ValidationException $e) {
            // Ambil error pertama saja
            $allErrors = $e->errors();
            return response()->json([
                'pesan' => 'Validasi gagal',
                'error' => $allErrors,
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }

    
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = JWTAuth::user();

        $role = $user->role;
        $name = $user->name;  // Ambil nama pengguna
        $email = $user->email;  // Ambil email pengguna

        return response()->json([
            'token' => $token,
            'role' => $role,
            'name' => $name,
            'email' => $email,
            // tambahkan role ke dalam response

        ]);
    }


    public function logout(Request $request)
    {
        try {
            // Invalidate the token (set it as expired)
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json(['message' => 'User logged out successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to log out'], 500);
        }
    }

    
    public function getAllUsers(Request $request)
    {

        // Mendapatkan semua pengguna jika token valid
        $users = User::all();
        return response()->json($users);
    }


}
