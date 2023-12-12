import React, { useRef, useState } from 'react';
import './ImageGenerator.css'
import default_image from '/Users/krishsarin/Downloads/ai-image-generator/src/Assets/IMG_7695.jpg'




const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const [loading, setLoading] = useState(false);
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);

        try {
            setLoading(true);
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer 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`,
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        prompt: inputRef.current.value,
                        n: 1,
                        size: "512x512",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            let data = await response.json();
            console.log(data);

            if (data && data.data && data.data[0] && data.data[0].url) {
                setImage_url(data.data[0].url);
            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            console.error("Error:", error.message);
            // Handle the error, e.g., display an error message to the user
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-image-generator">
            <div className="header">
                Ai image <span>generator</span>
            </div>
            <div className="img_loading">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="image">
                        <img
                            src={
                                image_url === "/"
                                    ? default_image
                                    : image_url
                            }
                            alt=""
                        />
                    <div className="loading">
                        <div className={loading?"loading-bar-full": "loading_bar"}></div>
                        <div className={loading?"loading-text": "display-none"}>Loading....</div>
                    </div>
                    </div>
                )}
            </div>
            <div className="search_box">
                <input
                    type="text"
                    ref={inputRef}
                    className="search-input"
                    placeholder="Describe What You Want To See"
                />
                <div
                    className="generate-btn"
                    onClick={() => {
                        imageGenerator();
                    }}
                >
                    Generate
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;