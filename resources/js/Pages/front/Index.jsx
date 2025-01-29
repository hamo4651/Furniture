import React from "react";
import { usePage } from "@inertiajs/react"; // استيراد usePage
import FrontMaster from "./FrontMaster";
import Offer from "./Layouts/Offer";
import Product from "./Layouts/Product";
import Slider from "./Layouts/Slider";

export default function Index() {
    const { products } = usePage().props; // استقبال البيانات من الـ backend

    return (
        <>
            <FrontMaster>
                <Slider />
                <Offer />
                {/* <Product products={products} /> تمرير products كـ prop */}
            </FrontMaster>
        </>
    );
}
