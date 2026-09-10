FROM php:8.2-cli

# Instalar dependencias del sistema y extensiones PHP
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    curl \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    bcmath \
    intl \
    zip \
    opcache \
    && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Instalar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm --version \
    && node --version

# Carpeta de trabajo
WORKDIR /app

# Copiar proyecto
COPY . .

# Instalar dependencias PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Instalar dependencias de Node
RUN npm ci

# Compilar React/Vite
RUN npm run build
# Crear base de datos SQLite temporal para el proceso de build
RUN touch database/database.sqlite
# Limpiar cachés de Laravel
RUN php artisan optimize:clear

# Crear permisos necesarios
RUN chown -R www-data:www-data storage bootstrap/cache

# Puerto
EXPOSE 10000

# Iniciar Laravel
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]