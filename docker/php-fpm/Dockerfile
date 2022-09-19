FROM php:8.1.10-fpm

RUN apt-get update
RUN apt-get install -y vim zip unzip git

RUN docker-php-ext-install pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# docker-composeでcontext指定をしているので、プロジェクトルートディレクトリからのパスで指定
COPY ./docker/php-fpm/php.ini /usr/local/etc/php/php.ini