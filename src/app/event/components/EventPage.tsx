import dynamic from 'next/dynamic';

const ARScene = dynamic(() => import('./ARScene'), { ssr: false });

const EventPage = () => {
  return (
    <div>
      <h1>イベントページ</h1>
      <ARScene markerUrl="https://example.com/marker" modelUrl="https://example.com/model.glb" />
    </div>
  );
};

export default EventPage;