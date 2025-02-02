import { Routes, Router, Route, Link } from "react-router-dom";
import QRScanner from "./Scanner";
import App from "./App";
import QRImageScanner from "./ImgScanner";

const Root = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/scanner" element={<QRScanner />} />
                <Route path="/upload" element={<QRImageScanner />} />
            </Routes>
        </>
    );
};

export default Root;
