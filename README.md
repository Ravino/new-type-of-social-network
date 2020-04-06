# Начальная установка Laravel

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
const conn = new ab.connect('ws://192.168.10.10:8080/pubsub',
    (s) => {
        s.subscribe('onNewData', (topic, data) => {
        console.log(data.data);
    })},
    (code, reason, detail)=> {},
    {
        maxRetries: 10,
        retryDelay: 4000,
        skipSubprotocolCheck: true
    }
);

```


# Установка для Windows

- Установить VirtualBox
- Установить Vagrant
- Установить git bash https://git-scm.com/downloads
- Открыть git bash и выполнить команду `ssh-keygen.exe`
- Выполнить `vagrant box add laravel/homestead`
- Выполнить `git clone https://github.com/laravel/homestead.git ~/Homestead`
- Выполнить `cd ~/Homestead`
- Выполнить `./init.sh`
- Отредактировать Homestead.yml как в примере ниже. Где E:/Projects/plizi.loc путь к проекту.
```yaml
---
ip: "192.168.10.10"
memory: 2048
cpus: 2
provider: virtualbox

authorize: ~/.ssh/id_rsa.pub

keys:
    - ~/.ssh/id_rsa

folders:
    - map: E:/Projects/plizi.loc
      to: /home/vagrant/plizi.loc

sites:
    - map: plizi.loc
      to: /home/vagrant/plizi.loc/public

databases:
    - plizi

features:
    - mariadb: false
    - ohmyzsh: false
    - webdriver: false
```
- Прописать C:/Windows/System32/drivers/etc/hosts

```
192.168.10.10 plizi.loc
```

- Выполнить `cd ~/Homestead`
- Выполнить `vagrant up`
- Выполнить `vagrant ssh`
- Выполнить `cd plizi.loc`
- Выполнить `sudo apt install php-zmq`
- Выполнить `composer install` 

> Должна быть включена виртуализация в BIOS.

> npm install и npm run dev | build выполнять на хосте, а не внутри виртуальной машины.



# Установка и запуск Vue-приложения для разработки
После импорта репозитория сначала нужно установить все нужные для проекта модули:

**`npm install`** - установка модулей

После установки в консоли запускаем:

**`npm run prod`** - запуск сборки для работы в Laravel'ном окружении

**`npm run hot`** - запуска DEV-сервера, который сам обновляет содержимое в браузере при изменении исходников (открывать по адресу http://localhost:8080/app.html)

_app.html_ - нужен потому, что в той же папки лежит Laravel'ный index.php  и если назвать файл index.html, то **они между собой конфликтуют**!

Если нужно прописать свои пути к локальному API сайта или к API чата, то сохраните app.html как **apl.html**

Также нужно убедиться, что команда `php artisan ws:serve` запускает сервер чата на порту, отлично от 8080.

Для этого проверьте переменную **WEBSOCKET_URI** в Вашем локальном **.env** файле (пример в .env.example).

Также нужно прописать правильный адрес в переменной **wsUrl** в файле **apl.html** (Ваш локальный вариант app.html). 

Сделайте все нужные изменения в apl.html и обращайтесь при работе под DEV-сервером к нему:
 
`npm run hot` 

`http://localhost:8080/apl.html`

# Тесты

Добавить тестовую БД в Homestead.yml и перезапустить vagrant.
```yaml
databases:
    - plizi
    - plizi_test
```
Или добавить патчем
```sql
CREATE DATABASE plizi_test;
```

Запуск тестов
`php artisan test`
