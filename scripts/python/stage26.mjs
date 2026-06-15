import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'automation',
  rootStartOrder: 99,
  tree: [
    {
      id: 'cli-scripting',
      title: 'CLI Scripting',
      summary: 'Building command-line tools.',
      level: 'intermediate',
      children: [
        {
          id: 'building-clis',
          title: 'Building CLIs',
          children: [
            { id: 'script-structure', title: 'Script Structure' },
            { id: 'shebang-executable', title: 'Shebang & Executables' },
            { id: 'exit-codes', title: 'Exit Codes' },
          ],
        },
        {
          id: 'argument-parsing',
          title: 'Argument Parsing',
          children: [
            { id: 'argparse-cli', title: 'argparse' },
            { id: 'click', title: 'Click' },
            { id: 'typer', title: 'Typer' },
          ],
        },
        {
          id: 'interactive-clis',
          title: 'Interactive CLIs',
          children: [
            { id: 'prompts-input', title: 'Prompts & Input' },
            { id: 'rich-output', title: 'Rich Output' },
            { id: 'progress-bars', title: 'Progress Bars' },
          ],
        },
      ],
    },
    {
      id: 'file-task-automation',
      title: 'File & Task Automation',
      summary: 'Batch file ops and scheduling.',
      level: 'intermediate',
      children: [
        {
          id: 'batch-file-operations',
          title: 'Batch File Operations',
          children: [
            { id: 'bulk-rename', title: 'Bulk Renaming' },
            { id: 'searching-files', title: 'Searching Files' },
            { id: 'file-organization', title: 'Organizing Files' },
          ],
        },
        {
          id: 'scheduling',
          title: 'Scheduling',
          children: [
            { id: 'cron-scheduling', title: 'cron & Task Scheduler' },
            { id: 'schedule-library', title: 'The schedule Library' },
            { id: 'task-queues-automation', title: 'Task Queues' },
          ],
        },
        {
          id: 'system-automation',
          title: 'System Automation',
          children: [
            { id: 'shell-commands-automation', title: 'Running Shell Commands' },
            { id: 'environment-automation', title: 'Environment Automation' },
            { id: 'watching-files', title: 'Watching Files' },
          ],
        },
      ],
    },
    {
      id: 'document-automation',
      title: 'Document & Web Automation',
      summary: 'Excel, PDFs and browser automation.',
      level: 'intermediate',
      children: [
        {
          id: 'spreadsheets',
          title: 'Spreadsheets',
          children: [
            { id: 'openpyxl', title: 'openpyxl' },
            { id: 'pandas-excel', title: 'pandas for Excel' },
          ],
        },
        {
          id: 'pdfs',
          title: 'PDFs',
          children: [
            { id: 'reading-pdfs', title: 'Reading PDFs' },
            { id: 'generating-pdfs', title: 'Generating PDFs' },
          ],
        },
        {
          id: 'office-docs',
          title: 'Office & Email',
          children: [
            { id: 'word-docs', title: 'Word Documents' },
            { id: 'email-automation', title: 'Email Automation' },
          ],
        },
        {
          id: 'browser-automation',
          title: 'Browser Automation',
          children: [
            { id: 'selenium-automation', title: 'Selenium' },
            { id: 'playwright-automation', title: 'Playwright' },
          ],
        },
      ],
    },
  ],
})
