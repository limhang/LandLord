<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';
    protected $hidden = ['password'];
    protected $fillable = ['username','password','token','userId','vip_level'];
    public $timestamps = false;
    public function register($data)
    {
        $this->create();
    }

    /**
     * 根据token来查询用户信息
     * @param $token
     * @return mixed
     */
    public function getUserInfoByToken($token)
    {
        $data = $this->where('token','=',trim($token))
            ->first();
        return $data;
    }
}