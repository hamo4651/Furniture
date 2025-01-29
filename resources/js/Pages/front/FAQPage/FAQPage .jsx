import React from "react";
import "./FAQPage.css"; // ملف CSS الخاص بالمكون
import FrontMaster from "../FrontMaster";

const FAQPage = () => {
    return (
        <>
        <FrontMaster>

            {/* القسم العلوي */}
            <div className="row">
                    <div className="col-12">
                        <img
                            style={{ height: "350px" }}
                            src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                            alt="Login Image"
                            className="img-fluid w-100"
                        />
                    </div>
                </div>

            {/* قسم الأسئلة */}
            <div className="container faq-section">
                <div className="row">
                    {/* قائمة الأسئلة */}
                    <div className="col-md-3 faq-sidebar">
                        <a href="#question1">How can I order furniture?</a>
                        <hr style={{ width: "50%", margin: "20px auto" }} />
                        <a href="#question2">How long is return valid?</a>
                        <hr style={{ width: "50%", margin: "20px auto" }} />
                        <a href="#question3">Can I change measures?</a>
                        <hr style={{ width: "50%", margin: "20px auto" }} />
                        <a href="#question4">Can my order be assembled?</a>
                        <hr style={{ width: "50%", margin: "20px auto" }} />
                        <a href="#question5">Is customization an option?</a>
                        <hr style={{ width: "50%", margin: "20px auto" }} />
                        <a href="#question6">Can I choose materials?</a>
                    </div>

                    {/* المحتوى */}
                    <div className="col-md-9 faq-content">
                        <h2 id="question1">How can I order furniture?</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                        <div className="faq-divider"></div>

                        <h2 id="question2">How long is return valid?</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="faq-divider"></div>

                        <h2 id="question3">Can I change measures?</h2>
                        <p>
                            Volutpat odio facilisis mauris sit amet massa vitae tortor. Massa eget egestas purus viverra accumsan in.
                        </p>
                        <div className="faq-divider"></div>

                        <h2 id="question4">Can my order be assembled?</h2>
                        <p>
                            Magna sit amet purus gravida quis blandit turpis cursus. Malesuada nunc vel risus commodo viverra.
                        </p>
                        <div className="faq-divider"></div>

                        <h2 id="question5">Is customization an option?</h2>
                        <p>
                            Id diam vel quam elementum. A diam maecenas sed enim ut. Luctus venenatis lectus magna fringilla.
                        </p>
                        <div className="faq-divider"></div>

                        <h2 id="question6">Can I choose materials?</h2>
                        <p>
                            Sagittis id consectetur purus ut faucibus pulvinar elementum. Arcu non odio euismod lacinia at quis risus.
                        </p>
                    </div>
                </div>
            </div>
            </FrontMaster>

        </>
    );
};

export default FAQPage;
