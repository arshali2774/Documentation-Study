import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  try {
    const res = await axios.get(
      'https://random-data-api.com/api/v2/users?size=10'
    );
    return res;
  } catch (error) {
    console.log(error, 'async error');
    return error;
  }
};
export const useUserQuery = (select, notifyOnChangeProps) =>
  useQuery({
    queryKey: ['user', 'seperate file'],
    queryFn: fetchUsers,
    select,
    notifyOnChangeProps,
  });

export const useUserNames = () =>
  useUserQuery((data) => {
    const first_names = data.data.map((i) => i.first_name);
    return first_names;
  });
export const useUserCount = () =>
  useUserQuery((data) => {
    const userCount = data.data.length;
    return userCount;
  });
export const useUserDOBs = () =>
  useUserQuery((data) => {
    const userDOB = data.data.map((i) => i.date_of_birth);
    return userDOB;
  });
