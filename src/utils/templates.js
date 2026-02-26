const gitignoreTemplates = {
  node: `# Dependencies
node_modules/

# Build
dist/
build/
out/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Test
coverage/
.nyc_output/`,

  python: `# Byte-compiled
__pycache__/
*.py[cod]
*$py.class

# Virtual env
venv/
env/
.venv/

# Distribution
dist/
build/
*.egg-info/

# Testing
.pytest_cache/
.coverage
htmlcov/

# IDE
.vscode/
.idea/
*.swp

# Environment
.env
.env.local`,

  java: `# Compiled
*.class
*.jar
*.war
*.ear

# Build
target/
build/
out/

# IDE
.idea/
*.iml
.vscode/

# OS
.DS_Store
Thumbs.db

# Logs
*.log`,

  vs: `# Visual Studio
.vs/
*.suo
*.user
*.userosscache
*.sln.docstates

# Build
[Bb]in/
[Oo]bj/
[Dd]ebug/
[Rr]elease/

# User-specific
*.suo
*.user
*.userprefs

# NuGet
packages/`,

  macos: `# macOS
.DS_Store
.AppleDouble
.LSOverride
._*
.Spotlight-V100
.Trashes

# Thumbnails
*.Trashes

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd`,

  windows: `# Windows
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db
*.stackdump
[Dd]esktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msix
*.msm
*.msp
*.lnk`,

  linux: `# Linux
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*`,

  semua: `# === Node.js ===
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
dist/
build/
out/

# === Python ===
__pycache__/
*.py[cod]
venv/
env/
.pytest_cache/

# === Java ===
*.class
*.jar
target/
build/

# === IDE ===
.vscode/
.idea/
*.iml
*.swp

# === OS ===
.DS_Store
Thumbs.db
*~
.directory

# === Environment ===
.env
.env.local
.env.*.local

# === Test ===
coverage/
.nyc_output/`
};

function getTemplate(nama) {
  return gitignoreTemplates[nama.toLowerCase()] || null;
}

function listTemplates() {
  return Object.keys(gitignoreTemplates);
}

module.exports = { gitignoreTemplates, getTemplate, listTemplates };
