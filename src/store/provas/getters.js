const getters = {
  provasDisponiveis: state => {
    return state.provas;
  },
  questionarioProva: state => {
    return state.questionario;
  }
};

export default getters;
