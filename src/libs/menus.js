export const linksAluno = [
  {
    title: "Dashboard",
    icon: "fas fa-tachometer-alt",
    link: "/dashboard"
  },
  {
    title: "Informativos",
    icon: "fas fa-book",
    link: "/informativos"
  },
  {
    title: "Cursos",
    icon: "fas fa-graduation-cap",
    link: "/cursos"
  },
  {
    title: "Meus cursos",
    icon: "fas fa-swatchbook",
    link: "/meus_cursos"
  },
  {
    title: "Provas",
    icon: "fas fa-file-alt",
    link: "/provas_disponiveis"
  },
  {
    title: "Conta",
    icon: "fas fa-id-card",
    link: "/informacoes_aluno"
  },
  {
    title: "Mensagens",
    icon: "fas fa-bell",
    link: "/mensagens"
  },
  {
    title: "Configurações",
    icon: "fas fa-user-cog",
    link: "/configuracao"
  }
];

export const linksInstrutor = [
  {
    title: "Dashboard",
    icon: "fas fa-tachometer-alt",
    link: "/"
  },
  {
    title: "Inclusão de Cursos",
    icon: "fas fa-book",
    link: "/"
  },
  {
    title: "Dúvidas do aluno",
    icon: "fas fa-graduation-cap",
    link: "/"
  },
  {
    title: "Contato",
    icon: "fas fa-id-card",
    link: "/"
  }
];

export const linksAdm = [
  {
    title: "Dashboard",
    icon: "fas fa-tachometer-alt",
    link: "/"
  },
  {
    title: "Cadastro de Perfil",
    icon: "fas fa-book",
    link: "/"
  },
  {
    title: "Cadastro de Vagas",
    icon: "fas fa-graduation-cap",
    link: "/"
  },
  {
    title: "Informativos",
    icon: "fas fa-id-card",
    link: "/"
  }
];

export function links(user) {
  let menus = [];
  const grupos = user.groups.map(el => el.name);
  if (grupos.indexOf("Aluno") > -1) {
    menus.push({
      titulo: "Área do Aluno",
      links: linksAluno
    });
  }

  // if (grupos.indexOf("Instrutor") > -1) {
  //   menus.push({
  //     titulo: "Área do Instrutor",
  //     links: linksInstrutor
  //   });
  // }
  //
  // if (grupos.indexOf("Administrativo") > -1) {
  //   menus.push({
  //     titulo: "Área do Administrativo",
  //     links: linksAdm
  //   });
  // }

  return menus;
}
