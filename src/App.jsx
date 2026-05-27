import Encabezamiento from './components/layout/Encabezamiento';
import Principal from './components/layout/Principal';
import Pie from './components/layout/Pie';

////////////////////////////////////////////////////////////
export default function App() {
    return (
        <div className="layout">
            <Encabezamiento />
            <Principal />
            <Pie />
        </div>
    );
}
