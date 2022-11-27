<?php

namespace Modules\Roles\database\seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class RolesDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Model::unguard();

        $this->call(RolesTableSeeder::class);
    }
}
