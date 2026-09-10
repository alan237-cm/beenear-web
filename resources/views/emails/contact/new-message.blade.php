<x-mail::message>
# ¡Nuevo Prospecto (Lead) Recibido!

Un usuario ha dejado sus datos en el formulario de la página web de **Bee Near**. 
Aquí tienes la información detallada:

<x-mail::panel>
**Nombre Completo:** {{ $contactData['name'] }}  
**Correo Electrónico:** {{ $contactData['email'] }}  
**Teléfono:** {{ $contactData['phone'] ?? 'No proporcionado' }}  
</x-mail::panel>

**Mensaje o Requerimiento:**
> {{ $contactData['message'] }}

<x-mail::button :url="'mailto:'.$contactData['email']">
Responder al Cliente
</x-mail::button>

Gracias,<br>
Sistema Automático de Bee Near
</x-mail::message>