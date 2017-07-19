<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Validation\Validator;
class Controller extends BaseController
{
    public $error_info;
    public function __construct()
    {
        $error_info = Config::get('errorInfo');
        $this->error_info = $error_info;
    }

    public function apiResponse($datas,$error_code = 200, $info = '')
    {
        header("Content-type: application/json");
        $error_info = $this->error_info;
        if(empty($info)){
            if(isset($error_info[$error_code])){
                if(!empty($error_info[$error_code])){
                    $info = $error_info[$error_code];
                }else{
                    $info = '未知错误!';
                }
            }
        }else{
            $info = 'success!';
        }
        $res['code']= $error_code;
        $res['info'] = $info;
        $res['datas'] = $datas;
        exit(json_encode($res,JSON_UNESCAPED_UNICODE));
    }

    /**
     * 自动验证错误提示
     * @param Validator $validator
     * @return mixed
     */
    protected function formatValidationErrors(Validator $validator)
    {
        $datas = $validator->errors()->toArray();
        $error_info = $this->error_info;
        $res['code']= 10000;
        $res['info'] = $error_info[10000];
        $res['datas'] = $datas;
        return $res;
    }
}
