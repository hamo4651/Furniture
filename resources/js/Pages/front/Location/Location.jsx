import React from "react";
import "./Location.css"; // ملف CSS الخاص بالتنسيقات
import FrontMaster from "../FrontMaster";

const Location = () => {
    return (
        <>
        <FrontMaster>

            {/* القسم العلوي */}
            <section className="locations-section">
            <div className="row">
                    <div className="col-12">
                        <img
                            style={{ height: "350px", width: "100%" }}
                            src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                            alt="Login Image"
                            className="img-fluid w-100"
                        />
                    </div>
                </div>
            </section>

            {/* قائمة المتاجر */}
            <div className="container">
                {/* المتجر الأول */}
                <div className="row store-section align-items-center">
                    <div className="col-md-6">
                        {/* خريطة */}
                        <iframe
                            className="map-frame"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.15408460445!2d16.860495341282163!3d58.59019754981907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9038b12f43df%3A0x0!2z0JzQvtC80LjQvdC40YbQsA!5e0!3m2!1sen!2s!4v1696071773241!5m2!1sen!2s"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                    <div className="col-md-6 store-details">
                        <h3>Norrköping Store</h3>
                        <p>
                            Lorem ipsum dolor sit amet, comp uting of ore et dolore ma
                            antemo enim. Quam quisque id diam.
                        </p>
                        <div className="contact-info">
                            <p>
                                <strong>Email:</strong>{" "}
                                <a href="mailto:Umea.studio@example.com">Umea.studio@example.com</a>
                            </p>
                            <p>
                                <strong>Address:</strong> Källvindsgatan 5 602 40, Sweden
                            </p>
                            <p>
                                <strong>Phone:</strong> +668 66 448 6452 99
                            </p>
                        </div>
                    </div>
                </div>

                {/* المتجر الثاني */}
                <div className="row store-section align-items-center">
                    <div className="col-md-6">
                        {/* خريطة */}
                        <iframe
                            className="map-frame"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.15408460445!2d16.860495341282163!3d58.59019754981907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9038b12f43df%3A0x0!2z0JzQvtC80LjQvdC40YbQsA!5e0!3m2!1sen!2s!4v1696071773241!5m2!1sen!2s"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                    <div className="col-md-6 store-details">
                        <h3>Konungsund Store</h3>
                        <p>
                            Lorem ipsum dolor sit amet, comp uting of ore et dolore ma
                            antemo enim. Quam quisque id diam.
                        </p>
                        <div className="contact-info">
                            <p>
                                <strong>Email:</strong>{" "}
                                <a href="mailto:Umea.studio@example.com">Umea.studio@example.com</a>
                            </p>
                            <p>
                                <strong>Address:</strong> 610 33 Konungsund, Sweden
                            </p>
                            <p>
                                <strong>Phone:</strong> +668 66 448 6452 99
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </FrontMaster>

        </>
    );
};

export default Location;
