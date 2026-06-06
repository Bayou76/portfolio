FROM php:8.3-cli

# Dépendances système
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath

# Composer (gestionnaire de paquets PHP, équivalent de npm)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html