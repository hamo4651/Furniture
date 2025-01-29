import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Side() {
     const { unreadCount } = usePage().props;  // Getting the paginated orders passed by Inertia
        console.log(unreadCount);
        const [updatedUnreadCount, setUpdatedUnreadCount] = useState(unreadCount);

        // Function to mark notifications as read
        const { post, processing } = useForm();

        const markNotificationsAsRead = () => {
            post(route('notifications.markAsRead'), {
                onSuccess: () => {
                    setUpdatedUnreadCount(0); // Update unread count
                },
                onError: (error) => {
                    console.error('Error marking notifications as read:', error);
                }
            });
        };
    return (
        <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
        >
            <div className="app-brand demo">
                <a href="index.html" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <svg
                            width="25"
                            viewBox="0 0 25 42"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <defs>
                                <path
                                    d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                                    id="path-1"
                                ></path>
                                <path
                                    d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                                    id="path-3"
                                ></path>
                                <path
                                    d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                                    id="path-4"
                                ></path>
                                <path
                                    d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                                    id="path-5"
                                ></path>
                            </defs>
                            <g
                                id="g-app-brand"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <g
                                    id="Brand-Logo"
                                    transform="translate(-27.000000, -15.000000)"
                                >
                                    <g
                                        id="Icon"
                                        transform="translate(27.000000, 15.000000)"
                                    >
                                        <g
                                            id="Mask"
                                            transform="translate(0.000000, 8.000000)"
                                        >
                                            <mask id="mask-2" fill="white">
                                                <use xlinkHref="#path-1"></use>
                                            </mask>
                                            <use
                                                fill="#696cff"
                                                xlinkHref="#path-1"
                                            ></use>
                                            <g id="Path-3" mask="url(#mask-2)">
                                                <use
                                                    fill="#696cff"
                                                    xlinkHref="#path-3"
                                                ></use>
                                                <use
                                                    fillOpacity="0.2"
                                                    fill="#FFFFFF"
                                                    xlinkHref="#path-3"
                                                ></use>
                                            </g>
                                            <g id="Path-4" mask="url(#mask-2)">
                                                <use
                                                    fill="#696cff"
                                                    xlinkHref="#path-4"
                                                ></use>
                                                <use
                                                    fillOpacity="0.2"
                                                    fill="#FFFFFF"
                                                    xlinkHref="#path-4"
                                                ></use>
                                            </g>
                                        </g>
                                        <g
                                            id="Triangle"
                                            transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                                        >
                                            <use
                                                fill="#696cff"
                                                xlinkHref="#path-5"
                                            ></use>
                                            <use
                                                fillOpacity="0.2"
                                                fill="#FFFFFF"
                                                xlinkHref="#path-5"
                                            ></use>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <span className="app-brand-text demo menu-text fw-bolder ms-2">
                        Sneat
                    </span>
                </a>

                <a
                    href="javascript:void(0);"
                    className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                >
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
    <li
        className={`menu-item ${
            route().current("index") ? "active" : ""
        }`}
    >
        <a href={route("index")} className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Dashboard">Dashboard</div>
        </a>
    </li>

    <li
        className={`menu-item ${
            route().current("admin.product.index") ? "active" : ""
        }`}
    >
        <a href={route("admin.product.index")} className="menu-link">
            <i className="menu-icon tf-icons bx bx-package"></i> {/* Product Icon */}
            <div data-i18n="Products">Products</div>
        </a>
    </li>

{/* 
    <li
    className={`menu-item ${
        route().current("admin.allOrders") ? "active" : ""
    }`}
>
    <a href={route("admin.allOrders")} className="menu-link">
        
        <i className="menu-icon tf-icons bx bx-box"></i>
        <div data-i18n="Orders">Orders</div>
        {unreadCount > 0 && (
            <span
                className="badge bg-danger text-white ms-2"
                style={{
                    fontSize: "0.8rem",
                    borderRadius: "50%",
                    padding: "4px 8px",
                }}
            >
                {unreadCount}
            </span>
        )}
    </a>
</li> */}
<li
        className={`menu-item ${
            route().current("admin.category.index") ? "active" : ""
        }`}
    >
        <a href={route("admin.category.index")} className="menu-link">
            <i className="menu-icon tf-icons bx bx-category"></i> {/* Category Icon */}
            <div data-i18n="Category">Category</div>
        </a>
    </li>
   
    <li className={`menu-item ${route().current("admin.allOrders") ? "active" : ""}`} style={{ position: 'relative' }}>
    <a
        href={route("admin.allOrders")}
        className="menu-link"
        onClick={(e) => {
            e.preventDefault();  // Prevent the default link behavior
            markNotificationsAsRead();  // Mark notifications as read and trigger Inertia request
        }}
    >
        <i className="menu-icon tf-icons bx bx-cart"></i>
        <div data-i18n="Orders">
            Orders
        </div>
    </a>

    {updatedUnreadCount > 0 && (
        <span
            className="badge bg-danger text-white ms-2"
            style={{
                fontSize: "0.9rem",
                borderRadius: "50%",
                padding: "4px 8px",
                position: 'absolute',
                top: '50%',  // Center the badge vertically
                right: '10px',  // Align the badge to the right
                transform: 'translateY(-50%)',  // Vertically center the badge
            }}
        >
            {updatedUnreadCount}
        </span>
    )}
</li>

    <li
        className={`menu-item ${
            route().current("admin.feedback.index") ? "active" : ""
        }`}
    >
        <a href={route("admin.feedback.index")} className="menu-link">
            <i className="menu-icon tf-icons bx bx-message-dots"></i> {/* Feedback Icon */}
            <div data-i18n="Feedback">Feedback</div>
        </a>
    </li>

    <li
        className={`menu-item ${
            route().current("admin.coupons.index") ? "active" : ""
        }`}
    >
        <a href={route("admin.coupons.index")} className="menu-link">
            <i className="menu-icon tf-icons bx bx-gift"></i> {/* Coupons Icon */}
            <div data-i18n="Coupons">Coupons</div>
        </a>
    </li>

    <li
        className={`menu-item ${
            route().current("admin.offer.index") ? "active" : ""
        }`}
    >
        <a href={route("admin.offer.index")} className="menu-link">
            <i className="menu-icon tf-icons bx bx-tag"></i> {/* Offer Icon */}
            <div data-i18n="Offer">Offer</div>
        </a>
    </li>

    <li
        className={`menu-item ${
            route().current("admin.productoffer.index") ? "active" : ""
        }`}
    >
        <a href={route("admin.productoffer.index")} className="menu-link">
            <i className="menu-icon tf-icons bx bx-tag"></i> 
            <div data-i18n="Product Offer">Product Offer</div>
        </a>
    </li>
   
    <li
        className={`menu-item ${
            route().current("admin.users.index") ? "active" : ""
        }`}
    >
        <a href={route("admin.users.index")} className="menu-link">
        <i className="menu-icon tf-icons bx bx-user"></i> 
        <div data-i18n="Users">Users</div>
        </a>
    </li>
   
</ul>

        </aside>
    );
}
