import { SETLOADING, SETPROVA, SETPROVAS, SETQUESTIONARIO, SETQUESTIONARIOID } from "./mutations_types";

export default {
  [SETPROVA]: (state, payload) => {
    state.prova = payload;
  },
  [SETPROVAS]: (state, payload) => {
    state.provas = payload;
  },
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SETQUESTIONARIO]: (state, payload) => {
    state.questionario = payload;
  },
  [SETQUESTIONARIOID]: (state, payload) => {
    state.questionarioId = payload;
  }
};
