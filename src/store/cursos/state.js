export default function () {
  return {
    cursos: [],
    search: "",
    curso: {},
    loading: false,
    categorias: [],
    categoria: {},
    loadingCategoria: false,
    aula: {
      id: 0,
      numero: 0,
      titulo: "",
      url: ""
    },
    serverPagination: {
      sortBy: null,
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 11
    }
  };
};
