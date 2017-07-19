<?php


namespace App\Http\Controllers\v1_0\Room;

use App\Lib\Gateway;
use App\Http\Controllers\Controller;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class RoomManagerController extends Controller
{
    protected $users;
    public function __construct(Request $request,Users $users)
    {
        parent::__construct($request);
        $this->users = $users;
		Gateway::$registerAddress = '127.0.0.1:1236';
    }

    /**
     * 添加模式
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function roomcreate(Request $request)
    {
		echo "xxxx";
		$userName = $request->input('username','');
		$client_id = $request->input('client_id','');

		$uid = "test";
		Gateway::bindUid($client_id,$uid);
		Gateway::sendToUid($uid,'hello');

    }

}
