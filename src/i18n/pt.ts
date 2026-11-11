/**
 * Dicionário do português — o idioma de origem.
 *
 * Todo texto de página e de interface vive aqui; `en.ts` e `es.ts` são
 * tipados contra este arquivo, então chave faltando nos outros idiomas quebra
 * o `astro check` (e o build, que roda o check antes).
 *
 * Convenções:
 * - String fixa quando o texto é fixo.
 * - Função quando entra número ou nome calculado; cada idioma resolve a
 *   própria concordância e o "por extenso".
 * - Lista de linhas quando o título quebra linha (`<br />` entre itens).
 * - Frase com link no meio vira partes (`antes`, `link`, `depois`), nunca HTML.
 *
 * Mudou um texto aqui? A tradução fica defasada e o build avisa. Ver
 * docs/guia-de-traducao.md.
 *
 * Imports com extensão `.ts`: o verificador de traduções carrega este arquivo
 * direto pelo Node, sem o Vite.
 */
import { porExtenso } from '../config/extenso.ts';

export const pt = {
  comum: {
    descricao:
      'Federação que reúne os coros de meninos e meninas do Brasil filiados à Pueri Cantores, ' +
      'federação internacional de pueris cantores reconhecida pela Santa Sé.',
    levantamento: 'levantamento de 2026',
    navegacao: {
      federacao: 'A federação',
      corais: 'Os corais',
      galeria: 'Galeria',
      filiacao: 'Filiação',
      contato: 'Contato',
    },
    navPrincipal: 'Navegação principal',
    navRodape: 'Rodapé',
    inicio: (assinatura: string) => `${assinatura} — início`,
    menu: 'Menu',
    fecharMenu: 'Fechar menu',
    idioma: 'Idioma',
    membro: 'Membro da Pueri Cantores, federação internacional de pueris cantores reconhecida pela Santa Sé.',
    imagemEmBreve: 'Imagem em breve',
    desde: (ano: number) => `desde ${ano}`,
    fotoDe: (nome: string, cidade: string) => `${nome}, em ${cidade}`,
    canais: { site: 'Site', email: 'E-mail' },
    cargos: {
      Regente: 'Regente',
      Presidente: 'Presidente',
      Pianista: 'Pianista',
      'Preparação vocal': 'Preparação vocal',
      Direção: 'Direção',
    },
    responde: 'A federação responde em português, inglês e espanhol.',
    carrossel: {
      titulo: 'Os outros corais',
      anteriores: 'Corais anteriores',
      proximos: 'Próximos corais',
      rotulo: 'Corais filiados à federação',
    },
    lightbox: {
      rotulo: 'Visualizador de fotografias',
      fechar: 'Fechar',
      anterior: 'Fotografia anterior',
      proxima: 'Próxima fotografia',
      // Molde para o script do visualizador: `{i}` e `{n}`.
      contador: '{i} de {n}',
    },
    miniGaleria: {
      titulo: 'Em imagens',
      foto: (nome: string, n: number) => `${nome} — fotografia ${n}`,
    },
  },

  emails: {
    filiacao: {
      assunto: 'Interesse em filiação',
      campos: [
        'Nome do coral:',
        'Cidade e estado:',
        'Ano de fundação:',
        'Instituição mantenedora (paróquia, escola, associação):',
        'Número de cantores e faixa etária:',
        'Nome do regente:',
        'Nome e cargo de quem responde:',
        'Telefone ou e-mail para retorno:',
        '',
        'Conte um pouco sobre o coro:',
      ],
    },
    imprensa: {
      assunto: 'Imprensa',
      campos: ['Veículo:', 'Pauta:', 'Prazo:', 'Material necessário (fotos, entrevista, dados):', '', 'Mensagem:'],
    },
    fotos: {
      assunto: 'Envio de fotografias',
      campos: ['Coral:', 'Ocasião e data das fotos:', 'Autoria da fotografia:', '', 'Mensagem:'],
    },
    geral: { assunto: 'Contato pelo site', campos: [] as string[] },
  },

  inicio: {
    heroAlt:
      'Centenas de coralistas reunidos no XVII Congresso Nacional Pueri Cantores, em Passos, Minas Gerais',
    titulo: 'Federação Nacional',
    subtitulo: 'dos Meninos Cantores do Brasil',
    apoio: ({ cidades, maisAntigo }: { cidades: number; maisAntigo: number }) =>
      `Em ${porExtenso(cidades, 'f')} cidades, meninos e meninas ensaiam duas, três, até seis vezes por ` +
      `semana. Aos domingos, cantam na missa. O mais antigo desses coros faz isso desde ${maisAntigo}.`,
    conhecer: (total: number) => `Conhecer os ${total} corais`,
    comoFiliar: 'Como se filiar',
    legendaHero: 'XVII Congresso Nacional Pueri Cantores · Passos, Minas Gerais, 2022',
    oQueE: {
      titulo: ['Cantar é', 'formar gente.'],
      paragrafos: [
        'Um coro de meninos não se mede só pelo que soa. Mede-se pelas horas de ensaio, pela ' +
          'disciplina aprendida cedo, pela criança que descobre que a própria voz importa dentro de ' +
          'um conjunto. É esse trabalho, artístico, litúrgico e social ao mesmo tempo, que a ' +
          'federação existe para sustentar.',
        'Nossos corais ensaiam em paróquias, mosteiros e escolas de música espalhados pelo país. ' +
          'Alguns nasceram há mais de oitenta anos, outros há dois. A formação musical é parte ' +
          'central desse trabalho.',
      ],
      historia: 'Nossa história',
    },
    numeros: {
      coros: 'coros em',
      estados: 'estados. Mais de',
      cantores: 'meninos e meninas.',
      fonte: (levantamento: string) => `Dados informados pelos corais filiados, ${levantamento}.`,
    },
    corais: {
      titulo: ['De Novo Hamburgo', 'a Petrópolis.'],
      ver: (total: number) => `Ver os ${total} corais`,
    },
    mundo: {
      titulo: ['Uma federação', 'pontifícia.'],
      texto:
        'A Pueri Cantores nasceu em Paris, em 1944, e hoje reúne coros infantojuvenis em ' +
        '35 países, sob reconhecimento da Santa Sé. Seus congressos internacionais juntam ' +
        'milhares de jovens cantores para cantar a mesma liturgia em línguas diferentes. Os corais ' +
        'brasileiros participam dessa rede por meio desta federação.',
      destaque: 'No Brasil, desde 1967.',
      destaqueTexto:
        'A Federação Nacional dos Meninos Cantores do Brasil promove o canto coral e a formação ' +
        'artístico-cultural, com atenção especial ao canto litúrgico.',
    },
    chamadas: {
      filiar: {
        titulo: 'Filiar-se à federação',
        texto: 'Requisitos, o que muda para o seu coro e como iniciar o processo.',
        acao: 'Saiba como',
      },
      imprensa: {
        titulo: 'Imprensa e apoio',
        texto: 'Números, material para publicação e contato para patrocínio.',
        acao: 'Acessar',
      },
    },
  },

  corais: {
    titulo: 'Os corais',
    descricao: (total: number, estados: number) =>
      `Os ${total} coros de meninos e meninas filiados à federação, em ${estados} estados brasileiros.`,
    h1: 'Os corais filiados',
    resumo: (total: number, estados: number) => `${total} corais · ${estados} estados`,
    filtrar: 'Filtrar por estado',
    todos: 'Todos',
    // Moldes para o script do filtro, que roda no navegador: `{n}` e `{uf}`.
    contagemUm: '{n} coral em {uf}.',
    contagemVarios: '{n} corais em {uf}.',
  },

  coral: {
    fundadoEm: 'Fundado em',
    filiadoDesde: 'Filiado desde',
    fotografia: (credito: string) => `Fotografia: ${credito}`,
    quemConduz: 'Quem conduz',
    historia: 'História',
    emBreve: 'Informações em breve.',
    emBreveTexto: 'Esta página será atualizada com a história, a equipe e outros detalhes do coral.',
  },

  federacao: {
    titulo: 'A federação',
    descricao: (total: number, estados: number) =>
      `A Federação Nacional dos Meninos Cantores do Brasil reúne ${total} coros de meninos e meninas em ${estados} estados, dentro da Pueri Cantores internacional.`,
    // A razão social não se traduz; em EN e ES ganha, só aqui, a tradução entre parênteses.
    abertura: (razaoSocial: string) =>
      `A ${razaoSocial} reúne os coros de meninos e meninas do Brasil que cantam a liturgia e o ` +
      'grande repertório coral. É o braço brasileiro da Pueri Cantores, federação internacional ' +
      'reconhecida pela Santa Sé.',
    significa: {
      titulo: ['O que é ser', 'um coro Pueri Cantores'],
      paragrafos: ({ maisAntigo, maisNovo }: { maisAntigo: number; maisNovo: number }) => [
        'Um coro Pueri Cantores não é um coro infantil que às vezes canta na igreja. É um coro que ' +
          'existe para a liturgia. Para isso, precisa ensinar música de verdade a crianças que em ' +
          'geral nunca tiveram acesso a ela.',
        'Os coros oferecem formação musical e serviço à liturgia. Há quem ensaie uma vez por ' +
          'semana e quem ensaie seis. Há coros mantidos por uma província franciscana e coros ' +
          `mantidos pelas famílias dos próprios cantores. O mais antigo canta desde ${maisAntigo}; o ` +
          `mais novo, desde ${maisNovo}. O que os aproxima é a combinação de rigor musical, formação ` +
          'humana e serviço à celebração.',
        'A federação existe para sustentar esse trabalho: reúne os coros em congressos, representa ' +
          'o Brasil na federação internacional e serve de referência para quem quer começar um coro ' +
          'novo.',
      ],
    },
    mundo: {
      titulo: ['Uma federação', 'pontifícia.'],
      // Partes, por causa dos itálicos: motu próprio e o nome francês.
      p1: {
        antes:
          'Uma longa tradição europeia de corais de meninos cantando a liturgia ganhou forma ' +
          'institucional no início do século XX, com o motu próprio',
        documento: 'Tra le sollecitudini',
        meio: (fundador: string) =>
          ', em que São Pio X pedia a renovação da música na Igreja. Em resposta, Monsenhor ' +
          `${fundador} fundou em Paris, em 1907, os Pequenos Cantores da Cruz de Madeira (`,
        nomeFrances: 'Petits Chanteurs de la Croix de Bois',
        depois:
          '), que cantaram pela paz em muitos países depois da Primeira Guerra Mundial. A Segunda ' +
          'Guerra interrompeu sua atividade, mas não os destruiu.',
      },
      p2: (fundacao: number) =>
        'Em julho de 1944, o arcebispo de Paris, cardeal Suhard, aprovou a fundação de uma ' +
        'organização internacional dos Pueri Cantores como “um elemento de beleza musical na ' +
        'Igreja, um trabalho de educação cristã e atividade apostólica a serviço da liturgia”. A ' +
        `data oficial de fundação é 11 de novembro de ${fundacao}, quando trezentos ` +
        'meninos cantores regidos por Maillet deram o primeiro concerto na igreja de Santo ' +
        'Eustáquio, em Paris. O primeiro congresso internacional aconteceu na mesma cidade, em ' +
        '1947, com noventa coros europeus, seguido pelos de Roma, em 1949 e 1951.',
      p3: ({ estatuto, paises, cantores }: { estatuto: number; paises: number; cantores: string }) =>
        `Em ${estatuto} a Santa Sé aprovou o estatuto da federação, que ` +
        'passou a ser reconhecida como movimento eclesial, sob a jurisdição do Pontifício Conselho ' +
        'para os Leigos. As reformas do estatuto de 1995 e 2001 permitiram a entrada de meninas. ' +
        `Hoje há coros de meninos, de meninas e mistos em ${paises} países de todos os ` +
        `continentes, com aproximadamente ${cantores} cantores. A tarefa ` +
        'principal continua sendo cantar a liturgia, e os valores cristãos são a base da vida e ' +
        'da conduta de seus membros.',
      link: 'Federação internacional Pueri Cantores',
    },
    brasil: {
      titulo: 'No Brasil',
      p1: (razaoSocial: string) =>
        `A ${razaoSocial} foi fundada em 1967 por Frei Leto, pelo padre José Maria ` +
        'Wisniewski e pelo maestro João Lucas Rodrigues. Seu objetivo é fomentar, entre crianças, ' +
        'adolescentes e jovens, o canto coral e a formação artístico-cultural, com foco no canto ' +
        'litúrgico. É filiada à Federação Internacional Pueri Cantores, com sede em Roma.',
      p2: (total: number, estados: number) =>
        `Hoje reúne ${total} coros federados de ${estados} estados. A cada três anos realiza um ` +
        'Congresso Nacional e, entre um nacional e outro, dois Congressos Regionais, alternados ' +
        'entre o Sudeste (Rio de Janeiro e Minas Gerais) e o Sul (Paraná, Santa Catarina e Rio ' +
        'Grande do Sul).',
      p3: (presidente: string) => `O presidente é ${presidente}, maestro dos Pequenos Cantores de Passos.`,
    },
    congressos: {
      titulo: 'Congressos',
      texto:
        'O congresso nacional é o encontro que dá forma à federação: os coros se hospedam nas paróquias ' +
        'da cidade anfitriã e cantam juntos ao fim de alguns dias de ensaio. Acontece de três em três ' +
        'anos.',
      nacionais: 'Nacionais',
      nacional: (edicao: string) => (edicao ? `${edicao} Congresso Nacional` : 'Congresso Nacional'),
      internacionais: 'O Brasil nos internacionais',
      internacional: (edicao: string) => (edicao ? `${edicao} Congresso Internacional` : 'Congresso Internacional'),
      regionais: 'Regionais',
      aindaPorVir: 'Ainda por vir.',
      proximos: 'Próximos encontros',
    },
    notas: {
      virtual: 'Edição virtual.',
      fotosGaleria: 'As fotografias da galeria são desta edição.',
      unicoNoBrasil: 'O único congresso internacional dos Pueri Cantores realizado no Brasil.',
      previstoJulho: 'Previsto para julho.',
      pratapolis: '15 a 19 de julho.',
      latinoAmericano: 'Congresso Latino-Americano, de 17 a 21 de dezembro. Data sujeita a confirmação.',
    },
    // Lugares fora do Brasil. Cidades brasileiras não se traduzem e não entram aqui.
    lugares: {
      Online: 'Online',
      'Roma, Itália': 'Roma, Itália',
      'Munique, Alemanha': 'Munique, Alemanha',
      Espanha: 'Espanha',
      'São Miguelito, Panamá': 'São Miguelito, Panamá',
    },
    diretoria: {
      titulo: 'Diretoria',
      mandato: (inicio: string, fim: string) => `Mandato: ${inicio} a ${fim}.`,
      executiva: 'Diretoria executiva',
      conselhoFiscal: 'Conselho Fiscal',
      titulares: 'Titulares',
      suplentes: 'Suplentes',
      cargos: {
        Presidente: 'Presidente',
        'Vice-presidente': 'Vice-presidente',
        Secretário: 'Secretário',
        'Vice-secretária': 'Vice-secretária',
        Tesoureiro: 'Tesoureiro',
        'Vice-tesoureiro': 'Vice-tesoureiro',
      },
    },
    chamadas: {
      corais: (total: number) => `Os ${total} corais filiados`,
      filiar: 'Como se filiar',
    },
  },

  filiacao: {
    titulo: 'Filiação',
    descricao: 'Como um coro de meninos ou meninas se filia à Federação Nacional dos Meninos Cantores do Brasil.',
    h1: 'Filiar-se à federação',
    abertura: (total: number, estados: number) =>
      `A federação recebe coros de crianças e jovens que cantam a liturgia. São hoje ${total} em ` +
      `${estados} estados. A porta continua aberta.`,
    soBrasil: {
      antes:
        'A filiação é para coros do Brasil. Coros de outros países procuram a federação do seu país ' +
        'ou a',
      link: 'Pueri Cantores internacional',
      depois: '.',
    },
    muda: {
      titulo: ['O que muda', 'para o seu coro'],
      paragrafos: [
        'O congresso, principalmente. De três em três anos os coros filiados se reúnem numa cidade ' +
          'anfitriã, ensaiam juntos por alguns dias e cantam uma celebração comum. Para um coro ' +
          'pequeno do interior, é a diferença entre cantar sempre para a mesma comunidade e cantar ao ' +
          'lado de centenas de outras crianças que fazem a mesma coisa.',
        'Depois, a rede. Os históricos dos filiados estão cheios de visitas de um coro a outro, ' +
          'regentes que se formaram em cursos oferecidos por corais mais antigos, coros que nasceram ' +
          'porque alguém assistiu a um congresso. É por essa rede também que se chega aos congressos ' +
          'internacionais da Pueri Cantores.',
        'E o pertencimento a uma federação reconhecida pela Santa Sé, que costuma pesar na relação ' +
          'com a diocese, com a prefeitura e com editais de cultura.',
      ],
    },
    comum: {
      titulo: 'O que os filiados têm em comum',
      texto: (total: number) =>
        `Um retrato dos ${total} corais que já fazem parte. Não é a lista de requisitos formais; ` +
        'ela consta do estatuto. O retrato ajuda a entender quem se reconhece aqui.',
      itens: [
        {
          titulo: 'Um coro de crianças e jovens',
          texto:
            'Coros de meninos, de meninas ou mistos. A faixa etária varia bastante entre os filiados. Há coros que recebem a partir dos cinco anos e coros em que ex-cantores adultos continuam nos naipes graves.',
        },
        {
          titulo: 'Canto na liturgia',
          texto:
            'Todos os filiados cantam regularmente na missa. Alguns assumem a parte musical de celebrações duas vezes por mês, outros cantam toda semana. É o que distingue um coro Pueri Cantores de um coro infantil de concerto.',
        },
        {
          titulo: 'Ensino musical gratuito',
          texto:
            'Nenhum dos corais filiados cobra do cantor. O ensino se sustenta por instituição mantenedora, editais públicos, cachês, doações ou pelas próprias famílias.',
        },
        {
          titulo: 'Uma instituição por trás',
          texto:
            'Paróquia, província religiosa, colégio, associação cultural ou instituto de música. Vários filiados são reconhecidos de utilidade pública no município ou no estado.',
        },
      ],
      regimento: 'O regimento interno estabelece três pontos básicos.',
      regimentoTexto:
        'O coro deve cumprir sua função litúrgica, cantando ao menos uma vez por mês em uma celebração ' +
        'eucarística; a admissão precisa ser aprovada pela Assembleia Geral; e cada coro deve contar ' +
        'com um conselheiro espiritual, obrigatoriamente um padre. O coro admitido recebe um certificado ' +
        'de admissão.',
    },
    cedo: {
      titulo: 'É cedo demais para o nosso coro?',
      texto: ({ mesmoAno, esperaMaxima }: { mesmoAno: number; esperaMaxima: number }) =>
        `Provavelmente não. Entre os filiados, ${porExtenso(mesmoAno)} se filiaram no mesmo ` +
        `ano em que foram fundados, e um esperou ${esperaMaxima} anos. Coro recém-nascido e coro ` +
        'octogenário convivem na mesma federação, e o congresso não separa um do outro.',
      link: 'Ver quando cada coral se filiou',
    },
    comecar: {
      titulo: 'Como começar',
      texto:
        'Escreva para a federação apresentando o coro. O botão abaixo abre uma mensagem com os ' +
        'campos que a federação precisa saber já preenchidos como roteiro. Responda o que souber e ' +
        'apague o resto.',
      botao: 'Apresentar o meu coro',
      ouEscreva: 'Ou escreva diretamente para',
      dados:
        'Não envie dados pessoais dos cantores, como nome completo, data de nascimento, endereço ou ' +
        'telefone de crianças e adolescentes. A federação não precisa deles para avaliar uma ' +
        'filiação, e este site não publica nenhum.',
    },
  },

  galeria: {
    titulo: 'Galeria',
    descricao: (comFoto: number, total: number) =>
      `Fotografias de ${comFoto} dos ${total} corais filiados e dos congressos da federação.`,
    abertura:
      'Os corais filiados e os encontros que os reúnem. As fotografias são enviadas pelos próprios ' +
      'coros e pela federação. Clique em qualquer imagem para vê-la em tela cheia.',
    corais: 'Os corais',
    congressos: 'Congressos',
    legendaCongresso: 'XVII Congresso Nacional Pueri Cantores · Passos, Minas Gerais, 2022',
    congressoTexto: 'XVII Congresso Nacional Pueri Cantores, em Passos, Minas Gerais, outubro de 2022.',
    creditoCongresso: 'Fotografias da Província Franciscana da Imaculada Conceição do Brasil.',
    total: {
      antes: (total: number) =>
        `São ${total} fotografias. A federação reúne material novo a cada congresso e a cada envio dos ` +
        'corais filiados, se o seu coro tem fotos para acrescentar,',
      link: 'fale com a gente',
      depois: '.',
    },
  },

  imprensa: {
    titulo: 'Imprensa',
    descricao: (razaoSocial: string) =>
      `Material para publicação sobre a ${razaoSocial}: números, marca, política de imagem e contato.`,
    h1: 'Imprensa e apoio',
    abertura:
      'O que você precisa para escrever sobre a federação, com os dados datados e a marca em arquivo ' +
      'vetorial. Para entrevista, foto em alta ou pauta específica, escreva, a federação responde.',
    falar: 'Falar com a federação',
    numeros: {
      titulo: 'Os números',
      corais: 'corais filiados',
      estados: 'estados',
      cantores: 'cantores',
      maisDe: 'mais de',
      anos: 'anos do coro mais antigo',
      nota: (levantamento: string) =>
        'Corais, estados e idade acompanham o diretório desta página. O total de cantores é uma ' +
        `estimativa baseada nas informações dos corais, no ${levantamento}.`,
    },
    chamar: {
      titulo: 'Como nos chamar',
      razaoSocial: 'Razão social',
      sigla: 'Sigla',
      assinatura: 'Assinatura de comunicação',
      internacional: 'Federação internacional',
      paragrafo: 'Parágrafo de apresentação',
      paraCopiar: 'Para copiar ao pé da matéria.',
      boilerplate: (d: {
        razaoSocial: string;
        sigla: string;
        assinatura: string;
        total: number;
        estados: number;
        fundacao: number;
        paises: number;
      }) =>
        `A ${d.razaoSocial} (${d.sigla}) reúne ${d.total} coros de meninos e meninas ` +
        `em ${d.estados} estados brasileiros, que cantam a liturgia e o grande repertório coral ` +
        'e promovem formação musical para crianças e adolescentes. Comunica como ' +
        `${d.assinatura} e integra a Pueri Cantores, federação internacional fundada em ` +
        `${d.fundacao} e reconhecida pela Santa Sé, presente em ${d.paises} países.`,
      copiar: 'Copiar parágrafo',
      copiado: 'Copiado',
      falhou: 'Não foi possível copiar',
    },
    marca: {
      titulo: 'A marca',
      brasao: 'Brasão da Pueri Cantores Brasil',
      texto:
        'Escudo vermelho com a cruz de Jerusalém, sobre faixa verde e amarela. O arquivo abaixo é ' +
        'vetorial: use em qualquer tamanho, impresso ou em tela, sem perda.',
      regras: [
        'Não altere as cores, as proporções nem a inclinação da faixa.',
        'Não acrescente sombra, relevo ou contorno.',
        'Reserve em volta ao menos a largura da haste da cruz.',
        'Sobre fundo escuro, use o brasão como está, ele tem contraste próprio.',
      ],
      baixar: 'Baixar o brasão em SVG',
    },
    fotografia: {
      titulo: 'Fotografia',
      p1: {
        antes:
          'As fotografias publicadas neste site são enviadas pelos próprios corais e pela ' +
          'federação, e estão na',
        link: 'galeria',
        depois:
          'em resolução de tela. Para uso editorial em alta resolução, peça à federação: cada ' +
          'pedido é encaminhado ao coral fotografado.',
      },
      paragrafos: [
        'A maior parte dos retratados é criança ou adolescente, e isso define as regras. As fotos ' +
          'mostram o coro reunido, nunca um cantor isolado, e nenhuma criança é identificada pelo ' +
          'nome, nem na legenda, nem no texto alternativo. Pedimos que a mesma regra seja mantida ' +
          'na publicação.',
        'Crédito: quando a autoria é conhecida, ela aparece na legenda da foto. Reproduza o ' +
          'crédito como publicado.',
      ],
      pedir: 'Pedir fotografias em alta resolução',
    },
    coral: {
      titulo: 'Falar com um coral',
      texto:
        'Para pauta sobre um coro específico, vá direto à fonte: cada página traz a história do coral, ' +
        'quem o conduz e os canais que ele mantém.',
    },
    apoio: {
      titulo: 'Apoio e patrocínio',
      texto:
        'Os corais filiados se sustentam com doações, editais públicos, cachês e o trabalho voluntário ' +
        'de regentes e famílias. Nenhum cobra do cantor. Quem quiser apoiar um coro específico ou a ' +
        'federação pode escrever para o contato institucional.',
    },
  },

  contato: {
    titulo: 'Contato',
    descricao: (razaoSocial: string, total: number) =>
      `Como falar com a ${razaoSocial} e com cada um dos ${total} corais filiados.`,
    abertura:
      'A federação é conduzida por voluntários que também regem, ensaiam e viajam com seus coros. A ' +
      'resposta pode não ser imediata. Escolher o assunto certo abaixo ajuda a mensagem a chegar a ' +
      'quem cuida dele.',
    caminhos: {
      filiacao: {
        titulo: 'Filiar o meu coro',
        texto: 'Apresente o coro à federação. A mensagem já abre com o roteiro do que precisamos saber.',
        secundario: 'Ver os requisitos',
      },
      imprensa: {
        titulo: 'Imprensa',
        texto: 'Pauta, entrevista, dados ou fotografia em alta resolução para publicação.',
        secundario: 'Ver o material pronto',
      },
      fotos: {
        titulo: 'Enviar fotografias',
        texto: 'Fotos novas do seu coro para a galeria. Peça de quatro a seis, do coro reunido.',
        secundario: 'Ver a galeria',
      },
      geral: {
        titulo: 'Outro assunto',
        texto: 'Qualquer coisa que não caiba acima.',
        secundario: '',
      },
    },
    escrever: 'Escrever',
    nadaAcontece: (email: string) =>
      'Os botões abrem o seu programa de e-mail com o assunto preenchido. Se nada acontecer ao ' +
      `clicar, escreva direto para ${email}.`,
    falarCoral: {
      titulo: 'Falar com um coral',
      antes:
        'Aula, audição, convite para cantar: fale direto com o coro. Estes são os canais que cada um ' +
        'mantém. Os demais estão no',
      link: 'diretório',
      depois: '.',
    },
    institucional: {
      titulo: 'Dados institucionais',
      razaoSocial: 'Razão social',
      assinatura: 'Assinatura',
      email: 'E-mail',
      telefone: 'Telefone',
      sede: 'Sede',
      cep: 'CEP',
      cnpj: 'CNPJ',
      internacional: 'Federação internacional',
    },
  },

  erro404: {
    titulo: 'Página não encontrada',
    texto: 'O endereço não existe ou mudou de lugar.',
    voltar: 'Voltar ao início',
  },
};

export type Dicionario = typeof pt;
