<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ==========================================
// RUTAS PÚBLICAS (SITIO WEB)
// ==========================================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/nosotros', function () {
    return Inertia::render('About');
});

Route::get('/servicios', function () {
    return Inertia::render('Services');
});

Route::get('/servicios/intake-sales', function () {
    return Inertia::render('IntakeSales');
});

Route::get('/servicios/contact-center', function () {
    return Inertia::render('ContactCenter');
});

Route::get('/contacto', function () {
    return Inertia::render('Contact');
});
Route::post('/contacto', [ContactController::class, 'store'])->name('contact.store');


// ==========================================
// RUTAS PRIVADAS
// ==========================================
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';