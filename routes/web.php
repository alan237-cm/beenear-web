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
Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');

Route::get('/blog/{id}', function ($id) {
    return Inertia::render('BlogArticle', [
        'id' => (int) $id,
    ]);
})->whereNumber('id');

Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');


Route::get('/blog/{slug}', function (string $slug) {

    return Inertia::render('Blog/Show', [
        'slug' => $slug,
    ]);

})->whereIn('slug', [
    'inteligencia-artificial-atencion-cliente',
    'atencion-cliente-crecimiento',
    'automatiza-procesos',
    'cada-contacto-oportunidad',
    'menos-tareas-repetitivas',
    'futuro-conversaciones-empresas-clientes',
])->name('blog.show');