import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const App = () => {
    const [text, setText] = useState("https://qrcodgen.vercel.app/");
    const [size, setSize] = useState(180);
    const [margin, setMargin] = useState(0);
    const [level, setLevel] = useState("L");
    const [bgcolor, setBGColor] = useState("#ffffff");
    const [fgcolor, setFGColor] = useState("#000000");

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--main-color",
            `${fgcolor}`
        );
        document.documentElement.style.setProperty("--bg-color", `${bgcolor}`);
        document.documentElement.style.setProperty(
            "--mainb-color",
            `${fgcolor}55`
        );
        document.documentElement.style.setProperty(
            "--bgb-color",
            `${bgcolor}85`
        );
    }, [bgcolor, fgcolor]);

    function downloadPNG() {
        const svgElement = document.getElementById("qrcode");
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const size = svgElement.getAttribute("width") || 256; // Берем размер SVG
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, size, size);
            URL.revokeObjectURL(url);

            // Создаем PNG
            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = url;
    }

    return (
        <>
            <div className="container">
                <h1>QRCODE GENERATOR</h1>
                <a href="/upload">upload qr-code</a>
                <div className="text">
                    <input
                        type="text"
                        className="text-input"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        placeholder="Text or url..."
                    />
                </div>
                <div className="size">
                    <label htmlFor="input">Size</label>
                    <div className="sizes">
                        <input
                            type="range"
                            name="range"
                            id="range"
                            min={21}
                            max={512}
                            value={size}
                            onChange={(e) => {
                                setSize(e.target.value);
                            }}
                        />
                        <input
                            type="number"
                            name="size"
                            value={size}
                            min={21}
                            max={512}
                            onChange={(e) => {
                                setSize(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="levels">
                    <div className="lvl">
                        <input
                            type="radio"
                            name="level"
                            value="L"
                            onChange={(e) => {
                                setLevel(e.target.value);
                            }}
                            defaultChecked
                        />
                        <label htmlFor="input">L</label>
                    </div>

                    <div className="lvl">
                        <input
                            type="radio"
                            name="level"
                            value="H"
                            onChange={(e) => {
                                setLevel(e.target.value);
                            }}
                        />
                        <label htmlFor="input">H</label>
                    </div>
                </div>
                <div className="colors">
                    <div className="color">
                        <input
                            type="color"
                            name="fgcolor"
                            id=""
                            value={fgcolor}
                            onChange={(e) => {
                                setFGColor(e.target.value);
                            }}
                        />
                        <label htmlFor="input">Color</label>
                    </div>
                    <div className="color">
                        <input
                            type="color"
                            name="bgcolor"
                            id=""
                            value={bgcolor}
                            onChange={(e) => {
                                setBGColor(e.target.value);
                            }}
                        />
                        <label htmlFor="input">BG</label>
                    </div>
                </div>

                <div className="margin">
                    <label htmlFor="input">Borders</label>
                    <div className="margins">
                        <input
                            type="range"
                            name="padding"
                            id="padding"
                            min={0}
                            max={10}
                            value={margin}
                            onChange={(e) => {
                                setMargin(e.target.value);
                            }}
                        />
                        <input
                            type="number"
                            name="padding"
                            value={margin}
                            min={0}
                            max={10}
                            onChange={(e) => {
                                setMargin(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div
                    className="qrcode"
                    onClick={() => {
                        downloadPNG();
                    }}
                >
                    <span>click to download</span>
                    <QRCodeSVG
                        value={text}
                        size={size}
                        level={level}
                        bgColor={bgcolor}
                        fgColor={fgcolor}
                        id="qrcode"
                        marginSize={margin}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
