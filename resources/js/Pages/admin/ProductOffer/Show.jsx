import { usePage } from "@inertiajs/react";
import Master from "../Master";

export default function Show() {
    const { product } = usePage().props; // جلب بيانات المنتج من Laravel
    const {offers} = usePage().props
    console.log(offers);
    console.log(product);


    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center">Show Product Offer</h1>
            </Master>
        </>
    );
}
