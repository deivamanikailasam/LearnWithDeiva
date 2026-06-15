import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'search-engines',
  rootStartOrder: 43,
  tree: [
    {
      id: 'search-fundamentals',
      title: 'Search Engine Fundamentals',
      summary: 'How full-text search engines index and rank documents.',
      level: 'intermediate',
      children: [
        {
          id: 'inverted-index',
          title: 'Inverted Index',
          children: [
            { id: 'inverted-index-concept', title: 'Inverted Index Concept' },
            { id: 'postings-lists', title: 'Postings Lists' },
            { id: 'term-dictionary', title: 'Term Dictionary' },
            { id: 'segments-lucene', title: 'Segments (Lucene)' },
          ],
        },
        {
          id: 'text-analysis',
          title: 'Text Analysis',
          children: [
            { id: 'tokenization-search', title: 'Tokenization' },
            { id: 'stemming-lemmatization', title: 'Stemming & Lemmatization' },
            { id: 'stop-words', title: 'Stop Words' },
            { id: 'analyzers-filters', title: 'Analyzers & Token Filters' },
            { id: 'n-grams', title: 'N-Grams' },
            { id: 'synonyms-search', title: 'Synonyms' },
          ],
        },
        {
          id: 'relevance-ranking',
          title: 'Relevance & Ranking',
          children: [
            { id: 'tf-idf', title: 'TF-IDF' },
            { id: 'bm25', title: 'BM25' },
            { id: 'scoring-boosting', title: 'Scoring & Boosting' },
            { id: 'learning-to-rank', title: 'Learning to Rank' },
          ],
        },
        {
          id: 'search-features',
          title: 'Search Features',
          children: [
            { id: 'full-text-search-feat', title: 'Full-Text Search' },
            { id: 'faceted-search', title: 'Faceted Search' },
            { id: 'autocomplete-suggestions', title: 'Autocomplete & Suggestions' },
            { id: 'fuzzy-search', title: 'Fuzzy Search & Typo Tolerance' },
            { id: 'highlighting', title: 'Highlighting' },
            { id: 'geo-search', title: 'Geo Search' },
          ],
        },
        {
          id: 'search-vs-database',
          title: 'Search Engine vs Database',
          children: [
            { id: 'search-as-secondary-store', title: 'Search as a Secondary Store' },
            { id: 'search-sync-patterns', title: 'Syncing from Primary DB' },
            { id: 'search-consistency', title: 'Near-Real-Time Consistency' },
          ],
        },
      ],
    },
    {
      id: 'elasticsearch',
      title: 'Elasticsearch',
      summary: 'The leading distributed search & analytics engine (Elasticsearch 9.x).',
      level: 'advanced',
      children: [
        {
          id: 'elasticsearch-basics',
          title: 'Elasticsearch Basics',
          children: [
            { id: 'es-overview', title: 'Overview & Lucene' },
            { id: 'es-indices-documents', title: 'Indices & Documents' },
            { id: 'es-mappings', title: 'Mappings & Field Types' },
            { id: 'es-shards-replicas', title: 'Shards & Replicas' },
            { id: 'es-licensing', title: 'Licensing (Elastic vs OpenSearch)' },
          ],
        },
        {
          id: 'elasticsearch-querying',
          title: 'Querying',
          children: [
            { id: 'es-query-dsl', title: 'Query DSL' },
            { id: 'es-full-text-queries', title: 'Full-Text Queries' },
            { id: 'es-term-queries', title: 'Term-Level Queries' },
            { id: 'es-bool-query', title: 'Compound (bool) Queries' },
            { id: 'es-aggregations', title: 'Aggregations' },
            { id: 'es-esql', title: 'ES|QL' },
          ],
        },
        {
          id: 'elasticsearch-vector-ai',
          title: 'Vector & AI Search',
          children: [
            { id: 'es-knn-search', title: 'kNN / Dense Vector Search' },
            { id: 'es-semantic-search', title: 'Semantic Search' },
            { id: 'es-elser', title: 'ELSER (Sparse Retrieval)' },
            { id: 'es-hybrid-search', title: 'Hybrid Search & RRF' },
          ],
        },
        {
          id: 'elasticsearch-architecture',
          title: 'Architecture & Scaling',
          children: [
            { id: 'es-cluster', title: 'Cluster & Nodes' },
            { id: 'es-node-roles', title: 'Node Roles' },
            { id: 'es-index-lifecycle', title: 'Index Lifecycle Management (ILM)' },
            { id: 'es-data-tiers', title: 'Data Tiers (Hot/Warm/Cold/Frozen)' },
            { id: 'es-cross-cluster', title: 'Cross-Cluster Replication & Search' },
          ],
        },
        {
          id: 'elastic-stack',
          title: 'Elastic Stack',
          children: [
            { id: 'kibana', title: 'Kibana' },
            { id: 'logstash', title: 'Logstash' },
            { id: 'beats', title: 'Beats' },
            { id: 'elastic-observability', title: 'Observability & Security' },
            { id: 'elastic-cloud', title: 'Elastic Cloud' },
          ],
        },
      ],
    },
    {
      id: 'opensearch',
      title: 'OpenSearch',
      summary: 'Open-source fork of Elasticsearch maintained by the OpenSearch Foundation.',
      level: 'advanced',
      children: [
        {
          id: 'opensearch-basics',
          title: 'OpenSearch Basics',
          children: [
            { id: 'opensearch-overview', title: 'Overview & Origin' },
            { id: 'opensearch-vs-elasticsearch', title: 'OpenSearch vs Elasticsearch' },
            { id: 'opensearch-dashboards', title: 'OpenSearch Dashboards' },
          ],
        },
        {
          id: 'opensearch-features',
          title: 'Features',
          children: [
            { id: 'opensearch-vector-engine', title: 'Vector Engine' },
            { id: 'opensearch-ml-commons', title: 'ML Commons' },
            { id: 'opensearch-aws-service', title: 'Amazon OpenSearch Service' },
          ],
        },
      ],
    },
    {
      id: 'apache-solr',
      title: 'Apache Solr',
      summary: 'Mature Lucene-based enterprise search platform.',
      level: 'advanced',
      children: [
        {
          id: 'solr-basics',
          title: 'Solr Basics',
          children: [
            { id: 'solr-overview', title: 'Overview & Cores' },
            { id: 'solr-schema', title: 'Schema & Fields' },
            { id: 'solr-querying', title: 'Querying' },
          ],
        },
        {
          id: 'solr-scaling',
          title: 'Scaling',
          children: [
            { id: 'solrcloud', title: 'SolrCloud' },
            { id: 'solr-vs-elasticsearch', title: 'Solr vs Elasticsearch' },
          ],
        },
      ],
    },
    {
      id: 'other-search-engines',
      title: 'Other Search Engines',
      summary: 'Modern, developer-friendly and large-scale search engines.',
      level: 'advanced',
      children: [
        {
          id: 'typesense',
          title: 'Typesense',
          children: [
            { id: 'typesense-overview', title: 'Overview & Typo Tolerance' },
          ],
        },
        {
          id: 'meilisearch',
          title: 'Meilisearch',
          children: [
            { id: 'meilisearch-overview', title: 'Overview & Instant Search' },
            { id: 'meilisearch-hybrid', title: 'Hybrid & Vector Search' },
          ],
        },
        {
          id: 'algolia',
          title: 'Algolia',
          children: [
            { id: 'algolia-overview', title: 'Overview (Search-as-a-Service)' },
          ],
        },
        {
          id: 'vespa',
          title: 'Vespa',
          children: [
            { id: 'vespa-overview', title: 'Overview (Big Data Serving)' },
          ],
        },
        {
          id: 'other-search-tools',
          title: 'Other Tools',
          children: [
            { id: 'quickwit', title: 'Quickwit' },
            { id: 'manticore-search', title: 'Manticore Search' },
            { id: 'apache-lucene', title: 'Apache Lucene (Library)' },
          ],
        },
      ],
    },
  ],
})
