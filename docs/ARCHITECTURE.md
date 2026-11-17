# Arquitetura inicial

## Aplicações

- `apps/web`: painel Next.js para o fluxo de criação e revisão.
- `apps/desktop` (futuro): contêiner Windows com Tauri.
- `services/clip-engine` (futuro): API local para tarefas de mídia.
- `workers/video-renderer` (futuro): processamento assíncrono com FFmpeg.

## Princípios

1. Arquivos originais permanecem locais por padrão.
2. A interface não deve expor chaves de API.
3. Renderização longa não deve depender de funções serverless curtas.
4. Integrações com plataformas devem usar APIs autorizadas e adaptadores substituíveis.
5. O usuário revisa o resultado antes de qualquer publicação.

## Fluxo previsto do Clip Studio

Importar → inspecionar → transcrever → sugerir momentos → revisar cortes → renderizar → exportar.
