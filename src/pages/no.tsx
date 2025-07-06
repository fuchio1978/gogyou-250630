import ColorSampleTable from '../components/ColorSampleTable';

export default function NoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">五行バランス表 色見本ページ</h1>
      <div className="max-w-md w-full">
        <ColorSampleTable />
      </div>
      <p className="mt-8 text-gray-500">このページは色見本の専用ページです。</p>
    </main>
  );
}
