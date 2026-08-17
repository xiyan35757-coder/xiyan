# Dev helper — uses the bundled Node.js (no system install required).
# Usage:  powershell -ExecutionPolicy Bypass -File .\dev.ps1
$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeDir = "C:\Users\35757\AppData\Local\OfficePLUSAgent\resources\runtime"
if (-not (Test-Path "$nodeDir\node.exe")) {
  Write-Host "未找到内置 Node.js，请先安装 Node.js LTS 或修正 dev.ps1 中的 nodeDir 路径。" -ForegroundColor Red
  exit 1
}
$env:PATH = "$nodeDir;$env:PATH"
& "$nodeDir\node.exe" "$here\node_modules\vite\bin\vite.js" --host
