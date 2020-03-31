# install

```
$ composer install
$ php artisan migrate # накатить изменения в стркутуре базы
$ php artisan db:seed # сгенерировать тестового пользователя test@gmail.com/secret
```

проверьте чтобы в .env была переменная JWT_SECRET , если ее нет или пуста

```
$ php artisan jwt:secret

```


## Сокеты

`php artisan ws:serve` - запуск сервера

`php artisan ws:send` - тестовое сообщение


### Пример клиентского кода

```
var conn = new ab.connect('ws://192.168.10.10:8080/pubsub', function(s){
  s.subscribe('onNewData', function(topic, data){
     console.log(data.data);
  })
}, function(code, reason, detail){

}, {maxRetries:10,retryDelay:4000,skipSubprotocolCheck:true});

```
