import './RenderOpt.css';
import {
  useUserCount,
  useUserNames,
  useUserQuery,
} from '../Queries/useUserQuery';
import { RotatingLines } from 'react-loader-spinner';
const RenderOpt = () => {
  const { isPending, isError, data, error, fetchStatus, isSuccess } =
    useUserQuery();
  const { data: userNames } = useUserNames();
  const { data: userCount } = useUserCount();
  return (
    <div className='render_opt'>
      <h2>Render Optimization</h2>
      <ul>
        <li>
          Rendering the things we want from the data is something we do.
          Sometimes we don't need all data we just need some data and we have to
          filter out that data.
        </li>
        <li>
          {' '}
          We can do that using <b>select</b> option
        </li>
        <li>
          in the data shown below we have filtered out the data to show only the
          first name. If we don't want other data from same api we can use
          filtered data.
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
        {isPending ? (
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
      <div className='show_data'>
        {isError ? (
          <h3>
            {error.name}: {error.message}
          </h3>
        ) : (
          <h3>No Error</h3>
        )}
        <h3>Fetch Status: {fetchStatus}</h3>
        {isPending ? (
          <RotatingLines
            strokeColor='grey'
            strokeWidth='5'
            animationDuration='0.75'
            width='96'
            visible={true}
          />
        ) : isSuccess ? (
          <div className='data_container'>
            {userNames.map((i) => (
              <div
                className='data_div'
                key={i}
              >
                <p>First name: {i}</p>
              </div>
            ))}
          </div>
        ) : (
          <h3>Data fetching has resulted in error</h3>
        )}
      </div>
      <div className='show_data'>
        {isError ? (
          <h3>
            {error.name}: {error.message}
          </h3>
        ) : (
          <h3>No Error</h3>
        )}
        <h3>Fetch Status: {fetchStatus}</h3>
        {isPending ? (
          <RotatingLines
            strokeColor='grey'
            strokeWidth='5'
            animationDuration='0.75'
            width='96'
            visible={true}
          />
        ) : isSuccess ? (
          <div className='data_container'>
            <div className='data_div'>
              <p>Number of users: {userCount}</p>
            </div>
          </div>
        ) : (
          <h3>Data fetching has resulted in error</h3>
        )}
      </div>
    </div>
  );
};
export default RenderOpt;
