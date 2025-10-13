<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Receipt</title>
</head>
@php
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

$start = Carbon::parse($bookings->start_date);
$end = Carbon::parse($bookings->end_date);
$duration = $start->diffInDays($end);

$booking = DB::table('bookings')
->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
->where('bookings.babysitter_id', $bookings->babysitter_id)
->first();  

$total = $booking->rate * $duration;
@endphp

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif; color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color:#1a1a1a; padding:20px; text-align:center; color:#ffffff;">
                            <h1 style="margin:0; font-size:24px;">Booking Confirmation</h1>
                        </td>
                    </tr>

                    <!-- Intro -->
                    <tr>
                        <td style="padding:20px;">
                            <p style="margin:0 0 10px;">Hi {{ Auth::user()->name }},</p>
                            <p style="margin:0 0 20px;">
                                This is an automated booking confirmation email — please do not reply
                            </p>
                        </td>
                    </tr>

                    <!-- Booking / Info Table -->
                    <tr>
                        <td style="padding:0 20px 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                               
                                <tr>
                                    <td style="padding:8px; font-weight:bold;">Book Date:</td>
                                    <td style="padding:8px; text-align:right;">{{ $bookings->created_at->format('F d,
                                        Y') }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; font-weight:bold;">Booking Period:</td>
                                    <td style="padding:8px; text-align:right;">{{ $start->format('F d, Y') }} – {{
                                        $end->format('F d, Y') }}</td>
                                </tr>
                                 <tr>
                                    <td style="padding:8px; font-weight:bold;">Payment Method:</td>
                                    <td style="padding:8px; text-align:right; text-transform: capitalize;">Per {{ $bookings->payment_method }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; font-weight:bold;">Duration:</td>
                                    <td style="padding:8px; text-align:right;">{{ $duration }}
                                        @if ($duration > 1)
                                        days
                                        @else
                                        day
                                        @endif

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Items / Charges -->
                    <tr>
                        <td style="padding:0 20px 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <tr style="background-color:#f9f9f9;">
                                    <th style="padding:10px; text-align:left; border-bottom:1px solid #ddd;">Babysitter Name
                                    </th>
                                    <th style="padding:10px; text-align:right; border-bottom:1px solid #ddd;">Amount
                                    </th>
                                </tr>

                                 <tr>
                                    <td style="padding:10px; font-weight:bold; border-top:1px solid #ddd;">{{ $booking->name }}</td>
                                    <td
                                        style="padding:10px; text-align:right; font-weight:bold; border-top:1px solid #ddd;">
                                        ₱{{ number_format($booking->rate, 2) }} per hour</td>
                                </tr>

                                <tr>
                                    <td style="padding:10px; font-weight:bold; border-top:1px solid #ddd;">Total</td>
                                    <td
                                        style="padding:10px; text-align:right; font-weight:bold; border-top:1px solid #ddd;">
                                        ₱{{ number_format($total, 2) }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer / Note -->
                    <tr>
                        <td style="padding:20px;">
                            <p style="margin:0;">
                                Thanks again,<br />
                                <strong>SitterLy</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Bottom Bar -->
                    <tr>
                        <td
                            style="background-color:#1a1a1a; padding:15px; text-align:center; color:#ffffff; font-size:12px;">
                            © {{ date('Y') }} SitterLy. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>