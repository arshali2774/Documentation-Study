import { useIsFetching, useQuery } from '@tanstack/react-query';
import './queriesBasic.css';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import img1 from '../assets/chrome_ps4c9bSfUa.png';

const QueriesBasic = () => {
  const isGloballyFetching = useIsFetching();
  const { isPending, isError, isSuccess, data, error, fetchStatus, refetch } =
    useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        try {
          const res = await axios.get(
            'https://random-data-api.com/api/v2/users?size=10'
          );
          return res;
        } catch (error) {
          console.log(error, 'async error');
        }
      },
      enabled: false,
    });
  return (
    <div className='queries_basic'>
      <h2>Queries Basic</h2>
      <ul>
        <li>
          Data is first fetched and the state of isPending is changed.{' '}
          <b>isPending: {isPending ? 'true' : 'false'}</b>
        </li>
        <li>
          When <b>isPending</b> is true data is fetching or fetching is paused
          and when false it means fetching has become idle or it is fetching in
          background.
        </li>
        <li>
          <b>isSuccess</b> is used to show whether the data fetching has
          completed without an error. If it is true then data is fetched without
          an error and if false then data fetching has some error.{' '}
          <b>isSuccess: {isSuccess ? 'true' : 'false'}</b>
        </li>
        <li>
          <b>isError</b> shows whether there is an error in fetching data.{' '}
          <b>isError: {isError ? 'true' : 'false'}</b>
        </li>
        <li>
          <b>error</b> shows the error that has occured.{' '}
          <b>error name: {isError ? error.name : 'error name'}</b>,{' '}
          <b>error message: {isError ? error.message : 'error message'}</b>
        </li>
        <li>
          <b>fetchStatus</b> shows whether the query is fetching or not. It can
          be in three state <b>fetching</b>, <b>idle</b> and <b>paused</b>. When
          there is some network issue it gets paused.
        </li>
        <li>
          We can change the default options of queryClient that is retry,
          refetchOnMount etc. when initializing the queryClient
        </li>
        <li>
          We can also change these for individual query.
          <br />
          <img
            src={img1}
            alt=''
          />
        </li>
        <li>
          To show when any query is fetching in background .---
          {isGloballyFetching ? <RotatingLines /> : 'Has fetched'} we use a hook{' '}
          <b>uesIsFetching</b>
        </li>
        <li>
          If you ever want to disable a query from automatically running, you
          can use the enabled = false option.
        </li>
        <li>
          When enabled is false:{' '}
          <ul>
            <li>
              If the query has cached data, then the query will be initialized
              in the status === 'success' or isSuccess state.
            </li>
            <li>
              If the query does not have cached data, then the query will start
              in the status === 'pending' and fetchStatus === 'idle' state.
            </li>
            <li>The query will not automatically fetch on mount.</li>
            <li>The query will not automatically refetch in the background.</li>
            <li>
              The query will ignore query client invalidateQueries and
              refetchQueries calls that would normally result in the query
              refetching.
            </li>
            <li>
              refetch returned from useQuery can be used to manually trigger the
              query to fetch.
              <button onClick={() => refetch()}>Refetch</button>
            </li>
          </ul>
        </li>
        <li>
          enabled option can also be used to fire the request when user has done
          some action.
          <ul>
            <li>
              For e.g. we need to do a request for filtered items once the user
              has clicked a checkbox
            </li>
            <li>
              in this case we can make a local state and change it when the user
              has checked the box.
            </li>
            <li>
              or a search filter where the user has entered some text to search
            </li>
            <li>
              we can set the enabled option something like this{' '}
              <b>enable:!!filter</b>
            </li>
            <li>this is something like lazy loading</li>
          </ul>
        </li>
      </ul>
      <div className='show_data'>
        {isError ? (
          <h3>
            {error.name}: {error.message}
          </h3>
        ) : (
          <h3>No Error</h3>
        )}
        <h3>Fetch Status: {fetchStatus}</h3>
        {fetchStatus === 'fetching' ? (
          <RotatingLines
            strokeColor='grey'
            strokeWidth='5'
            animationDuration='0.75'
            width='96'
            visible={true}
          />
        ) : isSuccess ? (
          <div className='data_container'>
            {data.data.map((i) => (
              <div
                className='data_div'
                key={i.id}
              >
                <img
                  src={i.avatar}
                  alt={i.first_name}
                />
                <p>
                  {i.first_name} {i.last_name}
                </p>
                <p>{i.address.city}</p>
              </div>
            ))}
          </div>
        ) : (
          <h3>Data fetching has resulted in error</h3>
        )}
      </div>
    </div>
  );
};
export default QueriesBasic;
