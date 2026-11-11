/**
 * Dicionário em espanhol neutro latino-americano. Traduzido de `pt.ts`
 * seguindo docs/guia-de-traducao.md. Tipado contra o PT: chave faltando quebra
 * o build.
 */
import type { Dicionario } from './pt.ts';
import { porExtensoEs } from '../config/extenso.ts';

export const es: Dicionario = {
  comum: {
    descricao:
      'Federación que reúne a los coros de niños y niñas de Brasil afiliados a Pueri Cantores, ' +
      'federación internacional de pequeños cantores reconocida por la Santa Sede.',
    levantamento: 'relevamiento de 2026',
    navegacao: {
      federacao: 'La federación',
      corais: 'Los coros',
      galeria: 'Galería',
      filiacao: 'Afiliación',
      contato: 'Contacto',
    },
    navPrincipal: 'Navegación principal',
    navRodape: 'Pie de página',
    inicio: (assinatura: string) => `${assinatura} — inicio`,
    menu: 'Menú',
    fecharMenu: 'Cerrar menú',
    idioma: 'Idioma',
    membro: 'Miembro de Pueri Cantores, federación internacional de pequeños cantores reconocida por la Santa Sede.',
    imagemEmBreve: 'Imagen próximamente',
    desde: (ano: number) => `desde ${ano}`,
    fotoDe: (nome: string, cidade: string) => `${nome}, en ${cidade}`,
    canais: { site: 'Sitio web', email: 'Correo electrónico' },
    cargos: {
      Regente: 'Director',
      Presidente: 'Presidente',
      Pianista: 'Pianista',
      'Preparação vocal': 'Preparación vocal',
      Direção: 'Dirección',
    },
    responde: 'La federación responde en portugués, inglés y español.',
    carrossel: {
      titulo: 'Los otros coros',
      anteriores: 'Coros anteriores',
      proximos: 'Coros siguientes',
      rotulo: 'Coros afiliados a la federación',
    },
    lightbox: {
      rotulo: 'Visor de fotografías',
      fechar: 'Cerrar',
      anterior: 'Fotografía anterior',
      proxima: 'Fotografía siguiente',
      // Molde para o script do visualizador: `{i}` e `{n}`.
      contador: '{i} de {n}',
    },
    miniGaleria: {
      titulo: 'En imágenes',
      foto: (nome: string, n: number) => `${nome} — fotografía ${n}`,
    },
  },

  emails: {
    filiacao: {
      assunto: '[ES] Interés en afiliación',
      campos: [
        'Nombre del coro:',
        'Ciudad y estado:',
        'Año de fundación:',
        'Institución que lo sostiene (parroquia, escuela, asociación):',
        'Número de cantores y rango de edad:',
        'Nombre del director:',
        'Nombre y cargo de quien escribe:',
        'Teléfono o correo para la respuesta:',
        '',
        'Cuéntenos un poco sobre el coro:',
      ],
    },
    imprensa: {
      assunto: '[ES] Prensa',
      campos: ['Medio:', 'Tema:', 'Plazo:', 'Material necesario (fotos, entrevista, datos):', '', 'Mensaje:'],
    },
    fotos: {
      assunto: '[ES] Envío de fotografías',
      campos: ['Coro:', 'Ocasión y fecha de las fotos:', 'Autoría de la fotografía:', '', 'Mensaje:'],
    },
    geral: { assunto: '[ES] Contacto desde el sitio', campos: [] as string[] },
  },

  inicio: {
    heroAlt:
      'Cientos de coristas reunidos en el XVII Congreso Nacional Pueri Cantores (XVII Congresso Nacional Pueri Cantores), en Passos, Minas Gerais',
    titulo: 'Federação Nacional',
    subtitulo: 'dos Meninos Cantores do Brasil',
    apoio: ({ cidades, maisAntigo }: { cidades: number; maisAntigo: number }) =>
      `En ${porExtensoEs(cidades, 'f')} ciudades, niños y niñas ensayan dos, tres, hasta seis veces por ` +
      `semana. Los domingos, cantan en la misa. El más antiguo de estos coros lo hace desde ${maisAntigo}.`,
    conhecer: (total: number) => `Conocer los ${total} coros`,
    comoFiliar: 'Cómo afiliarse',
    legendaHero: 'XVII Congreso Nacional Pueri Cantores (XVII Congresso Nacional) · Passos, Minas Gerais, 2022',
    oQueE: {
      titulo: ['Cantar es', 'formar personas.'],
      paragrafos: [
        'Un coro de niños no se mide solo por cómo suena. Se mide por las horas de ensayo, por la ' +
          'disciplina aprendida temprano, por el niño que descubre que su propia voz importa dentro de ' +
          'un conjunto. Es ese trabajo, artístico, litúrgico y social a la vez, lo que la federación ' +
          'existe para sostener.',
        'Nuestros coros ensayan en parroquias, monasterios y escuelas de música repartidos por el país. ' +
          'Algunos nacieron hace más de ochenta años, otros hace dos. La formación musical es parte ' +
          'central de ese trabajo.',
      ],
      historia: 'Nuestra historia',
    },
    numeros: {
      coros: 'coros en',
      estados: 'estados. Más de',
      cantores: 'niños y niñas.',
      fonte: (levantamento: string) => `Datos informados por los coros afiliados, ${levantamento}.`,
    },
    corais: {
      titulo: ['De Novo Hamburgo', 'a Petrópolis.'],
      ver: (total: number) => `Ver los ${total} coros`,
    },
    mundo: {
      titulo: ['Una federación', 'pontificia.'],
      texto:
        'Pueri Cantores nació en París, en 1944, y hoy reúne coros infantiles y juveniles en ' +
        '35 países, con el reconocimiento de la Santa Sede. Sus congresos internacionales reúnen a ' +
        'miles de jóvenes cantores para cantar la misma liturgia en lenguas diferentes. Los coros ' +
        'brasileños participan de esa red a través de esta federación.',
      destaque: 'En Brasil, desde 1967.',
      destaqueTexto:
        'La Federação Nacional dos Meninos Cantores do Brasil promueve el canto coral y la formación ' +
        'artístico-cultural, con especial atención al canto litúrgico.',
    },
    chamadas: {
      filiar: {
        titulo: 'Afiliarse a la federación',
        texto: 'Requisitos, qué cambia para su coro y cómo iniciar el proceso.',
        acao: 'Sepa cómo',
      },
      imprensa: {
        titulo: 'Prensa y apoyo',
        texto: 'Cifras, material para publicación y contacto para patrocinio.',
        acao: 'Acceder',
      },
    },
  },

  corais: {
    titulo: 'Los coros',
    descricao: (total: number, estados: number) =>
      `Los ${total} coros de niños y niñas afiliados a la federación, en ${estados} estados brasileños.`,
    h1: 'Los coros afiliados',
    resumo: (total: number, estados: number) => `${total} coros · ${estados} estados`,
    filtrar: 'Filtrar por estado',
    todos: 'Todos',
    // Moldes para o script do filtro, que roda no navegador: `{n}` e `{uf}`.
    contagemUm: '{n} coro en {uf}.',
    contagemVarios: '{n} coros en {uf}.',
  },

  coral: {
    fundadoEm: 'Fundado en',
    filiadoDesde: 'Afiliado desde',
    fotografia: (credito: string) => `Fotografía: ${credito}`,
    quemConduz: 'Quién lo dirige',
    historia: 'Historia',
    emBreve: 'Información próximamente.',
    emBreveTexto: 'Esta página se actualizará con la historia, el equipo y otros detalles del coro.',
  },

  federacao: {
    titulo: 'La federación',
    descricao: (total: number, estados: number) =>
      `La Federação Nacional dos Meninos Cantores do Brasil reúne ${total} coros de niños y niñas en ${estados} estados, dentro de Pueri Cantores internacional.`,
    abertura: (razaoSocial: string) =>
      `La ${razaoSocial} (Federación Nacional de Niños Cantores de Brasil) reúne a los coros de niños y ` +
      'niñas de Brasil que cantan la liturgia y el gran repertorio coral. Es la rama brasileña de ' +
      'Pueri Cantores, federación internacional reconocida por la Santa Sede.',
    significa: {
      titulo: ['Qué significa ser', 'un coro Pueri Cantores'],
      paragrafos: ({ maisAntigo, maisNovo }: { maisAntigo: number; maisNovo: number }) => [
        'Un coro Pueri Cantores no es un coro infantil que a veces canta en la iglesia. Es un coro que ' +
          'existe para la liturgia. Para eso, necesita enseñar música de verdad a niños que en general ' +
          'nunca tuvieron acceso a ella.',
        'Los coros ofrecen formación musical y servicio a la liturgia. Hay quienes ensayan una vez por ' +
          'semana y quienes ensayan seis. Hay coros sostenidos por una provincia franciscana y coros ' +
          `sostenidos por las familias de los propios cantores. El más antiguo canta desde ${maisAntigo}; ` +
          `el más nuevo, desde ${maisNovo}. Lo que los une es la combinación de rigor musical, formación ` +
          'humana y servicio a la celebración.',
        'La federación existe para sostener ese trabajo: reúne a los coros en congresos, representa a ' +
          'Brasil en la federación internacional y sirve de referencia para quien quiere comenzar un ' +
          'coro nuevo.',
      ],
    },
    mundo: {
      titulo: ['Una federación', 'pontificia.'],
      p1: {
        antes:
          'Una larga tradición europea de coros de niños que cantaban la liturgia tomó forma ' +
          'institucional a comienzos del siglo XX, con el motu proprio',
        documento: 'Tra le sollecitudini',
        meio: (fundador: string) =>
          ', en el que san Pío X pedía la renovación de la música en la Iglesia. En respuesta, monseñor ' +
          `${fundador} fundó en París, en 1907, los Pequeños Cantores de la Cruz de Madera (`,
        nomeFrances: 'Petits Chanteurs de la Croix de Bois',
        depois:
          '), que cantaron por la paz en muchos países después de la Primera Guerra Mundial. La Segunda ' +
          'Guerra interrumpió su actividad, pero no los destruyó.',
      },
      p2: (fundacao: number) =>
        'En julio de 1944, el arzobispo de París, cardenal Suhard, aprobó la fundación de una ' +
        'organización internacional de los Pueri Cantores como “un elemento de belleza musical en la ' +
        'Iglesia, un trabajo de educación cristiana y actividad apostólica al servicio de la liturgia”. ' +
        `La fecha oficial de fundación es el 11 de noviembre de ${fundacao}, cuando trescientos ` +
        'niños cantores dirigidos por Maillet dieron el primer concierto en la iglesia de San ' +
        'Eustaquio, en París. El primer congreso internacional se realizó en la misma ciudad, en 1947, ' +
        'con noventa coros europeos, seguido por los de Roma, en 1949 y 1951.',
      p3: ({ estatuto, paises, cantores }: { estatuto: number; paises: number; cantores: string }) =>
        `En ${estatuto} la Santa Sede aprobó el estatuto de la federación, que ` +
        'pasó a ser reconocida como movimiento eclesial, bajo la jurisdicción del Pontificio Consejo ' +
        'para los Laicos. Las reformas del estatuto de 1995 y 2001 permitieron el ingreso de niñas. ' +
        `Hoy hay coros de niños, de niñas y mixtos en ${paises} países de todos los ` +
        `continentes, con aproximadamente ${cantores} cantores. La tarea ` +
        'principal sigue siendo cantar la liturgia, y los valores cristianos son la base de la vida y ' +
        'de la conducta de sus miembros.',
      link: 'Federación internacional Pueri Cantores',
    },
    brasil: {
      titulo: 'En Brasil',
      p1: (razaoSocial: string) =>
        `La ${razaoSocial} fue fundada en 1967 por fray Leto, por el padre José Maria ` +
        'Wisniewski y por el maestro João Lucas Rodrigues. Su objetivo es fomentar, entre niños, ' +
        'adolescentes y jóvenes, el canto coral y la formación artístico-cultural, con foco en el canto ' +
        'litúrgico. Está afiliada a la Federación Internacional Pueri Cantores, con sede en Roma.',
      p2: (total: number, estados: number) =>
        `Hoy reúne ${total} coros federados de ${estados} estados. Cada tres años realiza un ` +
        'Congreso Nacional y, entre un nacional y otro, dos Congresos Regionales, alternados ' +
        'entre el Sudeste (Río de Janeiro y Minas Gerais) y el Sur (Paraná, Santa Catarina y Rio ' +
        'Grande do Sul).',
      p3: (presidente: string) =>
        `El presidente es ${presidente}, director de los Pequenos Cantores de Passos.`,
    },
    congressos: {
      titulo: 'Congresos',
      texto:
        'El congreso nacional es el encuentro que da forma a la federación: los coros se hospedan en las ' +
        'parroquias de la ciudad anfitriona y cantan juntos al cabo de algunos días de ensayo. Se ' +
        'realiza cada tres años.',
      nacionais: 'Nacionales',
      nacional: (edicao: string) =>
        edicao ? `${edicao} Congreso Nacional (${edicao} Congresso Nacional)` : 'Congreso Nacional',
      internacionais: 'Brasil en los internacionales',
      internacional: (edicao: string) =>
        edicao ? `${edicao} Congreso Internacional (${edicao} Congresso Internacional)` : 'Congreso Internacional',
      regionais: 'Regionales',
      aindaPorVir: 'Aún por venir.',
      proximos: 'Próximos encuentros',
    },
    notas: {
      virtual: 'Edición virtual.',
      fotosGaleria: 'Las fotografías de la galería son de esta edición.',
      unicoNoBrasil: 'El único congreso internacional de los Pueri Cantores realizado en Brasil.',
      previstoJulho: 'Previsto para julio.',
      pratapolis: 'Del 15 al 19 de julio.',
      latinoAmericano: 'Congreso Latinoamericano, del 17 al 21 de diciembre. Fecha sujeta a confirmación.',
    },
    lugares: {
      Online: 'En línea',
      'Roma, Itália': 'Roma, Italia',
      'Munique, Alemanha': 'Múnich, Alemania',
      Espanha: 'España',
      'São Miguelito, Panamá': 'San Miguelito, Panamá',
    },
    diretoria: {
      titulo: 'Junta directiva',
      mandato: (inicio: string, fim: string) => `Mandato: del ${inicio} al ${fim}.`,
      executiva: 'Junta ejecutiva',
      conselhoFiscal: 'Consejo Fiscal',
      titulares: 'Titulares',
      suplentes: 'Suplentes',
      cargos: {
        Presidente: 'Presidente',
        'Vice-presidente': 'Vicepresidente',
        Secretário: 'Secretario',
        'Vice-secretária': 'Vicesecretaria',
        Tesoureiro: 'Tesorero',
        'Vice-tesoureiro': 'Vicetesorero',
      },
    },
    chamadas: {
      corais: (total: number) => `Los ${total} coros afiliados`,
      filiar: 'Cómo afiliarse',
    },
  },

  filiacao: {
    titulo: 'Afiliación',
    descricao: 'Cómo un coro de niños o niñas se afilia a la Federação Nacional dos Meninos Cantores do Brasil.',
    h1: 'Afiliarse a la federación',
    abertura: (total: number, estados: number) =>
      `La federación recibe coros de niños y jóvenes que cantan la liturgia. Hoy son ${total} en ` +
      `${estados} estados. La puerta sigue abierta.`,
    soBrasil: {
      antes:
        'La afiliación es para coros de Brasil. Los coros de otros países deben buscar la federación de ' +
        'su país o',
      link: 'Pueri Cantores internacional',
      depois: '.',
    },
    muda: {
      titulo: ['Qué cambia', 'para su coro'],
      paragrafos: [
        'El congreso, principalmente. Cada tres años los coros afiliados se reúnen en una ciudad ' +
          'anfitriona, ensayan juntos durante algunos días y cantan una celebración común. Para un coro ' +
          'pequeño del interior, es la diferencia entre cantar siempre para la misma comunidad y cantar ' +
          'junto a cientos de otros niños que hacen lo mismo.',
        'Después, la red. Las historias de los afiliados están llenas de visitas de un coro a otro, ' +
          'directores que se formaron en cursos ofrecidos por coros más antiguos, coros que nacieron ' +
          'porque alguien asistió a un congreso. Es también a través de esa red que se llega a los ' +
          'congresos internacionales de Pueri Cantores.',
        'Y la pertenencia a una federación reconocida por la Santa Sede, que suele pesar en la relación ' +
          'con la diócesis, con la municipalidad y con las convocatorias de cultura.',
      ],
    },
    comum: {
      titulo: 'Lo que los afiliados tienen en común',
      texto: (total: number) =>
        `Un retrato de los ${total} coros que ya forman parte. No es la lista de requisitos formales; ` +
        'esa consta en el estatuto. El retrato ayuda a entender quién se reconoce aquí.',
      itens: [
        {
          titulo: 'Un coro de niños y jóvenes',
          texto:
            'Coros de niños, de niñas o mixtos. El rango de edad varía bastante entre los afiliados. Hay coros que reciben desde los cinco años y coros en los que excantores adultos siguen en las voces graves.',
        },
        {
          titulo: 'Canto en la liturgia',
          texto:
            'Todos los afiliados cantan regularmente en la misa. Algunos asumen la parte musical de celebraciones dos veces al mes, otros cantan todas las semanas. Es lo que distingue a un coro Pueri Cantores de un coro infantil de concierto.',
        },
        {
          titulo: 'Enseñanza musical gratuita',
          texto:
            'Ninguno de los coros afiliados le cobra al cantor. La enseñanza se sostiene por una institución, convocatorias públicas, honorarios por presentaciones, donaciones o por las propias familias.',
        },
        {
          titulo: 'Una institución detrás',
          texto:
            'Parroquia, provincia religiosa, colegio, asociación cultural o instituto de música. Varios afiliados están reconocidos de utilidad pública en su municipio o estado.',
        },
      ],
      regimento: 'El reglamento interno establece tres puntos básicos.',
      regimentoTexto:
        'El coro debe cumplir su función litúrgica, cantando al menos una vez al mes en una celebración ' +
        'eucarística; la admisión debe ser aprobada por la Asamblea General; y cada coro debe contar ' +
        'con un consejero espiritual, que debe ser sacerdote. El coro admitido recibe un certificado ' +
        'de admisión.',
    },
    cedo: {
      titulo: '¿Es demasiado pronto para nuestro coro?',
      texto: ({ mesmoAno, esperaMaxima }: { mesmoAno: number; esperaMaxima: number }) =>
        `Probablemente no. Entre los afiliados, ${porExtensoEs(mesmoAno)} se afiliaron el mismo ` +
        `año en que fueron fundados, y uno esperó ${esperaMaxima} años. Coros recién nacidos y coros ` +
        'octogenarios conviven en la misma federación, y el congreso no separa a unos de otros.',
      link: 'Ver cuándo se afilió cada coro',
    },
    comecar: {
      titulo: 'Cómo empezar',
      texto:
        'Escriba a la federación presentando el coro. El botón de abajo abre un mensaje con los campos ' +
        'que la federación necesita saber ya completados como guía. Responda lo que sepa y borre el ' +
        'resto.',
      botao: 'Presentar mi coro',
      ouEscreva: 'O escriba directamente a',
      dados:
        'No envíe datos personales de los cantores, como nombre completo, fecha de nacimiento, dirección ' +
        'o teléfono de niños y adolescentes. La federación no los necesita para evaluar una afiliación, ' +
        'y este sitio no publica ninguno.',
    },
  },

  galeria: {
    titulo: 'Galería',
    descricao: (comFoto: number, total: number) =>
      `Fotografías de ${comFoto} de los ${total} coros afiliados y de los congresos de la federación.`,
    abertura:
      'Los coros afiliados y los encuentros que los reúnen. Las fotografías son enviadas por los propios ' +
      'coros y por la federación. Haga clic en cualquier imagen para verla en pantalla completa.',
    corais: 'Los coros',
    congressos: 'Congresos',
    legendaCongresso: 'XVII Congreso Nacional Pueri Cantores · Passos, Minas Gerais, 2022',
    congressoTexto:
      'XVII Congreso Nacional Pueri Cantores (XVII Congresso Nacional Pueri Cantores), en Passos, Minas Gerais, octubre de 2022.',
    creditoCongresso: 'Fotografías de la Provincia Franciscana de la Inmaculada Concepción de Brasil.',
    total: {
      antes: (total: number) =>
        `Son ${total} fotografías. La federación reúne material nuevo en cada congreso y con cada envío de ` +
        'los coros afiliados; si su coro tiene fotos para agregar,',
      link: 'escríbanos',
      depois: '.',
    },
  },

  imprensa: {
    titulo: 'Prensa',
    descricao: (razaoSocial: string) =>
      `Material para publicación sobre la ${razaoSocial}: cifras, marca, política de imagen y contacto.`,
    h1: 'Prensa y apoyo',
    abertura:
      'Lo que necesita para escribir sobre la federación, con los datos fechados y la marca en archivo ' +
      'vectorial. Para entrevistas, fotos en alta resolución o un tema específico, escriba; la ' +
      'federación responde.',
    falar: 'Contactar a la federación',
    numeros: {
      titulo: 'Las cifras',
      corais: 'coros afiliados',
      estados: 'estados',
      cantores: 'cantores',
      maisDe: 'más de',
      anos: 'años del coro más antiguo',
      nota: (levantamento: string) =>
        'Coros, estados y antigüedad siguen el directorio de este sitio. El total de cantores es una ' +
        `estimación basada en la información de los coros, ${levantamento}.`,
    },
    chamar: {
      titulo: 'Cómo nombrarnos',
      razaoSocial: 'Razón social',
      sigla: 'Sigla',
      assinatura: 'Nombre de comunicación',
      internacional: 'Federación internacional',
      paragrafo: 'Párrafo de presentación',
      paraCopiar: 'Para copiar al pie de la nota.',
      boilerplate: (d: {
        razaoSocial: string;
        sigla: string;
        assinatura: string;
        total: number;
        estados: number;
        fundacao: number;
        paises: number;
      }) =>
        `La ${d.razaoSocial} (${d.sigla}) reúne ${d.total} coros de niños y niñas ` +
        `en ${d.estados} estados brasileños, que cantan la liturgia y el gran repertorio coral ` +
        'y promueven la formación musical de niños y adolescentes. Se comunica como ' +
        `${d.assinatura} e integra Pueri Cantores, federación internacional fundada en ` +
        `${d.fundacao} y reconocida por la Santa Sede, presente en ${d.paises} países.`,
      copiar: 'Copiar párrafo',
      copiado: 'Copiado',
      falhou: 'No se pudo copiar',
    },
    marca: {
      titulo: 'La marca',
      brasao: 'Escudo de Pueri Cantores Brasil',
      texto:
        'Escudo rojo con la cruz de Jerusalén, sobre una franja verde y amarilla. El archivo de abajo es ' +
        'vectorial: úselo en cualquier tamaño, impreso o en pantalla, sin pérdida.',
      regras: [
        'No altere los colores, las proporciones ni la inclinación de la franja.',
        'No agregue sombra, relieve ni contorno.',
        'Deje alrededor al menos el ancho del brazo de la cruz.',
        'Sobre fondo oscuro, use el escudo tal como está; tiene contraste propio.',
      ],
      baixar: 'Descargar el escudo en SVG',
    },
    fotografia: {
      titulo: 'Fotografía',
      p1: {
        antes:
          'Las fotografías publicadas en este sitio son enviadas por los propios coros y por la ' +
          'federación, y están en la',
        link: 'galería',
        depois:
          'en resolución de pantalla. Para uso editorial en alta resolución, pídalas a la federación: ' +
          'cada pedido se envía al coro fotografiado.',
      },
      paragrafos: [
        'La mayor parte de los retratados son niños o adolescentes, y eso define las reglas. Las fotos ' +
          'muestran al coro reunido, nunca a un cantor aislado, y ningún niño es identificado por su ' +
          'nombre, ni en la leyenda ni en el texto alternativo. Pedimos que la misma regla se mantenga ' +
          'en la publicación.',
        'Crédito: cuando se conoce la autoría, aparece en la leyenda de la foto. Reproduzca el ' +
          'crédito tal como fue publicado.',
      ],
      pedir: 'Pedir fotografías en alta resolución',
    },
    coral: {
      titulo: 'Hablar con un coro',
      texto:
        'Para una nota sobre un coro específico, vaya directo a la fuente: cada página trae la historia ' +
        'del coro, quién lo dirige y los canales que mantiene.',
    },
    apoio: {
      titulo: 'Apoyo y patrocinio',
      texto:
        'Los coros afiliados se sostienen con donaciones, convocatorias públicas, honorarios y el trabajo ' +
        'voluntario de directores y familias. Ninguno le cobra al cantor. Quien quiera apoyar a un coro ' +
        'específico o a la federación puede escribir al contacto institucional.',
    },
  },

  contato: {
    titulo: 'Contacto',
    descricao: (razaoSocial: string, total: number) =>
      `Cómo comunicarse con la ${razaoSocial} y con cada uno de los ${total} coros afiliados.`,
    abertura:
      'La federación está a cargo de voluntarios que también dirigen, ensayan y viajan con sus coros. La ' +
      'respuesta puede no ser inmediata. Elegir el asunto correcto abajo ayuda a que el mensaje llegue a ' +
      'quien se ocupa de él.',
    caminhos: {
      filiacao: {
        titulo: 'Afiliar mi coro',
        texto: 'Presente el coro a la federación. El mensaje ya se abre con la guía de lo que necesitamos saber.',
        secundario: 'Ver los requisitos',
      },
      imprensa: {
        titulo: 'Prensa',
        texto: 'Temas, entrevistas, datos o fotografías en alta resolución para publicación.',
        secundario: 'Ver el material listo',
      },
      fotos: {
        titulo: 'Enviar fotografías',
        texto: 'Fotos nuevas de su coro para la galería. Entre cuatro y seis, del coro reunido.',
        secundario: 'Ver la galería',
      },
      geral: {
        titulo: 'Otro asunto',
        texto: 'Cualquier cosa que no quepa arriba.',
        secundario: '',
      },
    },
    escrever: 'Escribir',
    nadaAcontece: (email: string) =>
      'Los botones abren su programa de correo con el asunto completado. Si no pasa nada al hacer ' +
      `clic, escriba directamente a ${email}.`,
    falarCoral: {
      titulo: 'Hablar con un coro',
      antes:
        'Clases, audiciones, una invitación para cantar: hable directamente con el coro. Estos son los ' +
        'canales que cada uno mantiene. Los demás están en el',
      link: 'directorio',
      depois: '.',
    },
    institucional: {
      titulo: 'Datos institucionales',
      razaoSocial: 'Razón social',
      assinatura: 'Nombre de comunicación',
      email: 'Correo electrónico',
      telefone: 'Teléfono',
      sede: 'Sede',
      cep: 'Código postal',
      cnpj: 'CNPJ (registro fiscal brasileño)',
      internacional: 'Federación internacional',
    },
  },

  erro404: {
    titulo: 'Página no encontrada',
    texto: 'La dirección no existe o cambió de lugar.',
    voltar: 'Volver al inicio',
  },
};
