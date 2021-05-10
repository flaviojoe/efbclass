import {
  CLEARCATEGORIA,
  SETAULA,
  SETCATEGORIA,
  SETCATEGORIAS,
  SETCURSO,
  SETCURSOS,
  SETCURSOSPAGINACAO,
  SETHISTORICOAULA,
  SETLOADING,
  SETLOADINGCATEGORIA,
  SETPAGINACAO,
  SETSEARCH,
  SETMATERIAIS, SETLOADINGMATERIAL
} from "./mutations_types";

export default {
  [SETSEARCH]: (state, payload) => {
    state.search = payload;
  },
  [SETCURSOS]: (state, payload) => {
    state.cursos = payload;
  },
  [SETCURSOSPAGINACAO]: (state, payload) => {
    state.cursos = payload.results;
    state.serverPagination.rowsNumber = payload.count
  },
  [SETPAGINACAO]: (state, payload) => {
    console.log(payload);
    state.serverPagination = payload;
    state.loading = false;
  },
  [SETCURSO]: (state, payload) => {
    state.curso = Object.assign({}, payload);
  },
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SETCATEGORIAS]: (state, payload) => {
    state.categorias = payload;
  },
  [SETCATEGORIA]: (state, payload) => {
    state.categoria = Object.assign({}, payload);
  },
  [SETLOADINGCATEGORIA]: (state, payload) => {
    state.loadingCategoria = payload;
  },
  [CLEARCATEGORIA]: state => {
    state.categoria = {};
  },
  [SETAULA]: (state, payload) => {
    state.aula = Object.assign({}, payload);
  },
  [SETHISTORICOAULA]: (state, payload) => {
    state.curso.topicos[payload.index_topico].aulas[payload.index_aula].historico = [{finalizada: true}];
  },
  [SETMATERIAIS]: (state, payload) => {
    state.materiais = payload
  },
  [SETLOADINGMATERIAL]: (state, payload) => {
    state.loadingMaterial = payload
  }
};
