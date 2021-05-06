import { date } from "quasar";

export default {
  dateLocale: {
    days: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split(
      "_"
    ),
    daysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
    months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_"
    ),
    monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
    firstDayOfWeek: 0,
    format24h: true
  },
  formataData(value) {
    return date.formatDate(value, "DD/MM/YYYY");
  },
  validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  ajusteDataInput(data) {
    if (data !== null)
      return data
        .replaceAll("-", "/")
        .split("/")
        .reverse()
        .join("/");
  },
  ajusteDataEnvio(data) {
    return data
      .split("/")
      .reverse()
      .join("/")
      .replaceAll("/", "-");
  },
  alterarUrlWatchParaEmbedYoutube(url) {
    if (url !== "" && url.length > 0) {
      return url.replace("watch?v=", "embed/");
    }
  },
  avatarPadrao:
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Kurt&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=Platinum&clotheType=Hoodie&clotheColor=Red&eyeType=Squint&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Black",
  getAvatar(user) {
    let avatar = this.avatarPadrao;
    if (
      Object.keys(user).length > 0 &&
      user.foto_perfil !== "" &&
      user.foto_perfil !== null &&
      user.foto_perfil.length > 0
    ) {
      avatar = user.foto_perfil;
    }
    return avatar;
  },
  alterarPosicaoArray(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
  },
  truncarString(text, length, clamp) {
    clamp = clamp || "...";
    var node = document.createElement("div");
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
  },
  ranksExemplo: {
    topRanks: [
      {
        id: 1,
        nome: "Jackson Lima",
        avatar:
          "https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Blank&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Happy&eyebrowType=UpDown&mouthType=Smile&skinColor=Brown",
        pontuacao: 1786,
        posicao: 1
      },
      {
        id: 2,
        nome: "Caio Silva",
        avatar:
          "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Wayfarers&facialHairType=BeardMajestic&facialHairColor=Blonde&clotheType=ShirtVNeck&clotheColor=PastelOrange&eyeType=Close&eyebrowType=Default&mouthType=Grimace&skinColor=Tanned",
        pontuacao: 1746,
        posicao: 2
      },
      {
        id: 3,
        nome: "Livia Andrade",
        avatar:
          "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=UpDown&mouthType=Default&skinColor=DarkBrown",
        pontuacao: 1738,
        posicao: 3
      }
    ],
    demaisRanks: [
      {
        id: 5,
        name: "Fabiola Barros",
        avatar:
          "https://gravatar.com/avatar/4be211bb9294289ce3b0cfd8951b9ed8?s=400&d=robohash&r=x",
        pontuacao: 1722
      },
      {
        id: 6,
        name: "Marcos Oliveira",
        avatar:
          "https://gravatar.com/avatar/4287d497c4fce73c5488484424dde12f?s=400&d=robohash&r=x",
        pontuacao: 1744
      },
      {
        id: 7,
        name: "Lucas Rodrigues",
        avatar:
          "https://gravatar.com/avatar/0e2c11bf619440a8107bae0ba81c8791?s=400&d=robohash&r=x",
        pontuacao: 1705
      },
      {
        id: 8,
        name: "Gabriela Passos",
        avatar:
          "https://gravatar.com/avatar/86189adfc4104e016a4e53cde7e63e70?s=400&d=robohash&r=x",
        pontuacao: 1688
      },
      {
        id: 9,
        name: "Mikaela Ramos",
        avatar:
          "https://gravatar.com/avatar/5c8cce460be1b7e5ab075c23950d0c0a?s=400&d=robohash&r=x",
        pontuacao: 1620
      }
    ]
  }
};
