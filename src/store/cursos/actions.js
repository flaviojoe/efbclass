import CursoServices from "src/services/CursoServices";
import {
  SETAULA,
  SETCATEGORIA,
  SETCATEGORIAS,
  SETCURSO,
  SETCURSOS,
  SETCURSOSPAGINACAO,
  SETHISTORICOAULA,
  SETLOADING,
  SETLOADINGCATEGORIA,
  SETLOADINGMATERIAL,
  SETMATERIAIS,
  SETPAGINACAO,
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

export function setLoadingCategoria({commit}, payload) {
  commit(SETLOADINGCATEGORIA, payload);
}

export function setLoadingMaterial({commit}, payload) {
  commit(SETLOADINGMATERIAL, payload);
}

export function setCategoria({commit}, payload) {
  commit(SETCATEGORIA, payload);
}

export function setHistoricoAula({commit}, payload) {
  commit(SETHISTORICOAULA, payload);
}

export function setAula({commit}, payload) {
  commit(SETAULA, payload);
}

export async function getTodosCursosPorCategorias({commit, dispatch}) {
  return new Promise((resolve, reject) => {
    dispatch("setLoading", true);
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
        dispatch("setLoading", false);
      });
  });
}

export async function getTodosCursosPaginado({commit, dispatch}, payload) {
  return new Promise((resolve, reject) => {
    dispatch("setLoading", true);
    CursoServices.getTodosCursos(payload.query)
      .then(res => {
        commit(SETPAGINACAO, payload.pagination);
        commit(SETCURSOSPAGINACAO, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados dos cursos!");
        reject(error);
      })
      .finally(() => {
        dispatch("setLoading", false);
      });
  });
}

export async function getMeusCursos({commit, dispatch}) {
  return new Promise((resolve, reject) => {
    dispatch("setLoading", true);
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
        dispatch("setLoading", false);
      });
  });
}

export async function getCurso({commit, dispatch}, payload) {
  return new Promise((resolve, reject) => {
    dispatch("setLoading", true);
    CursoServices.getCurso(payload)
      .then(res => {
        dispatch("setCurso", res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados dos curso!");
        reject(error);
      })
      .finally(() => {
        dispatch("setLoading", false);
      });
  });
}

export async function getCategorias({commit, dispatch}) {
  return new Promise((resolve, reject) => {
    dispatch("setLoadingCategoria", true);
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
        dispatch("setLoadingCategoria", false);
      });
  });
}


export async function getAulasCurso({commit, dispatch}, payload) {
  return new Promise((resolve, reject) => {
    dispatch("setLoading", true);
    return CursoServices.getAulasCurso(payload)
      .then(res => {
        dispatch("setCurso", res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados das aulas do curso!");
        reject(error);
      })
      .finally(() => {
        dispatch("setLoading", false);
      });
  });
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

export async function getMateriaisDoCurso({commit, dispatch}, payload) {
  return new Promise((resolve, reject) => {
    dispatch("setLoadingMaterial", true)
    CursoServices.getMateriaisDoCurso(payload)
      .then(res => {
        commit(SETMATERIAIS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados dos materiais do curso!");
        reject(error);
      })
      .finally(() => {
        dispatch("setLoadingMaterial", false)
      })
    ;
  });
}
