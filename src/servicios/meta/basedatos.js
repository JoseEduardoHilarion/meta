fetchGenerico(url, metodo, registro = {}) {
  const opciones = {
    method: metodo
  };

  if (Object.keys(registro).length > 0) {
    opciones.headers = {
      'Content-Type': 'application/json'
    };

    opciones.body = JSON.stringify(registro);
  }

  // fetch(url, opciones)
}



