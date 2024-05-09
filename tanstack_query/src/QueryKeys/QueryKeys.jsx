import { useQuery } from '@tanstack/react-query';
import img1 from '../assets/chrome_HO1agwWcG8.png';
import './QueryKeys.css';
import axios from 'axios';
const QueryKeys = () => {
  const { data } = useQuery({
    queryKey: ['user', 'queryKeys'],
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
  });
  return (
    <div className='query_keys'>
      <h2>QueryKeys</h2>
      <ul>
        <li>
          Normally we use only one word to define the query key. But we can
          modify it to define unique data too.
        </li>
        <li>
          For e.g., in our case the name of the key is <b>["user"]</b>. But we
          can change it by using a variable to define the query key uniqueness.
        </li>
        <li>
          We can use this component name to define that there is another request
          for the same api in this component.
        </li>
        <li>
          If we check in the devtools of react query we can see there is another
          query key with name <b>["user","queryKeys"]</b>. We can also add
          objects in the key.
        </li>
        <li>
          Because React Query will trigger a refetch whenever the query key
          changes. So when we pass a variable parameter to our queryFn, we
          almost always want to fetch data when that value changes. Instead of
          orchestrating complex effects to manually trigger a refetch, we can
          utilize the query key
        </li>
        <li>
          If our query func depends on a variable we can add it into the query
          key.
          <img
            src={img1}
            alt=''
          />
        </li>
      </ul>
    </div>
  );
};
export default QueryKeys;
