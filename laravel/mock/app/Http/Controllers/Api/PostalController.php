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

        $cities = ["大阪府", "東京都", "京都府", "愛知県", "島根県"];
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
            $buff = $elem->address_1 . $elem->address_2 . $elem->address_3;
            $total['total'] = $total['total'] + mb_strlen($buff);
        }

        $end = hrtime(true);
        Log::debug('end:' . $end);
        Log::debug('time:' . ($end - $start)/1000000);
        return $total;
    }
}
