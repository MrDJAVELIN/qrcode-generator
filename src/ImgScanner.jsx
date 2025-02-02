import { useState } from "react";
import jsQR from "jsqr";

const QRImageScanner = () => {
    const [qrResult, setQrResult] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const qrCode = jsQR(
                    imageData.data,
                    canvas.width,
                    canvas.height
                );

                if (qrCode) {
                    setQrResult(qrCode.data);
                } else {
                    setQrResult("QR-код не найден");
                }

                URL.revokeObjectURL(previewUrl);
            };
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="container">
                <h1>Upload QR-Code</h1>
                <a href="/#">generate qr-code</a>

                <div className="upload">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <img src={imagePreview} alt="" />
                    <h1>
                        Result:<br></br>
                        {qrResult || "Upload..."}
                    </h1>
                </div>
            </div>
        </>
    );
};

export default QRImageScanner;
