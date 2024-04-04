// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/index.scss';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from '@/app/providers/router/ui/AppRouter';
export function App() {
    return (
        <div className={'row'}>
            <div className="col">
                <RouterProvider router={AppRouter} />
            </div>
        </div>
    );
}

export default App;
