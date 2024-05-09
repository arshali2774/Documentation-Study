import { useUserQuery } from '../Queries/useUserQuery';
import './CleanCode.css';
const CleanCode = () => {
  const { data } = useUserQuery();
  return (
    <div className='clean_code'>
      <h2>Clean Code</h2>
      <ul>
        <li>
          We can make the fetching action as a custom hook for clean code.
        </li>
        <li>This way our component is only used to display data.</li>
        <li>We can create a folder for all our fetching files.</li>
        <li>
          We can now make a custom hook there, see the folder name "Queries".
        </li>
        <li>Then we can access all the data using that hook.</li>
      </ul>
    </div>
  );
};
export default CleanCode;
