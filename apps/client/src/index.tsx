import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from '@/app/providers/router/ui/AppRouter';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={AppRouter()} />);
