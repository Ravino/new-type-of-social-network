<?php

// PackageManager::load('admin-default')
//    ->css('extend', public_path('packages/sleepingowl/default/css/extend.css'));

use App\Models\CommunityTheme;
use App\Models\User;
use SleepingOwl\Admin\Contracts\Display\Extension\FilterInterface;
use SleepingOwl\Admin\Model\ModelConfiguration;

AdminSection::registerModel(User::class, function (ModelConfiguration $model) {
    $model->setTitle('Users');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::datatables()
            ->setFilters([
                AdminDisplayFilter::field('id')->setTitle('ID [:value]'),
                AdminDisplayFilter::field('profile.first_name')->setTitle('Name [:value]'),
                AdminDisplayFilter::field('profile.last_name')->setTitle('Last Name [:value]'),
                AdminDisplayFilter::field('email')->setTitle('Email [:value]'),
            ])
            ->setColumns([
                AdminColumn::link('id')->setLabel('ID')->setWidth('250px'),
                AdminColumn::image('profile.user_pic', 'User Pic')->setImageWidth('50px'),
                AdminColumn::text('profile.first_name')->setLabel('Name'),
                AdminColumn::text('profile.last_name')->setLabel('Last Name'),
                AdminColumn::text('email')->setLabel('Email'),
                AdminColumn::custom('is_admin', function(\Illuminate\Database\Eloquent\Model $model) {
                    return (int) $model->is_admin === 1 ? 'Да' : 'Нет';
                })->setLabel('Admin')
            ]);
        $display->setColumnFilters([
            AdminColumnFilter::text()->setPlaceholder('ID')->setOperator(FilterInterface::CONTAINS),
            null,
            AdminColumnFilter::text()->setPlaceholder('Name')->setOperator(FilterInterface::CONTAINS),
            AdminColumnFilter::text()->setPlaceholder('Last Name')->setOperator(FilterInterface::CONTAINS),
            AdminColumnFilter::text()->setPlaceholder('Email')->setOperator(FilterInterface::CONTAINS),
            null
        ]);
        $display->with('profile');
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
    ->addMenuPage(User::class, 0)
    ->setIcon('fa fa-user')
    ->setAccessLogic(function() {
        $user = auth()->user();
        return $user instanceof User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Profile\Relationship::class, function (ModelConfiguration $model) {
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
        return $user instanceof User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Geo\Country::class, function (ModelConfiguration $model) {
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
        return $user instanceof User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Geo\Region::class, function (ModelConfiguration $model) {
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
        return $user instanceof User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Geo\City::class, function (ModelConfiguration $model) {
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
        return $user instanceof User && $user->isAdmin();
    });

/**
 * RBAC
 */
AdminSection::registerModel(\App\Models\Rbac\Permission::class, function (ModelConfiguration $model) {
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
        return $user instanceof User && $user->isAdmin();
    });

AdminSection::registerModel(\App\Models\Rbac\Role::class, function (ModelConfiguration $model) {
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
        return $user instanceof User && $user->isAdmin();
    });

AdminSection::registerModel(CommunityTheme::class, static function (ModelConfiguration $model) {
    $model->setTitle('Community Themes');
    // Display
    $model->onDisplay(static function () {
        return AdminDisplay::tree()
            ->setValue('name')
            ->setReorderable(false)
            ->setOrderField('name');
    });
    // Create And Edit
    $model->onCreateAndEdit(static function() {
        return AdminForm::card()->addBody(
            AdminFormElement::select('parent_id', 'Parent', CommunityTheme::getParents()->toArray()),
            AdminFormElement::text('name', 'Title')
        );
    });
})
    ->addMenuPage(CommunityTheme::class, 0)
    ->setIcon('fa fa-tree')
    ->setAccessLogic(static function() {
        $user = auth()->user();
        return $user instanceof User && $user->isAdmin();
    });
