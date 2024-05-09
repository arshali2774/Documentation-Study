import { RotatingLines } from 'react-loader-spinner';
import './Rerender.css';
import { useUserDOBs } from '../Queries/useUserQuery';
const Rerender = () => {
  const {
    data: userDOB,
    isPending,
    isError,
    error,
    fetchStatus,
    isSuccess,
  } = useUserDOBs();
  console.log(userDOB);
  return (
    <div className='re_render'>
      <h2>Re-render Optimization</h2>
      <ul>
        <li>
          The re-render happens because every time the window is refocused, by
          default the query is re-fetched and data is re-render.
        </li>
        <li>
          Therefore we can re-render only when the data is changed or updated.
        </li>
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
              {userDOB.map((i) => (
                <div
                  className='data_div'
                  key={i}
                >
                  <p>DOB: {i}</p>
                </div>
              ))}
            </div>
          ) : (
            <h3>Data fetching has resulted in error</h3>
          )}
        </div>
      </ul>
    </div>
  );
};
export default Rerender;
