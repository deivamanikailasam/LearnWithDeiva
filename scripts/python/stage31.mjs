import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'gui-desktop',
  rootStartOrder: 115,
  tree: [
    {
      id: 'gui-fundamentals',
      title: 'GUI Fundamentals',
      summary: 'Event-driven programming and GUI concepts.',
      level: 'intermediate',
      children: [
        {
          id: 'event-driven-programming',
          title: 'Event-Driven Programming',
          children: [
            { id: 'event-loops-gui', title: 'Event Loops' },
            { id: 'widgets-and-events', title: 'Widgets & Events' },
            { id: 'callbacks-gui', title: 'Callbacks & Bindings' },
          ],
        },
        {
          id: 'gui-design-concepts',
          title: 'GUI Design Concepts',
          children: [
            { id: 'layouts-gui', title: 'Layout Management' },
            { id: 'gui-state', title: 'State & Data Binding' },
            { id: 'threading-in-gui', title: 'Threading in GUIs' },
          ],
        },
      ],
    },
    {
      id: 'tkinter',
      title: 'Tkinter',
      summary: 'The standard library GUI toolkit.',
      level: 'intermediate',
      children: [
        {
          id: 'tkinter-basics',
          title: 'Tkinter Basics',
          children: [
            { id: 'tkinter-widgets', title: 'Widgets' },
            { id: 'tkinter-layout', title: 'Geometry Managers' },
            { id: 'tkinter-events', title: 'Events & Bindings' },
          ],
        },
        {
          id: 'tkinter-advanced',
          title: 'Tkinter Advanced',
          children: [
            { id: 'ttk-themed', title: 'ttk Themed Widgets' },
            { id: 'tkinter-canvas', title: 'Canvas & Drawing' },
            { id: 'tkinter-dialogs', title: 'Dialogs & Menus' },
          ],
        },
      ],
    },
    {
      id: 'gui-frameworks',
      title: 'GUI Frameworks',
      summary: 'Qt, Kivy and other GUI toolkits.',
      level: 'intermediate',
      children: [
        {
          id: 'qt-frameworks',
          title: 'Qt for Python',
          children: [
            { id: 'pyqt', title: 'PyQt' },
            { id: 'pyside', title: 'PySide' },
            { id: 'qt-designer', title: 'Qt Designer' },
          ],
        },
        {
          id: 'other-gui-frameworks',
          title: 'Other Frameworks',
          children: [
            { id: 'kivy', title: 'Kivy' },
            { id: 'wxpython', title: 'wxPython' },
            { id: 'dearpygui', title: 'Dear PyGui' },
          ],
        },
        {
          id: 'web-based-gui',
          title: 'Web-Based GUIs',
          children: [
            { id: 'pywebview', title: 'pywebview' },
            { id: 'flet', title: 'Flet' },
          ],
        },
      ],
    },
    {
      id: 'desktop-packaging',
      title: 'Packaging Desktop Apps',
      summary: 'Bundling and distributing desktop applications.',
      level: 'advanced',
      children: [
        {
          id: 'bundling-desktop-apps',
          title: 'Bundling Apps',
          children: [
            { id: 'pyinstaller-desktop', title: 'PyInstaller' },
            { id: 'briefcase', title: 'Briefcase (BeeWare)' },
            { id: 'cx-freeze', title: 'cx_Freeze' },
          ],
        },
        {
          id: 'desktop-distribution',
          title: 'Distribution',
          children: [
            { id: 'installers', title: 'Installers' },
            { id: 'auto-updates', title: 'Auto-Updates' },
          ],
        },
      ],
    },
    {
      id: 'game-development',
      title: 'Game Development',
      summary: 'Building games and interactive graphics.',
      level: 'intermediate',
      children: [
        {
          id: 'pygame',
          title: 'Pygame',
          children: [
            { id: 'pygame-basics', title: 'Pygame Basics' },
            { id: 'game-loop', title: 'The Game Loop' },
            { id: 'sprites-collision', title: 'Sprites & Collision' },
          ],
        },
        {
          id: 'game-libraries',
          title: 'Other Game Libraries',
          children: [
            { id: 'arcade', title: 'Arcade' },
            { id: 'pyglet', title: 'Pyglet' },
          ],
        },
      ],
    },
  ],
})
