const getters = {
  todasCategorias: state => {
    return state.categorias;
  },
  cursosFiltrados: state => {
    let categoriasfiltradas = [];
    let filtrados = [];
    let cursos = state.cursos;

    if (state.search && state.search.length > 2) {
      Object.keys(cursos).forEach(key => {
        let categoriaAlvo = Object.assign({}, cursos[key]);

        Object.keys(categoriaAlvo.cursos).forEach(k => {
          let curso = categoriaAlvo.cursos[k];
          let nomeCurso = curso.nome.toLowerCase();
          let search = state.search.toLowerCase();

          if (nomeCurso.includes(search)) {
            filtrados.push(curso);
          }
        });

        if (filtrados.length) {
          categoriaAlvo.cursos = [];
          categoriaAlvo.cursos = filtrados;
          filtrados = [];
          categoriasfiltradas.push(categoriaAlvo);
        }
      });
      console.log("categoriasfiltradas => ", categoriasfiltradas);
      return categoriasfiltradas;
    }
    return cursos;
  },
  cursosPorCategoria: (state, getters) => {
    let cursosFiltrados = getters.cursosFiltrados,
      cursosPorCategoria = [],
      categoria = state.categoria;

    if (Object.keys(categoria).length && categoria.nome !== "Todas") {
      Object.keys(cursosFiltrados).forEach(key => {
        if (cursosFiltrados[key].nome.includes(categoria.nome)) {
          cursosPorCategoria.push(cursosFiltrados[key]);
        }
      });

      return cursosPorCategoria;
    }

    return cursosFiltrados;
  }
};

export default getters;
