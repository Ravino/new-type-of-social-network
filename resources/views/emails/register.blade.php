<p>Здравствуйте!</p>

<p>Вы зарегистрировались на портале {{ config('app.firstName', 'Laravel') }}.</p>

<p>Для завершения регистрации Вам нужно подтвердить почту, перейдя по <a href="{{ $confirmLink ?? '#' }}" target="_blank">ссылке</a>, и заполнить профиль.</p>

<p>Bаш пароль: <strong>{{ $password ?? 'error' }}</strong>, сохраните это письмо или сгенерируйте новый пароль по <a href="{{ $restoreLink ?? '#' }}" target="_blank">ссылке</a>

<p>С уважением, команда {{ config('app.firstName', 'Laravel') }}.</p>
