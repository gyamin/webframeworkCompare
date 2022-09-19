<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use DateTime;

class PostalController extends Controller
{
    public function index() {
        $start = hrtime(true);
        Log::debug('start:' . $start);

        $cities = ["北海道", "青森県", "岩手県", "秋田県", "宮城県", "山形県", "大阪府", "東京都", "京都府", "愛知県", "島根県"];
        $results = [];
        foreach ($cities as $name) {
            $tmp = DB::table('postal_code')
                ->where('address_1', $name)
                ->get()->toArray();
            $results = array_merge($results, $tmp);
        }
//        sleep(1);

        $total = ['total' => 0];
        foreach ($results as $elem) {
            $total['total'] = $total['total'] + (int)$elem->postal_code;
        }

        $end = hrtime(true);
        Log::debug('end:' . $end);
        Log::debug('time:' . ($end - $start)/1000000);
        return $total;
    }
}
