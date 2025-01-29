<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Coupons;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Notifications\NewOrderNotification;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        // dd($request->all());
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)->get();
    
        if ($cartItems->isEmpty()) {
            return Inertia::render('front/Cart/Cart', [
                'message' => 'Your cart is empty',
            ]);
        }
    
        // حساب الإجمالي
        $total = $cartItems->sum(function ($cartItem) {
            return $cartItem->price * $cartItem->quantity;
        });
    
        // التحقق من الكوبون
        $coupon = null;
        $discount = 0;
    
        if ($request->filled('coupon_id')) {
            $coupon = Coupons::find($request->coupon_id);
        
            if ($coupon && $coupon->isValid()) {
                $discount = ($total * $coupon->discount_percentage) / 100;
                $total -= $discount;
    
                // تقليل عدد الاستخدامات المتبقية
                $coupon->decrement('max_uses');
            } else {
                return Inertia::render('front/Cart/Cart', [
                    'message' => 'Invalid or expired coupon code',
                ]);
            }
        }
    
        // إنشاء الطلب
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $total,
            'discount' => $discount,
            'coupon_id' => $coupon?->id,
            'status' => 'pending',
        ]);
    
        // ربط المنتجات بالطلب
        foreach ($cartItems as $cartItem) {
            $order->products()->attach($cartItem->product_id, [
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
            ]);
        }
    
        // حذف العناصر من السلة بعد الطلب
        CartItem::where('user_id', $user->id)->delete();
    
        // إشعار المدراء بوجود طلب جديد
        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new NewOrderNotification($order));
        }
    
        // عرض صفحة الطلبات مع رسالة النجاح
        return Inertia::render('front/Orders/MyOrders', [
            'message' => 'Order placed successfully',
            'order' => $order,
            'user' => $user,
        ]);
    }
    
    

    // public function myorders() {
    //     $user = Auth::user();
    
    //     // Paginate the orders for the current user
    //     $orders = Order::with(['user', 'products' => function($query) {
    //         $query->select('products.*', 'order_items.quantity');
    //     }])->where('user_id', $user->id)
    //       ->paginate(10);  // 10 orders per page
    
    //     return Inertia::render('front/Orders/MyOrders', [
    //         'orders' => $orders
    //     ]);
    // }
    
    public function myorders()
    {
        $user = Auth::user();
    
        // Paginate the orders for the current user with product details
        $orders = Order::with(['products' => function ($query) {
            $query->select('products.id', 'products.name', 'order_items.quantity', 'order_items.price')
                  ->withPivot('quantity', 'price');
        }])
        ->where('user_id', $user->id)->orderBy('created_at', 'desc')
        ->paginate(10); // 10 orders per page
    
        // تعديل البيانات يدويًا بعد الاسترجاع
        foreach ($orders as $order) {
            // حساب السعر النهائي بعد الخصم
            $order->final_price = $order->total_price - $order->discount;
            $order->coupon_discount = $order->discount; // خصم الكوبون المطبق
        }
    
        return Inertia::render('front/Orders/MyOrders', [
            'orders' => $orders
        ]);
    }
    
    
    public function cancelorder($id) {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('myorders')->with('status', 'order cancel.');

    }
    public function getOrders()
    {
        // Paginate all orders for admin
        $allOrders = Order::with(['user', 'products' => function ($query) {
            $query->select('products.id', 'products.name', 'order_items.quantity', 'order_items.price')
                  ->withPivot('quantity', 'price');  // Adding pivot data (quantity and price)
        }])->orderBy('created_at', 'desc')
        ->paginate(10);  // 10 orders per page
    
        // تعديل البيانات يدويًا بعد الاسترجاع
        foreach ($allOrders as $order) {
            // حساب السعر النهائي بعد الخصم
            $order->final_price = $order->total_price - $order->discount;
            $order->coupon_discount = $order->discount; // خصم الكوبون المطبق
        }
    
        return Inertia::render('admin/Orders/Orders', [
            'allOrders' => $allOrders,
        ]);
    }
    
    



   

    // public function ViewOrder($id)
    // {
    //     $order = Order::with('user', 'products')->where('id', $id)->get();
        
    //     return Inertia::render('front/Orders/OrderDetails', [
    //         'order' => $order
    //     ]);
    // }

    public function updateOrderStatus(Request $request, $orderId)
    {
        $order = Order::findOrFail($orderId);
        $order->status = $request->input('status');
        $order->save();

        return redirect()->route('admin.allOrders')->with('status', 'updateOrderStatus.');

    }
    public function deleteorder($id) {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('admin.allOrders')->with('status', 'order cancel.');

    }
}
