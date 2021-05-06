const routes = [
  {
    path: "/autenticacao",
    component: () => import("pages/PageAutenticacao.vue"),
    name: "login"
  },
  {
    path: "/registro",
    component: () => import("pages/PageRegistro.vue"),
    name: "registro"
  },
  {
    path: "/fale_conosco",
    component: () => import("pages/PageFaleConosco.vue"),
    name: "fale_conosco"
  },
  {
    path: "/ajuda",
    component: () => import("pages/PageContacteNos.vue"),
    name: "ajuda"
  },

  {
    path: "/prova",
    component: () => import("layouts/LayoutQuestionario.vue"),
    children: [
      {
        path: "/prova/questionario",
        component: () => import("pages/PageQuestionario.vue"),
        name: "Questionario"
      },
      {
        path: "/prova/resultado",
        component: () => import("pages/PageEntregaProva.vue"),
        name: "Resultado Prova"
      }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        name: "Home"
      },
      {
        path: "/dashboard",
        component: () => import("pages/PageDashboard.vue"),
        name: "Dashboard",
        meta: {
          corTextoCabecalho: 'text-white'
        }
      },
      {
        path: "/informacoes_aluno",
        component: () => import("pages/PageAluno.vue"),
        name: "Minha Conta"
      },
      {
        path: "/cursos",
        component: () => import("pages/PageCursos.vue"),
        name: "Cursos"
      },
      {
        path: "/meus_cursos",
        component: () => import("pages/PageMeusCursos.vue"),
        name: "Meus Cursos"
      },
      {
        path: "/meus_cursos/:id/aula",
        component: () => import("pages/PageAulas.vue"),
        name: "Aulas"
      },
      {
        path: "/cursos/:id",
        component: () => import("pages/PageCurso.vue"),
        name: "Detalhes Curso",
        meta: {
          corTextoCabecalho: 'text-white'
        }
      },
      {
        path: "/provas_disponiveis",
        component: () => import("pages/PageProvas.vue"),
        name: "Provas disponíveis"
      },
      // {
      //   path: "/prova/questionario",
      //   component: () => import("pages/PageQuestionario.vue"),
      //   name: "Questionario"
      // },
      {
        path: "/informativos",
        component: () => import("pages/PageInformativos.vue"),
        name: "Informativos"
      },
      {
        path: "/mensagens",
        component: () => import("pages/PageMensagens.vue"),
        name: "Mensagens",
        meta: {
          corTextoCabecalho: 'text-white'
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
