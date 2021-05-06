import CursoServices from "src/services/CursoServices";
import {
  SETAULA,
  SETCATEGORIA,
  SETCATEGORIAS,
  SETCURSO,
  SETCURSOS,
  SETHISTORICOAULA,
  SETLOADING,
  SETLOADINGCATEGORIA,
  SETSEARCH
} from "./mutations_types";
import CategoriaServices from "src/services/CategoriaServices";
import { ERRO, notificacao } from "src/libs/notifications";

export function setSearch({commit}, payload) {
  commit(SETSEARCH, payload);
}

export function setCurso({commit}, payload) {
  commit(SETCURSO, payload);
}

export function setLoading({commit}, payload) {
  commit(SETLOADING, payload);
}

export function setCategoria({commit}, payload) {
  commit(SETCATEGORIA, payload);
}

export function setHistoricoAula({commit}, payload) {
  commit(SETHISTORICOAULA, payload);
}

export async function getTodosCursosPorCategorias({commit}) {
  return await new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    CursoServices.getTodosCursosPorCategorias()
      .then(res => {
        commit(SETCURSOS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados dos cursos!");
        reject(error);
      })
      .finally(() => {
        commit(SETLOADING, false);
      });
  });
}

export async function getMeusCursos({commit}) {
  commit(SETCURSOS, []);
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    CursoServices.getMeusCursos()
      .then(res => {
        commit(SETCURSOS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados dos cursos!");
        reject(error);
      })
      .finally(() => {
        commit(SETLOADING, false);
      });
  });
}

export async function getCurso({commit}, payload) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    CursoServices.getCurso(payload)
      .then(res => {
        commit(SETCURSO, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados dos curso!");
        reject(error);
      })
      .finally(() => {
        commit(SETLOADING, false);
      });
  });
}

export async function getCategorias({commit}) {
  return new Promise((resolve, reject) => {
    commit(SETLOADINGCATEGORIA, true);
    CategoriaServices.getCategorias()
      .then(res => {
        commit(SETCATEGORIAS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados das categorias!");
        reject(error);
      })
      .finally(() => {
        commit(SETLOADINGCATEGORIA, false);
      });
  });
}


export async function getAulasCurso({commit}, payload) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    return CursoServices.getAulasCurso(payload)
      .then(res => {
        commit(SETCURSO, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados das aulas do curso!");
        reject(error);
      })
      .finally(() => {
        setTimeout(() => {
          commit(SETLOADING, false);
        }, 1000);
      });
  });
}

export function setAula({commit}, payload) {
  commit(SETAULA, payload);
}

export async function aulaFinalizada({commit, dispatch}, payload) {
  return new Promise((resolve, reject) => {
    CursoServices.aulaFinalizada(payload.data)
      .then(res => {
        dispatch("setHistoricoAula", payload.payloadHistoricoAula);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro atualizar seu histórico de aula!");
        reject(error);
      });
  });
}
