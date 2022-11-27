<?php

namespace Modules\Roles\src\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function index()
    {
        return view('roles::index');
    }

    public function create()
    {
        return view('roles::create');
    }

    public function store(Request $request)
    {
        //
    }

    public function show(int $id)
    {
        return view('roles::show');
    }

    public function edit(int $id)
    {
        return view('roles::edit');
    }

    public function update(Request $request, int $id)
    {
        //
    }

    public function destroy(int $id)
    {
        //
    }
}
