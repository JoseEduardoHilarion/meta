import { Link, Outlet } from 'react-router';
import Item from '../ui/Item';
import Icono from '../ui/Icono';

export default function Principal() {
	return (
		<>
			<aside className={'neumo-convex'}>
				<Item interactive className="fw-bold">
					<Icono>
						<img src="/img/lista.svg" alt="Listas de Metas" />
					</Icono>
					<Link to="/Lista">Lista de Metas </Link>
				</Item>
				<Item interactive className="fw-bold">
					<Icono>
						<img src="/img/nueva.svg" alt="Listas de Metas" />
					</Icono>
					<Link to="/Nueva">Nueva Meta</Link>
				</Item>
			</aside>
			<main className={'neumo-concave'}>
				<Outlet />
			</main>
		</>
	);
}
