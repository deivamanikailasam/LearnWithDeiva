import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'vector-databases',
  rootStartOrder: 53,
  tree: [
    {
      id: 'vector-db-fundamentals',
      title: 'Vector Database Fundamentals',
      summary: 'Storing and searching high-dimensional embeddings by similarity.',
      level: 'intermediate',
      children: [
        {
          id: 'embeddings',
          title: 'Embeddings',
          children: [
            { id: 'what-are-embeddings', title: 'What Are Embeddings' },
            { id: 'embedding-models', title: 'Embedding Models' },
            { id: 'text-image-multimodal-embeddings', title: 'Text, Image & Multimodal' },
            { id: 'dimensionality', title: 'Dimensionality' },
            { id: 'embedding-generation', title: 'Generating Embeddings' },
          ],
        },
        {
          id: 'similarity-search',
          title: 'Similarity Search',
          children: [
            { id: 'distance-metrics', title: 'Distance Metrics (Cosine, Euclidean, Dot)' },
            { id: 'knn-search', title: 'k-Nearest Neighbors (kNN)' },
            { id: 'ann-search', title: 'Approximate NN (ANN)' },
            { id: 'recall-vs-latency', title: 'Recall vs Latency Trade-off' },
          ],
        },
        {
          id: 'vector-indexes',
          title: 'Vector Indexes',
          children: [
            { id: 'flat-index', title: 'Flat (Brute Force)' },
            { id: 'hnsw', title: 'HNSW' },
            { id: 'ivf', title: 'IVF (Inverted File)' },
            { id: 'product-quantization', title: 'Product Quantization (PQ)' },
            { id: 'scalar-binary-quantization', title: 'Scalar & Binary Quantization' },
            { id: 'disk-ann', title: 'DiskANN' },
          ],
        },
        {
          id: 'vector-search-features',
          title: 'Features',
          children: [
            { id: 'metadata-filtering', title: 'Metadata Filtering' },
            { id: 'hybrid-search-vector', title: 'Hybrid Search (Dense + Sparse)' },
            { id: 'reranking', title: 'Reranking' },
            { id: 'multi-vector-search', title: 'Multi-Vector Search' },
            { id: 'namespaces-multitenancy', title: 'Namespaces & Multi-Tenancy' },
          ],
        },
        {
          id: 'vector-use-cases',
          title: 'Use Cases',
          children: [
            { id: 'rag-use-case', title: 'Retrieval-Augmented Generation (RAG)' },
            { id: 'semantic-search-use-case', title: 'Semantic Search' },
            { id: 'recommendations-vector', title: 'Recommendations' },
            { id: 'image-similarity', title: 'Image Similarity' },
            { id: 'anomaly-detection-vector', title: 'Anomaly Detection' },
            { id: 'llm-memory', title: 'LLM Long-Term Memory' },
          ],
        },
      ],
    },
    {
      id: 'pinecone',
      title: 'Pinecone',
      summary: 'Fully-managed serverless vector database.',
      level: 'advanced',
      children: [
        {
          id: 'pinecone-basics',
          title: 'Pinecone Basics',
          children: [
            { id: 'pinecone-overview', title: 'Overview & Serverless Architecture' },
            { id: 'pinecone-indexes-namespaces', title: 'Indexes & Namespaces' },
            { id: 'pinecone-upsert-query', title: 'Upsert & Query' },
          ],
        },
        {
          id: 'pinecone-features',
          title: 'Features',
          children: [
            { id: 'pinecone-metadata-filtering', title: 'Metadata Filtering' },
            { id: 'pinecone-hybrid', title: 'Hybrid Search' },
            { id: 'pinecone-reranking', title: 'Integrated Reranking & Inference' },
          ],
        },
      ],
    },
    {
      id: 'weaviate',
      title: 'Weaviate',
      summary: 'Open-source vector database with built-in modules and GraphQL.',
      level: 'advanced',
      children: [
        {
          id: 'weaviate-basics',
          title: 'Weaviate Basics',
          children: [
            { id: 'weaviate-overview', title: 'Overview & Schema' },
            { id: 'weaviate-collections', title: 'Collections & Objects' },
            { id: 'weaviate-graphql', title: 'GraphQL API' },
          ],
        },
        {
          id: 'weaviate-features',
          title: 'Features',
          children: [
            { id: 'weaviate-vectorizers', title: 'Vectorizer Modules' },
            { id: 'weaviate-hybrid-search', title: 'Hybrid Search' },
            { id: 'weaviate-generative', title: 'Generative Search (RAG)' },
            { id: 'weaviate-multitenancy', title: 'Multi-Tenancy' },
          ],
        },
      ],
    },
    {
      id: 'milvus',
      title: 'Milvus',
      summary: 'Open-source vector database built for billion-scale workloads.',
      level: 'advanced',
      children: [
        {
          id: 'milvus-basics',
          title: 'Milvus Basics',
          children: [
            { id: 'milvus-overview', title: 'Overview & Architecture' },
            { id: 'milvus-collections', title: 'Collections & Partitions' },
            { id: 'milvus-index-types', title: 'Index Types' },
          ],
        },
        {
          id: 'milvus-features',
          title: 'Features & Ecosystem',
          children: [
            { id: 'milvus-scaling', title: 'Distributed Scaling' },
            { id: 'milvus-zilliz', title: 'Zilliz Cloud' },
            { id: 'milvus-lite', title: 'Milvus Lite' },
          ],
        },
      ],
    },
    {
      id: 'qdrant',
      title: 'Qdrant',
      summary: 'High-performance open-source vector database written in Rust.',
      level: 'advanced',
      children: [
        {
          id: 'qdrant-basics',
          title: 'Qdrant Basics',
          children: [
            { id: 'qdrant-overview', title: 'Overview & Collections' },
            { id: 'qdrant-points-payloads', title: 'Points & Payloads' },
            { id: 'qdrant-filtering', title: 'Payload Filtering' },
          ],
        },
        {
          id: 'qdrant-features',
          title: 'Features',
          children: [
            { id: 'qdrant-quantization', title: 'Quantization' },
            { id: 'qdrant-hybrid', title: 'Hybrid & Sparse Vectors' },
            { id: 'qdrant-cloud', title: 'Qdrant Cloud' },
          ],
        },
      ],
    },
    {
      id: 'other-vector-dbs',
      title: 'Other Vector Databases & Integrations',
      summary: 'Embedded vector stores and vector features in existing databases.',
      level: 'advanced',
      children: [
        {
          id: 'chroma',
          title: 'Chroma',
          children: [
            { id: 'chroma-overview', title: 'Overview (Embedded / AI-Native)' },
          ],
        },
        {
          id: 'pgvector',
          title: 'pgvector',
          children: [
            { id: 'pgvector-overview', title: 'Overview (Postgres Extension)' },
            { id: 'pgvector-indexes', title: 'HNSW & IVFFlat Indexes' },
          ],
        },
        {
          id: 'lancedb',
          title: 'LanceDB',
          children: [
            { id: 'lancedb-overview', title: 'Overview (Embedded, Lance Format)' },
          ],
        },
        {
          id: 'vector-in-existing-dbs',
          title: 'Vectors in Existing Databases',
          children: [
            { id: 'redis-vector', title: 'Redis Vector' },
            { id: 'elasticsearch-vector', title: 'Elasticsearch / OpenSearch' },
            { id: 'mongodb-atlas-vector', title: 'MongoDB Atlas Vector' },
            { id: 'cassandra-astra-vector', title: 'Cassandra / Astra' },
            { id: 'sqlite-vec', title: 'SQLite-vec' },
          ],
        },
        {
          id: 'other-vector-engines',
          title: 'Other Engines',
          children: [
            { id: 'vespa-vector', title: 'Vespa' },
            { id: 'marqo', title: 'Marqo' },
            { id: 'turbopuffer', title: 'turbopuffer' },
            { id: 'faiss', title: 'FAISS (Library)' },
          ],
        },
      ],
    },
    {
      id: 'vector-search-practice',
      title: 'Vector Search in Practice',
      summary: 'Building real applications on top of vector databases.',
      level: 'advanced',
      children: [
        {
          id: 'rag-pipelines',
          title: 'RAG Pipelines',
          children: [
            { id: 'chunking-strategies', title: 'Chunking Strategies' },
            { id: 'ingestion-pipeline', title: 'Ingestion Pipeline' },
            { id: 'retrieval-strategies', title: 'Retrieval Strategies' },
            { id: 'context-assembly', title: 'Context Assembly' },
          ],
        },
        {
          id: 'vector-frameworks',
          title: 'Frameworks',
          children: [
            { id: 'langchain-vector', title: 'LangChain' },
            { id: 'llamaindex', title: 'LlamaIndex' },
            { id: 'haystack', title: 'Haystack' },
          ],
        },
        {
          id: 'vector-best-practices',
          title: 'Best Practices',
          children: [
            { id: 'choosing-embedding-model', title: 'Choosing an Embedding Model' },
            { id: 'index-tuning', title: 'Index Tuning (ef, M)' },
            { id: 'eval-retrieval-quality', title: 'Evaluating Retrieval Quality' },
            { id: 'cost-scaling-vector', title: 'Cost & Scaling' },
          ],
        },
      ],
    },
  ],
})
