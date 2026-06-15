import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'design-architecture',
  rootStartOrder: 105,
  tree: [
    {
      id: 'design-patterns',
      title: 'Design Patterns',
      summary: 'Creational, structural and behavioral patterns.',
      level: 'advanced',
      children: [
        {
          id: 'creational-patterns',
          title: 'Creational Patterns',
          children: [
            { id: 'singleton', title: 'Singleton' },
            { id: 'factory-pattern', title: 'Factory' },
            { id: 'builder', title: 'Builder' },
            { id: 'prototype', title: 'Prototype' },
          ],
        },
        {
          id: 'structural-patterns-dp',
          title: 'Structural Patterns',
          children: [
            { id: 'adapter', title: 'Adapter' },
            { id: 'decorator-pattern', title: 'Decorator' },
            { id: 'facade', title: 'Facade' },
            { id: 'proxy', title: 'Proxy' },
          ],
        },
        {
          id: 'behavioral-patterns',
          title: 'Behavioral Patterns',
          children: [
            { id: 'observer', title: 'Observer' },
            { id: 'strategy', title: 'Strategy' },
            { id: 'command', title: 'Command' },
            { id: 'iterator-pattern', title: 'Iterator' },
          ],
        },
        {
          id: 'pythonic-patterns',
          title: 'Pythonic Patterns',
          children: [
            { id: 'patterns-in-python', title: 'Patterns in Python' },
            { id: 'avoiding-overengineering', title: 'Avoiding Over-Engineering' },
          ],
        },
      ],
    },
    {
      id: 'design-principles',
      title: 'Design Principles',
      summary: 'SOLID, DRY and clean code.',
      level: 'advanced',
      children: [
        {
          id: 'solid',
          title: 'SOLID',
          children: [
            { id: 'single-responsibility', title: 'Single Responsibility' },
            { id: 'open-closed', title: 'Open/Closed' },
            { id: 'liskov', title: 'Liskov Substitution' },
            { id: 'interface-segregation', title: 'Interface Segregation' },
            { id: 'dependency-inversion', title: 'Dependency Inversion' },
          ],
        },
        {
          id: 'other-principles',
          title: 'Other Principles',
          children: [
            { id: 'dry', title: 'DRY' },
            { id: 'kiss-yagni', title: 'KISS & YAGNI' },
            { id: 'composition-over-inheritance', title: 'Composition over Inheritance' },
          ],
        },
        {
          id: 'clean-code',
          title: 'Clean Code',
          children: [
            { id: 'naming-clean-code', title: 'Naming' },
            { id: 'small-functions', title: 'Small Functions' },
            { id: 'code-smells', title: 'Code Smells' },
          ],
        },
      ],
    },
    {
      id: 'project-architecture',
      title: 'Project Architecture',
      summary: 'Structure, layering and dependency injection.',
      level: 'advanced',
      children: [
        {
          id: 'project-structure',
          title: 'Project Structure',
          children: [
            { id: 'layout-conventions-arch', title: 'Layout Conventions' },
            { id: 'src-layout', title: 'src Layout' },
            { id: 'configuration-management', title: 'Configuration Management' },
          ],
        },
        {
          id: 'layering',
          title: 'Layering & Boundaries',
          children: [
            { id: 'layered-architecture', title: 'Layered Architecture' },
            { id: 'separation-of-concerns', title: 'Separation of Concerns' },
            { id: 'hexagonal-architecture', title: 'Hexagonal Architecture' },
          ],
        },
        {
          id: 'dependency-injection-arch',
          title: 'Dependency Injection',
          children: [
            { id: 'di-basics', title: 'DI Basics' },
            { id: 'di-containers', title: 'DI Containers' },
          ],
        },
        {
          id: 'scaling-codebases',
          title: 'Scaling Codebases',
          children: [
            { id: 'modular-design', title: 'Modular Design' },
            { id: 'monorepo-vs-multi', title: 'Monorepo vs Multi-Repo' },
          ],
        },
      ],
    },
  ],
})
