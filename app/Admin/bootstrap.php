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
            AdminColumn::text('is_admin')->setLabel('Admin')
        ]);
        $display->paginate(15);
        return $display;
    });
    // Create And Edit
    $model->onCreateAndEdit(function() {
        $form = AdminForm::panel()->addBody(
            AdminFormElement::text('id', 'ID')->required()->unique(),
            AdminFormElement::textarea('email', 'Email')->setRows(2),
            AdminFormElement::checkbox('is_admin', 'Admin')/*->setRows(2)*/
        );
        return $form;
    });
})
    ->addMenuPage(\App\Models\User::class, 0)
    ->setIcon('fa fa-user');

AdminSection::registerModel(\App\Models\Profile\Relationship::class, function (\SleepingOwl\Admin\Model\ModelConfiguration $model) {
    $model->setTitle('Relationships');
    // Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('id')->setLabel('ID')->setWidth('400px'),
            AdminColumn::text('title')->setLabel('Title'),
        ]);
        $display->paginate(15);
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
    ->setIcon('fa fa-user');
