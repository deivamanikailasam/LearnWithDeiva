/**
 * Part 10: subtopics + sub-subtopics for stages 26-28
 *   26. Software Engineering Tools & IDEs
 *   27. Software Reuse, Components & Libraries
 *   28. Open Source Software Engineering
 *
 * Run with: node scripts/software-engineering/part10-stages-26-28.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 26 — Software Engineering Tools & IDEs
   * ============================================================ */

  /* ---- ide-overview ---- */
  { id: 'ide-overview--what-is-an-ide', title: 'What Is an IDE?', parentId: 'ide-overview' },
  { id: 'ide-overview--ide-vs-editor', title: 'IDE vs Editor', parentId: 'ide-overview' },
  { id: 'ide-overview--ide-history', title: 'IDE History (Maestro I → modern AI IDEs)', parentId: 'ide-overview' },
  { id: 'ide-overview--core-ide-capabilities', title: 'Core IDE Capabilities', parentId: 'ide-overview' },
  { id: 'ide-overview--language-server-protocol', title: 'Language Server Protocol (LSP)', parentId: 'ide-overview' },
  { id: 'ide-overview--debug-adapter-protocol', title: 'Debug Adapter Protocol (DAP)', parentId: 'ide-overview' },
  { id: 'ide-overview--build-server-protocol', title: 'Build Server Protocol (BSP)', parentId: 'ide-overview' },
  { id: 'ide-overview--ai-native-ides-2026', title: 'AI-Native IDEs (2026)', parentId: 'ide-overview' },

  /* ---- jetbrains-ides ---- */
  { id: 'jetbrains-ides--intellij-idea', title: 'IntelliJ IDEA', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--pycharm', title: 'PyCharm', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--webstorm', title: 'WebStorm', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--rider', title: 'Rider', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--goland', title: 'GoLand', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--rustrover', title: 'RustRover', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--clion', title: 'CLion', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--datagrip', title: 'DataGrip', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--rubymine-phpstorm', title: 'RubyMine & PhpStorm', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--fleet', title: 'JetBrains Fleet', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--gateway-and-remote', title: 'Gateway & Remote Development', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--ai-assistant', title: 'JetBrains AI Assistant', parentId: 'jetbrains-ides' },
  { id: 'jetbrains-ides--shared-platform-features', title: 'Shared Platform Features (Refactoring, Inspections, VCS)', parentId: 'jetbrains-ides' },

  /* ---- visual-studio-code ---- */
  { id: 'visual-studio-code--vscode-overview', title: 'VS Code Overview', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--electron-architecture', title: 'Electron Architecture', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--extensions-marketplace', title: 'Extensions Marketplace', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--remote-development', title: 'Remote Development (SSH, WSL, Containers)', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--devcontainers-vscode', title: 'Dev Containers in VS Code', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--live-share', title: 'Live Share', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--profiles-and-settings-sync', title: 'Profiles & Settings Sync', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--vscode-vs-vscodium', title: 'VS Code vs VSCodium', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--copilot-integration', title: 'GitHub Copilot Integration', parentId: 'visual-studio-code' },
  { id: 'visual-studio-code--forks-cursor-windsurf', title: 'Notable Forks (Cursor, Windsurf, Trae) — 2026', parentId: 'visual-studio-code' },

  /* ---- visual-studio ---- */
  { id: 'visual-studio--vs-overview', title: 'Visual Studio Overview', parentId: 'visual-studio' },
  { id: 'visual-studio--editions', title: 'Editions (Community, Pro, Enterprise)', parentId: 'visual-studio' },
  { id: 'visual-studio--solutions-and-projects', title: 'Solutions & Projects', parentId: 'visual-studio' },
  { id: 'visual-studio--dotnet-tooling', title: '.NET Tooling Inside VS', parentId: 'visual-studio' },
  { id: 'visual-studio--cpp-tooling', title: 'C++ Tooling Inside VS', parentId: 'visual-studio' },
  { id: 'visual-studio--intellicode', title: 'IntelliCode', parentId: 'visual-studio' },
  { id: 'visual-studio--vs-vs-vscode', title: 'Visual Studio vs VS Code', parentId: 'visual-studio' },

  /* ---- eclipse-ide ---- */
  { id: 'eclipse-ide--eclipse-history', title: 'Eclipse History', parentId: 'eclipse-ide' },
  { id: 'eclipse-ide--workspace-and-projects', title: 'Workspace & Projects', parentId: 'eclipse-ide' },
  { id: 'eclipse-ide--plug-in-architecture', title: 'Plug-In Architecture (OSGi)', parentId: 'eclipse-ide' },
  { id: 'eclipse-ide--eclipse-rcp', title: 'Eclipse RCP (Rich Client Platform)', parentId: 'eclipse-ide' },
  { id: 'eclipse-ide--eclipse-che-and-theia', title: 'Eclipse Che & Theia', parentId: 'eclipse-ide' },
  { id: 'eclipse-ide--eclipse-foundation', title: 'Eclipse Foundation Role', parentId: 'eclipse-ide' },

  /* ---- vim-and-neovim ---- */
  { id: 'vim-and-neovim--vim-history', title: 'Vim History (Bram Moolenaar)', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--modal-editing', title: 'Modal Editing (Normal, Insert, Visual, Command)', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--motions-and-text-objects', title: 'Motions & Text Objects', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--macros-and-registers', title: 'Macros & Registers', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--vimscript', title: 'Vimscript', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--neovim-fork', title: 'Neovim Fork', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--lua-config', title: 'Lua Configuration in Neovim', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--lazy-vim-and-distros', title: 'LazyVim, AstroNvim, NvChad & Distros', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--lsp-in-neovim', title: 'LSP in Neovim', parentId: 'vim-and-neovim' },
  { id: 'vim-and-neovim--treesitter', title: 'Tree-sitter Highlighting', parentId: 'vim-and-neovim' },

  /* ---- emacs-editor ---- */
  { id: 'emacs-editor--emacs-history', title: 'Emacs History', parentId: 'emacs-editor' },
  { id: 'emacs-editor--gnu-emacs-vs-xemacs', title: 'GNU Emacs vs XEmacs', parentId: 'emacs-editor' },
  { id: 'emacs-editor--elisp', title: 'Emacs Lisp (Elisp)', parentId: 'emacs-editor' },
  { id: 'emacs-editor--major-and-minor-modes', title: 'Major & Minor Modes', parentId: 'emacs-editor' },
  { id: 'emacs-editor--org-mode', title: 'Org-Mode', parentId: 'emacs-editor' },
  { id: 'emacs-editor--magit', title: 'Magit (Git in Emacs)', parentId: 'emacs-editor' },
  { id: 'emacs-editor--doom-spacemacs', title: 'Doom Emacs & Spacemacs', parentId: 'emacs-editor' },
  { id: 'emacs-editor--evil-mode', title: 'Evil Mode (Vim Emulation)', parentId: 'emacs-editor' },

  /* ---- sublime-and-nova ---- */
  { id: 'sublime-and-nova--sublime-text', title: 'Sublime Text', parentId: 'sublime-and-nova' },
  { id: 'sublime-and-nova--sublime-merge', title: 'Sublime Merge', parentId: 'sublime-and-nova' },
  { id: 'sublime-and-nova--nova-panic', title: 'Nova (Panic)', parentId: 'sublime-and-nova' },
  { id: 'sublime-and-nova--zed-editor', title: 'Zed Editor', parentId: 'sublime-and-nova' },
  { id: 'sublime-and-nova--lapce', title: 'Lapce', parentId: 'sublime-and-nova' },
  { id: 'sublime-and-nova--helix-editor', title: 'Helix Editor', parentId: 'sublime-and-nova' },

  /* ---- code-formatters ---- */
  { id: 'code-formatters--why-formatters', title: 'Why Auto-Formatters?', parentId: 'code-formatters' },
  { id: 'code-formatters--prettier', title: 'Prettier', parentId: 'code-formatters' },
  { id: 'code-formatters--biome', title: 'Biome (formerly Rome)', parentId: 'code-formatters' },
  { id: 'code-formatters--black-yapf-autopep8', title: 'Black, YAPF, autopep8', parentId: 'code-formatters' },
  { id: 'code-formatters--ruff-format', title: 'Ruff Format (Astral)', parentId: 'code-formatters' },
  { id: 'code-formatters--gofmt', title: 'gofmt', parentId: 'code-formatters' },
  { id: 'code-formatters--rustfmt', title: 'rustfmt', parentId: 'code-formatters' },
  { id: 'code-formatters--clang-format', title: 'clang-format', parentId: 'code-formatters' },
  { id: 'code-formatters--ktlint-spotless', title: 'ktlint & Spotless', parentId: 'code-formatters' },
  { id: 'code-formatters--editorconfig', title: 'EditorConfig', parentId: 'code-formatters' },

  /* ---- linters-overview ---- */
  { id: 'linters-overview--what-is-a-linter', title: 'What Is a Linter?', parentId: 'linters-overview' },
  { id: 'linters-overview--eslint', title: 'ESLint', parentId: 'linters-overview' },
  { id: 'linters-overview--biome-linter', title: 'Biome (Linter Mode)', parentId: 'linters-overview' },
  { id: 'linters-overview--pylint', title: 'Pylint', parentId: 'linters-overview' },
  { id: 'linters-overview--ruff-linter', title: 'Ruff (Linter)', parentId: 'linters-overview' },
  { id: 'linters-overview--rubocop', title: 'RuboCop', parentId: 'linters-overview' },
  { id: 'linters-overview--golangci-lint', title: 'golangci-lint', parentId: 'linters-overview' },
  { id: 'linters-overview--clippy', title: 'Rust Clippy', parentId: 'linters-overview' },
  { id: 'linters-overview--stylelint', title: 'Stylelint (CSS)', parentId: 'linters-overview' },
  { id: 'linters-overview--shellcheck', title: 'ShellCheck', parentId: 'linters-overview' },
  { id: 'linters-overview--yamllint-hadolint', title: 'yamllint & Hadolint', parentId: 'linters-overview' },
  { id: 'linters-overview--lint-staged-pre-commit', title: 'lint-staged & pre-commit', parentId: 'linters-overview' },

  /* ---- debugger-tools ---- */
  { id: 'debugger-tools--what-is-a-debugger', title: 'What Is a Debugger?', parentId: 'debugger-tools' },
  { id: 'debugger-tools--gdb', title: 'GDB', parentId: 'debugger-tools' },
  { id: 'debugger-tools--lldb', title: 'LLDB', parentId: 'debugger-tools' },
  { id: 'debugger-tools--windbg', title: 'WinDbg', parentId: 'debugger-tools' },
  { id: 'debugger-tools--delve-go', title: 'Delve (Go)', parentId: 'debugger-tools' },
  { id: 'debugger-tools--pdb-debugpy', title: 'pdb & debugpy (Python)', parentId: 'debugger-tools' },
  { id: 'debugger-tools--chrome-devtools-protocol', title: 'Chrome DevTools Protocol', parentId: 'debugger-tools' },
  { id: 'debugger-tools--time-travel-debuggers', title: 'Time-Travel Debuggers (rr, RevDeBug, UDB)', parentId: 'debugger-tools' },
  { id: 'debugger-tools--remote-debugging', title: 'Remote Debugging', parentId: 'debugger-tools' },
  { id: 'debugger-tools--core-dump-debugging', title: 'Core Dump Debugging', parentId: 'debugger-tools' },
  { id: 'debugger-tools--ai-debugging-2026', title: 'AI-Assisted Debugging (2026)', parentId: 'debugger-tools' },

  /* ---- profilers ---- */
  { id: 'profilers--cpu-profilers', title: 'CPU Profilers', parentId: 'profilers' },
  { id: 'profilers--sampling-vs-instrumentation', title: 'Sampling vs Instrumentation', parentId: 'profilers' },
  { id: 'profilers--memory-profilers', title: 'Memory Profilers', parentId: 'profilers' },
  { id: 'profilers--allocation-tracking', title: 'Allocation Tracking', parentId: 'profilers' },
  { id: 'profilers--async-profilers', title: 'Async Profilers (async-profiler, py-spy)', parentId: 'profilers' },
  { id: 'profilers--flame-graphs', title: 'Flame Graphs (Brendan Gregg)', parentId: 'profilers' },
  { id: 'profilers--perf-bcc-bpftrace', title: 'perf, BCC & bpftrace', parentId: 'profilers' },
  { id: 'profilers--continuous-profiling', title: 'Continuous Profiling (Pyroscope, Parca, Polar Signals)', parentId: 'profilers' },
  { id: 'profilers--ide-profiling-tools', title: 'IDE-Integrated Profiling (IntelliJ Profiler, VS Profiler)', parentId: 'profilers' },

  /* ---- shell-and-terminal-tools ---- */
  { id: 'shell-and-terminal-tools--bash', title: 'Bash', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--zsh', title: 'Zsh & Oh My Zsh', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--fish', title: 'Fish Shell', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--nushell', title: 'Nushell', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--powershell', title: 'PowerShell', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--starship-prompt', title: 'Starship Prompt', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--tmux-screen', title: 'tmux & GNU Screen', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--zellij', title: 'Zellij', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--modern-terminal-emulators', title: 'Modern Terminals (Warp, WezTerm, Ghostty, Alacritty, Kitty)', parentId: 'shell-and-terminal-tools' },
  { id: 'shell-and-terminal-tools--cli-power-tools', title: 'CLI Power Tools (fzf, ripgrep, fd, bat, eza, zoxide, jq, gron)', parentId: 'shell-and-terminal-tools' },

  /* ---- ai-coding-assistants ---- */
  { id: 'ai-coding-assistants--what-they-do', title: 'What AI Coding Assistants Do', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--inline-completion', title: 'Inline Completion', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--chat-and-edit', title: 'Chat & Edit Modes', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--agentic-coding', title: 'Agentic Coding (2026)', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--mcp-protocol', title: 'Model Context Protocol (MCP)', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--code-review-assistants', title: 'AI Code Review Assistants', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--prompt-engineering-coding', title: 'Prompt Engineering for Coding', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--evaluation-of-assistants', title: 'Evaluation of AI Assistants (HumanEval, SWE-Bench)', parentId: 'ai-coding-assistants' },
  { id: 'ai-coding-assistants--privacy-and-ip-2026', title: 'Privacy, IP & Compliance (2026)', parentId: 'ai-coding-assistants' },

  /* ---- copilot-cursor-cline ---- */
  { id: 'copilot-cursor-cline--github-copilot', title: 'GitHub Copilot', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--copilot-workspace', title: 'Copilot Workspace', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--copilot-agent-mode', title: 'Copilot Agent Mode', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--cursor', title: 'Cursor', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--cursor-rules-and-agents', title: 'Cursor Rules & Background Agents', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--windsurf', title: 'Windsurf (formerly Codeium)', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--cline', title: 'Cline (Claude Dev)', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--aider', title: 'Aider', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--continue-dev', title: 'Continue.dev', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--tabby-self-hosted', title: 'Tabby (Self-Hosted)', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--amazon-q-developer', title: 'Amazon Q Developer', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--google-jules-and-gemini-code-assist', title: 'Google Jules & Gemini Code Assist', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--openai-codex-cli', title: 'OpenAI Codex CLI', parentId: 'copilot-cursor-cline' },
  { id: 'copilot-cursor-cline--claude-code', title: 'Claude Code', parentId: 'copilot-cursor-cline' },

  /* ---- diff-and-merge-tools ---- */
  { id: 'diff-and-merge-tools--diff-fundamentals', title: 'Diff Fundamentals (Myers, Patience)', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--meld', title: 'Meld', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--beyond-compare', title: 'Beyond Compare', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--kdiff3', title: 'KDiff3', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--p4merge', title: 'P4Merge', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--ide-diff-merge', title: 'IDE Built-In Diff/Merge', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--difftastic-and-delta', title: 'Difftastic & delta', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--three-way-merge', title: 'Three-Way Merge & Mergetool Workflows', parentId: 'diff-and-merge-tools' },
  { id: 'diff-and-merge-tools--ai-conflict-resolution-2026', title: 'AI Conflict Resolution (2026)', parentId: 'diff-and-merge-tools' },

  /* ---- code-search-tools ---- */
  { id: 'code-search-tools--ripgrep', title: 'ripgrep', parentId: 'code-search-tools' },
  { id: 'code-search-tools--ag-and-ack', title: 'ag (The Silver Searcher) & ack', parentId: 'code-search-tools' },
  { id: 'code-search-tools--grep-find', title: 'grep & find', parentId: 'code-search-tools' },
  { id: 'code-search-tools--sourcegraph', title: 'Sourcegraph', parentId: 'code-search-tools' },
  { id: 'code-search-tools--opengrok', title: 'OpenGrok', parentId: 'code-search-tools' },
  { id: 'code-search-tools--comby', title: 'Comby (Structural Search & Replace)', parentId: 'code-search-tools' },
  { id: 'code-search-tools--ast-grep', title: 'ast-grep', parentId: 'code-search-tools' },
  { id: 'code-search-tools--semgrep-as-search', title: 'Semgrep as Code Search', parentId: 'code-search-tools' },
  { id: 'code-search-tools--code-intelligence-2026', title: 'Code Intelligence Platforms (2026)', parentId: 'code-search-tools' },
  { id: 'code-search-tools--ai-semantic-code-search', title: 'AI / Semantic Code Search', parentId: 'code-search-tools' },

  /* ============================================================
   * STAGE 27 — Software Reuse, Components & Libraries
   * ============================================================ */

  /* ---- software-reuse-fundamentals ---- */
  { id: 'software-reuse-fundamentals--definition', title: 'Definition of Software Reuse', parentId: 'software-reuse-fundamentals' },
  { id: 'software-reuse-fundamentals--mcilroy-mass-produced-components', title: 'McIlroy "Mass Produced Software Components" (1968)', parentId: 'software-reuse-fundamentals' },
  { id: 'software-reuse-fundamentals--horizontal-vs-vertical-reuse', title: 'Horizontal vs Vertical Reuse', parentId: 'software-reuse-fundamentals' },
  { id: 'software-reuse-fundamentals--white-box-vs-black-box-reuse', title: 'White-Box vs Black-Box Reuse', parentId: 'software-reuse-fundamentals' },
  { id: 'software-reuse-fundamentals--types-of-reusable-assets', title: 'Types of Reusable Assets (Code, Components, Patterns, Architectures)', parentId: 'software-reuse-fundamentals' },
  { id: 'software-reuse-fundamentals--swebok-reuse-ka', title: 'SWEBOK Reuse Coverage', parentId: 'software-reuse-fundamentals' },
  { id: 'software-reuse-fundamentals--reuse-vs-not-invented-here', title: 'Reuse vs Not-Invented-Here', parentId: 'software-reuse-fundamentals' },
  { id: 'software-reuse-fundamentals--reuse-anti-patterns', title: 'Reuse Anti-Patterns', parentId: 'software-reuse-fundamentals' },

  /* ---- library-vs-framework ---- */
  { id: 'library-vs-framework--definitions', title: 'Definitions of Library & Framework', parentId: 'library-vs-framework' },
  { id: 'library-vs-framework--inversion-of-control', title: 'Inversion of Control (Hollywood Principle)', parentId: 'library-vs-framework' },
  { id: 'library-vs-framework--api-vs-spi', title: 'API vs SPI', parentId: 'library-vs-framework' },
  { id: 'library-vs-framework--frameworks-vs-toolkits-vs-platforms', title: 'Frameworks vs Toolkits vs Platforms', parentId: 'library-vs-framework' },
  { id: 'library-vs-framework--lifecycle-implications', title: 'Lifecycle Implications', parentId: 'library-vs-framework' },
  { id: 'library-vs-framework--when-to-build-which', title: 'When to Build Which', parentId: 'library-vs-framework' },

  /* ---- component-based-software-engineering ---- */
  { id: 'component-based-software-engineering--cbse-history', title: 'CBSE History (Szyperski)', parentId: 'component-based-software-engineering' },
  { id: 'component-based-software-engineering--component-definition', title: 'What Is a Component?', parentId: 'component-based-software-engineering' },
  { id: 'component-based-software-engineering--required-and-provided-interfaces', title: 'Required & Provided Interfaces', parentId: 'component-based-software-engineering' },
  { id: 'component-based-software-engineering--component-models', title: 'Component Models (CORBA, COM/.NET, EJB, OSGi)', parentId: 'component-based-software-engineering' },
  { id: 'component-based-software-engineering--composition-mechanisms', title: 'Composition Mechanisms', parentId: 'component-based-software-engineering' },
  { id: 'component-based-software-engineering--versioning-of-components', title: 'Versioning of Components', parentId: 'component-based-software-engineering' },
  { id: 'component-based-software-engineering--cbse-decline-and-revival', title: 'CBSE Decline & Modern Revival (Microservices, Wasm Components)', parentId: 'component-based-software-engineering' },
  { id: 'component-based-software-engineering--wasm-component-model-2026', title: 'WebAssembly Component Model (2026)', parentId: 'component-based-software-engineering' },

  /* ---- product-line-engineering ---- */
  { id: 'product-line-engineering--spl-definition', title: 'Software Product Line (SPL) Definition', parentId: 'product-line-engineering' },
  { id: 'product-line-engineering--core-assets', title: 'Core Assets', parentId: 'product-line-engineering' },
  { id: 'product-line-engineering--feature-models', title: 'Feature Models', parentId: 'product-line-engineering' },
  { id: 'product-line-engineering--variability-management', title: 'Variability Management', parentId: 'product-line-engineering' },
  { id: 'product-line-engineering--domain-engineering-vs-application-engineering', title: 'Domain Engineering vs Application Engineering', parentId: 'product-line-engineering' },
  { id: 'product-line-engineering--sei-spl-framework', title: 'SEI SPL Framework', parentId: 'product-line-engineering' },
  { id: 'product-line-engineering--cope-pulse-bigl', title: 'CoPE, PuLSE, BigL Methods', parentId: 'product-line-engineering' },
  { id: 'product-line-engineering--family-based-vs-clone-and-own', title: 'Family-Based vs Clone-and-Own', parentId: 'product-line-engineering' },

  /* ---- inner-source-reuse ---- */
  { id: 'inner-source-reuse--what-is-inner-source', title: 'What Is Inner Source?', parentId: 'inner-source-reuse' },
  { id: 'inner-source-reuse--innersource-commons', title: 'InnerSource Commons', parentId: 'inner-source-reuse' },
  { id: 'inner-source-reuse--trusted-committer-model', title: 'Trusted Committer Model', parentId: 'inner-source-reuse' },
  { id: 'inner-source-reuse--guest-and-host-teams', title: 'Guest & Host Team Pattern', parentId: 'inner-source-reuse' },
  { id: 'inner-source-reuse--inner-source-vs-shared-services', title: 'Inner Source vs Shared Services', parentId: 'inner-source-reuse' },
  { id: 'inner-source-reuse--inner-source-metrics', title: 'Inner Source Metrics', parentId: 'inner-source-reuse' },

  /* ---- reuse-economics ---- */
  { id: 'reuse-economics--cost-of-producing-reusable', title: 'Cost of Producing Reusable Assets', parentId: 'reuse-economics' },
  { id: 'reuse-economics--cost-of-consuming-reuse', title: 'Cost of Consuming Reusable Assets', parentId: 'reuse-economics' },
  { id: 'reuse-economics--break-even-point', title: 'Break-Even Point', parentId: 'reuse-economics' },
  { id: 'reuse-economics--reuse-roi-models', title: 'Reuse ROI Models (Poulin, SPC)', parentId: 'reuse-economics' },
  { id: 'reuse-economics--rule-of-three-reuse', title: 'Rule of Three (Reuse Context)', parentId: 'reuse-economics' },
  { id: 'reuse-economics--organizational-models-for-reuse', title: 'Organizational Models for Reuse', parentId: 'reuse-economics' },
  { id: 'reuse-economics--reuse-failure-modes', title: 'Reuse Failure Modes', parentId: 'reuse-economics' },

  /* ============================================================
   * STAGE 28 — Open Source Software Engineering
   * ============================================================ */

  /* ---- oss-fundamentals ---- */
  { id: 'oss-fundamentals--free-software-vs-open-source', title: 'Free Software vs Open Source', parentId: 'oss-fundamentals' },
  { id: 'oss-fundamentals--osi-open-source-definition', title: 'OSI Open Source Definition', parentId: 'oss-fundamentals' },
  { id: 'oss-fundamentals--fsf-and-four-freedoms', title: 'FSF & The Four Freedoms', parentId: 'oss-fundamentals' },
  { id: 'oss-fundamentals--gnu-history', title: 'GNU History (Stallman)', parentId: 'oss-fundamentals' },
  { id: 'oss-fundamentals--linux-history', title: 'Linux History (Torvalds)', parentId: 'oss-fundamentals' },
  { id: 'oss-fundamentals--cathedral-and-bazaar', title: 'The Cathedral and the Bazaar (Raymond)', parentId: 'oss-fundamentals' },
  { id: 'oss-fundamentals--source-available-licenses', title: 'Source-Available Licenses (BSL, SSPL)', parentId: 'oss-fundamentals' },
  { id: 'oss-fundamentals--fair-source', title: 'Fair Source (2024–2026)', parentId: 'oss-fundamentals' },

  /* ---- oss-licenses ---- */
  { id: 'oss-licenses--mit-license', title: 'MIT License', parentId: 'oss-licenses' },
  { id: 'oss-licenses--bsd-licenses', title: 'BSD Licenses (2-Clause, 3-Clause, 4-Clause)', parentId: 'oss-licenses' },
  { id: 'oss-licenses--apache-2', title: 'Apache 2.0', parentId: 'oss-licenses' },
  { id: 'oss-licenses--gpl-family', title: 'GPL Family (GPLv2, GPLv3, AGPL)', parentId: 'oss-licenses' },
  { id: 'oss-licenses--lgpl', title: 'LGPL', parentId: 'oss-licenses' },
  { id: 'oss-licenses--mpl', title: 'Mozilla Public License (MPL)', parentId: 'oss-licenses' },
  { id: 'oss-licenses--isc', title: 'ISC License', parentId: 'oss-licenses' },
  { id: 'oss-licenses--unlicense-cc0', title: 'Unlicense & CC0', parentId: 'oss-licenses' },
  { id: 'oss-licenses--epl', title: 'Eclipse Public License (EPL)', parentId: 'oss-licenses' },
  { id: 'oss-licenses--dual-licensing', title: 'Dual Licensing', parentId: 'oss-licenses' },
  { id: 'oss-licenses--license-compatibility', title: 'License Compatibility Matrix', parentId: 'oss-licenses' },
  { id: 'oss-licenses--spdx-identifiers', title: 'SPDX License Identifiers', parentId: 'oss-licenses' },

  /* ---- copyleft-vs-permissive ---- */
  { id: 'copyleft-vs-permissive--copyleft-definition', title: 'What Is Copyleft?', parentId: 'copyleft-vs-permissive' },
  { id: 'copyleft-vs-permissive--strong-copyleft', title: 'Strong Copyleft (GPL, AGPL)', parentId: 'copyleft-vs-permissive' },
  { id: 'copyleft-vs-permissive--weak-copyleft', title: 'Weak Copyleft (LGPL, MPL)', parentId: 'copyleft-vs-permissive' },
  { id: 'copyleft-vs-permissive--permissive-licenses', title: 'Permissive Licenses', parentId: 'copyleft-vs-permissive' },
  { id: 'copyleft-vs-permissive--viral-effect-debate', title: '"Viral Effect" Debate', parentId: 'copyleft-vs-permissive' },
  { id: 'copyleft-vs-permissive--saas-loophole-and-agpl', title: 'SaaS Loophole & AGPL', parentId: 'copyleft-vs-permissive' },

  /* ---- choosing-an-oss-license ---- */
  { id: 'choosing-an-oss-license--decision-criteria', title: 'Decision Criteria', parentId: 'choosing-an-oss-license' },
  { id: 'choosing-an-oss-license--choosealicense-com', title: 'choosealicense.com', parentId: 'choosing-an-oss-license' },
  { id: 'choosing-an-oss-license--commercial-implications', title: 'Commercial Implications', parentId: 'choosing-an-oss-license' },
  { id: 'choosing-an-oss-license--patent-grants', title: 'Patent Grants', parentId: 'choosing-an-oss-license' },
  { id: 'choosing-an-oss-license--changing-licenses-relicensing', title: 'Changing Licenses / Relicensing', parentId: 'choosing-an-oss-license' },

  /* ---- contributing-to-oss ---- */
  { id: 'contributing-to-oss--first-issue-discovery', title: 'Finding "Good First Issues"', parentId: 'contributing-to-oss' },
  { id: 'contributing-to-oss--issue-etiquette', title: 'Issue Etiquette', parentId: 'contributing-to-oss' },
  { id: 'contributing-to-oss--pull-request-etiquette', title: 'Pull Request Etiquette', parentId: 'contributing-to-oss' },
  { id: 'contributing-to-oss--cla-and-dco', title: 'CLAs & DCO Sign-Off', parentId: 'contributing-to-oss' },
  { id: 'contributing-to-oss--commit-message-conventions-oss', title: 'Commit Message Conventions (OSS)', parentId: 'contributing-to-oss' },
  { id: 'contributing-to-oss--code-of-conduct-oss', title: 'Code of Conduct (Contributor Covenant)', parentId: 'contributing-to-oss' },
  { id: 'contributing-to-oss--triaging', title: 'Issue Triaging', parentId: 'contributing-to-oss' },
  { id: 'contributing-to-oss--maintainer-responsibilities', title: 'Maintainer Responsibilities', parentId: 'contributing-to-oss' },

  /* ---- open-source-governance ---- */
  { id: 'open-source-governance--bdfl', title: 'BDFL (Benevolent Dictator)', parentId: 'open-source-governance' },
  { id: 'open-source-governance--meritocracy', title: 'Meritocracy Model', parentId: 'open-source-governance' },
  { id: 'open-source-governance--council-and-tsc', title: 'Council & Technical Steering Committee (TSC)', parentId: 'open-source-governance' },
  { id: 'open-source-governance--foundation-governance', title: 'Foundation Governance', parentId: 'open-source-governance' },
  { id: 'open-source-governance--rfc-process-oss', title: 'RFC Process (Rust, Python, etc.)', parentId: 'open-source-governance' },
  { id: 'open-source-governance--release-cadence-oss', title: 'OSS Release Cadence', parentId: 'open-source-governance' },
  { id: 'open-source-governance--vendor-led-vs-community-led', title: 'Vendor-Led vs Community-Led', parentId: 'open-source-governance' },

  /* ---- foundations-and-stewards ---- */
  { id: 'foundations-and-stewards--apache-software-foundation', title: 'Apache Software Foundation', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--linux-foundation', title: 'Linux Foundation', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--cncf', title: 'CNCF', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--eclipse-foundation', title: 'Eclipse Foundation', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--openjs-foundation', title: 'OpenJS Foundation', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--python-software-foundation', title: 'Python Software Foundation', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--rust-foundation', title: 'Rust Foundation', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--openssf', title: 'OpenSSF', parentId: 'foundations-and-stewards' },
  { id: 'foundations-and-stewards--commercial-stewards', title: 'Commercial Stewards & Trademark Holders', parentId: 'foundations-and-stewards' },

  /* ---- oss-security-supply-chain ---- */
  { id: 'oss-security-supply-chain--sigstore-cosign-rekor', title: 'Sigstore (cosign, rekor, fulcio)', parentId: 'oss-security-supply-chain' },
  { id: 'oss-security-supply-chain--ossf-scorecard', title: 'OpenSSF Scorecard', parentId: 'oss-security-supply-chain' },
  { id: 'oss-security-supply-chain--ossf-best-practices', title: 'OpenSSF Best Practices Badge', parentId: 'oss-security-supply-chain' },
  { id: 'oss-security-supply-chain--allstar', title: 'Allstar Policy Bot', parentId: 'oss-security-supply-chain' },
  { id: 'oss-security-supply-chain--osv-and-osv-scanner', title: 'OSV & osv-scanner', parentId: 'oss-security-supply-chain' },
  { id: 'oss-security-supply-chain--alpha-omega-program', title: 'Alpha-Omega Program', parentId: 'oss-security-supply-chain' },
  { id: 'oss-security-supply-chain--secure-our-software-2026', title: 'Secure-Our-Software Initiatives (2026)', parentId: 'oss-security-supply-chain' },

  /* ---- oss-sustainability ---- */
  { id: 'oss-sustainability--maintainer-burnout', title: 'Maintainer Burnout', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--funding-models', title: 'Funding Models', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--github-sponsors', title: 'GitHub Sponsors', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--open-collective', title: 'Open Collective', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--tidelift', title: 'Tidelift', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--sovereign-tech-fund', title: 'Sovereign Tech Fund / Agency', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--corporate-sponsorship', title: 'Corporate Sponsorship', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--rug-pull-relicensing-debates', title: 'Rug-Pull Relicensing Debates (Elastic, Redis, Hashicorp, Sentry)', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--succession-planning', title: 'Succession Planning for OSS Projects', parentId: 'oss-sustainability' },
  { id: 'oss-sustainability--ai-and-oss-2026', title: 'AI Code Contributions & OSS (2026)', parentId: 'oss-sustainability' },
])
