# Melhorias v2 — o que mudou e porquê

| Biblioteca | Onde está | Porquê ali |
|---|---|---|
| **Lenis** | `src/lib/scroll.ts`, `App.tsx` | Scroll suave em todo o site, ligado ao GSAP (um só relógio). Os modais e o menu mobile param-no com `lockScroll()`. |
| **GSAP** (ScrollTrigger + SplitText) | Hero, títulos de secção (`useHeaderReveal`), "Como penso", parallax dos projectos, contadores | Tudo o que depende do scroll ou de uma linha temporal. |
| **Motion** | Navbar, menu mobile, Serviços, painel do portfólio, lightbox, botão magnético, barra de progresso | Estados, gestos e entrada/saída de componentes. |
| **React Three Fiber** | `src/components/three/` (Hero) | O logótipo 2×2 em 3D; reage ao rato e ao scroll. Só carrega em desktop, sob demanda. |
| **shadcn/ui** | `src/components/ui/` (Dialog, Badge), `components.json` | Modais acessíveis (foco, Esc, aria). Podes adicionar mais com `npx shadcn@latest add <nome>`. |
| **Aceternity UI** | `src/components/aceternity/` | Spotlight + Flip Words (Hero), Focus Cards (Prova rápida), Moving Border (CTA final). |

## Correcções
- Prova rápida: classes de cor estavam dentro de `className` e não funcionavam.
- Lightbox abre na imagem em que clicaste (antes abria sempre na primeira).
- Botões com `href` ignoravam o `onClick` (SliceButton).
- Linha divisória aparecia dentro dos modais (`section + section`).
- Vídeos (~15 MB cada) só tocam quando visíveis.
- Adicionado `.gitignore` (antes `node_modules` podia ir para o GitHub).
- Respeita "reduzir movimento" do sistema (sem 3D, sem scroll suave, sem animações).

## Comandos
```
npm install
npm run dev      # http://localhost:3000
npm run build
```
