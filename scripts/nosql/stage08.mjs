import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'graph-databases',
  rootStartOrder: 37,
  tree: [
    {
      id: 'graph-db-fundamentals',
      title: 'Graph Database Fundamentals',
      summary: 'Modeling and storing highly-connected data as nodes and relationships.',
      level: 'intermediate',
      children: [
        {
          id: 'graph-model',
          title: 'Graph Data Model',
          children: [
            { id: 'nodes-vertices', title: 'Nodes / Vertices' },
            { id: 'edges-relationships', title: 'Edges / Relationships' },
            { id: 'properties-labels', title: 'Properties & Labels' },
            { id: 'directed-undirected', title: 'Directed vs Undirected' },
            { id: 'weighted-graphs', title: 'Weighted Graphs' },
          ],
        },
        {
          id: 'graph-model-types',
          title: 'Graph Model Types',
          children: [
            { id: 'labeled-property-graph-model', title: 'Labeled Property Graph (LPG)' },
            { id: 'rdf-triple-stores', title: 'RDF & Triple Stores' },
            { id: 'hypergraphs', title: 'Hypergraphs' },
            { id: 'lpg-vs-rdf', title: 'LPG vs RDF' },
          ],
        },
        {
          id: 'graph-storage',
          title: 'Storage & Processing',
          children: [
            { id: 'native-vs-non-native', title: 'Native vs Non-Native Graph Storage' },
            { id: 'index-free-adjacency', title: 'Index-Free Adjacency' },
            { id: 'graph-traversal-concept', title: 'Traversals' },
            { id: 'oltp-vs-olap-graph', title: 'Graph OLTP vs OLAP' },
          ],
        },
        {
          id: 'graph-use-cases',
          title: 'Use Cases',
          children: [
            { id: 'social-networks', title: 'Social Networks' },
            { id: 'recommendation-engines', title: 'Recommendation Engines' },
            { id: 'fraud-detection', title: 'Fraud Detection' },
            { id: 'knowledge-graphs', title: 'Knowledge Graphs' },
            { id: 'network-it-management', title: 'Network & IT Management' },
            { id: 'graphrag', title: 'GraphRAG (LLM Grounding)' },
          ],
        },
      ],
    },
    {
      id: 'graph-query-languages',
      title: 'Graph Query Languages',
      summary: 'Languages for querying and traversing graphs.',
      level: 'intermediate',
      children: [
        {
          id: 'cypher',
          title: 'Cypher',
          children: [
            { id: 'cypher-basics', title: 'Cypher Basics' },
            { id: 'cypher-match-patterns', title: 'MATCH & Patterns' },
            { id: 'cypher-create-merge', title: 'CREATE & MERGE' },
            { id: 'cypher-where-return', title: 'WHERE & RETURN' },
            { id: 'cypher-variable-length-paths', title: 'Variable-Length Paths' },
            { id: 'cypher-aggregation', title: 'Aggregation' },
          ],
        },
        {
          id: 'gql-standard',
          title: 'GQL (ISO Standard)',
          children: [
            { id: 'gql-overview', title: 'GQL Overview' },
            { id: 'gql-vs-cypher', title: 'GQL vs Cypher' },
            { id: 'gql-adoption', title: 'GQL Adoption' },
          ],
        },
        {
          id: 'gremlin',
          title: 'Gremlin (Apache TinkerPop)',
          children: [
            { id: 'gremlin-basics', title: 'Gremlin Basics' },
            { id: 'gremlin-traversals', title: 'Traversal Steps' },
            { id: 'tinkerpop', title: 'Apache TinkerPop' },
          ],
        },
        {
          id: 'sparql',
          title: 'SPARQL',
          children: [
            { id: 'sparql-basics', title: 'SPARQL Basics' },
            { id: 'sparql-triple-patterns', title: 'Triple Patterns' },
            { id: 'sparql-rdf-querying', title: 'Querying RDF' },
          ],
        },
        {
          id: 'other-graph-languages',
          title: 'Other Languages',
          children: [
            { id: 'gsql', title: 'GSQL (TigerGraph)' },
            { id: 'aql-graph', title: 'AQL (ArangoDB)' },
            { id: 'pgql', title: 'PGQL (Oracle)' },
          ],
        },
      ],
    },
    {
      id: 'neo4j',
      title: 'Neo4j',
      summary: 'The most popular native graph database.',
      level: 'advanced',
      children: [
        {
          id: 'neo4j-basics',
          title: 'Neo4j Basics',
          children: [
            { id: 'neo4j-overview', title: 'Overview & Architecture' },
            { id: 'neo4j-property-graph', title: 'Property Graph Model' },
            { id: 'neo4j-browser-cli', title: 'Neo4j Browser & cypher-shell' },
            { id: 'neo4j-editions', title: 'Community vs Enterprise' },
          ],
        },
        {
          id: 'neo4j-querying',
          title: 'Querying with Cypher',
          children: [
            { id: 'neo4j-cypher', title: 'Cypher in Neo4j' },
            { id: 'neo4j-indexes-constraints', title: 'Indexes & Constraints' },
            { id: 'neo4j-query-tuning', title: 'Query Tuning & PROFILE' },
            { id: 'neo4j-full-text-search', title: 'Full-Text Search' },
            { id: 'neo4j-vector-index', title: 'Vector Index' },
          ],
        },
        {
          id: 'neo4j-features',
          title: 'Features & Libraries',
          children: [
            { id: 'neo4j-gds', title: 'Graph Data Science (GDS)' },
            { id: 'neo4j-apoc', title: 'APOC Procedures' },
            { id: 'neo4j-bloom', title: 'Bloom Visualization' },
            { id: 'neo4j-transactions', title: 'ACID Transactions' },
          ],
        },
        {
          id: 'neo4j-scaling',
          title: 'Scaling & Operations',
          children: [
            { id: 'neo4j-causal-clustering', title: 'Clustering' },
            { id: 'neo4j-fabric-sharding', title: 'Fabric & Sharding' },
            { id: 'neo4j-backup', title: 'Backup & Restore' },
            { id: 'neo4j-aura', title: 'Neo4j Aura (Cloud)' },
          ],
        },
      ],
    },
    {
      id: 'amazon-neptune',
      title: 'Amazon Neptune',
      summary: 'Fully-managed graph database supporting LPG and RDF.',
      level: 'advanced',
      children: [
        {
          id: 'neptune-basics',
          title: 'Neptune Basics',
          children: [
            { id: 'neptune-overview', title: 'Overview & Architecture' },
            { id: 'neptune-gremlin-sparql', title: 'Gremlin & SPARQL Support' },
            { id: 'neptune-opencypher', title: 'openCypher Support' },
          ],
        },
        {
          id: 'neptune-features',
          title: 'Features',
          children: [
            { id: 'neptune-analytics', title: 'Neptune Analytics' },
            { id: 'neptune-ml', title: 'Neptune ML' },
            { id: 'neptune-serverless', title: 'Serverless' },
          ],
        },
      ],
    },
    {
      id: 'other-graph-dbs',
      title: 'Other Graph Databases',
      summary: 'Distributed, multi-model and specialized graph databases.',
      level: 'advanced',
      children: [
        {
          id: 'arangodb-graph',
          title: 'ArangoDB',
          children: [
            { id: 'arangodb-multi-model', title: 'Multi-Model (Graph + Document)' },
            { id: 'arangodb-aql', title: 'AQL' },
          ],
        },
        {
          id: 'janusgraph',
          title: 'JanusGraph',
          children: [
            { id: 'janusgraph-overview', title: 'Overview & Pluggable Storage' },
          ],
        },
        {
          id: 'tigergraph',
          title: 'TigerGraph',
          children: [
            { id: 'tigergraph-overview', title: 'Overview & GSQL' },
            { id: 'tigergraph-parallel', title: 'Parallel Graph Processing' },
          ],
        },
        {
          id: 'memgraph',
          title: 'Memgraph',
          children: [
            { id: 'memgraph-overview', title: 'In-Memory Graph & Streaming' },
          ],
        },
        {
          id: 'other-graph-engines',
          title: 'Other Engines',
          children: [
            { id: 'dgraph', title: 'Dgraph' },
            { id: 'nebula-graph', title: 'NebulaGraph' },
            { id: 'cosmos-gremlin-api', title: 'Cosmos DB Gremlin API' },
            { id: 'neo4j-vs-others', title: 'Choosing a Graph Database' },
          ],
        },
      ],
    },
    {
      id: 'graph-algorithms',
      title: 'Graph Algorithms & Analytics',
      summary: 'Algorithms that extract insight from graph structure.',
      level: 'advanced',
      children: [
        {
          id: 'pathfinding-algorithms',
          title: 'Pathfinding',
          children: [
            { id: 'shortest-path', title: 'Shortest Path (Dijkstra, A*)' },
            { id: 'bfs-dfs', title: 'BFS & DFS' },
            { id: 'minimum-spanning-tree', title: 'Minimum Spanning Tree' },
          ],
        },
        {
          id: 'centrality-algorithms',
          title: 'Centrality',
          children: [
            { id: 'pagerank', title: 'PageRank' },
            { id: 'betweenness-centrality', title: 'Betweenness Centrality' },
            { id: 'degree-closeness-centrality', title: 'Degree & Closeness' },
          ],
        },
        {
          id: 'community-detection',
          title: 'Community Detection',
          children: [
            { id: 'louvain', title: 'Louvain' },
            { id: 'label-propagation', title: 'Label Propagation' },
            { id: 'connected-components', title: 'Connected Components' },
          ],
        },
        {
          id: 'graph-ml',
          title: 'Graph ML',
          children: [
            { id: 'node-embeddings', title: 'Node Embeddings' },
            { id: 'link-prediction', title: 'Link Prediction' },
            { id: 'graph-neural-networks-intro', title: 'Graph Neural Networks' },
          ],
        },
      ],
    },
  ],
})
