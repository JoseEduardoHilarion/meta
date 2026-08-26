import { useNavigate, useLocation } from 'react-router';
import { Item } from '../ui/Item';
import { Icono } from '../ui/Icono';
import { cn } from '../../utils';

export const Aside = () => {
	const navigate = useNavigate();
	const location = useLocation(); // Obtenemos la ruta actual del navegador

	// Verificamos si la ruta actual coincide exactamente
	const esActivo = (ruta) =>
		location.pathname === ruta ? 'item-activo' : '';

	return (
		<aside className="neumo-convex">
			<Item
				clickable
				// Si es activo, le sumamos una clase CSS para que se vea seleccionado/hundido
				className={cn('fw-bold', esActivo('/Lista'))}
				onClick={() => navigate('/Lista')}
			>
				<Icono>
					<img src="/img/lista.svg" alt="Lista de Metas" />
				</Icono>
				Lista de Metas
			</Item>

			<Item
				clickable
				className={cn('fw-bold', esActivo('/Nueva'))}
				onClick={() => navigate('/Nueva')}
			>
				<Icono>
					<img src="/img/nueva.svg" alt="Nueva Meta" />
				</Icono>
				Nueva Meta
			</Item>
		</aside>
	);
};
