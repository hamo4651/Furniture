<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewOrderNotification extends Notification
{
    public $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function via($notifiable)
    {
        return ['database']; // استخدام قاعدة البيانات لتخزين الإشعار
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => "New order has been placed by {$this->order->user->name}.",
            'order_id' => $this->order->id,
        ];
    }
}