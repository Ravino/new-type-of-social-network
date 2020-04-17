<?php

// PackageManager::load('admin-default')
//    ->css('extend', public_path('packages/sleepingowl/default/css/extend.css'));

AdminSection::registerModel(\App\Models\User::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('Users');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('400px'),
            AdminColumn::text('email')->setLabel('Email'),
            AdminColumn::custom('is_admin', function(\Illuminate\Database\Eloquent\Model $model) {
                return (int) $model->is_admin === 1 ? 'Да' : 'Нет';
            })->setLabel('Admin')
        ]);
        $display->paginate(30);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('email', 'Email'),
            AdminFormElement::checkbox('is_admin', 'Admin')
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\User::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof \App\Models\User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Profile\Relationship::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('Relationships');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('400px'),
            AdminColumn::text('title')->setLabel('Title'),
        ]);
        $display->paginate(30);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('title', 'Title')
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\Profile\Relationship::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof \App\Models\User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Geo\Country::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('Countries');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('100px'),
            AdminColumn::text('title_ru')->setLabel('Title RU'),
            AdminColumn::text('title_ua')->setLabel('Title UA'),
            AdminColumn::text('title_en')->setLabel('Title EN'),
        ]);
        $display->paginate(30);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('title_ru', 'Title RU'),
            AdminFormElement::text('title_ua', 'Title UA'),
            AdminFormElement::text('title_en', 'Title EN')
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\Geo\Country::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof \App\Models\User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Geo\Region::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('Regions');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('100px'),
            AdminColumn::text('country.title_ru')->setLabel('Country RU'),
            AdminColumn::text('title_ru')->setLabel('Title RU'),
            AdminColumn::text('title_ua')->setLabel('Title UA'),
            AdminColumn::text('title_en')->setLabel('Title EN'),
        ]);
        $display->paginate(30);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('title_ru', 'Title RU'),
            AdminFormElement::text('title_ua', 'Title UA'),
            AdminFormElement::text('title_en', 'Title EN')
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\Geo\Region::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof \App\Models\User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Geo\City::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('Cities');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('100px'),
            AdminColumn::text('country.title_ru')->setLabel('Country RU'),
            AdminColumn::text('region.title_ru')->setLabel('Region RU'),
            AdminColumn::text('title_ru')->setLabel('Title RU'),
            AdminColumn::text('title_ua')->setLabel('Title UA'),
            AdminColumn::text('title_en')->setLabel('Title EN'),
        ]);
        $display->paginate(30);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('title_ru', 'Title RU'),
            AdminFormElement::text('title_ua', 'Title UA'),
            AdminFormElement::text('title_en', 'Title EN')
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\Geo\City::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof \App\Models\User && $user->isAdmin();
    });

/**
 * RBAC
 */
AdminSection::registerModel(\App\Models\Rbac\Permission::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('RBAC Permitions');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('100px'),
            AdminColumn::text('name')->setLabel('Name'),
            AdminColumn::text('display_name')->setLabel('Display name'),
            AdminColumn::text('description')->setLabel('Description'),
        ]);
        $display->paginate(30);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('name', 'Name'),
            AdminFormElement::text('display_name', 'Display name'),
            AdminFormElement::text('description', 'Description')
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\Rbac\Permission::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof \App\Models\User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Rbac\Role::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('RBAC Role');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('100px'),
            AdminColumn::text('name')->setLabel('Name'),
            AdminColumn::text('display_name')->setLabel('Display name'),
            AdminColumn::text('description')->setLabel('Description'),
            AdminColumn::text('priority')->setLabel('Priority'),
        ]);
        $display->paginate(30);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('name', 'Name'),
            AdminFormElement::text('display_name', 'Display name'),
            AdminFormElement::text('description', 'Description'),
            AdminFormElement::text('priority', 'Priority')
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\Rbac\Role::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof \App\Models\User && $user->isAdmin();
    });
