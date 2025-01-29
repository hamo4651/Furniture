import Nav from "../admin/Layouts/Nav";
import Footer from "./Layouts/Footer";
import Navbar from "./Layouts/Nav";

export default function FrontMaster({ children }) {
    return (
        <>
        <div className="bg-light">
        <Navbar /> {/* النافبار الثابت */}
            <main style={{ marginTop: "100px" }}>{children}</main>
            <Footer /> {/* الفوتر الثابت */}
        </div>

        </>
    );
}
