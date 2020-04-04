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


# Install for Windows

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
