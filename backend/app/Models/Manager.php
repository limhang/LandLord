<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Manager extends Model
{
    protected $table = 'urlstore';
	public $timestamps = false;
    protected $fillable = ['detail','category','tag','url','userId','key'];

	public function urlquerykd($userId,$keyword)
	{
		$data = $this->where('userId',$userId)
		->where('detail',$keyword)
		->get();
		$res['lists'] = $data;
		return $res;
	}

    //按照category来查找内容
    public function urlquerycategory($userId,$category)
    {
		$data = DB::select('select distinct category from urlstore where userId = ?',[$userId]);
        $res['category'] = $data;
        return $res;
    }

	//按照tag来查找内容
    public function urlquerytag($userId,$tag)
    {
		$data = DB::select('select distinct tag from urlstore where userId = ?',[$userId]);
        $res['tag'] = $data;
        return $res;
    }


    public function urlquery($userId,$page=1,$page_num=5,$detail,$category='',$tag='',$item=0)
    {
		if ($page_num >= 20) {
			$page_num = 20;
		}
		if ($page_num <= 1){
			$page_nume = 1;
		}
		if ($item == 0) {
			$total = $this->where('userId',$userId)->count();
		}else if ($item == 1) {
			$total = $this->where('userId',$userId)->where('category',$category)->count();
		}else if ($item == 2) {
			$total = $this->where('userId',$userId)->where('tag',$tag)->count();
		}else if ($item == 3) {
	        $detail_info = '%'.$detail.'%';
			$total = $this->where('userId',$userId)->where('detail','like',$detail_info)->count();
		}
		$page_total = ceil($total/$page_num);
		if ($page<=1) {
			$page = 1;	
		}
		if ($page>=$page_total) {
			$page = $page_total;	
		}
		$skip = ($page-1)*$page_num;
		if ($item == 0) {
	        $data = $this->where('userId',$userId)
	            ->orderBy('id','asc')
				->skip($skip)
	            ->take($page_num)
	            ->get();
		}else if ($item == 1&& !empty($category)) {
	        $data = $this->where('userId',$userId)
				->where('category',$category)
	            ->orderBy('id','asc')
				->skip($skip)
	            ->take($page_num)
	            ->get();
		}else if ($item == 2 && !empty($tag)) {
	        $data = $this->where('userId',$userId)
				->where('tag',$tag)
	            ->orderBy('id','asc')
				->skip($skip)
	            ->take($page_num)
	            ->get();
		}else if ($item == 3 && !empty($detail)) {
	        $detail_info = '%'.$detail.'%';
			$data = $this->where('userId',$userId)
				->where('detail','like',$detail_info)
	            ->orderBy('id','asc')
				->skip($skip)
	            ->take($page_num)
	            ->get();
		}else {
			$data = '缺少必要参数';	
		}
        $res['lists'] = $data;
		$res['total'] = $total;
		$res['page']  = $page;
        return $res;
    }

    //更新指定数据
    public function urlupdate($data)
    {
        $url = $data['url'];
        $userId = $data['userId'];
        $tag = ($data['tag']) ? $data['tag'] : null;
        $detail = ($data['detail']) ? $data['detail'] : null;
        $category = ($data['category']) ? $data['category'] : null;
		$key = $data['key'];
		$rekey = md5($userId.$url);
        $this->where('key',$key)
        //    ->where('url',$url)
            ->update(['url'=>$url, 'tag'=>$tag, 'detail'=>$detail, 'category'=>$category, 'key'=>$rekey]);
        $res['lists'] = null;
        return $res;
    }

    //删除指定数据
    public function urldelete($data)
    {
        $key = $data['key'];
        $this->where('key',$key)
            ->delete();
        $res['delete'] = null;
        return $res;
    }
}
