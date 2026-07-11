# Tr.Alienigena — Estrutura de Pastas

## As pastas que você precisa criar no repositório

```
tralienigena-app/
├── index.template.html   ← ⚠️ é ESTE arquivo que você edita a partir de agora
├── index.html            ← gerado automaticamente, NÃO editar na mão
├── build.js               ← script que monta o index.html
├── package.json
├── vercel.json
├── manifest.json          (já existia)
├── sw.js                  (já existia, se você tiver)
├── css/
│   └── style.css
├── telas/                 ← ✅ CADA TELA DO APP EM UM ARQUIVO
│   ├── inicio.html
│   ├── outros-servicos.html
│   ├── busca.html
│   ├── resultados.html
│   ├── detalhe.html
│   ├── relacao.html
│   ├── cadastro.html
│   ├── avaliar.html
│   ├── admin.html
│   ├── vagas.html
│   ├── mapa-servicos.html
│   ├── cursos.html
│   ├── motoristas.html
│   ├── loja.html
│   ├── noticias.html
│   ├── eventos.html
│   ├── radio.html
│   └── referencias.html
├── js/                    ← ⏳ próxima etapa (ainda não feita)
│   ├── config/
│   ├── core/
│   ├── busca/
│   ├── cadastro/
│   ├── avaliacao/
│   ├── admin/
│   ├── eventos/
│   ├── cursos/
│   ├── motoristas/
│   ├── noticias/
│   └── radio/
└── icons/
```

## Como funciona (e por que precisa disso)

Navegador **não lê HTML dividido em vários arquivos sozinho** — diferente do CSS/JS,
não existe um jeito nativo de "importar" um pedaço de HTML dentro de outro. Então
pra cada tela ficar de fato num arquivo próprio, sem você precisar mexer num arquivo
gigante, a solução é ter um **passo de montagem (build)**:

1. Você edita cada tela isoladamente em `telas/nome-da-tela.html`.
2. O `index.template.html` só tem marcadores tipo:
   ```html
   <!-- INCLUDE: telas/inicio.html -->
   ```
3. Quando você sobe o código, o `build.js` roda automaticamente (configurado no
   `vercel.json`) e junta tudo, gerando o `index.html` de verdade — que é o que o
   navegador dos motoristas realmente carrega.

**Você nunca mais edita o `index.html` direto.** Ele passa a ser um arquivo
"gerado", tipo um resultado automático. Quem você edita é o `index.template.html`
(a casca) e os arquivos dentro de `telas/`.

## Testado e confirmado
Rodei o build aqui e o `index.html` gerado ficou **idêntico** ao arquivo original
(só troquei quebras de linha, que não afetam nada). Ou seja: zero risco de quebrar
o site com essa reorganização.

## Como subir no GitHub
Suba a pasta inteira `tralienigena-app/` (incluindo `index.template.html`,
`build.js`, `package.json`, `vercel.json` e as pastas `css/` e `telas/`). Você
**pode inclusive apagar o `index.html`** do repositório — ele será recriado
sozinho a cada deploy pela Vercel. Se preferir manter por segurança, sem problema,
ele só vai ser sobrescrito no próximo build.

## Testar local antes de subir (opcional)
Se você tiver Node instalado no seu computador:
```
node build.js
```
Isso gera o `index.html` na hora, pra você abrir no navegador e conferir antes de
mandar pro GitHub.

## Próxima etapa
Quebrar o `js/` (hoje ainda é um bloco só de ~2300 linhas dentro do
`index.template.html`) nas pastas `config/`, `core/`, `busca/`, `cadastro/`,
`avaliacao/`, `admin/`, `eventos/`, `cursos/`, `motoristas/`, `noticias/` e
`radio/`. Essa é a parte mais delicada porque as funções dependem umas das
outras — por isso deixei por último, depois que a base (CSS + telas) já está
validada.

Me avisa quando você confirmar que o deploy com as telas separadas funcionou
que eu já mando a quebra do JS.
