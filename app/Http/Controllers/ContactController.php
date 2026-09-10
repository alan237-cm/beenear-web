<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewContactMessage;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:2000',
        ]);

        // 1. Guardar en PostgreSQL
        ContactMessage::create($validated);

        // 2. Enviar el correo
        Mail::to('moreinfo@beenear.mx')->send(new NewContactMessage($validated));

        // Regresamos a la página anterior con un mensaje de éxito
        return back()->with('success', 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
    }
}
