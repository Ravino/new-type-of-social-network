

## install

```
$ composer update # или composer install
$ php artisan migrate # накатить изменения в стркутуре базы
$ php artisan db:seed # сгенерировать тестового пользователя test@gmail.com/secret
```

проверьте чтобы в .env была переменная JWT_SECRET ,  если ее нет или пуста

```
$ php artisan jwt:secret

```
