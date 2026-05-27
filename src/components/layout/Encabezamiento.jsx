import Item from '../ui/Item';
import Icono from "../ui/Icono"
import ThemeToggle from '../ui/ThemeToggle';
import Spacer from '../ui/Spacer';


export default function Encabezamiento() {
	return (
		<header className={'neumo-concave txt-grey fw-bold'}>
			<Item>				
				<Icono>
					<img src="/img/logo.svg" alt="logo" />
				</Icono>
				<h1>METAS APP</h1>	
				<Spacer/>		
				<ThemeToggle/>		
			</Item>
		</header>
	);
}