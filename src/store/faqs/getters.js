const getters = {
  faqsFiltradas: state => {
    let filtrados = [],
      faqs = state.faqs

    if (state.search && state.search.length > 2) {
      Object.keys(faqs).forEach((chave) => {
        let faq = faqs[chave],
          pergunta = faq.pergunta.toLowerCase(),
          busca = state.search.toLowerCase()

        if (pergunta.includes(busca)) {
          filtrados.push(faq)
        }
      })
      console.log('Filtrados => ', filtrados)
      return filtrados
    }
    return faqs
  }
}

export default getters
