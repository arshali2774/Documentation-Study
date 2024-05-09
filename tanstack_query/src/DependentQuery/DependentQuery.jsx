import './DependentQuery.css';
import img1 from '../assets/chrome_aeBebqzWmW.png';
const DependentQuery = () => {
  return (
    <div className='dep_query'>
      <h2>Dependent Query</h2>
      <ul>
        <li>
          Sometimes we need some queries to run when we have received certain
          data from other queries.{' '}
          <img
            src={img1}
            alt=''
          />
        </li>
      </ul>
    </div>
  );
};
export default DependentQuery;
