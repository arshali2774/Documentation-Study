import { useInfiniteQuery } from '@tanstack/react-query';
import './InfiniteQueries.css';
import axios from 'axios';
import { Fragment } from 'react';

const PaginatedQueries = () => {
  const fetchProducts = async ({ pageParam }) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=3&skip=${pageParam}&select=title,price`
      );
      return res;
    } catch (error) {
      console.log(error, 'infinite Queries');
      return error;
    }
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });
  console.log(data);
  return (
    <div>
      <h1>Infinite Queries</h1>
      <div className='paginated_queries'>
        <h2>Infinite Scroll</h2>
        <ul>
          <li>
            Rendering lists that can additively "load more" data onto an
            existing set of data or "infinite scroll" is also a very common UI
            pattern.
          </li>
          <li>
            TanStack Query supports a useful version of useQuery called
            useInfiniteQuery for querying these types of lists.
          </li>
          <li>
            When using useInfiniteQuery, you'll notice a few things are
            different:
            <ul>
              <li>"data" is now an object containing infinite query data:</li>
              <li>data.pages array containing the fetched pages</li>
              <li>
                data.pageParams array containing the page params used to fetch
                the pages
              </li>
              <li>
                {' '}
                The fetchNextPage and fetchPreviousPage functions are now
                available (fetchNextPage is required)
              </li>
              <li>
                The initialPageParam option is now available (and required) to
                specify the initial page param
              </li>
              <li>
                The getNextPageParam and getPreviousPageParam options are
                available for both determining if there is more data to load and
                the information to fetch it.This information is supplied as an
                additional parameter in the query function
              </li>
              <li>
                {' '}
                A hasNextPage boolean is now available and is true if
                getNextPageParam returns a value other than null or undefined
              </li>
              <li>
                A hasPreviousPage boolean is now available and is true if
                getPreviousPageParam returns a value other than null or
                undefined
              </li>
              <li>
                {' '}
                The isFetchingNextPage and isFetchingPreviousPage booleans are
                now available to distinguish between a background refresh state
                and a loading more state
              </li>
              <li>
                <b>
                  Options initialData or placeholderData need to conform to the
                  same structure of an object with data.pages and
                  data.pageParams properties.
                </b>
              </li>
            </ul>
          </li>
        </ul>
        <div className='show_data'>
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div className='data_container'>
              {data.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.data.products.map((pdt) => (
                    <p key={pdt.id}>{pdt.title}</p>
                  ))}
                </Fragment>
              ))}
            </div>
          )}
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </button>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
      </div>
    </div>
  );
};
export default PaginatedQueries;
