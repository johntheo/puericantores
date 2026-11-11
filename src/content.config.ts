import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Coleção dos corais filiados.
 *
 * A fonte hoje é JSON versionado no repositório. Quando a federação migrar
 * para um CMS headless, troca-se APENAS o `loader` abaixo — o schema e todos
 * os componentes que o consomem permanecem intactos. Esse é o motivo de o
 * projeto ser Astro (ver BRIEFING.md, seção 4).
 *
 * O schema é deliberadamente restritivo: campos que a decisão de LGPD proíbe
 * publicar (endereço residencial, data de nascimento, telefone pessoal) não
 * existem aqui. Não é esquecimento — é o schema impedindo que sejam
 * publicados por engano no futuro.
 */
const corais = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/corais' }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      /** Como o coral é chamado quando o nome completo não cabe. */
      nomeCurto: z.string().optional(),

      cidade: z.string(),
      uf: z.enum(['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']),

      /** Ano de fundação do coro. */
      fundacao: z.number().int().min(1800).max(2100).optional(),
      /** Ano de entrada na federação. */
      filiacao: z.number().int().min(1800).max(2100).optional(),

      /**
       * Histórico reescrito em registro editorial comum, 150 a 250 palavras.
       * Fonte: PDF que cada coral anexou ao cadastro. Cada coral revisa o seu
       * antes da publicação.
       */
      historico: z.string(),

      /**
       * Marca que o histórico ainda não foi reescrito a partir do PDF de
       * origem. Páginas assim exibem aviso e não vão ao ar.
       */
      historicoPendente: z.boolean().default(false),

      /** Frase de uma linha para o card no diretório e na home. */
      resumo: z.string().max(180),

      foto: image().optional(),
      /** Crédito da fotografia, quando informado. */
      fotoCredito: z.string().optional(),

      /**
       * Fotos além da principal. Hoje nenhum coral tem: o cadastro pedia uma
       * só. A mini galeria na página do coral aparece quando houver duas ou
       * mais aqui e desaparece sozinha enquanto não houver — nada de moldura
       * vazia esperando conteúdo.
       */
      galeria: z.array(image()).default([]),

      /**
       * Apenas nome e cargo. Telefone, endereço e data de nascimento constam
       * do cadastro da federação e NÃO são publicáveis.
       */
      equipe: z
        .array(
          z.object({
            nome: z.string(),
            cargo: z.enum(['Regente', 'Presidente', 'Pianista', 'Preparação vocal', 'Direção']),
          })
        )
        .default([]),

      /** Somente canais institucionais do coral. Nada de contato pessoal. */
      contato: z
        .object({
          email: z.string().email().optional(),
          site: z.string().url().optional(),
          instagram: z.string().url().optional(),
          youtube: z.string().url().optional(),
          facebook: z.string().url().optional(),
          twitter: z.string().url().optional(),
        })
        .default({}),

      /** Aparece entre os corais em destaque na home. */
      destaque: z.boolean().default(false),
    }),
});

export const collections = { corais };
