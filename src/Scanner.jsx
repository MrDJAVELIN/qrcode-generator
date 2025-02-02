import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
    const [result, setResult] = useState("");

    return (
        <div>
            <h2>QR Scanner</h2>
            <QrReader
                constraints={{ facingMode: "environment" }} // Использует заднюю камеру
                onResult={(result, error) => {
                    if (result) {
                        setResult(result.text);
                    }
                }}
                style={{ width: "300px" }}
            />
            <p>Result: {result || "Scan QR-Code"}</p>
        </div>
    );
};

export default QRScanner;
