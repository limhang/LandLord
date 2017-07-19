<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public $user_info;
    public function __construct(Request $request)
    {
        parent::__construct();
        $token1 = $request->header('token',0);
        $token2 = $request->input('token',0);
        if($token1){
            $token = $token1;
        }else{
            $token = $token2;
        }
        $user = new Users();
        $user_info = $user->getUserInfoByToken($token);
        $this->user_info = $user_info;
    }
}