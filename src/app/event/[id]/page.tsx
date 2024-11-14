import App from './App';

export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: 'test_id' },
    ];
}

interface Params {
    params: {
        id: string;
    };
}

const Page = ({ params }: Params) => {
    return <App id={params.id} />;
};

export default Page;