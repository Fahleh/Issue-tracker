import Pagination from './components/Pagination';

export default async  function Home({ searchParams }: { searchParams: Promise<{ page: string }>}) {
  const params = await searchParams;

  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(params.page)} />{' '}
    </div>
  );
}
