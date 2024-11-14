'use client';

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ARScene from './components/ARScene';
import TextBox from './components/TextBox';
import ScreenshotDisplay from './components/ScreenshotDisplay';
import Footer from './components/Footer';

interface AppProps {
    id: string;
}

const App: React.FC<AppProps> = ({ id }) => {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [markerUrl, setMarkerUrl] = useState<string | null>(null);
    const [modelUrl, setModelUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://oshaberi-17c056aaa88b.herokuapp.com';
                const markerResponse = await fetch(`${baseUrl}/marker/${id}`);
                if (!markerResponse.ok) throw new Error('Marker not found');

                const modelResponse = await fetch(`${baseUrl}/model/${id}`);
                if (!modelResponse.ok) throw new Error('Model not found');

                setMarkerUrl(URL.createObjectURL(await markerResponse.blob()));
                setModelUrl(URL.createObjectURL(await modelResponse.blob()));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <Header />
            <div className="contents">
                {/* <div id="photo-frame-overlay" className="photo-frame-overlay"> */}
                    {/* <img src="assets/images/photoFrame.png" className="photo-frame-image" alt="Photo Frame" /> */}
                {/* </div> */}
                <ARScene markerUrl={markerUrl} modelUrl={modelUrl} />
                <TextBox />
                <ScreenshotDisplay screenshot={screenshot} />
            </div>
            <Footer setScreenshot={setScreenshot} screenshot={screenshot} />
        </div>
    );
};

export default App;