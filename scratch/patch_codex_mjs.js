const fs = require('fs');

const filePath = 'C:/Users/jawah/.gemini/config/plugins/codex/scripts/lib/codex.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Windows candidate path
const candidateTarget = `  const candidates = [
    path.join(os.homedir(), ".local", "bin", "codex"),
    "/usr/local/bin/codex",
    "/opt/homebrew/bin/codex"
  ];`;

const candidateReplace = `  const candidates = [
    path.join(os.homedir(), ".local", "bin", "codex"),
    "/usr/local/bin/codex",
    "/opt/homebrew/bin/codex"
  ];
  if (process.platform === "win32" && process.env.APPDATA) {
    candidates.push(
      path.join(process.env.APPDATA, "npm", "codex.cmd"),
      path.join(process.env.APPDATA, "npm", "codex")
    );
  }`;

// 2. Add shell: process.platform === "win32" to spawns
content = content.replace(
  'const result = spawnSync(bin, ["--version"], { encoding: "utf8" });',
  'const result = spawnSync(bin, ["--version"], { encoding: "utf8", shell: process.platform === "win32" });'
);

content = content.replace(
  'const result = spawnSync(bin, ["login", "status"], { encoding: "utf8" });',
  'const result = spawnSync(bin, ["login", "status"], { encoding: "utf8", shell: process.platform === "win32" });'
);

content = content.replace(
  'const result = spawnSync(bin, args, {\r\n    cwd,\r\n    encoding: "utf8",',
  'const result = spawnSync(bin, args, {\r\n    cwd,\r\n    shell: process.platform === "win32",\r\n    encoding: "utf8",'
);

content = content.replace(
  'const child = spawn(bin, args, { cwd, stdio: ["ignore", out, out] });',
  'const child = spawn(bin, args, { cwd, stdio: ["ignore", out, out], shell: process.platform === "win32" });'
);

// Fallback for LF if CRLF not matched
if (content.includes(candidateTarget)) {
  content = content.replace(candidateTarget, candidateReplace);
} else {
  content = content.replace(
    candidateTarget.replace(/\n/g, '\r\n'),
    candidateReplace.replace(/\n/g, '\r\n')
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched codex.mjs for Windows compatibility');

