import { keepPreviousData, useQuery } from '@tanstack/react-query';
import './PaginatedQueries.css';
import axios from 'axios';
import { useState } from 'react';

const PaginatedQueries = () => {
  const [page, setPage] = useState(0);
  //fetching function
  const fetchProducts = async (page = 0) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${page}&select=title,price`
      );
      return res;
    } catch (error) {
      console.log(error, 'paginated query error');
      return error;
    }
  };
  const { data, isPending, isFetching, isError, error, isPlaceholderData } =
    useQuery({
      queryKey: ['dummyJSON', page],
      queryFn: () => fetchProducts(page),
      placeholderData: keepPreviousData,
    });
  console.log(data.data);
  return (
    <div>
      <h1>Paginated Queries</h1>
      <div className='paginated_queries'>
        <h2>Pagination</h2>
        <ul>
          <li>Pagination is a important part of rendering data.</li>
          <li>
            React query provides some beneficial option to make this easy.
          </li>
          <li>
            <b>placeholderData</b> option and its value <b>keepPreviousData</b>{' '}
            helps make this process easy.
          </li>
        </ul>

        <div className='show_data'>
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div className='data_container'>
              {data.data.products.map((pdt) => (
                <div
                  key={pdt.id}
                  className='data_div'
                >
                  <p>{pdt.title}</p>
                  <p>{pdt.price}</p>
                </div>
              ))}
            </div>
          )}
          <span>Current Page: {page / 10 + 1}</span>
          <button
            onClick={() => setPage((old) => Math.max(old - 10, 0))}
            disabled={page === 0}
          >
            Previous Page
          </button>{' '}
          <button
            onClick={() => {
              if (!isPlaceholderData && page < data.data.total - 10) {
                setPage((old) => old + 10);
              }
            }}
            // Disable the Next Page button until we know a next page is available
            disabled={isPlaceholderData || !(page < data?.data?.total - 10)}
          >
            Next Page
          </button>
          {isFetching ? <span> Loading...</span> : null}{' '}
        </div>
      </div>
    </div>
  );
};
export default PaginatedQueries;
