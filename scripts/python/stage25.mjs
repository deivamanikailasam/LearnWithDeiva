import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'data-science',
  rootStartOrder: 95,
  tree: [
    {
      id: 'numpy',
      title: 'NumPy',
      summary: 'Arrays, broadcasting and vectorization.',
      level: 'intermediate',
      children: [
        {
          id: 'ndarray',
          title: 'The ndarray',
          children: [
            { id: 'creating-arrays', title: 'Creating Arrays' },
            { id: 'array-attributes', title: 'Array Attributes' },
            { id: 'dtypes', title: 'Data Types (dtype)' },
          ],
        },
        {
          id: 'array-operations',
          title: 'Array Operations',
          children: [
            { id: 'indexing-slicing-np', title: 'Indexing & Slicing' },
            { id: 'reshaping', title: 'Reshaping' },
            { id: 'concatenation-splitting', title: 'Concatenation & Splitting' },
          ],
        },
        {
          id: 'vectorized-computation',
          title: 'Vectorized Computation',
          children: [
            { id: 'broadcasting', title: 'Broadcasting' },
            { id: 'universal-functions', title: 'Universal Functions' },
            { id: 'aggregations-np', title: 'Aggregations' },
          ],
        },
        {
          id: 'linear-algebra-np',
          title: 'Linear Algebra & Random',
          children: [
            { id: 'matrix-operations', title: 'Matrix Operations' },
            { id: 'random-np', title: 'np.random' },
          ],
        },
      ],
    },
    {
      id: 'pandas',
      title: 'pandas',
      summary: 'DataFrames, cleaning and analysis.',
      level: 'intermediate',
      children: [
        {
          id: 'pandas-structures',
          title: 'Data Structures',
          children: [
            { id: 'series', title: 'Series' },
            { id: 'dataframe', title: 'DataFrame' },
          ],
        },
        {
          id: 'data-loading',
          title: 'Loading Data',
          children: [
            { id: 'reading-csv-excel', title: 'CSV & Excel' },
            { id: 'reading-sql-json', title: 'SQL & JSON' },
          ],
        },
        {
          id: 'data-manipulation',
          title: 'Data Manipulation',
          children: [
            { id: 'selecting-filtering', title: 'Selecting & Filtering' },
            { id: 'groupby-aggregation', title: 'GroupBy & Aggregation' },
            { id: 'merging-joining', title: 'Merging & Joining' },
            { id: 'reshaping-pivot', title: 'Reshaping & Pivoting' },
          ],
        },
        {
          id: 'data-cleaning',
          title: 'Data Cleaning',
          children: [
            { id: 'missing-data', title: 'Missing Data' },
            { id: 'data-types-conversion', title: 'Type Conversion' },
            { id: 'duplicates-outliers', title: 'Duplicates & Outliers' },
          ],
        },
      ],
    },
    {
      id: 'visualization',
      title: 'Data Visualization',
      summary: 'matplotlib, seaborn and plotting.',
      level: 'intermediate',
      children: [
        {
          id: 'matplotlib',
          title: 'matplotlib',
          children: [
            { id: 'matplotlib-basics', title: 'matplotlib Basics' },
            { id: 'plot-types', title: 'Plot Types' },
            { id: 'customizing-plots', title: 'Customizing Plots' },
          ],
        },
        {
          id: 'seaborn',
          title: 'seaborn',
          children: [
            { id: 'statistical-plots', title: 'Statistical Plots' },
          ],
        },
        {
          id: 'interactive-viz',
          title: 'Interactive Visualization',
          children: [
            { id: 'plotly', title: 'Plotly' },
            { id: 'bokeh-altair', title: 'Bokeh & Altair' },
          ],
        },
      ],
    },
    {
      id: 'ml-scientific',
      title: 'ML & Scientific Stack',
      summary: 'scikit-learn, SciPy and Jupyter.',
      level: 'advanced',
      children: [
        {
          id: 'scipy',
          title: 'SciPy',
          children: [
            { id: 'scipy-modules', title: 'SciPy Modules' },
            { id: 'optimization-scipy', title: 'Optimization' },
          ],
        },
        {
          id: 'scikit-learn',
          title: 'scikit-learn',
          children: [
            { id: 'sklearn-basics', title: 'scikit-learn Basics' },
            { id: 'models-pipelines', title: 'Models & Pipelines' },
            { id: 'model-evaluation-sklearn', title: 'Model Evaluation' },
          ],
        },
        {
          id: 'jupyter',
          title: 'Jupyter',
          children: [
            { id: 'notebooks', title: 'Notebooks' },
            { id: 'jupyter-ecosystem', title: 'JupyterLab & Ecosystem' },
          ],
        },
        {
          id: 'deep-learning-libs',
          title: 'Deep Learning Libraries',
          children: [
            { id: 'pytorch-tensorflow-intro', title: 'PyTorch & TensorFlow' },
          ],
        },
      ],
    },
  ],
})
