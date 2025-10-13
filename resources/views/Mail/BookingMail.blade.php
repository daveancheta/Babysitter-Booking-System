<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

@php
use Carbon\Carbon;
$start = Carbon::parse($bookings->start_date);
$end = Carbon::parse($bookings->end_date);
$duration = $start->diffInDays($end);
@endphp

<body>
    <h1>{{ $bookings->payment_method }}</h1>
    <h1>{{ $duration }}</h1>
</body>

</html>