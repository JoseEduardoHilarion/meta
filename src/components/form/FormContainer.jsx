import './Form.css';

export const FormContainer = ({ header, body, footer, onSubmit }) => {
	const handleSubmit = (e) => {
		e.preventDefault(); // la cáscara siempre frena el browser
		onSubmit?.(); // delega al específico sin pasarle el evento
	};
	return (
		<form
			className="formulario neumo-flat"
			onSubmit={handleSubmit}
			noValidate
		>
			<header>{header}</header>
			{body}
			<footer className="flex-between neumo-gradient">{footer}</footer>
		</form>
	);
};
