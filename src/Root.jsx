import { Routes, Router, Route, Link } from "react-router-dom";
import QRScanner from "./Scanner";
import App from "./App";

const Root = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/scanner" element={<QRScanner />} />
            </Routes>
        </>
    );
};

export default Root;
