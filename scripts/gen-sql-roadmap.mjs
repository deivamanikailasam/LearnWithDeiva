/**
 * SQL roadmap content generator.
 *
 * Source-of-truth outline for the `sql` subject. Running this script emits:
 *   - src/content/subjects/sql/subject.json
 *   - src/content/subjects/sql/roadmap.json          (stages -> root-topic nodes)
 *   - src/content/subjects/sql/topics/<id>/topic.json (full topic tree)
 *
 * The outline is built up stage-group by stage-group ("parts"). Each run writes
 * everything currently in the outline; ids are slugified from titles and made
 * globally unique (collisions get prefixed with the parent id), and parentId
 * links wire roots -> subtopics -> sub-subtopics. No section bodies are written
 * (topics carry metadata only), matching the requested "structure only" scope.
 *
 * Usage: node scripts/gen-sql-roadmap.mjs
 */
import { mkdir, writeFile, readdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SUBJECT_DIR = path.join(ROOT, 'src', 'content', 'subjects', 'sql')
const TOPICS_DIR = path.join(SUBJECT_DIR, 'topics')

const SUBJECT = {
  id: 'sql',
  title: 'SQL',
  tagline: 'From beginner to expert',
  description:
    'A complete path through SQL: database and relational foundations, data types, querying, filtering, functions, aggregation, joins, subqueries and CTEs, set operations, DML and DDL, constraints, views, indexes, transactions and concurrency, window functions, advanced querying, procedural SQL, semi-structured data, database design and normalization, performance tuning, security, administration, distributed and analytical SQL, dialects and the modern SQL ecosystem (through SQL:2023).',
  icon: '🗄️',
  gradient: ['#2563eb', '#06b6d4'],
  tags: ['sql', 'database', 'rdbms', 'queries', 'data'],
  level: 'beginner',
}

/**
 * Outline node shapes (compact):
 *   "Leaf Title"                              -> leaf node
 *   { t: "Title", c: [ ...children ] }        -> node with children
 *   { t: "Title", lvl: "advanced", c: [...] } -> node with explicit level
 * Each stage: { id, title, summary, lvl, nodes: [ rootTopic, ... ] }
 * where rootTopic is { t, c } (the roadmap nodes).
 */
const STAGES = [
  // ===================== STAGE 1 =====================
  {
    id: 'foundations',
    title: 'Databases & Relational Foundations',
    summary: 'What databases are, the relational model and the SQL language landscape.',
    lvl: 'beginner',
    tag: 'foundations',
    nodes: [
      {
        t: 'Database Fundamentals',
        c: [
          { t: 'Data vs Information', c: ['Data', 'Information', 'Knowledge', 'Metadata'] },
          {
            t: 'Types of Databases',
            c: [
              'Relational Databases',
              'NoSQL Databases',
              'NewSQL Databases',
              'Document Databases',
              'Key-Value Stores',
              'Columnar (Wide-Column) Databases',
              'Graph Databases',
              'Time-Series Databases',
              'In-Memory Databases',
              'Object-Oriented Databases',
              'Vector Databases',
              'OLTP vs OLAP',
            ],
          },
          {
            t: 'DBMS Overview',
            c: [
              'What is a DBMS',
              'RDBMS',
              'Database vs DBMS',
              'Functions of a DBMS',
              'Database Users & Roles',
              'Advantages over File Systems',
            ],
          },
          {
            t: 'Database Architecture',
            c: [
              'Three-Schema Architecture',
              'External (View) Level',
              'Conceptual (Logical) Level',
              'Internal (Physical) Level',
              'Logical Data Independence',
              'Physical Data Independence',
              'Database Schemas vs Instances',
              'Client-Server Architecture',
            ],
          },
        ],
      },
      {
        t: 'The Relational Model',
        c: [
          {
            t: 'Relational Model Concepts',
            c: [
              'Relations (Tables)',
              'Tuples (Rows)',
              'Attributes (Columns)',
              'Domains',
              'Degree & Cardinality',
              'Relation Schema vs Instance',
            ],
          },
          {
            t: 'Keys in the Relational Model',
            c: [
              'Super Key',
              'Candidate Key',
              'Primary Key',
              'Foreign Key',
              'Composite Key',
              'Alternate Key',
              'Surrogate vs Natural Key',
              'Unique Key',
            ],
          },
          {
            t: 'Relational Algebra',
            c: [
              'Selection (σ)',
              'Projection (π)',
              'Union, Intersection & Difference',
              'Cartesian Product',
              'Join Operations',
              'Rename (ρ)',
              'Division',
              'Aggregation in Relational Algebra',
            ],
          },
          {
            t: 'Relational Calculus',
            c: ['Tuple Relational Calculus', 'Domain Relational Calculus'],
          },
          {
            t: 'Integrity Rules',
            c: [
              'Entity Integrity',
              'Referential Integrity',
              'Domain Integrity',
              'Key Constraints',
            ],
          },
          { t: "Codd's 12 Rules", c: [] },
        ],
      },
      {
        t: 'SQL Language Overview',
        c: [
          'What is SQL',
          'History of SQL',
          {
            t: 'SQL Standards (ANSI/ISO)',
            c: [
              'SQL-86 / SQL-89',
              'SQL-92',
              'SQL:1999',
              'SQL:2003',
              'SQL:2008',
              'SQL:2011',
              'SQL:2016',
              'SQL:2019',
              'SQL:2023',
              'Core vs Optional Features',
            ],
          },
          {
            t: 'SQL Sublanguages',
            c: [
              'DDL (Data Definition Language)',
              'DML (Data Manipulation Language)',
              'DQL (Data Query Language)',
              'DCL (Data Control Language)',
              'TCL (Transaction Control Language)',
            ],
          },
          'Declarative vs Procedural SQL',
          'SQL vs NoSQL',
          {
            t: 'SQL Dialects Overview',
            c: [
              'PostgreSQL',
              'MySQL / MariaDB',
              'SQL Server (T-SQL)',
              'Oracle (PL/SQL)',
              'SQLite',
              'IBM Db2',
              'Cloud & Analytical Dialects',
            ],
          },
        ],
      },
      {
        t: 'Environment & Tooling Setup',
        c: [
          'Installing a Database Engine',
          {
            t: 'SQL Clients & IDEs',
            c: [
              'psql (PostgreSQL CLI)',
              'mysql / MySQL Workbench',
              'SQL Server Management Studio (SSMS)',
              'sqlcmd',
              'DBeaver',
              'pgAdmin',
              'DataGrip',
              'Azure Data Studio',
            ],
          },
          'Connecting to a Database',
          {
            t: 'Sample Databases',
            c: ['Sakila / Pagila', 'Northwind', 'Chinook', 'AdventureWorks', 'Employees'],
          },
          'Running Queries & Scripts',
          {
            t: 'SQL Syntax Basics',
            c: [
              'Statements & Clauses',
              'Identifiers & Quoting',
              'Literals & Constants',
              'Comments',
              'Case Sensitivity',
              'Whitespace & Formatting',
              'Semicolons & Statement Termination',
              'Reserved Keywords',
            ],
          },
        ],
      },
    ],
  },

  // ===================== STAGE 2 =====================
  {
    id: 'data-types',
    title: 'Data Types',
    summary: 'The built-in types SQL uses to store numbers, text, dates, binary and special values.',
    lvl: 'beginner',
    tag: 'data-types',
    nodes: [
      {
        t: 'Numeric Types',
        c: [
          {
            t: 'Integer Types',
            c: ['TINYINT', 'SMALLINT', 'INT / INTEGER', 'BIGINT'],
          },
          'DECIMAL / NUMERIC (Fixed-Point)',
          {
            t: 'Floating-Point Types',
            c: ['REAL', 'FLOAT', 'DOUBLE PRECISION', 'Precision & Rounding Issues'],
          },
          {
            t: 'Auto-Increment & Identity',
            c: ['SERIAL / BIGSERIAL', 'IDENTITY Columns', 'AUTO_INCREMENT', 'Sequences'],
          },
          'BIT Types',
          'Money / Currency Types',
        ],
      },
      {
        t: 'Character & String Types',
        c: [
          'CHAR (Fixed-Length)',
          'VARCHAR (Variable-Length)',
          'TEXT / CLOB',
          {
            t: 'Unicode Types',
            c: ['NCHAR', 'NVARCHAR', 'NTEXT'],
          },
          {
            t: 'Character Sets & Collations',
            c: ['Character Sets', 'Collations', 'Case & Accent Sensitivity', 'Sort Order'],
          },
          'Length, Storage & Limits',
        ],
      },
      {
        t: 'Date & Time Types',
        c: [
          'DATE',
          'TIME',
          'DATETIME / TIMESTAMP',
          {
            t: 'Time Zone Handling',
            c: ['TIMESTAMP WITH TIME ZONE', 'TIMESTAMP WITHOUT TIME ZONE', 'TIME WITH TIME ZONE'],
          },
          'INTERVAL',
          'YEAR',
          'Fractional Seconds & Precision',
        ],
      },
      {
        t: 'Binary & Large Object Types',
        c: [
          'BINARY / VARBINARY',
          'BLOB / BYTEA',
          'Large Objects (LOBs)',
          'Storing Files vs References',
        ],
      },
      {
        t: 'Boolean Type',
        c: ['BOOLEAN / BOOL', 'Boolean Emulation (BIT, CHAR(1))', 'TRUE / FALSE / UNKNOWN'],
      },
      {
        t: 'Special & Extended Types',
        c: [
          'UUID / GUID',
          'ENUM',
          'SET',
          'JSON / JSONB',
          'XML',
          'Array Types',
          'Range Types',
          'Composite / Row Types',
          'Geometric & Spatial Types',
          'Network Address Types',
          'Full-Text Search Types (tsvector)',
          'Vector / Embedding Types',
          'Standard JSON Type (SQL:2023)',
        ],
      },
      {
        t: 'Type Conversion & Casting',
        c: [
          'Implicit Conversion (Coercion)',
          'Explicit Casting (CAST)',
          'CONVERT & Dialect Casts',
          'Type Conversion Rules & Precedence',
          'Conversion Errors & Pitfalls',
        ],
      },
      {
        t: 'NULL & Three-Valued Logic',
        c: [
          'What is NULL',
          'NULL vs Empty String vs Zero',
          'Three-Valued Logic (TRUE/FALSE/UNKNOWN)',
          'NULL in Comparisons',
          'NULL Handling Functions Overview',
        ],
      },
    ],
  },

  // ===================== STAGE 3 =====================
  {
    id: 'querying',
    title: 'Querying Data',
    summary: 'The SELECT statement: choosing columns, expressions and how queries are processed.',
    lvl: 'beginner',
    tag: 'querying',
    nodes: [
      {
        t: 'SELECT Statement Basics',
        c: [
          'Selecting All Columns (*)',
          'Selecting Specific Columns',
          'Column Aliases (AS)',
          'Table Aliases',
          'Computed & Derived Columns',
          'Literals & Constants in SELECT',
          'DISTINCT',
          'SELECT Without FROM',
          'Qualifying & Quoting Column Names',
        ],
      },
      {
        t: 'The FROM Clause',
        c: [
          'Querying a Single Table',
          'Referencing Multiple Tables',
          'Table Aliases in FROM',
          'Derived Tables (Subquery in FROM)',
          'Dual & Pseudo Tables',
        ],
      },
      {
        t: 'Expressions in Queries',
        c: [
          'Arithmetic Expressions',
          'String Concatenation',
          'CASE Expressions',
          'Operator Precedence',
          'Parentheses & Grouping',
        ],
      },
      {
        t: 'Logical Query Processing Order',
        c: [
          'FROM',
          'WHERE',
          'GROUP BY',
          'HAVING',
          'SELECT',
          'DISTINCT',
          'ORDER BY',
          'LIMIT / OFFSET',
          'Written Order vs Execution Order',
        ],
      },
    ],
  },

  // ===================== STAGE 4 =====================
  {
    id: 'filtering',
    title: 'Filtering, Operators & Predicates',
    summary: 'Restricting rows with WHERE, comparison and logical operators, patterns and conditionals.',
    lvl: 'beginner',
    tag: 'filtering',
    nodes: [
      {
        t: 'The WHERE Clause',
        c: [
          'Filtering Rows',
          'WHERE with Expressions',
          'WHERE vs HAVING',
          'Filtering on Computed Values',
        ],
      },
      {
        t: 'Comparison Operators',
        c: [
          'Equal (=)',
          'Not Equal (<> / !=)',
          'Less Than & Greater Than',
          'Less/Greater Than or Equal',
          'IS DISTINCT FROM',
          'Row Value Comparison',
          'OVERLAPS Operator',
        ],
      },
      {
        t: 'Logical Operators',
        c: [
          'AND',
          'OR',
          'NOT',
          'Operator Precedence & Parentheses',
          'Short-Circuit Evaluation',
        ],
      },
      {
        t: 'Range & Set Predicates',
        c: ['BETWEEN', 'NOT BETWEEN', 'IN', 'NOT IN', 'IN with Subquery'],
      },
      {
        t: 'Pattern Matching',
        c: [
          'LIKE',
          'Wildcards (% and _)',
          'ILIKE (Case-Insensitive)',
          'ESCAPE Character',
          'SIMILAR TO',
          'Regular Expressions (REGEXP / RLIKE / ~)',
        ],
      },
      {
        t: 'NULL Predicates',
        c: [
          'IS NULL',
          'IS NOT NULL',
          'NULL-Safe Equality (<=>)',
          'IS TRUE / IS FALSE / IS UNKNOWN',
        ],
      },
      {
        t: 'Conditional Expressions',
        c: [
          'Simple CASE',
          'Searched CASE',
          'COALESCE',
          'NULLIF',
          'IFNULL / ISNULL / NVL',
          'NVL2 & DECODE',
          'GREATEST & LEAST',
        ],
      },
      {
        t: 'Quantified & Existence Predicates',
        c: ['EXISTS', 'NOT EXISTS', 'ANY / SOME', 'ALL'],
      },
    ],
  },

  // ===================== STAGE 5 =====================
  {
    id: 'sorting-pagination',
    title: 'Sorting, Limiting & Pagination',
    summary: 'Ordering result sets and returning limited, paginated slices of rows.',
    lvl: 'beginner',
    tag: 'sorting-pagination',
    nodes: [
      {
        t: 'The ORDER BY Clause',
        c: [
          'Sorting by a Column',
          'Sorting by Multiple Columns',
          'ASC & DESC',
          'Sorting by Position, Alias or Expression',
          'NULLS FIRST & NULLS LAST',
          'Collation in Sorting',
        ],
      },
      {
        t: 'Limiting Results',
        c: [
          'LIMIT',
          'TOP (SQL Server)',
          'FETCH FIRST / NEXT (ANSI)',
          'WITH TIES',
          'ROWNUM (Oracle Legacy)',
        ],
      },
      {
        t: 'Pagination',
        c: [
          'OFFSET / LIMIT Pagination',
          'OFFSET-FETCH',
          'Keyset (Seek) Pagination',
          'Pagination Performance & Pitfalls',
        ],
      },
      {
        t: 'Removing Duplicates',
        c: ['DISTINCT', 'DISTINCT ON (PostgreSQL)', 'Duplicates vs GROUP BY'],
      },
    ],
  },

  // ===================== STAGE 6 =====================
  {
    id: 'functions',
    title: 'Built-in Functions',
    summary: 'Scalar functions for strings, numbers, dates, conversion, NULLs, conditions and system info.',
    lvl: 'beginner',
    tag: 'functions',
    nodes: [
      {
        t: 'String Functions',
        c: [
          'Length (LENGTH, CHAR_LENGTH, DATALENGTH)',
          'Concatenation (CONCAT, ||, CONCAT_WS)',
          'Case (UPPER, LOWER, INITCAP)',
          'Trimming (TRIM, LTRIM, RTRIM, BTRIM)',
          'Padding (LPAD, RPAD)',
          'Substring (SUBSTRING, SUBSTR, LEFT, RIGHT)',
          'Position (POSITION, CHARINDEX, INSTR, LOCATE)',
          'Replace (REPLACE, TRANSLATE, OVERLAY, STUFF)',
          'Splitting (SPLIT_PART, STRING_TO_ARRAY, STRING_SPLIT)',
          'Reverse',
          'Repeat (REPEAT, REPLICATE)',
          'Formatting (FORMAT)',
          'Regex Functions (REGEXP_REPLACE, REGEXP_SUBSTR, REGEXP_MATCHES)',
          'ASCII, CHR & Encoding',
          'Fuzzy Matching (SOUNDEX, Levenshtein, pg_trgm)',
        ],
      },
      {
        t: 'Numeric & Mathematical Functions',
        c: [
          'Rounding (ROUND, CEIL, FLOOR, TRUNC)',
          'Absolute & Sign (ABS, SIGN)',
          'Power & Roots (POWER, SQRT, EXP, LN, LOG)',
          'Modulo (MOD, %)',
          'Trigonometric Functions',
          'Random (RAND, RANDOM)',
          'GREATEST & LEAST',
          'Integer vs Decimal Division',
        ],
      },
      {
        t: 'Date & Time Functions',
        c: [
          'Current Date/Time (NOW, CURRENT_DATE, GETDATE, SYSDATE)',
          'Extracting Parts (EXTRACT, DATE_PART, DATEPART)',
          'Date Arithmetic (DATEADD, DATE_ADD, INTERVAL Math)',
          'Date Difference (DATEDIFF, AGE)',
          'Truncating (DATE_TRUNC)',
          'Formatting (TO_CHAR, FORMAT, DATE_FORMAT, STRFTIME)',
          'Parsing (TO_DATE, STR_TO_DATE)',
          'Time Zone Conversion (AT TIME ZONE, CONVERT_TZ)',
          'Epoch / Unix Time',
        ],
      },
      {
        t: 'Conversion & Cast Functions',
        c: [
          'CAST',
          'CONVERT',
          'TO_CHAR / TO_NUMBER / TO_DATE',
          'TRY_CAST / TRY_CONVERT / PARSE',
          'Formatting Numbers as Strings',
        ],
      },
      {
        t: 'NULL-Handling Functions',
        c: ['COALESCE', 'NULLIF', 'ISNULL / IFNULL / NVL', 'NVL2'],
      },
      {
        t: 'Conditional Functions',
        c: ['CASE', 'IIF (SQL Server)', 'IF (MySQL)', 'DECODE (Oracle)', 'CHOOSE'],
      },
      {
        t: 'System & Metadata Functions',
        c: [
          'CURRENT_USER / SESSION_USER',
          'CURRENT_DATABASE / DATABASE',
          'VERSION',
          'Row Count (@@ROWCOUNT, ROW_COUNT)',
          'Last Insert Id (LAST_INSERT_ID, SCOPE_IDENTITY, RETURNING)',
          'UUID Generation (NEWID, GEN_RANDOM_UUID, UUID)',
          'Sequence Functions (NEXTVAL, CURRVAL)',
        ],
      },
      {
        t: 'Bitwise Operators & Functions',
        c: ['Bitwise AND, OR, XOR', 'Bitwise NOT', 'Shift Operators (<<, >>)'],
      },
      {
        t: 'Hashing & Encoding Functions',
        c: [
          'Hashing (MD5, SHA-256)',
          'Encoding & Decoding (ENCODE, DECODE)',
          'Base64 (TO_BASE64, FROM_BASE64)',
          'Checksums (CRC32, CHECKSUM)',
        ],
      },
    ],
  },

  // ===================== STAGE 7 =====================
  {
    id: 'aggregation',
    title: 'Aggregation & Grouping',
    summary: 'Summarizing rows with aggregate functions, GROUP BY, HAVING and grouping extensions.',
    lvl: 'intermediate',
    tag: 'aggregation',
    nodes: [
      {
        t: 'Aggregate Functions',
        c: [
          'COUNT',
          'COUNT(*) vs COUNT(column) vs COUNT(DISTINCT)',
          'SUM',
          'AVG',
          'MIN & MAX',
          'Statistical Aggregates (STDDEV, VARIANCE)',
          'String Aggregation (STRING_AGG, GROUP_CONCAT, LISTAGG)',
          'ARRAY_AGG',
          'JSON Aggregation (JSON_AGG, JSON_OBJECT_AGG)',
          'Boolean Aggregation (BOOL_AND, BOOL_OR, EVERY)',
          'Bitwise Aggregation (BIT_AND, BIT_OR)',
          'Ordered-Set Aggregates (PERCENTILE_CONT, PERCENTILE_DISC, MODE)',
          'FILTER Clause on Aggregates',
          'ANY_VALUE',
          'Approximate Aggregates (APPROX_COUNT_DISTINCT, HLL)',
        ],
      },
      {
        t: 'The GROUP BY Clause',
        c: [
          'Grouping Basics',
          'Grouping by Multiple Columns',
          'Grouping by Expressions',
          'Grouping by Position or Alias',
          'NULLs in Grouping',
          'GROUP BY ALL',
        ],
      },
      {
        t: 'The HAVING Clause',
        c: ['Filtering Groups', 'HAVING vs WHERE', 'HAVING with Aggregates'],
      },
      {
        t: 'Grouping Sets & Rollup',
        c: [
          'GROUPING SETS',
          'ROLLUP',
          'CUBE',
          'GROUPING() Function',
          'GROUPING_ID()',
        ],
      },
      {
        t: 'Aggregation Pitfalls',
        c: [
          'Aggregates & NULLs',
          'Non-Aggregated Columns (ONLY_FULL_GROUP_BY)',
          'Empty Result Aggregation',
          'DISTINCT vs GROUP BY',
        ],
      },
    ],
  },

  // ===================== STAGE 8 =====================
  {
    id: 'joins',
    title: 'Joins & Combining Tables',
    summary: 'Combining rows from multiple tables with the full range of join types and conditions.',
    lvl: 'intermediate',
    tag: 'joins',
    nodes: [
      {
        t: 'Join Fundamentals',
        c: [
          'What is a Join',
          'Join Syntax (ON, USING)',
          'Qualifying Columns in Joins',
          'Join vs Subquery',
          'ANSI vs Implicit (Comma) Join Syntax',
        ],
      },
      { t: 'Inner Join', c: ['INNER JOIN', 'Equi Join', 'Non-Equi Join'] },
      {
        t: 'Outer Joins',
        c: [
          'LEFT OUTER JOIN',
          'RIGHT OUTER JOIN',
          'FULL OUTER JOIN',
          'Handling NULLs in Outer Joins',
        ],
      },
      { t: 'Cross Join', c: ['CROSS JOIN', 'Cartesian Product', 'Cross Join Use Cases'] },
      { t: 'Self Join', c: [] },
      { t: 'Natural Join', c: [] },
      {
        t: 'Join Conditions',
        c: ['ON Clause', 'USING Clause', 'Conditions in WHERE vs ON'],
      },
      {
        t: 'Joining Multiple Tables',
        c: ['Joining Three or More Tables', 'Join Order', 'Chained vs Nested Joins'],
      },
      {
        t: 'Advanced Join Types',
        c: [
          'Semi Join',
          'Anti Join',
          'Lateral Join (LATERAL, CROSS/OUTER APPLY)',
          'ASOF Join (Time-Series)',
          'Joining with Aggregates',
        ],
      },
      {
        t: 'Join Algorithms',
        c: ['Nested Loop Join', 'Hash Join', 'Merge (Sort-Merge) Join'],
      },
    ],
  },

  // ===================== STAGE 9 =====================
  {
    id: 'subqueries-ctes',
    title: 'Subqueries & CTEs',
    summary: 'Nested queries, correlated subqueries and common table expressions including recursion.',
    lvl: 'intermediate',
    tag: 'subqueries-ctes',
    nodes: [
      {
        t: 'Subquery Fundamentals',
        c: ['What is a Subquery', 'Subquery vs Join', 'Subquery Placement', 'Scalar Subqueries'],
      },
      {
        t: 'Subqueries by Location',
        c: [
          'Subqueries in SELECT',
          'Subqueries in FROM (Derived Tables)',
          'Subqueries in WHERE',
          'Subqueries in HAVING',
        ],
      },
      {
        t: 'Subquery Predicates',
        c: [
          'IN / NOT IN',
          'EXISTS / NOT EXISTS',
          'ANY / SOME / ALL',
          'Comparison with Subquery',
        ],
      },
      {
        t: 'Correlated Subqueries',
        c: [
          'How Correlation Works',
          'Correlated vs Uncorrelated',
          'Correlated Subquery Performance',
        ],
      },
      {
        t: 'Common Table Expressions (CTEs)',
        c: [
          'The WITH Clause',
          'Single CTE',
          'Multiple CTEs',
          'CTE vs Subquery vs Temp Table',
          'Materialized vs Inlined CTEs',
        ],
      },
      {
        t: 'Recursive CTEs',
        c: [
          'Recursive CTE Structure',
          'Anchor & Recursive Members',
          'Hierarchical Queries (Trees)',
          'Graph Traversal',
          'Generating Series',
          'Recursion Limits & Cycle Detection',
          'SEARCH & CYCLE Clauses',
        ],
      },
      { t: 'Lateral & Correlated Derived Tables', c: [] },
    ],
  },

  // ===================== STAGE 10 =====================
  {
    id: 'set-operations',
    title: 'Set Operations',
    summary: 'Combining result sets vertically with UNION, INTERSECT and EXCEPT.',
    lvl: 'intermediate',
    tag: 'set-operations',
    nodes: [
      {
        t: 'UNION',
        c: ['UNION', 'UNION ALL', 'UNION vs UNION ALL', 'Column Compatibility Rules', 'Ordering UNION Results'],
      },
      { t: 'INTERSECT', c: ['INTERSECT', 'INTERSECT ALL'] },
      { t: 'EXCEPT / MINUS', c: ['EXCEPT (MINUS)', 'EXCEPT ALL'] },
      {
        t: 'Set Operation Rules',
        c: [
          'Duplicate Handling',
          'Data Type Coercion',
          'Precedence of Set Operators',
          'Set Operations vs Joins',
        ],
      },
    ],
  },

  // ===================== STAGE 11 =====================
  {
    id: 'dml',
    title: 'Data Modification (DML)',
    summary: 'Inserting, updating, deleting and merging data, and returning the affected rows.',
    lvl: 'intermediate',
    tag: 'dml',
    nodes: [
      {
        t: 'INSERT',
        c: [
          'Insert a Single Row',
          'Insert Multiple Rows',
          'INSERT ... SELECT',
          'Inserting DEFAULT Values',
          'INSERT with RETURNING / OUTPUT',
          'Bulk Insert (COPY, LOAD DATA, BULK INSERT)',
        ],
      },
      {
        t: 'UPDATE',
        c: [
          'Basic UPDATE',
          'UPDATE with WHERE',
          'Updating Multiple Columns',
          'UPDATE with Subquery',
          'UPDATE with JOIN / FROM',
          'UPDATE with RETURNING / OUTPUT',
        ],
      },
      {
        t: 'DELETE',
        c: [
          'Basic DELETE',
          'DELETE with WHERE',
          'DELETE with Subquery / JOIN',
          'DELETE with RETURNING / OUTPUT',
          'TRUNCATE vs DELETE',
        ],
      },
      {
        t: 'MERGE & Upsert',
        c: [
          'MERGE Statement',
          'INSERT ... ON CONFLICT (PostgreSQL)',
          'INSERT ... ON DUPLICATE KEY UPDATE (MySQL)',
          'REPLACE',
        ],
      },
      {
        t: 'Returning Modified Data',
        c: ['RETURNING Clause', 'OUTPUT Clause'],
      },
      {
        t: 'DML Considerations',
        c: [
          'Affected Row Count',
          'DML & Transactions',
          'DML & Triggers',
          'DML & Constraints',
        ],
      },
    ],
  },

  // ===================== STAGE 12 =====================
  {
    id: 'ddl',
    title: 'Data Definition (DDL) & Schema Objects',
    summary: 'Creating and altering tables, schemas, databases and other structural objects.',
    lvl: 'intermediate',
    tag: 'ddl',
    nodes: [
      {
        t: 'CREATE TABLE',
        c: [
          'Column Definitions',
          'Default Values',
          'Generated / Computed Columns',
          'Stored vs Virtual Generated Columns',
          'Identity & Auto-Increment Columns',
          'CREATE TABLE AS SELECT (CTAS)',
          'CREATE TABLE LIKE / Inheritance',
        ],
      },
      {
        t: 'ALTER TABLE',
        c: [
          'Add Column',
          'Drop Column',
          'Modify / Alter Column',
          'Rename Column or Table',
          'Add / Drop Constraint',
          'Change Column Type',
        ],
      },
      {
        t: 'DROP & TRUNCATE',
        c: ['DROP TABLE', 'TRUNCATE TABLE', 'DROP vs TRUNCATE vs DELETE'],
      },
      {
        t: 'Schemas & Databases',
        c: [
          'CREATE DATABASE',
          'CREATE SCHEMA',
          'Namespaces & Qualified Names',
          'Catalogs & Three-Part Naming',
          'Search Path / Default Schema',
        ],
      },
      {
        t: 'Other Schema Objects',
        c: [
          'Sequences',
          'Synonyms / Aliases',
          'User-Defined Types',
          'Domains',
          'Comments on Objects',
        ],
      },
      {
        t: 'Temporary & Transient Tables',
        c: [
          'Temporary Tables',
          'Global vs Local Temp Tables',
          'Unlogged Tables',
          'Table Variables (T-SQL)',
        ],
      },
      {
        t: 'DDL Considerations',
        c: [
          'Transactional DDL',
          'Online Schema Changes',
          'IF EXISTS / IF NOT EXISTS',
          'Schema Migrations',
        ],
      },
    ],
  },

  // ===================== STAGE 13 =====================
  {
    id: 'constraints',
    title: 'Constraints, Keys & Integrity',
    summary: 'Enforcing data integrity with NOT NULL, UNIQUE, primary/foreign keys, CHECK and DEFAULT.',
    lvl: 'intermediate',
    tag: 'constraints',
    nodes: [
      { t: 'NOT NULL Constraint', c: [] },
      { t: 'UNIQUE Constraint', c: ['Single-Column UNIQUE', 'Composite UNIQUE', 'NULLs & UNIQUE'] },
      {
        t: 'Primary Key Constraint',
        c: ['Single-Column Primary Key', 'Composite Primary Key', 'Surrogate vs Natural Primary Key'],
      },
      {
        t: 'Foreign Key Constraint',
        c: [
          'Referential Actions (CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION)',
          'Self-Referencing Foreign Key',
          'Composite Foreign Key',
          'Deferrable Foreign Keys',
        ],
      },
      { t: 'CHECK Constraint', c: ['Column-Level CHECK', 'Table-Level CHECK'] },
      { t: 'DEFAULT Constraint', c: [] },
      {
        t: 'Constraint Management',
        c: [
          'Named Constraints',
          'Adding & Dropping Constraints',
          'Enabling & Disabling Constraints',
          'Validating Constraints (NOT VALID / VALIDATE)',
          'Deferring Constraints',
        ],
      },
      {
        t: 'Data Integrity Types',
        c: [
          'Entity Integrity',
          'Referential Integrity',
          'Domain Integrity',
          'Business / Application Integrity',
        ],
      },
    ],
  },

  // ===================== STAGE 14 =====================
  {
    id: 'views',
    title: 'Views & Materialized Views',
    summary: 'Virtual and precomputed result sets for abstraction, security and performance.',
    lvl: 'intermediate',
    tag: 'views',
    nodes: [
      {
        t: 'View Fundamentals',
        c: [
          'What is a View',
          'CREATE VIEW',
          'Querying Views',
          'Views vs Tables',
          'Advantages & Use Cases',
        ],
      },
      {
        t: 'Updatable Views',
        c: ['Updatable View Rules', 'WITH CHECK OPTION', 'INSTEAD OF Triggers'],
      },
      {
        t: 'Materialized Views',
        c: [
          'CREATE MATERIALIZED VIEW',
          'Refreshing (REFRESH, ON COMMIT)',
          'Incremental / Fast Refresh',
          'Materialized View vs View vs Table',
        ],
      },
      {
        t: 'Managing Views',
        c: ['ALTER VIEW', 'DROP VIEW', 'CREATE OR REPLACE VIEW', 'View Dependencies'],
      },
      {
        t: 'Advanced View Topics',
        c: ['Nested Views', 'Indexed Views (SQL Server)', 'Recursive Views'],
      },
    ],
  },

  // ===================== STAGE 15 =====================
  {
    id: 'indexes',
    title: 'Indexes & Storage Structures',
    summary: 'How indexes and physical storage accelerate access, and how to design them.',
    lvl: 'advanced',
    tag: 'indexes',
    nodes: [
      {
        t: 'Index Fundamentals',
        c: [
          'What is an Index',
          'How Indexes Work',
          'Index Scan vs Table Scan',
          'Index Trade-offs (Read vs Write)',
        ],
      },
      {
        t: 'Index Types',
        c: [
          'B-Tree Index',
          'Hash Index',
          'Bitmap Index',
          'GIN / GiST / BRIN / SP-GiST',
          'Full-Text Index',
          'Spatial Index',
          'Columnstore Index',
        ],
      },
      {
        t: 'Index Structure & Properties',
        c: [
          'Clustered Index',
          'Non-Clustered Index',
          'Unique Index',
          'Composite (Multi-Column) Index',
          'Covering Index (INCLUDE)',
          'Partial / Filtered Index',
          'Expression / Functional Index',
          'Descending Index',
          'Invisible / Hidden Indexes',
        ],
      },
      {
        t: 'Index Management',
        c: [
          'CREATE INDEX',
          'DROP INDEX',
          'Rebuilding & Reorganizing',
          'Online Index Creation',
          'Index Maintenance & Fragmentation',
        ],
      },
      {
        t: 'Index Strategy & Tuning',
        c: [
          'Choosing Columns to Index',
          'Column Order in Composite Indexes',
          'Index Selectivity & Cardinality',
          'Covering Queries & Index-Only Scans',
          'Over-Indexing & Unused Indexes',
          'Missing Index Detection',
        ],
      },
      {
        t: 'Storage Structures',
        c: [
          'Heap vs Clustered Tables',
          'Pages & Blocks',
          'Fill Factor',
          'Index-Organized Tables (IOT)',
          'Write-Ahead Log (WAL) / Redo Log',
          'Checkpoints',
          'Tablespaces',
          'TOAST & Large Value Storage',
        ],
      },
    ],
  },

  // ===================== STAGE 16 =====================
  {
    id: 'transactions',
    title: 'Transactions, Concurrency & Locking',
    summary: 'ACID transactions, isolation levels, locking, MVCC and deadlock handling.',
    lvl: 'advanced',
    tag: 'transactions',
    nodes: [
      {
        t: 'Transaction Fundamentals',
        c: [
          'What is a Transaction',
          { t: 'ACID Properties', c: ['Atomicity', 'Consistency', 'Isolation', 'Durability'] },
          'Transaction Lifecycle',
        ],
      },
      {
        t: 'Transaction Control (TCL)',
        c: [
          'BEGIN / START TRANSACTION',
          'COMMIT',
          'ROLLBACK',
          'SAVEPOINT',
          'ROLLBACK TO SAVEPOINT',
          'Autocommit',
          'Implicit vs Explicit Transactions',
        ],
      },
      {
        t: 'Isolation Levels',
        c: [
          'Read Uncommitted',
          'Read Committed',
          'Repeatable Read',
          'Serializable',
          'Snapshot Isolation',
          'Serializable Snapshot Isolation (SSI)',
          'Setting Isolation Levels',
        ],
      },
      {
        t: 'Concurrency Phenomena',
        c: [
          'Dirty Read',
          'Non-Repeatable Read',
          'Phantom Read',
          'Lost Update',
          'Write Skew',
        ],
      },
      {
        t: 'Locking',
        c: [
          'Lock Types (Shared, Exclusive, Update)',
          'Lock Granularity (Row, Page, Table)',
          'Lock Escalation',
          'Explicit Locking (SELECT FOR UPDATE, LOCK TABLE)',
          'Advisory Locks',
          'Lock Hints',
        ],
      },
      {
        t: 'Concurrency Control Models',
        c: [
          'Pessimistic Concurrency',
          'Optimistic Concurrency',
          'MVCC (Multi-Version Concurrency Control)',
        ],
      },
      {
        t: 'Deadlocks',
        c: [
          'What is a Deadlock',
          'Deadlock Detection',
          'Deadlock Prevention & Avoidance',
          'Handling Deadlocks',
        ],
      },
      {
        t: 'Distributed Transactions',
        c: ['Two-Phase Commit (2PC)', 'XA Transactions'],
      },
    ],
  },

  // ===================== STAGE 17 =====================
  {
    id: 'window-functions',
    title: 'Window Functions & Analytic Queries',
    summary: 'Computing values across row windows for ranking, offsets and running aggregates.',
    lvl: 'advanced',
    tag: 'window-functions',
    nodes: [
      {
        t: 'Window Function Fundamentals',
        c: [
          'What are Window Functions',
          'Window Functions vs Aggregates',
          'The OVER Clause',
          'Window Functions vs GROUP BY',
          'The QUALIFY Clause',
        ],
      },
      {
        t: 'Partitioning & Ordering',
        c: ['PARTITION BY', 'ORDER BY in Window', 'Window Processing Order'],
      },
      {
        t: 'Window Frames',
        c: [
          'ROWS Frame',
          'RANGE Frame',
          'GROUPS Frame',
          'Frame Boundaries (UNBOUNDED PRECEDING, CURRENT ROW)',
          'Default Frames',
          'EXCLUDE Clause',
        ],
      },
      {
        t: 'Ranking Functions',
        c: ['ROW_NUMBER', 'RANK', 'DENSE_RANK', 'NTILE', 'PERCENT_RANK', 'CUME_DIST'],
      },
      {
        t: 'Offset & Value Functions',
        c: ['LAG', 'LEAD', 'FIRST_VALUE', 'LAST_VALUE', 'NTH_VALUE', 'RESPECT / IGNORE NULLS'],
      },
      {
        t: 'Aggregate Window Functions',
        c: [
          'SUM / AVG / COUNT OVER',
          'Running Totals',
          'Moving Averages',
          'Cumulative Aggregates',
        ],
      },
      { t: 'Named Windows (WINDOW Clause)', c: [] },
      {
        t: 'Window Function Use Cases',
        c: [
          'Top-N per Group',
          'Gaps and Islands',
          'Deduplication',
          'Period-over-Period Comparison',
        ],
      },
    ],
  },

  // ===================== STAGE 18 =====================
  {
    id: 'advanced-queries',
    title: 'Advanced Query Techniques',
    summary: 'Pivoting, hierarchical queries, data generation, dynamic SQL, hints and temporal queries.',
    lvl: 'advanced',
    tag: 'advanced-queries',
    nodes: [
      {
        t: 'Pivoting & Unpivoting',
        c: ['PIVOT', 'UNPIVOT', 'Conditional Aggregation', 'Crosstab (PostgreSQL)'],
      },
      {
        t: 'Hierarchical Queries',
        c: [
          'Recursive CTE Hierarchies',
          'CONNECT BY (Oracle)',
          'Path Enumeration',
          'Adjacency List vs Nested Set',
        ],
      },
      {
        t: 'Generating Data',
        c: ['generate_series', 'VALUES Lists', 'Tally / Numbers Tables'],
      },
      { t: 'Sampling', c: ['TABLESAMPLE', 'Random Sampling'] },
      {
        t: 'Dynamic SQL',
        c: ['Building SQL Dynamically', 'EXECUTE / sp_executesql', 'SQL Injection Risk'],
      },
      {
        t: 'Query Hints & Directives',
        c: ['Optimizer Hints', 'Plan Guides'],
      },
      {
        t: 'Temporal Queries',
        c: ['System-Versioned Temporal Tables', 'FOR SYSTEM_TIME', 'AS OF Queries'],
      },
      {
        t: 'Advanced Conditional Patterns',
        c: ['CASE in SELECT/WHERE/ORDER BY', 'Boolean Aggregation Patterns'],
      },
    ],
  },

  // ===================== STAGE 19 =====================
  {
    id: 'procedural-sql',
    title: 'Procedural SQL',
    summary: 'Stored procedures, functions, triggers, cursors, control flow and error handling.',
    lvl: 'advanced',
    tag: 'procedural-sql',
    nodes: [
      {
        t: 'Procedural Language Basics',
        c: [
          'PL/SQL, T-SQL, PL/pgSQL & SQL/PSM',
          'Block Structure',
          'Anonymous Blocks',
          'Statement Delimiters',
        ],
      },
      {
        t: 'Variables & Assignment',
        c: [
          'Declaring Variables',
          'Assignment (SET, :=, SELECT INTO)',
          'Constants',
          'Variable Scope',
        ],
      },
      {
        t: 'Control Flow',
        c: [
          'IF / ELSIF / ELSE',
          'CASE Statements',
          'WHILE Loop',
          'FOR Loop',
          'LOOP / REPEAT',
          'Loop Control (BREAK, CONTINUE, EXIT)',
          'GOTO & Labels',
        ],
      },
      {
        t: 'Stored Procedures',
        c: [
          'CREATE PROCEDURE',
          'Parameters (IN, OUT, INOUT)',
          'Default Parameter Values',
          'Calling Procedures (CALL, EXEC)',
          'Returning Result Sets',
          'ALTER / DROP PROCEDURE',
        ],
      },
      {
        t: 'User-Defined Functions',
        c: [
          'Scalar Functions',
          'Table-Valued Functions',
          'Inline vs Multi-Statement TVF',
          'Deterministic vs Non-Deterministic',
          'Function vs Procedure',
        ],
      },
      {
        t: 'Triggers',
        c: [
          'What is a Trigger',
          'BEFORE / AFTER Triggers',
          'INSTEAD OF Triggers',
          'Row-Level vs Statement-Level',
          'INSERT / UPDATE / DELETE Triggers',
          'NEW / OLD / INSERTED / DELETED',
          'DDL Triggers',
          'Event / Login Triggers',
          'Trigger Order & Nesting',
          'Enabling & Disabling Triggers',
        ],
      },
      {
        t: 'Cursors',
        c: [
          'What is a Cursor',
          'Declaring Cursors',
          'OPEN / FETCH / CLOSE',
          'Cursor Loops',
          'Cursor Types (Forward-Only, Scrollable)',
          'Cursor Variables / REF CURSOR',
          'Cursors vs Set-Based Logic',
        ],
      },
      {
        t: 'Error & Exception Handling',
        c: [
          'TRY...CATCH (T-SQL)',
          'EXCEPTION Block (PL/SQL, PL/pgSQL)',
          'RAISE / RAISERROR / THROW / SIGNAL',
          'Error Codes (SQLSTATE, SQLCODE)',
          'Custom Exceptions',
          'Handling & Re-raising Errors',
        ],
      },
      {
        t: 'Dynamic SQL in Routines',
        c: ['EXECUTE IMMEDIATE', 'Parameterized Dynamic SQL', 'Binding Variables'],
      },
      {
        t: 'Packages & Modules',
        c: ['Oracle Packages', 'Schema-Bound Modules', 'Grouping Routines'],
      },
      {
        t: 'Advanced Procedural Features',
        c: [
          'Autonomous Transactions',
          'Bulk Operations (BULK COLLECT, FORALL)',
          'Collections & Records',
          'Pipelined Table Functions',
        ],
      },
      {
        t: 'Procedural Best Practices',
        c: [
          'Set-Based vs Procedural Logic',
          'Transaction Control in Routines',
          'DEFINER vs INVOKER Rights',
        ],
      },
    ],
  },

  // ===================== STAGE 20 =====================
  {
    id: 'specialized-data',
    title: 'Semi-Structured & Specialized Data',
    summary: 'Working with JSON, XML, arrays, spatial, full-text, vector and graph data in SQL.',
    lvl: 'advanced',
    tag: 'specialized-data',
    nodes: [
      {
        t: 'JSON in SQL',
        c: [
          'JSON vs JSONB',
          'Storing JSON',
          'Accessing JSON (->, ->>, #>, #>>)',
          'JSON Path Expressions',
          'JSON_VALUE / JSON_QUERY',
          'JSON_TABLE',
          'Constructing JSON (JSON_OBJECT, JSON_ARRAY, JSON_BUILD_OBJECT)',
          'Modifying JSON (jsonb_set, JSON_MODIFY)',
          'Aggregating to JSON (JSON_AGG, JSON_OBJECTAGG)',
          'Indexing JSON (GIN)',
          'JSON Schema Validation',
          'IS JSON Predicate (SQL:2023)',
        ],
      },
      {
        t: 'XML in SQL',
        c: [
          'XML Data Type',
          'Storing & Querying XML',
          'XPath',
          'XQuery',
          'FOR XML / XMLTABLE',
          'XML Indexes',
        ],
      },
      {
        t: 'Arrays',
        c: [
          'Array Types & Literals',
          'Accessing Array Elements',
          'Array Functions (ARRAY_AGG, UNNEST, ARRAY_LENGTH)',
          'Array Operators (@>, &&, ||)',
          'Searching Arrays (ANY, ALL)',
          'Multidimensional Arrays',
        ],
      },
      {
        t: 'Spatial & Geospatial Data',
        c: [
          'Geometry vs Geography',
          'Spatial Types (POINT, LINESTRING, POLYGON)',
          'Spatial Functions (ST_Distance, ST_Within, ST_Intersects)',
          'Spatial Indexes (R-Tree, GiST)',
          'PostGIS & Spatial Extensions',
          'SRID & Coordinate Systems',
        ],
      },
      {
        t: 'Full-Text Search',
        c: [
          'Full-Text Indexes',
          'tsvector / tsquery (PostgreSQL)',
          'MATCH ... AGAINST (MySQL)',
          'CONTAINS / FREETEXT (SQL Server)',
          'Ranking & Relevance',
          'Stemming & Stop Words',
          'Phrase & Proximity Search',
        ],
      },
      {
        t: 'Vector & Embedding Data',
        c: [
          'Vector Data Types',
          'Similarity Search (Cosine, L2, Inner Product)',
          'Vector Indexes (HNSW, IVFFlat)',
          'pgvector',
          'Hybrid Search (Vector + Keyword)',
          'AI / RAG Use Cases',
        ],
      },
      {
        t: 'Key-Value & HStore',
        c: ['HSTORE (PostgreSQL)', 'Key-Value Patterns'],
      },
      {
        t: 'Range & Interval Types',
        c: ['Range Types', 'Range Operators (Overlap, Contains)', 'Exclusion Constraints'],
      },
      {
        t: 'Graph Data in SQL',
        c: [
          'SQL/PGQ Property Graph Queries (SQL:2023)',
          'Recursive Graph Traversal',
          'SQL Server Graph Tables',
        ],
      },
      {
        t: 'Time-Series Data in SQL',
        c: [
          'Hypertables (TimescaleDB)',
          'Continuous Aggregates',
          'Time Bucketing',
          'Retention Policies',
          'Downsampling & Rollups',
        ],
      },
    ],
  },

  // ===================== STAGE 21 =====================
  {
    id: 'database-design',
    title: 'Database Design & Normalization',
    summary: 'Modeling data, normal forms, denormalization and schema design patterns.',
    lvl: 'advanced',
    tag: 'database-design',
    nodes: [
      {
        t: 'Data Modeling',
        c: ['Conceptual Data Model', 'Logical Data Model', 'Physical Data Model'],
      },
      {
        t: 'Entity-Relationship Modeling',
        c: [
          'Entities',
          'Attributes',
          'Relationships',
          'Cardinality & Modality',
          'ER Diagrams (Crow\u2019s Foot, Chen)',
          'Weak Entities',
          'Associative Entities',
        ],
      },
      {
        t: 'Relationship Types',
        c: [
          'One-to-One',
          'One-to-Many',
          'Many-to-Many (Junction Tables)',
          'Self-Referencing Relationships',
        ],
      },
      {
        t: 'Functional Dependencies',
        c: [
          'Functional Dependency',
          'Partial Dependency',
          'Transitive Dependency',
          'Multivalued Dependency',
          'Join Dependency',
          'Closure & Armstrong\u2019s Axioms',
        ],
      },
      {
        t: 'Normalization',
        c: [
          'Why Normalize',
          'First Normal Form (1NF)',
          'Second Normal Form (2NF)',
          'Third Normal Form (3NF)',
          'Boyce-Codd Normal Form (BCNF)',
          'Fourth Normal Form (4NF)',
          'Fifth Normal Form (5NF)',
          'Domain-Key Normal Form (DKNF)',
          'Sixth Normal Form (6NF)',
        ],
      },
      {
        t: 'Denormalization',
        c: [
          'When to Denormalize',
          'Denormalization Techniques',
          'Trade-offs',
          'Redundancy & Anomalies',
        ],
      },
      {
        t: 'Schema Design Patterns',
        c: [
          'Surrogate vs Natural Keys',
          'Lookup / Reference Tables',
          'Audit / History Tables',
          'Soft Deletes',
          'Polymorphic Associations',
          'Hierarchical Data (Adjacency List, Nested Set, Materialized Path, Closure Table)',
          'Distributed ID Generation (UUIDv7, ULID, Snowflake IDs)',
          'Bitemporal Modeling',
        ],
      },
      {
        t: 'Design Anti-Patterns',
        c: [
          'Entity-Attribute-Value (EAV)',
          'Comma-Separated Lists (Jaywalking)',
          'Naive Trees',
          'Over-Normalization',
        ],
      },
    ],
  },

  // ===================== STAGE 22 =====================
  {
    id: 'performance',
    title: 'Performance Tuning & Query Optimization',
    summary: 'Execution plans, indexing, query rewriting, statistics, caching and monitoring.',
    lvl: 'advanced',
    tag: 'performance',
    nodes: [
      {
        t: 'Query Execution Internals',
        c: [
          'Query Lifecycle (Parse, Bind, Optimize, Execute)',
          'The Query Optimizer',
          'Cost-Based Optimization',
          'Statistics & Cardinality Estimation',
          'Plan Cache & Reuse',
          'Adaptive Query Execution',
        ],
      },
      {
        t: 'Execution Plans',
        c: [
          'Reading Execution Plans',
          'EXPLAIN / EXPLAIN ANALYZE',
          'Estimated vs Actual Plans',
          'Plan Operators (Scan, Seek, Join, Sort)',
          'Identifying Bottlenecks',
        ],
      },
      {
        t: 'Indexing for Performance',
        c: [
          'Index Usage Analysis',
          'Covering Indexes',
          'Index Selectivity',
          'Avoiding Unnecessary Scans',
        ],
      },
      {
        t: 'Query Optimization Techniques',
        c: [
          'SARGable Predicates',
          'Avoiding Functions on Indexed Columns',
          'Rewriting Subqueries',
          'Join Optimization',
          'Predicate Pushdown',
          'Avoiding SELECT *',
          'Pagination Optimization',
          'Reducing Round Trips',
        ],
      },
      {
        t: 'Common Performance Problems',
        c: [
          'Full Table Scans',
          'N+1 Query Problem',
          'Parameter Sniffing',
          'Implicit Conversions',
          'Spills to Disk',
          'Lock Contention',
        ],
      },
      {
        t: 'Statistics & Maintenance',
        c: [
          'Updating Statistics',
          'Histograms & Cardinality',
          'Index Maintenance',
          'Vacuum / Autovacuum',
        ],
      },
      {
        t: 'Caching',
        c: [
          'Result Caching',
          'Buffer / Page Cache',
          'Materialized Views for Performance',
          'Application-Level Caching',
        ],
      },
      {
        t: 'Monitoring & Profiling',
        c: [
          'Slow Query Logs',
          'Query Store / pg_stat_statements',
          'Wait Statistics',
          'Profiling Tools',
        ],
      },
      {
        t: 'Hardware & Configuration',
        c: [
          'Memory Configuration',
          'Connection Pooling',
          'Parallelism',
          'Storage & I/O Considerations',
        ],
      },
    ],
  },

  // ===================== STAGE 23 =====================
  {
    id: 'security',
    title: 'Security & Access Control',
    summary: 'Authentication, privileges, roles, encryption, injection defense and auditing.',
    lvl: 'advanced',
    tag: 'security',
    nodes: [
      {
        t: 'Authentication',
        c: [
          'Password Authentication',
          'OS / Integrated Authentication',
          'Certificate / Key Authentication',
          'LDAP / Active Directory',
          'Multi-Factor Authentication',
          'Authentication Plugins',
        ],
      },
      {
        t: 'Authorization & Privileges',
        c: [
          'GRANT',
          'REVOKE',
          'DENY (SQL Server)',
          'Object Privileges',
          'System Privileges',
          'Privilege Hierarchy',
          'WITH GRANT OPTION',
        ],
      },
      {
        t: 'Roles & Users',
        c: [
          'Creating Users',
          'Creating Roles',
          'Role Membership',
          'Default & Public Roles',
          'Role-Based Access Control (RBAC)',
        ],
      },
      {
        t: 'Row & Column-Level Security',
        c: [
          'Row-Level Security (RLS) Policies',
          'Column-Level Permissions',
          'Views for Security',
          'Dynamic Data Masking',
        ],
      },
      {
        t: 'Data Encryption',
        c: [
          'Encryption at Rest (TDE)',
          'Encryption in Transit (TLS/SSL)',
          'Column / Field Encryption',
          'Always Encrypted (SQL Server)',
          'Key Management',
          'Secrets Management (Vault, KMS)',
          'Hashing & Salting',
        ],
      },
      {
        t: 'SQL Injection',
        c: [
          'How SQL Injection Works',
          'Parameterized Queries / Prepared Statements',
          'Input Validation',
          'Principle of Least Privilege',
          'Escaping & Allowlists',
          'ORM Considerations',
        ],
      },
      {
        t: 'Auditing & Compliance',
        c: [
          'Audit Logs & Trails',
          'Compliance (GDPR, HIPAA, PCI-DSS, SOC 2)',
          'Data Retention & Purging',
          'PII / Sensitive Data Handling',
          'Data Anonymization & Pseudonymization',
        ],
      },
    ],
  },

  // ===================== STAGE 24 =====================
  {
    id: 'administration',
    title: 'Database Administration & Operations',
    summary: 'Installing, backing up, scaling, monitoring, maintaining and migrating databases.',
    lvl: 'advanced',
    tag: 'administration',
    nodes: [
      {
        t: 'Installation & Configuration',
        c: [
          'Installation',
          'Configuration Parameters',
          'Memory & Resource Settings',
          'Initial Setup & Hardening',
        ],
      },
      {
        t: 'Backup & Recovery',
        c: [
          'Full Backups',
          'Incremental / Differential Backups',
          'Logical vs Physical Backups',
          'Point-in-Time Recovery (PITR)',
          'Backup Tools (pg_dump, mysqldump, BACKUP DATABASE)',
          'Backup Strategies & Schedules',
          'WAL Archiving',
          'Restore & Verification',
        ],
      },
      {
        t: 'High Availability',
        c: [
          'Replication (Streaming, Logical)',
          'Failover & Switchover',
          'Clustering',
          'Standby / Read Replicas',
          'Automatic Failover Tools',
          'Replication Slots',
        ],
      },
      {
        t: 'Disaster Recovery',
        c: ['RPO & RTO', 'DR Strategies', 'Geo-Redundancy'],
      },
      {
        t: 'Monitoring & Health',
        c: [
          'Health Checks',
          'Metrics & Dashboards',
          'Alerting',
          'Log Management',
          'Capacity Planning',
          'Observability (OpenTelemetry)',
        ],
      },
      {
        t: 'Maintenance Tasks',
        c: [
          'Vacuum / Reindex / Analyze',
          'Statistics Updates',
          'Log Rotation',
          'Bloat Management',
          'Scheduled Jobs (cron, SQL Agent, pgAgent)',
        ],
      },
      {
        t: 'User & Resource Management',
        c: [
          'Connection Management',
          'Connection Pooling',
          'Resource Governor / Quotas',
          'Workload Management',
        ],
      },
      {
        t: 'Upgrades & Migrations',
        c: [
          'Version Upgrades',
          'Schema Migrations',
          'Data Migration',
          'Zero-Downtime Migrations',
          'Migration Tools (Flyway, Liquibase)',
        ],
      },
    ],
  },

  // ===================== STAGE 25 =====================
  {
    id: 'distributed-sql',
    title: 'Scalability & Distributed SQL',
    summary: 'Partitioning, sharding, replication, distributed consistency and NewSQL databases.',
    lvl: 'advanced',
    tag: 'distributed-sql',
    nodes: [
      {
        t: 'Scaling Strategies',
        c: ['Vertical Scaling', 'Horizontal Scaling', 'Read vs Write Scaling'],
      },
      {
        t: 'Partitioning',
        c: [
          'Horizontal Partitioning',
          'Vertical Partitioning',
          'Range Partitioning',
          'List Partitioning',
          'Hash Partitioning',
          'Composite Partitioning',
          'Partition Pruning',
          'Partition Maintenance',
          'Geo-Partitioning',
        ],
      },
      {
        t: 'Sharding',
        c: [
          'What is Sharding',
          'Shard Keys',
          'Shard Routing',
          'Resharding & Rebalancing',
          'Cross-Shard Queries',
          'Consistent Hashing',
          'Sharding Challenges',
        ],
      },
      {
        t: 'Replication',
        c: [
          'Primary-Replica (Master-Slave)',
          'Multi-Primary (Master-Master)',
          'Synchronous vs Asynchronous',
          'Logical vs Physical Replication',
          'Replication Lag',
          'Conflict Resolution',
        ],
      },
      {
        t: 'Distributed Database Concepts',
        c: [
          'CAP Theorem',
          'PACELC',
          'ACID vs BASE',
          'Consistency Models',
          'Eventual Consistency',
          'Distributed Consensus (Raft, Paxos)',
          'Two-Phase & Three-Phase Commit',
          'HTAP (Hybrid Transactional/Analytical Processing)',
        ],
      },
      {
        t: 'NewSQL & Distributed SQL Databases',
        c: [
          'Google Spanner',
          'CockroachDB',
          'YugabyteDB',
          'TiDB',
          'Vitess',
          'Citus (Distributed PostgreSQL)',
        ],
      },
      {
        t: 'Connection & Load Management',
        c: [
          'Load Balancing',
          'Connection Poolers (PgBouncer, ProxySQL)',
          'Read/Write Splitting',
        ],
      },
    ],
  },

  // ===================== STAGE 26 =====================
  {
    id: 'analytics',
    title: 'Analytical SQL, OLAP & Data Warehousing',
    summary: 'Analytical workloads, dimensional modeling, columnar storage and modern warehouses.',
    lvl: 'advanced',
    tag: 'analytics',
    nodes: [
      {
        t: 'OLTP vs OLAP',
        c: ['Transactional vs Analytical Workloads', 'Workload Characteristics'],
      },
      {
        t: 'Data Warehousing',
        c: [
          'Data Warehouse Concepts',
          'Data Marts',
          'ETL vs ELT',
          'Staging Areas',
          'Slowly Changing Dimensions (SCD Types)',
          'Data Vault',
          'OLAP Cubes & MDX',
        ],
      },
      {
        t: 'Dimensional Modeling',
        c: [
          'Star Schema',
          'Snowflake Schema',
          'Fact Tables',
          'Dimension Tables',
          'Grain',
          'Measures & Metrics',
        ],
      },
      {
        t: 'Columnar Storage',
        c: ['Row vs Columnar Storage', 'Compression', 'Vectorized Execution'],
      },
      {
        t: 'Analytical Query Patterns',
        c: [
          'Aggregation Pipelines',
          'Window Functions for Analytics',
          'GROUPING SETS / ROLLUP / CUBE for Analytics',
          'Cohort Analysis',
          'Funnel Analysis',
          'Time-Series Analysis',
        ],
      },
      {
        t: 'MPP & Cloud Data Warehouses',
        c: [
          'Massively Parallel Processing (MPP)',
          'Snowflake',
          'Google BigQuery',
          'Amazon Redshift',
          'Azure Synapse',
          'Databricks SQL',
        ],
      },
      {
        t: 'Lakehouse & Modern Analytics',
        c: [
          'Data Lake vs Warehouse vs Lakehouse',
          'Apache Iceberg / Delta Lake / Hudi',
          'Trino / Presto',
          'DuckDB',
          'Federated Queries',
          'dbt (Data Build Tool)',
          'Semantic / Metrics Layer',
          'Reverse ETL',
          'Apache Arrow & DataFusion',
          'Streaming Materialized Views (Materialize, RisingWave)',
        ],
      },
      {
        t: 'Materialized Views & Aggregates',
        c: ['Pre-Aggregation', 'Summary Tables', 'Incremental Materialization'],
      },
    ],
  },

  // ===================== STAGE 27 =====================
  {
    id: 'dialects',
    title: 'SQL Dialects & Platforms',
    summary: 'The major SQL engines, their distinctive features and how to write portable SQL.',
    lvl: 'intermediate',
    tag: 'dialects',
    nodes: [
      {
        t: 'PostgreSQL',
        c: [
          'PostgreSQL Features',
          'PL/pgSQL',
          'Extensions (PostGIS, pgvector, TimescaleDB)',
          'PostgreSQL-Specific Syntax',
        ],
      },
      {
        t: 'MySQL & MariaDB',
        c: [
          'Storage Engines (InnoDB, MyISAM)',
          'MySQL Features',
          'MariaDB Differences',
          'MySQL-Specific Syntax',
        ],
      },
      {
        t: 'SQL Server (T-SQL)',
        c: ['T-SQL Features', 'SQL Server Editions', 'T-SQL-Specific Syntax'],
      },
      {
        t: 'Oracle Database',
        c: ['Oracle PL/SQL', 'Oracle Features', 'Oracle-Specific Syntax', 'SQL*Plus'],
      },
      {
        t: 'SQLite',
        c: ['Embedded Database', 'SQLite Features', 'SQLite Limitations'],
      },
      {
        t: 'IBM Db2',
        c: ['Db2 Features', 'SQL PL', 'Db2-Specific Syntax'],
      },
      {
        t: 'Cloud-Managed Databases',
        c: [
          'Amazon RDS / Aurora',
          'Azure SQL Database',
          'Google Cloud SQL / AlloyDB',
          'Serverless Databases (Neon, PlanetScale, Turso)',
        ],
      },
      {
        t: 'Analytical & Specialized Engines',
        c: ['Snowflake SQL', 'BigQuery SQL', 'DuckDB', 'ClickHouse'],
      },
      {
        t: 'Dialect Differences & Portability',
        c: [
          'Syntax Differences',
          'Function Name Differences',
          'Type Differences',
          'LIMIT vs TOP vs ROWNUM',
          'Writing Portable SQL',
          'ANSI Compliance',
        ],
      },
    ],
  },

  // ===================== STAGE 28 =====================
  {
    id: 'ecosystem',
    title: 'SQL Ecosystem, Tooling & Modern Practices',
    summary: 'Application access, ORMs, migrations, pipelines, AI-assisted SQL and SQL:2023 features.',
    lvl: 'advanced',
    tag: 'ecosystem',
    nodes: [
      {
        t: 'Connecting from Applications',
        c: [
          'Database Drivers (JDBC, ODBC, ADO.NET)',
          'Connection Strings',
          'Prepared Statements',
          'Application Connection Pooling',
          'Auto-Generated APIs (PostgREST, Hasura, Supabase)',
        ],
      },
      {
        t: 'ORMs & Query Builders',
        c: [
          'ORM Concepts',
          'Popular ORMs (Hibernate, Entity Framework, SQLAlchemy, Prisma, TypeORM)',
          'Query Builders (Knex, jOOQ)',
          'ORM vs Raw SQL',
          'The ORM N+1 Problem',
        ],
      },
      {
        t: 'Migrations & Schema Version Control',
        c: [
          'Migration Tools (Flyway, Liquibase, Alembic)',
          'Schema as Code',
          'Version-Controlled Schemas',
          'CI/CD for Databases',
          'Database Branching (Neon, PlanetScale)',
        ],
      },
      {
        t: 'SQL Development Workflow',
        c: [
          'SQL Style Guides & Formatting',
          'SQL Linting (SQLFluff)',
          'Testing SQL (pgTAP, Unit Tests)',
          'Data Quality Testing (Great Expectations, dbt tests)',
          'Data Contracts',
          'Code Review for SQL',
        ],
      },
      {
        t: 'Data Integration & Pipelines',
        c: [
          'ETL / ELT Tools',
          'Change Data Capture (CDC)',
          'Streaming SQL (Kafka, Flink, Materialize)',
          'Data Orchestration (Airflow, Dagster)',
        ],
      },
      {
        t: 'SQL & AI',
        c: [
          'Natural Language to SQL (Text-to-SQL)',
          'AI Query Assistants',
          'Vector Search & RAG with SQL',
          'LLM-Assisted Query Optimization',
          'In-Database ML (BigQuery ML, MADlib)',
          'MCP for Databases',
          'Semantic Caching',
        ],
      },
      {
        t: 'Modern SQL Features (SQL:2023)',
        c: [
          'JSON Enhancements',
          'Property Graph Queries (SQL/PGQ)',
          'Multidimensional Arrays',
          'UNIQUE NULL Treatment',
          'Standardized GREATEST / LEAST',
        ],
      },
      {
        t: 'Career & Continuous Learning',
        c: [
          'SQL Certifications',
          'Practice Platforms (LeetCode, HackerRank, SQLZoo, Mode)',
          'Building a Portfolio',
          'Staying Current',
        ],
      },
      {
        t: 'SQL Best Practices',
        c: [
          'Writing Readable SQL',
          'Naming Conventions',
          'Avoiding Common Pitfalls',
          'Documentation',
          'Performance-Aware Querying',
        ],
      },
    ],
  },
]

// --------------------------- generation ---------------------------

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[()/.,:’'"]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalize(node) {
  if (typeof node === 'string') return { title: node, children: [] }
  return { title: node.t, level: node.lvl, children: node.c ?? [] }
}

const usedIds = new Set()
function uniqueId(title, parentId) {
  const base = slugify(title)
  let id = base
  if (usedIds.has(id)) id = parentId ? `${parentId}--${base}` : base
  let n = 2
  while (usedIds.has(id)) {
    id = `${parentId ? `${parentId}--${base}` : base}-${n++}`
  }
  usedIds.add(id)
  return id
}

const topicFiles = [] // { id, json }
let rootOrder = 0

function emitTopic({ title, level, children }, { parentId, stageTag, order, inheritedLevel }) {
  const id = uniqueId(title, parentId)
  const lvl = level ?? inheritedLevel
  const json = {
    id,
    title,
    summary: title,
    order,
    level: lvl,
    tags: [stageTag],
  }
  if (parentId) json.parentId = parentId
  topicFiles.push({ id, json })

  children.forEach((child, i) =>
    emitTopic(normalize(child), {
      parentId: id,
      stageTag,
      order: i + 1,
      inheritedLevel: lvl,
    }),
  )
  return id
}

const roadmapStages = STAGES.map((stage) => {
  const nodes = stage.nodes.map((raw) => {
    const node = normalize(raw)
    rootOrder += 1
    const id = emitTopic(node, {
      parentId: undefined,
      stageTag: stage.tag,
      order: rootOrder,
      inheritedLevel: stage.lvl,
    })
    return {
      id,
      title: node.title,
      topicId: id,
      status: 'core',
      description: node.title,
    }
  })
  return { id: stage.id, title: stage.title, summary: stage.summary, nodes }
})

const roadmap = {
  title: 'SQL Learning Roadmap',
  description:
    'A complete, staged path from beginner to expert — database and relational foundations, data types, querying and filtering, functions and aggregation, joins, subqueries and CTEs, set operations, DML and DDL, constraints, views, indexes, transactions, window functions, advanced querying, procedural SQL, semi-structured data, database design, performance tuning, security, administration, distributed and analytical SQL, dialects and the modern SQL ecosystem.',
  stages: roadmapStages,
}

async function main() {
  await mkdir(SUBJECT_DIR, { recursive: true })

  // Remove only previously generated topic folders so re-runs stay clean.
  if (existsSync(TOPICS_DIR)) {
    const existing = await readdir(TOPICS_DIR, { withFileTypes: true })
    await Promise.all(
      existing
        .filter((e) => e.isDirectory())
        .map((e) => rm(path.join(TOPICS_DIR, e.name), { recursive: true, force: true })),
    )
  }
  await mkdir(TOPICS_DIR, { recursive: true })

  await writeFile(path.join(SUBJECT_DIR, 'subject.json'), `${JSON.stringify(SUBJECT, null, 2)}\n`)
  await writeFile(path.join(SUBJECT_DIR, 'roadmap.json'), `${JSON.stringify(roadmap, null, 2)}\n`)

  for (const { id, json } of topicFiles) {
    const dir = path.join(TOPICS_DIR, id)
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, 'topic.json'), `${JSON.stringify(json, null, 2)}\n`)
  }

  console.log(
    `[sql] ${roadmapStages.length} stages, ${roadmapStages.reduce((s, st) => s + st.nodes.length, 0)} root topics, ${topicFiles.length} topic files written.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
