# AI LIVE STUDIO

Plataforma de criação assistida por IA para conteúdo de vídeo.

## Módulos

- **AI Clip Studio (primeira etapa):** importar gravações, revisar vídeos, preparar cortes, legendas e exportação vertical.
- **AI Live Host (etapa posterior):** apresentador virtual 2D com voz sintética e respostas moderadas.

## Stack planejada

- Painel web: Next.js, React e TypeScript.
- Aplicativo Windows: Tauri (etapa posterior).
- Processamento de mídia: FFmpeg + worker Python local.
- Serviços de IA: adaptadores substituíveis, com chaves mantidas no ambiente local/servidor.

## Desenvolvimento no Windows 11

Requisitos iniciais: Node.js LTS e Git.

```powershell
npm install
npm run dev
```

Abra http://localhost:3000.

> O primeiro commit prepara a interface do painel e a estrutura do projeto. A análise automática de momentos, renderização FFmpeg e integrações externas serão implementadas em etapas seguintes.
