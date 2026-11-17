"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type EditingMode = "automatic" | "manual";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [mode, setMode] = useState<EditingMode>("automatic");
  const [aspect, setAspect] = useState("9:16");
  const [notice, setNotice] = useState("Importe uma gravação para começar.");

  useEffect(() => {
    if (!file) {
      setVideoUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("video/")) {
      setNotice("Escolha um arquivo de vídeo válido.");
      return;
    }
    setFile(selected);
    setNotice("Vídeo carregado localmente. A análise automática será conectada ao motor de mídia nas próximas etapas.");
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">✦</span><div><strong>AI LIVE</strong><small>STUDIO</small></div></div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="nav-item active">▣ <span>Clip Studio</span></button>
        <button className="nav-item" onClick={() => setNotice("O Live Host será desenvolvido na segunda fase.")}>◉ <span>Live Host</span><em>EM BREVE</em></button>
        <div className="sidebar-bottom"><span className="status-dot" /> Ambiente local <small>v0.1.0 · Preview</small></div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div><span className="eyebrow">AI LIVE STUDIO / WORKSPACE</span><h1>Clip Studio</h1></div>
          <div className="top-actions"><span className="local-pill"><i /> Arquivos no dispositivo</span><div className="avatar">AI</div></div>
        </header>

        <div className="content">
          <section className="welcome">
            <div><span className="eyebrow">SEU ESTÚDIO DE EDIÇÃO COM IA</span><h2>Transforme lives em <span>bons momentos.</span></h2><p>Importe uma gravação, prepare seus cortes e organize o conteúdo em um só lugar.</p></div>
            <div className="welcome-orb"><span>✧</span></div>
          </section>

          <div className="section-heading"><div><h3>Projeto atual</h3><p>Comece adicionando uma gravação.</p></div><span className="step-tag">01 / IMPORTAR</span></div>

          <section className="workspace-grid">
            <div className="panel import-panel">
              <div className="panel-head"><div><span className="panel-icon">↑</span><strong>Arquivo de vídeo</strong></div><span className="subtle">MP4 · MOV · MKV · WEBM</span></div>
              <input ref={inputRef} type="file" accept="video/*,.mkv" onChange={handleFile} hidden />
              {!file ? (
                <button className="dropzone" onClick={() => inputRef.current?.click()}>
                  <span className="upload-icon">↥</span><strong>Solte seu vídeo aqui</strong><span>ou clique para procurar no computador</span><small>O arquivo é selecionado localmente neste navegador.</small>
                </button>
              ) : (
                <div className="video-stage">
                  <video src={videoUrl} controls />
                  <div className="file-meta"><strong>{file.name}</strong><span>{(file.size / (1024 * 1024)).toFixed(1)} MB</span></div>
                  <button className="text-button" onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ""; }}>Trocar arquivo</button>
                </div>
              )}
              <div className="notice"><span>✦</span>{notice}</div>
            </div>

            <div className="panel settings-panel">
              <div className="panel-head"><div><span className="panel-icon">⚙</span><strong>Configuração do clipe</strong></div><span className="subtle">RASCUNHO</span></div>
              <label className="field-label">MODO DE EDIÇÃO</label>
              <div className="segmented">
                <button className={mode === "automatic" ? "selected" : ""} onClick={() => setMode("automatic")}>✧ Automático</button>
                <button className={mode === "manual" ? "selected" : ""} onClick={() => setMode("manual")}>⌁ Manual</button>
              </div>
              <label className="field-label">FORMATO DE SAÍDA</label>
              <div className="format-options">
                {["9:16", "16:9", "1:1"].map(value => <button key={value} className={aspect === value ? "format selected" : "format"} onClick={() => setAspect(value)}><span className={value === "9:16" ? "portrait" : value === "16:9" ? "landscape" : "square"} />{value}</button>)}
              </div>
              <div className="settings-note"><span>ⓘ</span><p>{mode === "automatic" ? "A IA vai sugerir trechos interessantes quando o motor de análise estiver conectado." : "O modo manual permitirá marcar entradas e saídas dos cortes na linha do tempo."}</p></div>
              <button className="primary-button" disabled={!file} onClick={() => setNotice("Projeto preparado. A análise e a renderização serão ativadas quando o worker FFmpeg for integrado.")}>Preparar projeto <span>→</span></button>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel timeline-panel"><div className="panel-head"><div><span className="panel-icon">▤</span><strong>Linha do tempo</strong></div><span className="subtle">AGUARDANDO VÍDEO</span></div><div className="timeline-empty"><div className="wave">▂ ▄ ▆ ▃ ▇ ▄ ▂ ▅ ▃ ▆ ▂ ▄ ▇ ▃ ▅</div><span>Sua linha do tempo aparecerá aqui</span></div></div>
            <div className="panel output-panel"><div className="panel-head"><div><span className="panel-icon">⇩</span><strong>Exportação</strong></div></div><div className="output-row"><span>Formato</span><strong>MP4 · {aspect}</strong></div><div className="output-row"><span>Destino</span><strong>Escolher depois</strong></div><button className="secondary-button" disabled>Exportar vídeo <span>↗</span></button></div>
          </section>
          <footer>AI LIVE STUDIO <span>•</span> Construído para criar, editar e publicar com responsabilidade.</footer>
        </div>
      </section>
    </main>
  );
}
