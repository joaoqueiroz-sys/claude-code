# Clima Code: site

Página única, estática, sem build. Feita com a skill scroll-craft (`.claude/skills/scroll-craft`).

```bash
cd scrollcraft/builds/clima-code
python3 -m http.server 4500   # abra http://localhost:4500
```

- `index.html`: marcação e conteúdo
- `site.css`: tokens e estilos da página
- `site.js`: termômetro do hero, serviços por hover/scroll, vista explodida 3D, formulário → WhatsApp
- `scrollcraft.js` / `scrollcraft.css`: motor da skill (não editar)

Antes de publicar, troque `WHATSAPP` em `site.js` pelo número real.
