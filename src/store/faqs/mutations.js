import { SETFAQS, SETSEARCH, SETLOADING } from "./mutations_types";

export default {
  [SETSEARCH]: (state, payload) => {
    state.search = payload;
  },
  [SETFAQS]: (state, payload) => {
    state.faqs = payload;
  },
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  }
};
