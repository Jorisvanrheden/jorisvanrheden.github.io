import { useEffect, useState } from "react";
import "./ResponsiveRectangle.css";

const ResponsiveRectangle = ({ children }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function adjustSquare() {
            const maxHeight = window.innerHeight - 60 - 40 - 65; // Maximum height in pixels
            const viewportWidth = window.innerWidth;
            let width = viewportWidth * 0.8; // 50% of viewport width
            let height = width;

            if (height > maxHeight) {
                width = maxHeight;
                height = maxHeight;
            }

            setSize({ width, height });
        }

        // Adjust size on mount and resize
        adjustSquare();
        window.addEventListener('resize', adjustSquare);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', adjustSquare);
        };
    }, []);

    return (
        <div className="outer-layer">
            <div 
                className="inner-layer"
                style={{ width: `${size.width}px`, height: `${size.height}px` }}>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}
export default ResponsiveRectangle;
