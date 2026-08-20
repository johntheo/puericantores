# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro + TypeScript, conteúdo em JSON versionado validado por schema Zod, saída
estática. Escolhido para que a troca do loader por um CMS headless no futuro
não toque em nenhum componente. Hospedagem no Firebase do próprio cliente,
ainda não configurada. Domínio definido: puericantores.com.br (hoje não
registrado; a federação já teve site nele, arquivado no Wayback até maio/2025).

## Users

**Primário: os próprios corais filiados** — regências, diretorias e famílias
dos doze coros. O sucesso do projeto foi definido pelo cliente como *orgulho
dos filiados*: os corais precisam se reconhecer no site a ponto de usá-lo como
cartão de visitas deles também.

Secundários, na ordem: público geral que quer conhecer a federação; regências
de coros ainda não filiados avaliando entrar; imprensa e potenciais
patrocinadores.

Sem restrição conhecida de dispositivo, conexão ou acessibilidade. Padrão
adotado: WCAG 2.2 AA.

## Product Purpose

Cartão de visitas institucional da federação e diretório dos corais filiados.
Existe para dar existência pública e digna a uma rede que hoje só se vê nos
congressos, e para que cada coro tenha uma página que o represente.

## Positioning

Federação nacional filiada à Pueri Cantores, federação internacional de pueris
cantores reconhecida pela Santa Sé. O que nenhum vizinho pode copiar com
verdade: doze coros reais, com nome, cidade, regente e data de fundação
verificáveis, o mais antigo em atividade desde 1942, reunidos em congressos
nacionais documentados.

## Operating Context

Os coros ensaiam em paróquias, mosteiros e escolas de música, de uma a seis
vezes por semana, e cantam missa. Vestem batina vermelha com sobrepeliz branca
— o uniforme da Pueri Cantores no mundo inteiro. Reúnem-se em congressos
nacionais periódicos: XIV Regional Sul em Itajaí (2016), XV Regional Sudeste
em Juiz de Fora (2018), XVII Nacional em Passos (2022), XVIII Nacional em
Santa Luzia (2025).

## Capabilities and Constraints

- Site estático, sem área logada e sem portal do associado.
- Rotas: home, federação, corais, coral individual, galeria, filiação,
  imprensa, contato. As quatro últimas ainda em preparação.
- **Corte de LGPD, inegociável:** o cadastro de origem contém endereço
  residencial, data de nascimento e telefone pessoal de regentes, presidentes
  e pianistas, incluindo menores. Nada disso é publicável. O schema
  deliberadamente não tem campos para esses dados. Estatutos e atas de eleição
  são documentos internos e não entram no repositório.
- Fotografias envolvem crianças e adolescentes: só fotos de grupo, nenhuma
  criança nominada, e uso condicionado a confirmação escrita dos corais.

## Brand Commitments

**Único elemento intocável: o brasão** — escudo vermelho com cruz de Jerusalém
sobre faixa verde e amarela, redesenhado em SVG a partir do arquivo oficial.
Fora dele a paleta é livre: verde e amarelo não precisam reaparecer na
interface.

Nome: razão social é *Federação Nacional dos Meninos Cantores do Brasil*
(FNMCB); a comunicação assina *Pueri Cantores Brasil*. Decisão do cliente,
isolada em `src/config/site.ts`.

Tensão conhecida e não resolvida: a razão social diz "Meninos", mas três dos
doze filiados são coros femininos ou mistos.

## Evidence on Hand

- 12 corais cadastrados, com nome, cidade, UF, fundação, filiação, equipe e
  canais. Fonte: planilha de cadastro da federação.
- 12 fotografias, **uma por coral** (`src/assets/corais/`). Duas impróprias:
  a da Psalette de Santo Ivo é print de story do Instagram, com overlay; a do
  Coro Carpe Diem é foto escura de palco.
- 9 fotografias do XVII Congresso Nacional (`src/assets/congresso/`) e a do
  herói — **todas de terceiro, sem autorização**, ver `ATIVOS-EXTERNOS.md`.
- 12 documentos de histórico em PDF/DOCX (`tmp/fontes/`); só o de Petrópolis
  foi reescrito. Os outros onze estão marcados como pendentes no conteúdo.
- Números agregados: ~520 cantores nos coros principais, ~226 nos
  preparatórios. Informados pelos corais, **não auditados** — publicados
  arredondados e datados.

**Não existe e não deve ser inventado:** ano de fundação da federação,
histórico institucional, composição da diretoria, material em vídeo, e
fotografias adicionais dos corais.

## Product Principles

1. **Nunca inventar fato de coral.** Histórico ausente é declarado ausente na
   página, não preenchido com prosa plausível.
2. **O dado pessoal não publicável não existe no schema.** A proteção é
   estrutural, não uma lembrança de quem edita.
3. **Os doze coros são o produto.** A federação existe por causa deles; a
   hierarquia visual e editorial deve refletir isso.
4. **Número que envelhece é número calculado.** Contagens saem da coleção;
   quando vierem de fora, aparecem arredondadas e com data do levantamento.
5. **Material de terceiro é rastreado e removível.** Todo ativo sem
   autorização está registrado com a instrução de substituição.

## Accessibility & Inclusion

WCAG 2.2 AA. Nenhum requisito adicional específico foi estabelecido.
