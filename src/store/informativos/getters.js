const getters = {
  informativos: state => {
    return state.informativos;
  },
  informativosFiltrados: state => {
    let filtrados = [],
      alvos = state.informativos;

    if (state.search && state.search.length > 2) {
      Object.keys(alvos).forEach(k => {
        let alvo = alvos[k],
          nomeAlvo = alvo.nome.toLowerCase(),
          busca = state.search.toLowerCase();

        if (nomeAlvo.includes(busca)) {
          filtrados.push(alvo);
        }
      });
      return filtrados;
    }
    return alvos;
  }
};

export default getters;
