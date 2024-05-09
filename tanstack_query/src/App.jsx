import QueriesBasic from './QueriesBasic/queriesBasic';
import QueryKeys from './QueryKeys/QueryKeys';
import './App.css';
import CleanCode from './CleanCode/CleanCode';
import RenderOpt from './RenderOptimization/RenderOpt';
import Rerender from './RenderOptimization/Rerender';
import DependentQuery from './DependentQuery/DependentQuery';
import PaginatedQueries from './PaginatedQueries/PaginatedQueries';
import InfiniteQueries from './InfiniteQueries/InfinitQueries';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <h1>React Query</h1>
          <QueriesBasic />
          <QueryKeys />
          <CleanCode />
          <RenderOpt />
          <Rerender />
          <DependentQuery />
        </div>
      ),
    },
    {
      path: '/pagination',
      element: <PaginatedQueries />,
    },
    {
      path: '/infinteScroll',
      element: <InfiniteQueries />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
