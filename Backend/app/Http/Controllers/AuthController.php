<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){

        $user =User::create([
            'name'=>"Admin",
            "email"=>"emmy98@gmail",
            "password"=> bcrypt(123)
        ]);
        return $user;
    }

    public function login(Request $request){
        $user = User::where('name', $request['name'])->first();

        if(!$user ||!Hash::check($request['password'], $user->password)){

            return response([
                "message"=>"bad credientails"
            ], 401);
        }

        return  response ($user, 201);
    }
}