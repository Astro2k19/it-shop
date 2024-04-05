// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/index.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

export const App = () => {
    return (
        <div id={'app'}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default App;
