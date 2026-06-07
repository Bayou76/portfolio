FROM webdevops/php-apache:8.3

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-scripts

RUN cp .env.production .env
RUN php artisan key:generate --force
RUN php artisan config:cache
RUN php artisan route:cache

RUN chown -R www-data:www-data storage bootstrap/cache

ENV WEB_DOCUMENT_ROOT=/app/public
ENV PHP_DISPLAY_ERRORS=0

EXPOSE 80
