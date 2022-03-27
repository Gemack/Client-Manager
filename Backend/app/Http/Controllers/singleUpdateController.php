<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class singleUpdateController extends Controller
{
    public function index(Request $request, $id)
    {
        $client =Client::find($id);
        $client->update(['Balance'=>$request->Balance]);
        return $client;
    }
}