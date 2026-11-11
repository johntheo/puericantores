/**
 * Movimento do site.
 *
 * TESE
 * Um único momento autoral, no frontispício: a página de rosto se compõe como
 * tipografia sendo assentada. Os fios abrem do centro, as linhas do nome sobem
 * de trás deles, o mote solta o espacejamento. Roda uma vez, no carregamento.
 *
 * O miolo do site é deliberadamente quieto. Nada de reveal por seção: uma
 * página em que tudo entra igual não tem ritmo, tem tique. Restam dois gestos,
 * ambos com função:
 *
 *   [data-fio-scroll]  o fio da seção se desenha — marca a virada de assunto
 *   [data-motion=numero]  o numeral conta — torna a grandeza legível
 *
 * Quem pediu movimento reduzido recebe a página inteira, estática e completa.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Desaceleração exponencial: chegada confiante, sem quique. */
const CHEGADA = 'expo.out';

/* ------------------------------------------------------------------ */
/* Momento autoral                                                     */
/* ------------------------------------------------------------------ */

function comporFrontispicio() {
  const raiz = document.querySelector<HTMLElement>('[data-frontispicio]');
  if (!raiz) return;

  const fios = raiz.querySelectorAll<HTMLElement>('.fio');
  const linhas = raiz.querySelectorAll<HTMLElement>('.linha > *');
  const brasao = raiz.querySelector<HTMLElement>('[data-brasao]');
  const mote = raiz.querySelector<HTMLElement>('[data-mote]');
  const apoio = raiz.querySelectorAll<HTMLElement>('[data-apoio]');

  /** Devolve o frontispício ao estado final, custe o que custar. */
  const liberar = () => document.documentElement.classList.remove('js');

  const t = gsap.timeline({ defaults: { ease: CHEGADA }, onComplete: liberar });

  /* Rede de segurança que NÃO depende de requestAnimationFrame.
     Se o rAF não avançar — aba em segundo plano, economia de energia, algum
     contexto headless — a timeline congela no estado inicial e o nome da
     federação fica invisível, porque os estilos inline do GSAP vencem o CSS.
     Um setTimeout dispara mesmo quando o rAF não dispara; `progress(1)`
     aplica os valores finais de forma síncrona. */
  setTimeout(() => {
    if (t.progress() < 1) t.progress(1);
    liberar();
  }, 1800);

  // 1. Os fios abrem do centro para fora, como a régua de uma página de rosto.
  t.fromTo(
    fios,
    { scaleX: 0, opacity: 1 },
    { scaleX: 1, opacity: 1, duration: 1.1, stagger: 0.07 }
  );

  // 2. O brasão assenta — escala mínima, quase imperceptível, só peso.
  if (brasao) {
    t.fromTo(brasao, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.9 }, 0.15);
  }

  // 3. As linhas do nome sobem de trás do fio. Sem opacidade: é máscara,
  //    não fade — a diferença entre tipo sendo assentado e texto piscando.
  //
  //    O `y: 0` explícito nos dois estados não é redundante, é o conserto: o
  //    GSAP lê o translateY(105%) que o CSS aplicou e o guarda como `y` em
  //    pixels, e `y` e `yPercent` são propriedades independentes que ele soma.
  //    Sem zerar `y`, a linha anima de 210% até 105% e o nome da federação
  //    nunca chega ao lugar — some atrás da máscara.
  t.fromTo(
    linhas,
    { y: 0, yPercent: 105 },
    { y: 0, yPercent: 0, duration: 0.65, stagger: 0.05 },
    0.35
  );

  // 4. O mote relaxa o espacejamento até o valor final. O gesto é o do tipo
  //    metálico sendo apertado na rama.
  if (mote) {
    t.fromTo(
      mote,
      { opacity: 0, letterSpacing: '0.62em' },
      { opacity: 1, letterSpacing: '0.18em', duration: 1.2 },
      0.55
    );
  }

  // 5. Subtítulo e chamada, por último e discretos.
  t.fromTo(apoio, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.65);

  return t;
}

/* ------------------------------------------------------------------ */
/* Apoio                                                               */
/* ------------------------------------------------------------------ */

/** O fio de seção se desenha da esquerda: sinaliza virada de assunto. */
function desenharFios() {
  for (const fio of document.querySelectorAll<HTMLElement>('[data-fio-scroll]')) {
    gsap.fromTo(
      fio,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: CHEGADA,
        scrollTrigger: { trigger: fio, start: 'top 92%' },
      }
    );
  }
}

/** Contagem dos numerais: a grandeza fica legível em vez de só escrita. */
function contarNumeros() {
  for (const alvo of document.querySelectorAll<HTMLElement>('[data-motion="numero"]')) {
    const valor = Number(alvo.dataset.valor ?? 0);
    // Anos não levam separador de milhar: "1942", nunca "1.942".
    const bruto = alvo.dataset.formato === 'ano';
    const contador = { n: 0 };

    gsap.to(contador, {
      n: valor,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: alvo, start: 'top 92%' },
      onUpdate: () => {
        const n = Math.round(contador.n);
        alvo.textContent = bruto ? String(n) : n.toLocaleString(document.documentElement.lang);
      },
    });
  }
}

/**
 * Respiro da fotografia de abertura: um assentamento de escala lentíssimo,
 * quase imperceptível, que tira da imagem o aspecto de congelada.
 *
 * Uma única passada, sem repetição — laço infinito em imagem de tela cheia
 * mantém o compositor acordado e come bateria em celular sem devolver nada.
 */
function respirarFoto() {
  for (const alvo of document.querySelectorAll<HTMLElement>('[data-motion="respiro"]')) {
    gsap.fromTo(alvo, { scale: 1.07 }, { scale: 1, duration: 12, ease: 'power1.out' });
  }
}

/** Deslocamento lento da foto no cabeçalho da página de coral. */
function parallaxFotos() {
  for (const alvo of document.querySelectorAll<HTMLElement>('[data-motion="parallax"]')) {
    gsap.to(alvo, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: alvo.parentElement ?? alvo,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

/* ------------------------------------------------------------------ */

function iniciar() {
  if (semMovimento) {
    // Devolve a página completa; nada aqui roda.
    document.documentElement.classList.remove('js');
    return;
  }

  comporFrontispicio();
  respirarFoto();
  desenharFios();
  contarNumeros();
  parallaxFotos();

  ScrollTrigger.refresh();
}

// A animação começa sem esperar pelas fontes. Esperar `document.fonts.ready`
// deixava o título invisível em redes lentas, porque o CSS inicial do
// frontispício o mantém atrás da máscara. Quando as fontes terminarem, só
// atualizamos os gatilhos de rolagem para acompanhar qualquer mudança de
// medida.
iniciar();
document.fonts?.ready?.then(() => ScrollTrigger.refresh());
