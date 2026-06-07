FROM webdevops/php-apache:8.3
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY backend/ .
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader --no-scripts
ENV WEB_DOCUMENT_ROOT=/app/public
ENV PHP_DISPLAY_ERRORS=0
EXPOSE 80
CMD bash -c "mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache && chmod -R 777 storage bootstrap/cache && echo 'APP_NAME=Portfolio' > .env && echo 'APP_ENV=production' >> .env && echo 'APP_KEY=' >> .env && echo 'APP_DEBUG=false' >> .env && echo 'APP_URL=https://backend-production-ccd3.up.railway.app' >> .env && echo 'DB_CONNECTION=mysql' >> .env && echo 'DB_HOST=mysql.railway.internal' >> .env && echo 'DB_PORT=3306' >> .env && echo 'DB_DATABASE=railway' >> .env && echo 'DB_USERNAME=root' >> .env && echo 'DB_PASSWORD=CWpeIyhitpQlFNCDYGPohAOefSaWurVi' >> .env && echo 'CACHE_DRIVER=array' >> .env && echo 'SESSION_DRIVER=array' >> .env && php artisan key:generate --force && php artisan migrate --seed --force && /entrypoint supervisord"
