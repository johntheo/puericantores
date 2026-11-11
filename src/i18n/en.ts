/**
 * Dicionário em inglês americano. Traduzido de `pt.ts` seguindo
 * docs/guia-de-traducao.md. Tipado contra o PT: chave faltando quebra o build.
 */
import type { Dicionario } from './pt.ts';
import { porExtensoEn } from '../config/extenso.ts';

export const en: Dicionario = {
  comum: {
    descricao:
      'Federation of the Brazilian boys’ and girls’ choirs affiliated with Pueri Cantores, ' +
      'the international federation of young singers recognized by the Holy See.',
    levantamento: '2026 survey',
    navegacao: {
      federacao: 'The federation',
      corais: 'The choirs',
      galeria: 'Gallery',
      filiacao: 'Membership',
      contato: 'Contact',
    },
    navPrincipal: 'Main navigation',
    navRodape: 'Footer',
    inicio: (assinatura: string) => `${assinatura} — home`,
    menu: 'Menu',
    fecharMenu: 'Close menu',
    idioma: 'Language',
    membro: 'Member of Pueri Cantores, the international federation of young singers recognized by the Holy See.',
    imagemEmBreve: 'Image coming soon',
    desde: (ano: number) => `since ${ano}`,
    fotoDe: (nome: string, cidade: string) => `${nome}, in ${cidade}`,
    canais: { site: 'Website', email: 'Email' },
    cargos: {
      Regente: 'Conductor',
      Presidente: 'President',
      Pianista: 'Pianist',
      'Preparação vocal': 'Vocal coach',
      Direção: 'Director',
    },
    responde: 'The federation replies in Portuguese, English and Spanish.',
    carrossel: {
      titulo: 'The other choirs',
      anteriores: 'Previous choirs',
      proximos: 'Next choirs',
      rotulo: 'Choirs affiliated with the federation',
    },
    lightbox: {
      rotulo: 'Photo viewer',
      fechar: 'Close',
      anterior: 'Previous photo',
      proxima: 'Next photo',
      // Molde para o script do visualizador: `{i}` e `{n}`.
      contador: '{i} of {n}',
    },
    miniGaleria: {
      titulo: 'In pictures',
      foto: (nome: string, n: number) => `${nome} — photo ${n}`,
    },
  },

  emails: {
    filiacao: {
      assunto: '[EN] Membership inquiry',
      campos: [
        'Choir name:',
        'City and state:',
        'Year founded:',
        'Sponsoring institution (parish, school, association):',
        'Number of singers and age range:',
        'Conductor’s name:',
        'Name and role of the person writing:',
        'Phone or email for reply:',
        '',
        'Tell us a little about the choir:',
      ],
    },
    imprensa: {
      assunto: '[EN] Press',
      campos: ['Outlet:', 'Story:', 'Deadline:', 'Material needed (photos, interview, data):', '', 'Message:'],
    },
    fotos: {
      assunto: '[EN] Photo submission',
      campos: ['Choir:', 'Occasion and date of the photos:', 'Photographer:', '', 'Message:'],
    },
    geral: { assunto: '[EN] Contact from the website', campos: [] as string[] },
  },

  inicio: {
    heroAlt:
      'Hundreds of choristers gathered at the 17th Pueri Cantores National Congress (XVII Congresso Nacional Pueri Cantores), in Passos, Minas Gerais',
    titulo: 'Federação Nacional',
    subtitulo: 'dos Meninos Cantores do Brasil',
    apoio: ({ cidades, maisAntigo }: { cidades: number; maisAntigo: number }) =>
      `In ${porExtensoEn(cidades)} cities, boys and girls rehearse two, three, even six times a ` +
      `week. On Sundays, they sing at Mass. The oldest of these choirs has been doing so since ${maisAntigo}.`,
    conhecer: (total: number) => `Meet the ${total} choirs`,
    comoFiliar: 'How to join',
    legendaHero: '17th Pueri Cantores National Congress (XVII Congresso Nacional) · Passos, Minas Gerais, 2022',
    oQueE: {
      titulo: ['Singing is', 'shaping people.'],
      paragrafos: [
        'A boys’ choir is not measured only by how it sounds. It is measured by hours of rehearsal, by ' +
          'discipline learned early, by the child who discovers that their own voice matters within an ' +
          'ensemble. That work, artistic, liturgical and social all at once, is what the federation ' +
          'exists to sustain.',
        'Our choirs rehearse in parishes, monasteries and music schools across the country. Some were ' +
          'born more than eighty years ago, others two. Musical training is central to this work.',
      ],
      historia: 'Our history',
    },
    numeros: {
      coros: 'choirs in',
      estados: 'states. More than',
      cantores: 'boys and girls.',
      fonte: (levantamento: string) => `Data reported by the member choirs, ${levantamento}.`,
    },
    corais: {
      titulo: ['From Novo Hamburgo', 'to Petrópolis.'],
      ver: (total: number) => `See the ${total} choirs`,
    },
    mundo: {
      titulo: ['A pontifical', 'federation.'],
      texto:
        'Pueri Cantores was born in Paris in 1944 and today brings together children’s and youth choirs in ' +
        '35 countries, recognized by the Holy See. Its international congresses gather thousands of ' +
        'young singers to sing the same liturgy in different languages. Brazilian choirs take part in ' +
        'this network through this federation.',
      destaque: 'In Brazil since 1967.',
      destaqueTexto:
        'The Federação Nacional dos Meninos Cantores do Brasil promotes choral singing and artistic and ' +
        'cultural education, with special attention to liturgical singing.',
    },
    chamadas: {
      filiar: {
        titulo: 'Join the federation',
        texto: 'Requirements, what changes for your choir and how to start the process.',
        acao: 'Learn how',
      },
      imprensa: {
        titulo: 'Press and support',
        texto: 'Facts and figures, material for publication and sponsorship contact.',
        acao: 'Go',
      },
    },
  },

  corais: {
    titulo: 'The choirs',
    descricao: (total: number, estados: number) =>
      `The ${total} boys’ and girls’ choirs affiliated with the federation, in ${estados} Brazilian states.`,
    h1: 'The member choirs',
    resumo: (total: number, estados: number) => `${total} choirs · ${estados} states`,
    filtrar: 'Filter by state',
    todos: 'All',
    // Moldes para o script do filtro, que roda no navegador: `{n}` e `{uf}`.
    contagemUm: '{n} choir in {uf}.',
    contagemVarios: '{n} choirs in {uf}.',
  },

  coral: {
    fundadoEm: 'Founded',
    filiadoDesde: 'Member since',
    fotografia: (credito: string) => `Photo: ${credito}`,
    quemConduz: 'Who leads',
    historia: 'History',
    emBreve: 'Information coming soon.',
    emBreveTexto: 'This page will be updated with the choir’s history, team and other details.',
  },

  federacao: {
    titulo: 'The federation',
    descricao: (total: number, estados: number) =>
      `The Federação Nacional dos Meninos Cantores do Brasil brings together ${total} boys’ and girls’ choirs in ${estados} states, within international Pueri Cantores.`,
    abertura: (razaoSocial: string) =>
      `The ${razaoSocial} (National Federation of Boy Singers of Brazil) brings together the Brazilian ` +
      'boys’ and girls’ choirs that sing the liturgy and the great choral repertoire. It is the ' +
      'Brazilian branch of Pueri Cantores, the international federation recognized by the Holy See.',
    significa: {
      titulo: ['What it means to be', 'a Pueri Cantores choir'],
      paragrafos: ({ maisAntigo, maisNovo }: { maisAntigo: number; maisNovo: number }) => [
        'A Pueri Cantores choir is not a children’s choir that sometimes sings in church. It is a choir ' +
          'that exists for the liturgy. To do that, it has to teach real music to children who, as a ' +
          'rule, have never had access to it.',
        'The choirs offer musical training and service to the liturgy. Some rehearse once a week and ' +
          'some six times. Some choirs are supported by a Franciscan province and some by the families ' +
          `of the singers themselves. The oldest has sung since ${maisAntigo}; the newest, since ` +
          `${maisNovo}. What brings them together is the combination of musical rigor, human formation ` +
          'and service to the celebration.',
        'The federation exists to sustain that work: it gathers the choirs at congresses, represents ' +
          'Brazil in the international federation and serves as a reference for anyone who wants to ' +
          'start a new choir.',
      ],
    },
    mundo: {
      titulo: ['A pontifical', 'federation.'],
      p1: {
        antes:
          'A long European tradition of boys’ choirs singing the liturgy took institutional form at the ' +
          'beginning of the 20th century, with the motu proprio',
        documento: 'Tra le sollecitudini',
        meio: (fundador: string) =>
          ', in which Saint Pius X called for the renewal of music in the Church. In response, Monsignor ' +
          `${fundador} founded in Paris, in 1907, the Little Singers of the Wooden Cross (`,
        nomeFrances: 'Petits Chanteurs de la Croix de Bois',
        depois:
          '), who sang for peace in many countries after the First World War. The Second World War ' +
          'interrupted their activity, but did not destroy them.',
      },
      p2: (fundacao: number) =>
        'In July 1944, the Archbishop of Paris, Cardinal Suhard, approved the founding of an ' +
        'international organization of Pueri Cantores as “an element of musical beauty in the Church, ' +
        'a work of Christian education and apostolic activity in the service of the liturgy.” The ' +
        `official founding date is November 11, ${fundacao}, when three hundred boy singers ` +
        'conducted by Maillet gave the first concert at the Church of Saint-Eustache in Paris. The ' +
        'first international congress took place in the same city in 1947, with ninety European ' +
        'choirs, followed by those in Rome in 1949 and 1951.',
      p3: ({ estatuto, paises, cantores }: { estatuto: number; paises: number; cantores: string }) =>
        `In ${estatuto} the Holy See approved the federation’s statutes, and it came to be ` +
        'recognized as an ecclesial movement, under the jurisdiction of the Pontifical Council for the ' +
        'Laity. Reforms of the statutes in 1995 and 2001 allowed girls to join. Today there are ' +
        `boys’, girls’ and mixed choirs in ${paises} countries on every continent, with ` +
        `approximately ${cantores} singers. The main task is still to sing the liturgy, and ` +
        'Christian values are the foundation of the life and conduct of its members.',
      link: 'International Pueri Cantores federation',
    },
    brasil: {
      titulo: 'In Brazil',
      p1: (razaoSocial: string) =>
        `The ${razaoSocial} was founded in 1967 by Friar Leto, Father José Maria ` +
        'Wisniewski and conductor João Lucas Rodrigues. Its aim is to foster choral singing and ' +
        'artistic and cultural education among children, adolescents and young people, with a focus ' +
        'on liturgical singing. It is affiliated with the International Federation of Pueri ' +
        'Cantores, headquartered in Rome.',
      p2: (total: number, estados: number) =>
        `Today it brings together ${total} member choirs from ${estados} states. Every three years it ` +
        'holds a National Congress and, between one national congress and the next, two Regional ' +
        'Congresses, alternating between the Southeast (Rio de Janeiro and Minas Gerais) and the South ' +
        '(Paraná, Santa Catarina and Rio Grande do Sul).',
      p3: (presidente: string) =>
        `The president is ${presidente}, conductor of the Pequenos Cantores de Passos.`,
    },
    congressos: {
      titulo: 'Congresses',
      texto:
        'The national congress is the gathering that gives the federation its shape: the choirs stay in ' +
        'the parishes of the host city and sing together after a few days of rehearsal. It takes place ' +
        'every three years.',
      nacionais: 'National',
      nacional: (edicao: string) =>
        edicao ? `${edicao} National Congress (${edicao} Congresso Nacional)` : 'National Congress',
      internacionais: 'Brazil at the international congresses',
      internacional: (edicao: string) =>
        edicao ? `${edicao} International Congress (${edicao} Congresso Internacional)` : 'International Congress',
      regionais: 'Regional',
      aindaPorVir: 'Still to come.',
      proximos: 'Upcoming gatherings',
    },
    notas: {
      virtual: 'Virtual edition.',
      fotosGaleria: 'The photos in the gallery are from this edition.',
      unicoNoBrasil: 'The only Pueri Cantores international congress ever held in Brazil.',
      previstoJulho: 'Planned for July.',
      pratapolis: 'July 15 to 19.',
      latinoAmericano: 'Latin American Congress, December 17 to 21. Date to be confirmed.',
    },
    lugares: {
      Online: 'Online',
      'Roma, Itália': 'Rome, Italy',
      'Munique, Alemanha': 'Munich, Germany',
      Espanha: 'Spain',
      'São Miguelito, Panamá': 'San Miguelito, Panama',
    },
    diretoria: {
      titulo: 'Board',
      mandato: (inicio: string, fim: string) => `Term: ${inicio} to ${fim}.`,
      executiva: 'Executive board',
      conselhoFiscal: 'Audit Committee',
      titulares: 'Members',
      suplentes: 'Alternates',
      cargos: {
        Presidente: 'President',
        'Vice-presidente': 'Vice President',
        Secretário: 'Secretary',
        'Vice-secretária': 'Deputy Secretary',
        Tesoureiro: 'Treasurer',
        'Vice-tesoureiro': 'Deputy Treasurer',
      },
    },
    chamadas: {
      corais: (total: number) => `The ${total} member choirs`,
      filiar: 'How to join',
    },
  },

  filiacao: {
    titulo: 'Membership',
    descricao: 'How a boys’ or girls’ choir joins the Federação Nacional dos Meninos Cantores do Brasil.',
    h1: 'Join the federation',
    abertura: (total: number, estados: number) =>
      `The federation welcomes children’s and youth choirs that sing the liturgy. Today there are ${total} ` +
      `in ${estados} states. The door remains open.`,
    soBrasil: {
      antes:
        'Membership is for choirs in Brazil. Choirs from other countries should contact their own ' +
        'national federation or',
      link: 'international Pueri Cantores',
      depois: '.',
    },
    muda: {
      titulo: ['What changes', 'for your choir'],
      paragrafos: [
        'The congress, above all. Every three years the member choirs gather in a host city, rehearse ' +
          'together for a few days and sing a common celebration. For a small choir from the interior, ' +
          'it is the difference between always singing for the same community and singing alongside ' +
          'hundreds of other children who do the same thing.',
        'Then, the network. The histories of the member choirs are full of visits from one choir to ' +
          'another, conductors trained in courses offered by older choirs, choirs born because someone ' +
          'attended a congress. It is also through this network that choirs reach the international ' +
          'Pueri Cantores congresses.',
        'And belonging to a federation recognized by the Holy See, which tends to carry weight in ' +
          'dealings with the diocese, the city government and cultural funding calls.',
      ],
    },
    comum: {
      titulo: 'What member choirs have in common',
      texto: (total: number) =>
        `A portrait of the ${total} choirs that are already members. It is not the list of formal ` +
        'requirements; those are in the statutes. The portrait helps you see who recognizes themselves here.',
      itens: [
        {
          titulo: 'A choir of children and young people',
          texto:
            'Boys’, girls’ or mixed choirs. The age range varies widely among members. Some choirs take singers from age five, and in some, former singers stay on as adults in the lower voices.',
        },
        {
          titulo: 'Singing at the liturgy',
          texto:
            'All member choirs sing regularly at Mass. Some take on the music for celebrations twice a month, others sing every week. This is what sets a Pueri Cantores choir apart from a children’s concert choir.',
        },
        {
          titulo: 'Free music education',
          texto:
            'None of the member choirs charges its singers. Teaching is funded by a sponsoring institution, public grants, performance fees, donations or the families themselves.',
        },
        {
          titulo: 'An institution behind it',
          texto:
            'A parish, religious province, school, cultural association or music institute. Several members are officially recognized as public-interest organizations by their city or state.',
        },
      ],
      regimento: 'The internal rules set three basic points.',
      regimentoTexto:
        'The choir must fulfill its liturgical role, singing at least once a month at a Eucharistic ' +
        'celebration; admission must be approved by the General Assembly; and each choir must have a ' +
        'spiritual adviser, who must be a priest. An admitted choir receives a certificate of admission.',
    },
    cedo: {
      titulo: 'Is it too early for our choir?',
      texto: ({ mesmoAno, esperaMaxima }: { mesmoAno: number; esperaMaxima: number }) =>
        `Probably not. Among the members, ${porExtensoEn(mesmoAno)} joined in the same year they were ` +
        `founded, and one waited ${esperaMaxima} years. Newborn choirs and octogenarian choirs live ` +
        'side by side in the same federation, and the congress does not set one apart from the other.',
      link: 'See when each choir joined',
    },
    comecar: {
      titulo: 'How to start',
      texto:
        'Write to the federation introducing your choir. The button below opens a message already filled ' +
        'in with the fields the federation needs to know, as a guide. Answer what you can and delete ' +
        'the rest.',
      botao: 'Introduce my choir',
      ouEscreva: 'Or write directly to',
      dados:
        'Do not send singers’ personal data, such as full name, date of birth, address or phone number ' +
        'of children and adolescents. The federation does not need them to assess a membership ' +
        'application, and this site publishes none.',
    },
  },

  galeria: {
    titulo: 'Gallery',
    descricao: (comFoto: number, total: number) =>
      `Photos of ${comFoto} of the ${total} member choirs and of the federation’s congresses.`,
    abertura:
      'The member choirs and the gatherings that bring them together. The photos are sent by the choirs ' +
      'themselves and by the federation. Click any image to view it full screen.',
    corais: 'The choirs',
    congressos: 'Congresses',
    legendaCongresso: '17th Pueri Cantores National Congress · Passos, Minas Gerais, 2022',
    congressoTexto:
      '17th Pueri Cantores National Congress (XVII Congresso Nacional Pueri Cantores), in Passos, Minas Gerais, October 2022.',
    creditoCongresso: 'Photos by the Franciscan Province of the Immaculate Conception of Brazil.',
    total: {
      antes: (total: number) =>
        `There are ${total} photos. The federation gathers new material at each congress and with each ` +
        'submission from member choirs; if your choir has photos to add,',
      link: 'get in touch',
      depois: '.',
    },
  },

  imprensa: {
    titulo: 'Press',
    descricao: (razaoSocial: string) =>
      `Material for publication about the ${razaoSocial}: facts and figures, logo, image policy and contact.`,
    h1: 'Press and support',
    abertura:
      'What you need to write about the federation, with dated figures and the logo as a vector file. ' +
      'For an interview, a high-resolution photo or a specific story, write to us; the federation replies.',
    falar: 'Contact the federation',
    numeros: {
      titulo: 'Facts and figures',
      corais: 'member choirs',
      estados: 'states',
      cantores: 'singers',
      maisDe: 'more than',
      anos: 'years of the oldest choir',
      nota: (levantamento: string) =>
        'Choirs, states and age follow this site’s directory. The total number of singers is an ' +
        `estimate based on information from the choirs, ${levantamento}.`,
    },
    chamar: {
      titulo: 'How to refer to us',
      razaoSocial: 'Legal name',
      sigla: 'Acronym',
      assinatura: 'Public name',
      internacional: 'International federation',
      paragrafo: 'Boilerplate',
      paraCopiar: 'To copy at the end of your story.',
      boilerplate: (d: {
        razaoSocial: string;
        sigla: string;
        assinatura: string;
        total: number;
        estados: number;
        fundacao: number;
        paises: number;
      }) =>
        `The ${d.razaoSocial} (${d.sigla}) brings together ${d.total} boys’ and girls’ choirs ` +
        `in ${d.estados} Brazilian states that sing the liturgy and the great choral repertoire ` +
        'and provide musical training for children and adolescents. It goes by ' +
        `${d.assinatura} and is part of Pueri Cantores, the international federation founded in ` +
        `${d.fundacao} and recognized by the Holy See, present in ${d.paises} countries.`,
      copiar: 'Copy paragraph',
      copiado: 'Copied',
      falhou: 'Could not copy',
    },
    marca: {
      titulo: 'The logo',
      brasao: 'Pueri Cantores Brasil coat of arms',
      texto:
        'A red shield with the Jerusalem cross, over a green and yellow band. The file below is a vector: ' +
        'use it at any size, in print or on screen, without loss.',
      regras: [
        'Do not change the colors, the proportions or the slant of the band.',
        'Do not add shadows, embossing or outlines.',
        'Leave clear space around it at least as wide as the arm of the cross.',
        'On dark backgrounds, use the coat of arms as it is; it has its own contrast.',
      ],
      baixar: 'Download the coat of arms as SVG',
    },
    fotografia: {
      titulo: 'Photography',
      p1: {
        antes:
          'The photos published on this site are sent by the choirs themselves and by the federation, ' +
          'and are in the',
        link: 'gallery',
        depois:
          'at screen resolution. For high-resolution editorial use, ask the federation: each request ' +
          'is forwarded to the choir in the photo.',
      },
      paragrafos: [
        'Most of the people pictured are children or adolescents, and that sets the rules. Photos show ' +
          'the choir together, never a single singer, and no child is identified by name, either in the ' +
          'caption or in the alt text. We ask that the same rule be kept in publication.',
        'Credit: when the photographer is known, their name appears in the photo caption. Reproduce the ' +
          'credit as published.',
      ],
      pedir: 'Request high-resolution photos',
    },
    coral: {
      titulo: 'Talk to a choir',
      texto:
        'For a story about a specific choir, go straight to the source: each page has the choir’s ' +
        'history, who leads it and the channels it maintains.',
    },
    apoio: {
      titulo: 'Support and sponsorship',
      texto:
        'The member choirs are funded by donations, public grants, performance fees and the volunteer ' +
        'work of conductors and families. None charges its singers. Anyone who wishes to support a ' +
        'specific choir or the federation can write to the institutional contact.',
    },
  },

  contato: {
    titulo: 'Contact',
    descricao: (razaoSocial: string, total: number) =>
      `How to reach the ${razaoSocial} and each of the ${total} member choirs.`,
    abertura:
      'The federation is run by volunteers who also conduct, rehearse and travel with their choirs. A ' +
      'reply may not be immediate. Choosing the right subject below helps your message reach the person ' +
      'who handles it.',
    caminhos: {
      filiacao: {
        titulo: 'Join with my choir',
        texto: 'Introduce your choir to the federation. The message opens with a guide to what we need to know.',
        secundario: 'See the requirements',
      },
      imprensa: {
        titulo: 'Press',
        texto: 'Stories, interviews, data or high-resolution photos for publication.',
        secundario: 'See the ready-made material',
      },
      fotos: {
        titulo: 'Send photos',
        texto: 'New photos of your choir for the gallery. Four to six, of the whole choir together.',
        secundario: 'See the gallery',
      },
      geral: {
        titulo: 'Something else',
        texto: 'Anything that does not fit above.',
        secundario: '',
      },
    },
    escrever: 'Write',
    nadaAcontece: (email: string) =>
      'The buttons open your email program with the subject filled in. If nothing happens when you ' +
      `click, write directly to ${email}.`,
    falarCoral: {
      titulo: 'Talk to a choir',
      antes:
        'Lessons, auditions, an invitation to sing: talk directly to the choir. These are the channels ' +
        'each one maintains. The rest are in the',
      link: 'directory',
      depois: '.',
    },
    institucional: {
      titulo: 'Institutional details',
      razaoSocial: 'Legal name',
      assinatura: 'Public name',
      email: 'Email',
      telefone: 'Phone',
      sede: 'Headquarters',
      cep: 'Postal code',
      cnpj: 'CNPJ (Brazilian tax ID)',
      internacional: 'International federation',
    },
  },

  erro404: {
    titulo: 'Page not found',
    texto: 'This address does not exist or has moved.',
    voltar: 'Back to home',
  },
};
