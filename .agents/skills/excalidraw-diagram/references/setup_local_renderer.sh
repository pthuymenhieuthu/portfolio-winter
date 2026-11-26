#!/usr/bin/env bash
set -euo pipefail
skill_renderer_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
render_workspace="${EXCALIDRAW_RENDER_DIR:-/tmp/excalidraw-renderer}"
mkdir -p "$render_workspace"
npm install --prefix "$render_workspace/deps" --no-audit --no-fund @excalidraw/excalidraw@0.18.0 react@18.3.1 react-dom@18.3.1 esbuild@0.25.0
cat > "$render_workspace/deps/entry.js" <<'JS'
export { exportToSvg, convertToExcalidrawElements } from '@excalidraw/excalidraw';
JS
"$render_workspace/deps/node_modules/.bin/esbuild" "$render_workspace/deps/entry.js" --bundle --format=esm --platform=browser --define:process.env.NODE_ENV='"production"' --loader:.woff2=file --loader:.ttf=file --asset-names=assets/[name]-[hash] --outdir="$render_workspace" --log-level=warning
cp "$skill_renderer_dir/render_template.html" "$render_workspace/render_template.html"
cp -R "$render_workspace/deps/node_modules/@excalidraw/excalidraw/dist/prod/fonts" "$render_workspace/fonts"
printf 'Serve this directory on port 3036: %s\n' "$render_workspace"
