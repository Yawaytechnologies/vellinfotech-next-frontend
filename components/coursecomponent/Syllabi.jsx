// src/content/syllabi.js

export const SYLLABI = {
  java: {
    title: "Java Online Training — Syllabus",
    accent: "#005BAC",
    meta: {
      duration: "10–12 weeks",
      audience: "Students & Working Professionals",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Core Java",
      "OOP",
      "Collections",
      "JDBC",
      "Servlets/JSP",
      "Spring",
      "Hibernate",
      "Web Services",
      "XML",
      "SOA",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Java",
        items: [
          "Java Basics",
          "Bytecode & Class Files",
          "Compilation Process",
          "Data types and Operations",
          "if conditions, for/while/do-while loops",
        ],
      },
      {
        title: "Module 2: Data Handling and Functions",
        items: [
          "Single & Multi-dimensional arrays",
          "Functions & arguments",
          "Function overloading",
          "Static polymorphism",
          "String handling, StringBuffer",
        ],
      },
      {
        title: "Module 3: Object Oriented Programming in Java",
        items: [
          "Object orientation concepts",
          "Attributes & methods",
          "Classes and objects",
          "Methods & constructors (default/parameterized)",
          "Inheritance, abstract, final, static",
        ],
      },
      {
        title: "Module 4: Packages and Multi-Threading",
        items: [
          "Packages & interfaces",
          "Access specifiers (public/private/protected/package)",
          "Exception handling (try/catch/finally/throw/throws)",
          "Multithreading: Runnable, extending Thread",
          "Synchronization",
        ],
      },
      {
        title: "Module 5: Java Collections",
        items: [
          "Wrapper & inner classes",
          "java.lang, java.io, java.util basics",
          "Collections overview",
          "ArrayList, Vector, HashSet, TreeSet",
          "HashMap, Hashtable",
        ],
      },
      {
        title: "Module 6: Web Services",
        items: [
          "Introduction to Web Services",
          "WSDL & UDDI",
          "SOAP vs RESTful services",
          "JAX-WS implementation",
        ],
      },
      {
        title: "Module 7: XML",
        items: [
          "XML fundamentals & writing XML",
          "DOM parser: read/write",
          "SAX parser & XSL",
        ],
      },
      {
        title: "Module 8: JDBC",
        items: [
          "SQL basics",
          "CRUD (Connect/Insert/Update/Delete/Select)",
          "JDBC introduction & architecture",
          "Driver types (1/2/3/4)",
          "Batch ops, transactions (commit/rollback)",
        ],
      },
      {
        title: "Module 9: Servlets",
        items: [
          "Web technologies overview",
          "Types of servlets",
          "Generic & HttpServlet",
          "RequestDispatcher (forward/include)",
          "Session tracking (4 types), filters",
        ],
      },
      {
        title: "Module 10: JSP",
        items: [
          "JSP introduction & architecture",
          "Scriptlet/declaration/expression tags",
          "Implicit objects & directives",
          "JSP with JDBC",
        ],
      },
      {
        title: "Module 11: Hibernate",
        items: [
          "Hibernate introduction & architecture",
          "CRUD (Insert/Update/Delete/Select)",
          "Inheritance & collections",
          "HQL & restrictions",
          "Caching",
        ],
      },
      {
        title: "Module 12: Spring",
        items: [
          "Spring overview & architecture",
          "IoC Container & bean definition",
          "Bean scopes & post processors",
          "Dependency Injection & auto-wiring",
        ],
      },
      {
        title: "Module 13: Spring, Ajax, and Design Patterns",
        items: [
          "AOP (Aspect Oriented Programming)",
          "Spring + Hibernate integration",
          "Transaction management",
          "Ajax basics",
          "DAO, DTO, MVC, intercepting filters, front controller, business delegate",
        ],
      },
      {
        title: "Module 14: SOA",
        items: [
          "SOA introduction & architecture",
          "Business layer & advantages",
          "Contract, address, binding",
          "Service composition & relation to Web Services",
        ],
      },
      {
        title: "Module 15: Web Services (Projects)",
        items: [
          "Web Services recap",
          "WSDL & UDDI",
          "SOAP / REST",
          "JAX-WS implementation (project oriented)",
        ],
      },
    ],
  },
    python: {
    title: "Python Online Training — Syllabus",
    accent: "#005BAC", // Python blue
    meta: {
      duration: "8–10 weeks",
      audience: "Students & Working Professionals",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Core Python",
      "Data Types",
      "Control Flow",
      "Functions",
      "OOP",
      "File I/O",
      "Error Handling",
      "Testing (pytest)",
      "FastAPI",
      "SQL & ORM",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Python",
        items: [
          "Language overview & use-cases",
          "Installing Python, IDE/Editor setup",
          "Running scripts vs REPL",
          "PEP 8, docstrings, typing basics",
        ],
      },
      {
        title: "Module 2: Data Types & Operators",
        items: [
          "Numbers, booleans, strings",
          "Lists, tuples, dicts, sets",
          "Slicing, mutability, copying",
          "Operators, type casting, f-strings",
        ],
      },
      {
        title: "Module 3: Control Flow & Iteration",
        items: [
          "if / elif / else",
          "for / while, break / continue",
          "Comprehensions (list/dict/set)",
          "Iterators & generators, enumerate/zip",
        ],
      },
      {
        title: "Module 4: Functions & Modules",
        items: [
          "def, return, annotations",
          "*args, **kwargs, keyword-only args",
          "Closures & lambdas",
          "Decorators & higher-order functions",
        ],
      },
      {
        title: "Module 5: Strings & Regular Expressions",
        items: [
          "String methods & formatting",
          "Bytes vs str",
          "re module: patterns & groups",
          "Common text-processing recipes",
        ],
      },
      {
        title: "Module 6: Errors, Exceptions & Logging",
        items: [
          "try / except / else / finally",
          "Raising & custom exceptions",
          "Context managers (with), contextlib",
          "Logging basics & log levels",
        ],
      },
      {
        title: "Module 7: File I/O & Serialization",
        items: [
          "Text/binary I/O, pathlib",
          "CSV/JSON, Pickle",
          "Working with dates & times",
          "OS & subprocess essentials",
        ],
      },
      {
        title: "Module 8: Environments & Packaging",
        items: [
          "virtualenv/venv & pip",
          "requirements.txt & pip-tools",
          "Intro to Poetry / pyproject.toml",
          "Project structure & imports",
        ],
      },
      {
        title: "Module 9: Object-Oriented Programming",
        items: [
          "Classes, objects, attributes",
          "Inheritance & composition",
          "Class/static methods, properties",
          "Dunder methods & dataclasses",
        ],
      },
      {
        title: "Module 10: Testing & Quality",
        items: [
          "unittest vs pytest",
          "Fixtures & parametrization",
          "Coverage & TDD basics",
          "Type hints, mypy, linting (ruff/flake8)",
        ],
      },
      {
        title: "Module 11: Databases & SQL",
        items: [
          "SQL fundamentals, CRUD",
          "sqlite3 & PostgreSQL client",
          "SQLAlchemy ORM & models",
          "Transactions & migrations (Alembic)",
        ],
      },
      {
        title: "Module 12: Web APIs with FastAPI",
        items: [
          "Routing & HTTP methods",
          "Pydantic v2 models (request/response)",
          "Dependency Injection & routers",
          "Auth (JWT), CORS, pagination",
        ],
      },
      {
        title: "Module 13: Django Fundamentals (Optional)",
        items: [
          "MVT architecture",
          "Models, Admin & ORM",
          "Templates & Class-Based Views",
          "Forms, validations, auth basics",
        ],
      },
      {
        title: "Module 14: Async & Concurrency",
        items: [
          "Threading & multiprocessing",
          "asyncio & async/await",
          "Async HTTP clients",
          "Choosing the right concurrency model",
        ],
      },
      {
        title: "Module 15: Final Project & Deployment",
        items: [
          "Build a REST API (FastAPI + SQLAlchemy)",
          "Env vars & settings (.env)",
          "Uvicorn/Gunicorn, Docker basics",
          "Deploy to cloud (Render/AWS) & logging",
        ],
      },
    ],
  },

 fullstack: {
    title: "Full Stack Development — Syllabus",
    accent: "#005BAC", // Teal-ish accent
    meta: {
      duration: "12-16 weeks",
      audience: "Students, Graduates, IT Professionals",
      level: "Beginner → Advanced",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "HTML5 & CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Node.js & Express",
      "Databases (SQL & MongoDB)",
      "REST APIs",
      "Git & GitHub",
      "Authentication & Security",
      "DevOps Basics",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Web Fundamentals",
        items: [
          "Internet & Client-Server basics",
          "HTML5 essentials (forms, media, semantic tags)",
          "CSS3 basics, Flexbox, Grid",
          "Responsive Design, Media Queries",
        ],
      },
      {
        title: "Module 2: JavaScript Programming",
        items: [
          "JS syntax & variables (var/let/const)",
          "Functions, scopes, closures",
          "DOM manipulation & events",
          "ES6+ features (arrow fn, destructuring, spread/rest)",
          "Async JS: callbacks, promises, async/await",
        ],
      },
      {
        title: "Module 3: Frontend Development with React",
        items: [
          "React basics (components, JSX)",
          "Props & State, hooks (useState, useEffect)",
          "Forms, controlled inputs",
          "React Router (routing & navigation)",
          "Context API & Redux Toolkit basics",
        ],
      },
      {
        title: "Module 4: Backend Development with Node.js & Express",
        items: [
          "Node.js runtime overview",
          "Express.js routing & middleware",
          "REST API design",
          "Error handling & logging",
          "Security: Helmet, rate limiting, sanitization",
        ],
      },
      {
        title: "Module 5: Databases & Persistence",
        items: [
          "SQL fundamentals (MySQL/PostgreSQL)",
          "MongoDB & NoSQL concepts",
          "ORMs (Sequelize/TypeORM/Prisma) vs ODM (Mongoose)",
          "Joins, indexes, transactions",
          "CRUD with SQL & NoSQL",
        ],
      },
      {
        title: "Module 6: Authentication & Authorization",
        items: [
          "User registration & login",
          "Password hashing (bcrypt)",
          "JWT authentication",
          "Role-based access control",
          "OAuth2 & social logins (Google, GitHub)",
        ],
      },
      {
        title: "Module 7: Advanced Frontend Topics",
        items: [
          "Component libraries (Material UI / TailwindCSS)",
          "Form validation (Formik/Yup)",
          "API integration (Axios, Fetch)",
          "Performance optimization & lazy loading",
          "Testing React apps (Jest + React Testing Library)",
        ],
      },
      {
        title: "Module 8: DevOps & Deployment Basics",
        items: [
          "Git & GitHub workflows (branching, PRs, merge)",
          "CI/CD pipelines (GitHub Actions basics)",
          "Docker introduction & containerization",
          "Hosting: Netlify, Vercel (Frontend), Render/Heroku/AWS (Backend)",
          "Environment variables & config management",
        ],
      },
      {
        title: "Module 9: Full Stack Integration",
        items: [
          "Connecting React frontend to Express backend",
          "Fetching data from APIs",
          "State management for async requests",
          "Error boundaries & global error handling",
          "Realtime basics with WebSockets",
        ],
      },
      {
        title: "Module 10: Final Capstone Project",
        items: [
          "Plan & design a real-world project",
          "Team collaboration with Git",
          "End-to-end development (frontend + backend + DB)",
          "Deploy full-stack app to cloud",
          "Project presentation & review",
        ],
      },
    ],
  },
   plsql: {
    title: "PL/SQL Online Training — Syllabus",
    accent: "#005BAC", // Oracle PL/SQL orange
    meta: {
      duration: "6–8 weeks",
      audience: "Students, DB Developers, Professionals",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "SQL Refresher",
      "PL/SQL Basics",
      "Cursors",
      "Stored Procedures",
      "Functions",
      "Packages",
      "Triggers",
      "Exception Handling",
      "Collections",
      "Performance Tuning",
    ],
    sections: [
      {
        title: "Module 1: SQL Refresher",
        items: [
          "Relational database fundamentals",
          "DDL, DML, DCL, TCL commands",
          "Joins, subqueries, views",
          "Aggregate & analytic functions",
        ],
      },
      {
        title: "Module 2: Introduction to PL/SQL",
        items: [
          "What is PL/SQL?",
          "Benefits & architecture",
          "Anonymous blocks: DECLARE, BEGIN, EXCEPTION, END",
          "Variables, constants, data types",
        ],
      },
      {
        title: "Module 3: Control Structures",
        items: [
          "IF/ELSE statements",
          "Loops: FOR, WHILE, simple LOOP",
          "EXIT & CONTINUE",
          "CASE statements",
        ],
      },
      {
        title: "Module 4: Cursors",
        items: [
          "Implicit vs explicit cursors",
          "Cursor attributes (%FOUND, %NOTFOUND, %ROWCOUNT)",
          "FOR loops with cursors",
          "Parameterized cursors",
        ],
      },
      {
        title: "Module 5: Procedures & Functions",
        items: [
          "Stored procedures basics",
          "IN, OUT, IN OUT parameters",
          "User-defined functions",
          "Calling procedures/functions from SQL",
        ],
      },
      {
        title: "Module 6: Packages",
        items: [
          "Creating packages (specification & body)",
          "Public vs private elements",
          "Package state & variables",
          "Advantages of using packages",
        ],
      },
      {
        title: "Module 7: Triggers",
        items: [
          "Trigger basics & syntax",
          "Row-level vs statement-level triggers",
          "BEFORE vs AFTER triggers",
          "INSTEAD OF triggers",
        ],
      },
      {
        title: "Module 8: Exception Handling",
        items: [
          "Predefined exceptions (NO_DATA_FOUND, TOO_MANY_ROWS)",
          "User-defined exceptions",
          "RAISE & RAISE_APPLICATION_ERROR",
          "Best practices for error handling",
        ],
      },
      {
        title: "Module 9: PL/SQL Collections",
        items: [
          "Associative arrays (index-by tables)",
          "Nested tables",
          "VARRAYs",
          "Bulk collect & FORALL",
        ],
      },
      {
        title: "Module 10: Performance Tuning & Advanced Topics",
        items: [
          "Optimizing PL/SQL programs",
          "Bulk operations for performance",
          "Dynamic SQL (EXECUTE IMMEDIATE)",
          "DBMS_SQL package basics",
        ],
      },
      {
        title: "Module 11: Capstone Project",
        items: [
          "Designing stored procedures for real-world use case",
          "Implementing packages & triggers",
          "Database performance considerations",
          "Project presentation & Q/A",
        ],
      },
    ],
  },
   sql: {
    title: "SQL Online Training — Syllabus",
    accent: "#005BAC", // SQL DB blue
    meta: {
      duration: "5–7 weeks",
      audience: "Students, Freshers, Data Analysts, Developers",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "RDBMS Fundamentals",
      "DDL, DML, DCL, TCL",
      "Joins & Subqueries",
      "Functions & Aggregates",
      "Indexes & Views",
      "Constraints",
      "Transactions",
      "Normalization",
      "Stored Routines",
      "Performance Tuning",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Databases",
        items: [
          "Database concepts & RDBMS",
          "Popular RDBMS (MySQL, PostgreSQL, Oracle, SQL Server)",
          "SQL vs NoSQL overview",
          "Installing & connecting to databases",
        ],
      },
      {
        title: "Module 2: SQL Basics",
        items: [
          "Creating & dropping databases",
          "Tables, columns & data types",
          "INSERT, UPDATE, DELETE operations",
          "SELECT basics & WHERE clause",
        ],
      },
      {
        title: "Module 3: Constraints & Keys",
        items: [
          "Primary key & foreign key",
          "Unique, Not Null, Default",
          "Check constraints",
          "Referential integrity",
        ],
      },
      {
        title: "Module 4: Operators & Functions",
        items: [
          "Arithmetic & comparison operators",
          "String functions (CONCAT, SUBSTR, REPLACE)",
          "Date & time functions",
          "Aggregate functions (SUM, AVG, COUNT, MIN, MAX)",
        ],
      },
      {
        title: "Module 5: Joins & Subqueries",
        items: [
          "INNER, LEFT, RIGHT, FULL OUTER joins",
          "Self joins & cross joins",
          "Nested subqueries",
          "EXISTS, ANY, ALL keywords",
        ],
      },
      {
        title: "Module 6: Advanced Querying",
        items: [
          "GROUP BY & HAVING",
          "ORDER BY & LIMIT",
          "Case expressions",
          "Set operations (UNION, INTERSECT, MINUS/EXCEPT)",
        ],
      },
      {
        title: "Module 7: Views & Indexes",
        items: [
          "Creating & managing views",
          "Materialized views (concept)",
          "Clustered vs non-clustered indexes",
          "Indexing strategies for performance",
        ],
      },
      {
        title: "Module 8: Transactions & Locks",
        items: [
          "ACID properties",
          "COMMIT, ROLLBACK, SAVEPOINT",
          "Isolation levels (READ COMMITTED, SERIALIZABLE, etc.)",
          "Deadlocks & concurrency basics",
        ],
      },
      {
        title: "Module 9: Normalization & Schema Design",
        items: [
          "1NF, 2NF, 3NF, BCNF",
          "Denormalization use cases",
          "Entity-Relationship (ER) modeling",
          "Schema design best practices",
        ],
      },
      {
        title: "Module 10: Stored Routines & Triggers (Optional)",
        items: [
          "Creating stored procedures",
          "User-defined functions",
          "Simple triggers",
          "Benefits & limitations",
        ],
      },
      {
        title: "Module 11: Performance Tuning",
        items: [
          "Explain plans & query optimization",
          "Index usage analysis",
          "Partitioning basics",
          "Best practices for scalable queries",
        ],
      },
      {
        title: "Module 12: Capstone Project",
        items: [
          "Design a database schema for a case study (E-commerce, HR, Banking)",
          "Write optimized queries (Joins, Subqueries, Aggregates)",
          "Implement views, indexes, and transactions",
          "Final review & presentation",
        ],
      },
    ],
  },
  
  datascience: {
    title: "Data Science Online Training — Syllabus",
    accent: "#005BAC", // Indigo for Data Science
    meta: {
      duration: "12-16 weeks",
      audience: "Students, Fresh Graduates, IT & Analytics Professionals",
      level: "Beginner → Advanced",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Python for Data Science",
      "Statistics & Probability",
      "Data Wrangling (Pandas/Numpy)",
      "Exploratory Data Analysis",
      "Data Visualization",
      "Machine Learning (Supervised/Unsupervised)",
      "Feature Engineering",
      "SQL for Data Science",
      "Deep Learning Basics",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Data Science",
        items: [
          "What is Data Science? Use-cases & industry applications",
          "Roles: Data Scientist vs Analyst vs Engineer",
          "Data Science lifecycle & workflow",
          "Tools overview: Python, Jupyter, SQL, Git, Cloud",
        ],
      },
      {
        title: "Module 2: Python for Data Science",
        items: [
          "Python refresher (data types, functions, OOP)",
          "Numpy for numerical computing",
          "Pandas for data manipulation",
          "Working with files (CSV, Excel, JSON)",
        ],
      },
      {
        title: "Module 3: Statistics & Probability",
        items: [
          "Descriptive statistics (mean, median, mode, variance)",
          "Probability distributions (normal, binomial, poisson)",
          "Inferential statistics (hypothesis testing, t-test, chi-square)",
          "Correlation, covariance & regression basics",
        ],
      },
      {
        title: "Module 4: Data Wrangling & Cleaning",
        items: [
          "Handling missing values",
          "Outlier detection & treatment",
          "Data scaling & normalization",
          "Encoding categorical variables",
        ],
      },
      {
        title: "Module 5: Exploratory Data Analysis (EDA)",
        items: [
          "EDA process & business understanding",
          "Univariate & bivariate analysis",
          "Pandas profiling & summary reports",
          "Case study: retail/finance dataset",
        ],
      },
      {
        title: "Module 6: Data Visualization",
        items: [
          "Matplotlib & Seaborn basics",
          "Plotly & interactive dashboards",
          "Histograms, boxplots, scatterplots",
          "Heatmaps, pairplots, correlation plots",
        ],
      },
      {
        title: "Module 7: SQL for Data Science",
        items: [
          "Writing queries for analysis",
          "Aggregates & GROUP BY",
          "Joins & subqueries",
          "Analytical functions (RANK, ROW_NUMBER, CTEs)",
        ],
      },
      {
        title: "Module 8: Machine Learning — Supervised Learning",
        items: [
          "ML pipeline overview",
          "Regression (Linear, Logistic)",
          "Classification (Decision Tree, Random Forest, SVM)",
          "Model evaluation (confusion matrix, ROC/AUC, cross-validation)",
        ],
      },
      {
        title: "Module 9: Machine Learning — Unsupervised Learning",
        items: [
          "Clustering (K-means, Hierarchical, DBSCAN)",
          "Dimensionality reduction (PCA, t-SNE)",
          "Association rule mining (Apriori, FP-growth)",
          "Case study: customer segmentation",
        ],
      },
      {
        title: "Module 10: Feature Engineering & Model Tuning",
        items: [
          "Feature scaling & selection",
          "Handling imbalance (SMOTE, undersampling)",
          "Grid search & Random search CV",
          "Hyperparameter tuning (sklearn, Optuna)",
        ],
      },
      {
        title: "Module 11: Deep Learning Basics",
        items: [
          "Neural Networks introduction",
          "TensorFlow & Keras basics",
          "ANN implementation",
          "Intro to CNN/RNN (optional overview)",
        ],
      },
      {
        title: "Module 12: Model Deployment & MLOps",
        items: [
          "Saving models (pickle, joblib, ONNX)",
          "FastAPI/Flask model deployment",
          "Dockerizing ML models",
          "Deploying to cloud (AWS/GCP/Render)",
        ],
      },
      {
        title: "Module 13: Capstone Project",
        items: [
          "End-to-end data science project (real dataset)",
          "EDA + ML model + deployment",
          "Team collaboration with Git",
          "Presentation & evaluation",
        ],
      },
    ],
  },
 businessanalytics: {
    title: "Business Analytics Online Training — Syllabus",
    accent: "#005BAC", // Coral orange
    meta: {
      duration: "10–12 weeks",
      audience: "Students, Business Professionals, Analysts, Managers",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Excel for Business Analytics",
      "Data Visualization",
      "SQL for Analytics",
      "Statistics & Probability",
      "Business Problem Solving",
      "Power BI / Tableau",
      "Case Studies",
      "Predictive Analytics (Intro)",
      "Dashboards & Reporting",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Business Analytics",
        items: [
          "What is Business Analytics?",
          "Types: Descriptive, Diagnostic, Predictive, Prescriptive",
          "Analytics in industries (Retail, Finance, HR, Marketing)",
          "Career roles & tools overview",
        ],
      },
      {
        title: "Module 2: Excel for Business Analytics",
        items: [
          "Excel formulas & functions",
          "Pivot tables & charts",
          "Conditional formatting",
          "What-if analysis & Solver",
        ],
      },
      {
        title: "Module 3: Statistics for Analytics",
        items: [
          "Descriptive stats: mean, median, mode, variance",
          "Correlation & regression",
          "Probability concepts",
          "Hypothesis testing basics",
        ],
      },
      {
        title: "Module 4: SQL for Business Users",
        items: [
          "SQL basics: SELECT, WHERE, ORDER BY",
          "Joins & subqueries",
          "Aggregates & GROUP BY",
          "Practical queries for analytics",
        ],
      },
      {
        title: "Module 5: Data Visualization & Dashboards",
        items: [
          "Principles of effective visualization",
          "Excel charts vs BI dashboards",
          "KPI dashboards & scorecards",
          "Storytelling with data",
        ],
      },
      {
        title: "Module 6: Power BI / Tableau (Visualization Tool)",
        items: [
          "Connecting to data sources",
          "Building interactive dashboards",
          "Filters, slicers, drill-down",
          "Publishing & sharing reports",
        ],
      },
      {
        title: "Module 7: Predictive Analytics (Intro)",
        items: [
          "Forecasting basics",
          "Simple regression in Excel/BI tools",
          "Intro to predictive models",
          "Business forecasting case study",
        ],
      },
      {
        title: "Module 8: Business Case Studies",
        items: [
          "Customer churn analysis",
          "Sales forecasting",
          "Marketing campaign performance",
          "HR analytics (attrition, hiring trends)",
        ],
      },
      {
        title: "Module 9: Capstone Project",
        items: [
          "End-to-end business analytics case",
          "Data cleaning, visualization, storytelling",
          "Decision making based on insights",
          "Final presentation & review",
        ],
      },
    ],
  },
   datascienceai: {
    title: "Data Science & AI Online Training — Syllabus",
    accent: "#005BAC", // AI-inspired blue
    meta: {
      duration: "12-16 weeks",
      audience: "Students, Engineers, Analysts, Professionals",
      level: "Intermediate → Advanced",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Python for AI",
      "Statistics & Data Science",
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "NLP (Text Analytics)",
      "Computer Vision",
      "Reinforcement Learning (Intro)",
      "Generative AI (LLMs, Transformers)",
      "AI Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Data Science Foundations",
        items: [
          "Recap of Python, Pandas, Numpy",
          "EDA & data visualization (Matplotlib, Seaborn)",
          "SQL for data science",
          "Business problem framing",
        ],
      },
      {
        title: "Module 2: Machine Learning Essentials",
        items: [
          "Supervised ML (regression, classification)",
          "Unsupervised ML (clustering, PCA)",
          "Model evaluation & cross-validation",
          "Feature engineering & selection",
        ],
      },
      {
        title: "Module 3: Neural Networks & Deep Learning",
        items: [
          "Introduction to perceptrons & ANN",
          "Activation functions & backpropagation",
          "Optimizers (SGD, Adam)",
          "Keras/TensorFlow workflows",
        ],
      },
      {
        title: "Module 4: Advanced Deep Learning",
        items: [
          "CNNs for image data",
          "RNNs, LSTMs, GRUs for sequential data",
          "Transfer learning & pre-trained models",
          "Regularization & dropout",
        ],
      },
      {
        title: "Module 5: Natural Language Processing (NLP)",
        items: [
          "Text preprocessing (tokenization, stemming, lemmatization)",
          "Word embeddings (Word2Vec, GloVe, FastText)",
          "Text classification & sentiment analysis",
          "Transformers & BERT basics",
        ],
      },
      {
        title: "Module 6: Computer Vision",
        items: [
          "Image preprocessing & augmentation",
          "CNN architectures (LeNet, AlexNet, ResNet)",
          "Object detection (YOLO, RCNN)",
          "Face recognition case study",
        ],
      },
      {
        title: "Module 7: Reinforcement Learning (Intro)",
        items: [
          "RL concepts (agent, environment, reward)",
          "Q-learning & policy gradients",
          "Applications in gaming & robotics",
          "Case study: simple RL problem",
        ],
      },
      {
        title: "Module 8: Generative AI & LLMs",
        items: [
          "What is Generative AI?",
          "Large Language Models (GPT, LLaMA, etc.)",
          "Text-to-image (DALL·E, Stable Diffusion)",
          "Practical AI tools (Hugging Face, LangChain)",
        ],
      },
      {
        title: "Module 9: AI Deployment & MLOps",
        items: [
          "Serving ML/DL models with FastAPI",
          "Docker & containerization",
          "CI/CD for ML (MLOps basics)",
          "Deploying AI models to cloud (AWS/GCP/Azure)",
        ],
      },
      {
        title: "Module 10: AI Capstone Project",
        items: [
          "Choose domain (NLP, CV, or hybrid)",
          "Full pipeline: data → model → deployment",
          "Work in teams with Git & collaboration tools",
          "Presentation & review",
        ],
      },
    ],
  },
  bigdatadeveloper: {
    title: "Big Data Developer Online Training — Syllabus",
    accent: "#005BAC", // Big Data orange-red
    meta: {
      duration: "12-16 weeks",
      audience: "Students, Developers, Data Engineers, Professionals",
      level: "Intermediate → Advanced",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Hadoop Ecosystem",
      "HDFS & MapReduce",
      "Hive & Pig",
      "Apache Spark",
      "NoSQL (MongoDB, Cassandra, HBase)",
      "Kafka & Data Streaming",
      "ETL Pipelines",
      "Data Lake Concepts",
      "Cloud Big Data Tools",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Big Data",
        items: [
          "What is Big Data? 4 Vs (Volume, Velocity, Variety, Veracity)",
          "Big Data use-cases across industries",
          "Batch vs real-time processing",
          "Big Data ecosystem overview",
        ],
      },
      {
        title: "Module 2: Hadoop Ecosystem",
        items: [
          "HDFS architecture & working",
          "MapReduce concepts & examples",
          "YARN resource manager",
          "Hadoop cluster setup (pseudo-distributed vs multi-node)",
        ],
      },
      {
        title: "Module 3: Data Processing with Hive & Pig",
        items: [
          "Hive fundamentals & HiveQL",
          "Partitioning & bucketing",
          "Pig Latin basics",
          "ETL with Hive/Pig",
        ],
      },
      {
        title: "Module 4: Apache Spark",
        items: [
          "Spark architecture (RDD, DAG, cluster manager)",
          "Spark Core (transformations & actions)",
          "Spark SQL & DataFrames",
          "Spark Streaming basics",
          "MLlib introduction",
        ],
      },
      {
        title: "Module 5: NoSQL Databases",
        items: [
          "Intro to NoSQL concepts",
          "MongoDB basics (CRUD, aggregation pipeline)",
          "Cassandra data model & queries (CQL)",
          "HBase integration with Hadoop",
        ],
      },
      {
        title: "Module 6: Real-Time Data Processing",
        items: [
          "Apache Kafka architecture",
          "Producers, consumers, brokers, topics",
          "Kafka + Spark Streaming integration",
          "Case study: real-time log processing",
        ],
      },
      {
        title: "Module 7: Data Ingestion & ETL Pipelines",
        items: [
          "Sqoop for RDBMS → HDFS import/export",
          "Flume for streaming ingestion",
          "Airflow basics for workflow orchestration",
          "Building scalable ETL pipelines",
        ],
      },
      {
        title: "Module 8: Data Lakes & Cloud Big Data",
        items: [
          "Data Lake concepts vs Data Warehouse",
          "AWS EMR, Glue, Redshift overview",
          "Azure HDInsight & Synapse",
          "Google BigQuery basics",
        ],
      },
      {
        title: "Module 9: Big Data Security & Performance",
        items: [
          "Securing Hadoop ecosystem (Kerberos basics)",
          "Data encryption & masking",
          "Performance tuning Spark jobs",
          "Monitoring clusters with Ambari/Cloudera Manager",
        ],
      },
      {
        title: "Module 10: Capstone Project",
        items: [
          "End-to-end Big Data pipeline",
          "Data ingestion (Kafka/Flume/Sqoop)",
          "Batch & real-time processing with Spark",
          "Storing & analyzing in Hive/NoSQL",
          "Dashboard/report presentation",
        ],
      },
    ],
  },
  softwaretesting: {
    title: "Software Testing Online Training — Syllabus",
    accent: "#005BAC", // Green for QA
    meta: {
      duration: "8–10 weeks",
      audience: "Students, QA Engineers, Developers",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "SDLC & STLC",
      "Manual Testing",
      "Test Case Design",
      "Defect Management",
      "Automation Basics",
      "Agile Testing",
      "API Testing",
      "Performance Testing",
      "Test Tools Overview",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Fundamentals of Testing",
        items: [
          "What is Software Testing?",
          "SDLC vs STLC",
          "Types of testing (manual, automation, functional, non-functional)",
          "Agile & DevOps in testing",
        ],
      },
      {
        title: "Module 2: Manual Testing",
        items: [
          "Test plans & strategies",
          "Writing effective test cases",
          "Bug lifecycle & defect reporting",
          "Exploratory vs scripted testing",
        ],
      },
      {
        title: "Module 3: Test Design Techniques",
        items: [
          "Equivalence partitioning",
          "Boundary value analysis",
          "Decision tables & state transition",
          "Use case testing",
        ],
      },
      {
        title: "Module 4: Automation Testing Basics",
        items: [
          "Why automation?",
          "Test automation pyramid",
          "Overview of Selenium, JUnit/TestNG, Pytest",
          "Framework introduction (keyword, hybrid, data-driven)",
        ],
      },
      {
        title: "Module 5: Other Types of Testing",
        items: [
          "Performance testing overview (JMeter basics)",
          "Security testing introduction",
          "Mobile testing basics",
          "API testing with Postman",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        items: [
          "Manual test case writing",
          "Automating simple workflows",
          "Defect reporting & dashboard",
        ],
      },
    ],
  },

  etltesting: {
    title: "ETL Testing Online Training — Syllabus",
    accent: "#005BAC", // Purple for ETL
    meta: {
      duration: "6–8 weeks",
      audience: "QA Engineers, Data Testers, BI Professionals",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Data Warehouse Basics",
      "ETL Concepts",
      "Data Mapping & Validation",
      "SQL for ETL Testing",
      "Data Quality Testing",
      "ETL Automation Tools",
      "Reporting & Dashboards",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Data Warehouse & ETL Overview",
        items: [
          "What is Data Warehousing?",
          "ETL process (Extract, Transform, Load)",
          "OLTP vs OLAP",
          "ETL tools overview (Informatica, Talend, SSIS)",
        ],
      },
      {
        title: "Module 2: ETL Testing Basics",
        items: [
          "ETL testing lifecycle",
          "Test case preparation",
          "Data mapping & transformations",
          "Common ETL challenges",
        ],
      },
      {
        title: "Module 3: SQL for ETL Testing",
        items: [
          "Basic SQL queries for validation",
          "Joins, aggregations, subqueries",
          "Comparing source vs target",
          "Set operators & data reconciliation",
        ],
      },
      {
        title: "Module 4: ETL Testing Techniques",
        items: [
          "Data completeness & correctness testing",
          "Data quality & integrity testing",
          "Incremental load & historical load testing",
          "Performance & scalability checks",
        ],
      },
      {
        title: "Module 5: Automation & Tools",
        items: [
          "Test automation in ETL",
          "Using Python/SQL scripts for validation",
          "Data validation with BI tools",
          "Reporting ETL test results",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        items: [
          "ETL workflow validation (end-to-end)",
          "Source → Staging → Warehouse testing",
          "Data reconciliation report",
        ],
      },
    ],
  },

  seleniumtesting: {
    title: "Selenium Testing Online Training — Syllabus",
    accent: "#005BAC", // Yellow-orange for Selenium
    meta: {
      duration: "8–10 weeks",
      audience: "Students, QA Engineers, Automation Testers",
      level: "Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Automation Basics",
      "Java/Python for Selenium",
      "Locators & WebDriver",
      "TestNG/JUnit Framework",
      "Page Object Model",
      "Handling Web Elements",
      "Cross-Browser Testing",
      "CI/CD with Selenium",
      "Reporting",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Selenium Basics",
        items: [
          "Intro to Selenium & automation testing",
          "Selenium WebDriver architecture",
          "Locators (id, name, xpath, cssSelector)",
          "Launching browsers with Selenium",
        ],
      },
      {
        title: "Module 2: Core Java/Python for Selenium",
        items: [
          "OOP basics",
          "Exception handling",
          "Collections & loops",
          "File handling & data-driven testing",
        ],
      },
      {
        title: "Module 3: Selenium WebDriver in Action",
        items: [
          "Handling input fields, buttons, checkboxes",
          "Dropdowns, alerts & popups",
          "Frames, windows & navigation",
          "Waits (implicit, explicit, fluent)",
        ],
      },
      {
        title: "Module 4: Test Frameworks",
        items: [
          "TestNG / JUnit basics",
          "Annotations & assertions",
          "Data providers",
          "Parallel test execution",
        ],
      },
      {
        title: "Module 5: Framework Design",
        items: [
          "Page Object Model (POM)",
          "Hybrid framework (keyword + data-driven)",
          "Utility classes & reusable components",
          "Logging & reporting with Extent Reports",
        ],
      },
      {
        title: "Module 6: Advanced Selenium",
        items: [
          "Cross-browser & grid testing",
          "Headless browser testing",
          "Integration with CI/CD (Jenkins, GitHub Actions)",
          "Maven/Gradle project setup",
        ],
      },
      {
        title: "Module 7: Capstone Project",
        items: [
          "Automating an end-to-end workflow",
          "Implementing Page Object Model",
          "Cross-browser execution",
          "Reporting test results",
        ],
      },
    ],
  },
   aws: {
    title: "AWS Online Training — Syllabus",
    accent: "#005BAC", // AWS orange
    meta: {
      duration: "8–10 weeks",
      audience: "Students, Developers, Cloud Enthusiasts, IT Professionals",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "AWS Fundamentals",
      "IAM & Security",
      "EC2 & S3",
      "VPC & Networking",
      "RDS & DynamoDB",
      "Lambda & Serverless",
      "CloudFormation",
      "Elastic Load Balancer & Auto Scaling",
      "CloudWatch & Monitoring",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Cloud & AWS",
        items: [
          "Cloud concepts & models",
          "AWS global infrastructure",
          "AWS Management Console & CLI",
          "Free tier overview",
        ],
      },
      {
        title: "Module 2: IAM & Security",
        items: [
          "Users, groups, roles, policies",
          "MFA & password policies",
          "Identity federation",
          "AWS Organizations & billing",
        ],
      },
      {
        title: "Module 3: Compute Services",
        items: [
          "EC2 basics & instance types",
          "EBS volumes & snapshots",
          "Elastic Load Balancer (ELB)",
          "Auto Scaling groups",
        ],
      },
      {
        title: "Module 4: Storage & Databases",
        items: [
          "S3 buckets, lifecycle policies, Glacier",
          "RDS (MySQL/PostgreSQL) setup",
          "DynamoDB basics",
          "ElastiCache overview",
        ],
      },
      {
        title: "Module 5: Networking & VPC",
        items: [
          "VPC, subnets, route tables",
          "NACLs & Security Groups",
          "Internet & NAT gateways",
          "PrivateLink, Peering, Transit Gateway",
        ],
      },
      {
        title: "Module 6: Serverless & Automation",
        items: [
          "AWS Lambda functions",
          "API Gateway integration",
          "CloudFormation templates",
          "Elastic Beanstalk basics",
        ],
      },
      {
        title: "Module 7: Monitoring & Logging",
        items: [
          "CloudWatch metrics, alarms, dashboards",
          "CloudTrail logging",
          "Cost Explorer & budgets",
          "Trusted Advisor",
        ],
      },
      {
        title: "Module 8: DevOps & Deployment Tools",
        items: [
          "CodeCommit, CodeBuild, CodeDeploy",
          "CI/CD pipelines with CodePipeline",
          "ECS & EKS overview",
          "Cloud9 IDE",
        ],
      },
      {
        title: "Module 9: Capstone Project",
        items: [
          "Host a scalable web application",
          "Configure auto-scaling & load balancing",
          "Enable monitoring & alerts",
          "Deploy end-to-end cloud project",
        ],
      },
    ],
  },

  devops: {
    title: "DevOps Online Training — Syllabus",
    accent: "#005BAC", // DevOps blue
    meta: {
      duration: "10–12 weeks",
      audience: "Students, Developers, System Admins, IT Professionals",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "DevOps Fundamentals",
      "Linux & Shell Scripting",
      "Git & GitHub",
      "CI/CD Pipelines",
      "Jenkins",
      "Docker & Containers",
      "Kubernetes",
      "Infrastructure as Code (Terraform)",
      "Monitoring (Prometheus/Grafana)",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to DevOps",
        items: [
          "What is DevOps? Principles & lifecycle",
          "Agile vs DevOps",
          "CI/CD concepts",
          "Tools overview",
        ],
      },
      {
        title: "Module 2: Linux & Scripting",
        items: [
          "Linux fundamentals",
          "Shell scripting basics",
          "Process & service management",
          "Package managers (apt, yum)",
        ],
      },
      {
        title: "Module 3: Version Control with Git",
        items: [
          "Git basics (init, clone, commit, push, pull)",
          "Branching strategies (GitFlow)",
          "Merging & resolving conflicts",
          "GitHub/GitLab integration",
        ],
      },
      {
        title: "Module 4: CI/CD with Jenkins",
        items: [
          "Jenkins setup & pipelines",
          "Build triggers",
          "Declarative vs scripted pipelines",
          "Integrating with Git & Maven/Gradle",
        ],
      },
      {
        title: "Module 5: Containers with Docker",
        items: [
          "Docker architecture",
          "Building & running containers",
          "Docker Hub & registries",
          "Docker Compose basics",
        ],
      },
      {
        title: "Module 6: Orchestration with Kubernetes",
        items: [
          "Kubernetes architecture",
          "Pods, Deployments, Services",
          "ConfigMaps & Secrets",
          "Scaling & rolling updates",
        ],
      },
      {
        title: "Module 7: Infrastructure as Code",
        items: [
          "Terraform basics",
          "Provisioning AWS resources with Terraform",
          "State management",
          "Infrastructure automation best practices",
        ],
      },
      {
        title: "Module 8: Monitoring & Logging",
        items: [
          "Prometheus metrics collection",
          "Grafana dashboards",
          "ELK stack overview",
          "Alerts & notifications",
        ],
      },
      {
        title: "Module 9: Capstone Project",
        items: [
          "End-to-end CI/CD pipeline",
          "Containerized application with Docker & Kubernetes",
          "Infrastructure setup using Terraform",
          "Monitoring & alerting setup",
        ],
      },
    ],
  },
  hardwarenetworking: {
    title: "Hardware & Networking Online Training — Syllabus",
    accent: "#005BAC",
    meta: {
      duration: "8–10 weeks",
      audience: "Students, IT Support Engineers, Network Technicians",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Computer Hardware Basics",
      "Operating Systems",
      "Networking Fundamentals",
      "TCP/IP & Subnetting",
      "Switches & Routers",
      "Wireless Networking",
      "LAN/WAN Setup",
      "Network Security Basics",
      "Troubleshooting",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Computer Hardware Fundamentals",
        items: [
          "Motherboards, CPUs, RAM, storage",
          "Power supply & peripherals",
          "BIOS/UEFI basics",
          "System assembly & configuration",
        ],
      },
      {
        title: "Module 2: Operating Systems",
        items: [
          "Windows & Linux fundamentals",
          "Disk partitioning & file systems",
          "Drivers & device management",
          "Basic OS troubleshooting",
        ],
      },
      {
        title: "Module 3: Networking Fundamentals",
        items: [
          "OSI & TCP/IP models",
          "IP addressing & subnetting",
          "Switches, routers, hubs",
          "Cabling & connectors (Ethernet, fiber)",
        ],
      },
      {
        title: "Module 4: LAN/WAN & Wireless",
        items: [
          "LAN setup & configuration",
          "WAN technologies (leased line, DSL, MPLS)",
          "Wi-Fi standards & configuration",
          "Access points & wireless security",
        ],
      },
      {
        title: "Module 5: Network Security Basics",
        items: [
          "Firewalls & antivirus basics",
          "VPNs & secure tunneling",
          "IDS/IPS overview",
          "User authentication methods",
        ],
      },
      {
        title: "Module 6: Troubleshooting & Monitoring",
        items: [
          "Ping, tracert, ipconfig/netstat commands",
          "Wireshark basics",
          "Common hardware/network issues",
          "Preventive maintenance",
        ],
      },
      {
        title: "Module 7: Capstone Project",
        items: [
          "Setup a small office LAN",
          "Configure router/switch",
          "Secure wireless connection",
          "Document troubleshooting steps",
        ],
      },
    ],
  },

  cybersecurity: {
    title: "Cyber Security Online Training — Syllabus",
    accent: "#005BAC",
    meta: {
      duration: "10–12 weeks",
      audience: "Students, IT Professionals, Security Analysts",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Security Fundamentals",
      "Threats & Vulnerabilities",
      "Cryptography",
      "Network Security",
      "Web & Application Security",
      "Ethical Hacking Basics",
      "Cloud Security",
      "Security Tools",
      "Compliance & Policies",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Cyber Security",
        items: [
          "What is Cyber Security?",
          "Types of attacks (malware, phishing, DoS/DDoS)",
          "CIA triad (Confidentiality, Integrity, Availability)",
          "Security lifecycle",
        ],
      },
      {
        title: "Module 2: Threats & Vulnerabilities",
        items: [
          "Common vulnerabilities (OWASP Top 10)",
          "Zero-day attacks",
          "Insider threats",
          "Social engineering",
        ],
      },
      {
        title: "Module 3: Cryptography & Encryption",
        items: [
          "Symmetric vs asymmetric encryption",
          "Hashing (MD5, SHA)",
          "SSL/TLS basics",
          "PKI & digital certificates",
        ],
      },
      {
        title: "Module 4: Network Security",
        items: [
          "Firewalls & VPNs",
          "IDS/IPS systems",
          "Wi-Fi & wireless security",
          "Securing routers/switches",
        ],
      },
      {
        title: "Module 5: Web & Application Security",
        items: [
          "SQL injection, XSS, CSRF attacks",
          "Secure coding practices",
          "Penetration testing basics",
          "Vulnerability scanning tools",
        ],
      },
      {
        title: "Module 6: Ethical Hacking & Tools",
        items: [
          "Phases of ethical hacking",
          "Reconnaissance & footprinting",
          "Metasploit & Kali Linux basics",
          "Wireshark & Nmap usage",
        ],
      },
      {
        title: "Module 7: Cloud Security",
        items: [
          "Cloud security challenges",
          "IAM & access control",
          "Shared responsibility model",
          "Securing AWS/Azure/GCP services",
        ],
      },
      {
        title: "Module 8: Compliance & Governance",
        items: [
          "GDPR, HIPAA, PCI-DSS",
          "ISO 27001 overview",
          "Security audits",
          "Incident response & recovery",
        ],
      },
      {
        title: "Module 9: Capstone Project",
        items: [
          "Perform vulnerability assessment on sample app",
          "Secure a small office/home network",
          "Simulate penetration testing",
          "Prepare security audit report",
        ],
      },
    ],
  },
   sap: {
    title: "SAP Online Training — Syllabus",
    accent: "#005BAC", // SAP blue-green
    meta: {
      duration: "12–14 weeks",
      audience: "Students, ERP Consultants, Business Analysts",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "SAP Overview",
      "SAP Navigation",
      "FI & CO Basics",
      "MM & SD Modules",
      "HCM Module",
      "ABAP Introduction",
      "SAP Basis",
      "SAP HANA",
      "Real-time Scenarios",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: SAP Introduction",
        items: [
          "What is ERP & SAP?",
          "SAP architecture & landscape",
          "Navigation & GUI",
          "Client, company, company code basics",
        ],
      },
      {
        title: "Module 2: SAP Functional Modules",
        items: [
          "FI (Financial Accounting) overview",
          "CO (Controlling) overview",
          "MM (Materials Management)",
          "SD (Sales & Distribution)",
          "HCM (Human Capital Management)",
        ],
      },
      {
        title: "Module 3: SAP Technical Basics",
        items: [
          "ABAP introduction",
          "Reports, tables, data dictionary",
          "SAP Basis overview",
          "Authorizations & roles",
        ],
      },
      {
        title: "Module 4: SAP HANA",
        items: [
          "In-memory computing concepts",
          "HANA architecture",
          "HANA SQL & modeling",
          "Analytics in HANA",
        ],
      },
      {
        title: "Module 5: Capstone Project",
        items: [
          "Real-world business case",
          "Configuring modules",
          "Generating reports",
          "Documentation & presentation",
        ],
      },
    ],
  },

  salesforce: {
    title: "Salesforce Online Training — Syllabus",
    accent: "#005BAC", // Salesforce teal
    meta: {
      duration: "10–12 weeks",
      audience: "Students, Admins, Developers, CRM Consultants",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Salesforce CRM Basics",
      "Admin Fundamentals",
      "Data Modeling",
      "Security & Access",
      "Reports & Dashboards",
      "Apex Programming",
      "Lightning Components",
      "Integration Basics",
      "AppExchange",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to Salesforce",
        items: [
          "What is CRM?",
          "Salesforce overview & editions",
          "Cloud offerings (Sales, Service, Marketing)",
          "Navigation & setup",
        ],
      },
      {
        title: "Module 2: Admin Essentials",
        items: [
          "User management",
          "Objects & fields",
          "Validation rules",
          "Page layouts & record types",
        ],
      },
      {
        title: "Module 3: Security & Access",
        items: [
          "Profiles & roles",
          "Permission sets",
          "Sharing rules",
          "Field-level security",
        ],
      },
      {
        title: "Module 4: Automation & Analytics",
        items: [
          "Workflows & process builder",
          "Reports & dashboards",
          "Approval processes",
          "Einstein Analytics basics",
        ],
      },
      {
        title: "Module 5: Development on Salesforce",
        items: [
          "Apex basics",
          "SOQL & SOSL queries",
          "Lightning Web Components",
          "Triggers & controllers",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        items: [
          "Build a Salesforce application",
          "Configure automation & dashboards",
          "Deploy & share app",
        ],
      },
    ],
  },

  servicenow: {
    title: "ServiceNow Online Training — Syllabus",
    accent: "#005BAC", // ServiceNow purple
    meta: {
      duration: "8–10 weeks",
      audience: "Students, ITSM Professionals, Admins, Developers",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "ServiceNow Introduction",
      "Navigation & UI",
      "Forms & Tables",
      "Workflows",
      "User Administration",
      "ITSM Processes",
      "Service Catalog",
      "Scripting Basics",
      "Integration",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to ServiceNow",
        items: [
          "Overview of ITSM & ITIL",
          "ServiceNow platform basics",
          "Instance & navigation",
          "User roles & modules",
        ],
      },
      {
        title: "Module 2: Core Configuration",
        items: [
          "Tables, forms, fields",
          "UI policies & actions",
          "Business rules",
          "Client scripts",
        ],
      },
      {
        title: "Module 3: ITSM Applications",
        items: [
          "Incident, problem, change management",
          "Service catalog basics",
          "Knowledge base setup",
          "SLAs & reports",
        ],
      },
      {
        title: "Module 4: Development & Scripting",
        items: [
          "Introduction to Glide API",
          "Server-side scripting",
          "Client-side scripting",
          "Integration with external systems",
        ],
      },
      {
        title: "Module 5: Capstone Project",
        items: [
          "Configure a ServiceNow ITSM workflow",
          "Automate approvals",
          "Build dashboards",
        ],
      },
    ],
  },

  rpa: {
    title: "RPA (Robotic Process Automation) Online Training — Syllabus",
    accent: "#005BAC", // Orange for Automation
    meta: {
      duration: "8–10 weeks",
      audience: "Students, Business Analysts, QA Engineers, Automation Developers",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "RPA Fundamentals",
      "Automation Anywhere / UiPath Basics",
      "Bot Creation",
      "Workflow Automation",
      "Data Handling",
      "Error Handling",
      "Integrations",
      "Orchestrator/Control Room",
      "Real-time Projects",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Introduction to RPA",
        items: [
          "What is RPA?",
          "RPA lifecycle",
          "Popular tools: UiPath, Automation Anywhere, Blue Prism",
          "Use-cases & industries",
        ],
      },
      {
        title: "Module 2: UiPath/Automation Anywhere Basics",
        items: [
          "Tool installation & setup",
          "Recording types",
          "UI automation concepts",
          "Variables & data types",
        ],
      },
      {
        title: "Module 3: Workflow Automation",
        items: [
          "Flowcharts & sequences",
          "Control flows (if, switch, loops)",
          "Selectors & dynamic automation",
          "Reusability & modularization",
        ],
      },
      {
        title: "Module 4: Data Handling & Error Management",
        items: [
          "Excel & file automation",
          "Database integration",
          "Email automation",
          "Error handling & debugging",
        ],
      },
      {
        title: "Module 5: Orchestration & Deployment",
        items: [
          "Orchestrator/Control Room overview",
          "Bot scheduling & monitoring",
          "Role-based access",
          "Audit & compliance",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        items: [
          "Build an end-to-end automation bot",
          "Integrate with Excel/Email",
          "Schedule & monitor execution",
        ],
      },
    ],
  },
    productionsupport: {
    title: "Production Support Online Training — Syllabus",
    accent: "#34495E", // Steel gray
    meta: {
      duration: "6–8 weeks",
      audience: "Students, IT Support Engineers, System Admins",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "ITIL Basics",
      "Incident Management",
      "Change & Problem Management",
      "Monitoring Tools",
      "Ticketing Systems (ServiceNow/Jira)",
      "Database Support",
      "Application Logs & Debugging",
      "Automation Basics",
      "On-call Support Simulation",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: ITIL & Support Fundamentals",
        items: [
          "Overview of ITIL processes",
          "Types of support (L1, L2, L3)",
          "Incident vs problem vs change management",
        ],
      },
      {
        title: "Module 2: Incident & Change Management",
        items: [
          "Incident lifecycle & SLAs",
          "Root cause analysis",
          "Change management workflows",
          "Escalation matrix",
        ],
      },
      {
        title: "Module 3: Tools & Monitoring",
        items: [
          "Monitoring tools (Nagios, Splunk, Dynatrace)",
          "Ticketing systems (ServiceNow, Jira)",
          "Application logs & debugging basics",
          "Database monitoring (SQL queries, deadlocks)",
        ],
      },
      {
        title: "Module 4: Automation & On-call",
        items: [
          "Scripting basics for automation",
          "Runbooks & playbooks",
          "On-call readiness & shift handover",
          "Incident simulation exercise",
        ],
      },
      {
        title: "Module 5: Capstone Project",
        items: [
          "End-to-end incident handling",
          "Create monitoring alerts",
          "Resolve issues using logs",
          "Document resolution steps",
        ],
      },
    ],
  },

  digitalmarketing: {
    title: "Digital Marketing Online Training — Syllabus",
    accent: "#005BAC", // Red-orange
    meta: {
      duration: "10–12 weeks",
      audience: "Students, Entrepreneurs, Marketing Professionals",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Digital Marketing Overview",
      "SEO (On-page & Off-page)",
      "Google Ads & SEM",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Analytics (Google Analytics)",
      "Affiliate Marketing",
      "Marketing Automation",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Fundamentals of Digital Marketing",
        items: [
          "What is Digital Marketing?",
          "Traditional vs digital marketing",
          "Inbound vs outbound marketing",
        ],
      },
      {
        title: "Module 2: SEO (Search Engine Optimization)",
        items: [
          "On-page SEO (keywords, meta tags, content)",
          "Off-page SEO (backlinks, domain authority)",
          "Technical SEO basics",
          "SEO tools (Ahrefs, SEMrush, Google Search Console)",
        ],
      },
      {
        title: "Module 3: SEM & Paid Ads",
        items: [
          "Google Ads campaign setup",
          "Keyword planning",
          "PPC bidding strategies",
          "Remarketing campaigns",
        ],
      },
      {
        title: "Module 4: Social Media Marketing",
        items: [
          "Facebook & Instagram Ads",
          "LinkedIn marketing",
          "Twitter (X) promotions",
          "Social media content strategy",
        ],
      },
      {
        title: "Module 5: Content & Email Marketing",
        items: [
          "Blogging & content writing",
          "Email marketing campaigns",
          "A/B testing emails",
          "Mailchimp/HubSpot basics",
        ],
      },
      {
        title: "Module 6: Analytics & Automation",
        items: [
          "Google Analytics reports",
          "Conversion tracking",
          "Marketing automation tools",
          "Affiliate marketing introduction",
        ],
      },
      {
        title: "Module 7: Capstone Project",
        items: [
          "SEO + Ads + Social media campaign",
          "Build a digital marketing strategy",
          "Prepare performance report",
        ],
      },
    ],
  },

  softskills: {
    title: "Soft Skill Training — Syllabus",
    accent: "#005BAC", // Green
    meta: {
      duration: "6–8 weeks",
      audience: "Students, Professionals, Job Seekers",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Communication Skills",
      "Presentation Skills",
      "Interpersonal Skills",
      "Teamwork & Collaboration",
      "Leadership Basics",
      "Emotional Intelligence",
      "Problem Solving",
      "Time Management",
      "Interview Skills",
      "Personality Development",
    ],
    sections: [
      {
        title: "Module 1: Communication Skills",
        items: [
          "Verbal & non-verbal communication",
          "Active listening",
          "Email & business communication",
        ],
      },
      {
        title: "Module 2: Presentation & Public Speaking",
        items: [
          "Building confidence",
          "Presentation design",
          "Effective storytelling",
          "Overcoming stage fear",
        ],
      },
      {
        title: "Module 3: Interpersonal & Team Skills",
        items: [
          "Working in teams",
          "Collaboration tools",
          "Conflict resolution",
          "Empathy & adaptability",
        ],
      },
      {
        title: "Module 4: Leadership & Emotional Intelligence",
        items: [
          "Leadership styles",
          "Decision-making",
          "Motivation & influence",
          "Managing stress",
        ],
      },
      {
        title: "Module 5: Career & Interview Preparation",
        items: [
          "Resume building",
          "Group discussion skills",
          "Mock interviews",
          "Body language & etiquette",
        ],
      },
      {
        title: "Module 6: Personality Development",
        items: [
          "Goal setting",
          "Time management",
          "Continuous learning habits",
          "Positive thinking",
        ],
      },
    ],
  },
   scrummaster: {
    title: "Scrum Master Online Training — Syllabus",
    accent: "#005BAC", // Dark navy
    meta: {
      duration: "6–8 weeks",
      audience: "Students, Project Managers, Team Leads, Agile Enthusiasts",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Agile & Scrum Overview",
      "Scrum Roles",
      "Scrum Artifacts",
      "Scrum Events",
      "Sprint Planning & Review",
      "Agile Estimation",
      "Scrum Metrics",
      "Scaling Scrum",
      "Scrum Master Tools",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Agile & Scrum Basics",
        items: [
          "Agile values & principles",
          "Scrum framework overview",
          "Waterfall vs Agile",
        ],
      },
      {
        title: "Module 2: Scrum Roles & Responsibilities",
        items: [
          "Scrum Master role",
          "Product Owner responsibilities",
          "Development team role",
        ],
      },
      {
        title: "Module 3: Scrum Events",
        items: [
          "Sprint planning",
          "Daily stand-up",
          "Sprint review & retrospective",
          "Backlog refinement",
        ],
      },
      {
        title: "Module 4: Scrum Artifacts",
        items: [
          "Product backlog",
          "Sprint backlog",
          "Increment & definition of done",
        ],
      },
      {
        title: "Module 5: Advanced Scrum Topics",
        items: [
          "Agile estimation (story points, velocity)",
          "Scrum metrics & reporting",
          "Scaling Scrum (SAFe, LeSS)",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        items: [
          "Simulate Scrum events",
          "Manage a sprint",
          "Create Scrum board in Jira/Trello",
        ],
      },
    ],
  },

  productmanagement: {
    title: "Product Management Online Training — Syllabus",
    accent: "#005BAC", // Purple
    meta: {
      duration: "8–10 weeks",
      audience: "Students, Business Leaders, Startup Founders, Product Managers",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "Product Management Fundamentals",
      "Market Research",
      "Product Roadmap",
      "Agile & Scrum for PMs",
      "MVP & Prototyping",
      "Stakeholder Management",
      "Metrics & Analytics",
      "Go-to-Market Strategy",
      "Growth & Scaling",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Product Management Foundations",
        items: [
          "What is product management?",
          "Roles & responsibilities",
          "Skills of a PM",
        ],
      },
      {
        title: "Module 2: Market & Customer Research",
        items: [
          "Market analysis & competitor research",
          "Customer personas",
          "Problem-solution fit",
        ],
      },
      {
        title: "Module 3: Roadmaps & Strategy",
        items: [
          "Product vision & strategy",
          "Roadmap planning",
          "Prioritization frameworks (RICE, MoSCoW)",
        ],
      },
      {
        title: "Module 4: Agile Product Development",
        items: [
          "Working with Scrum teams",
          "MVP creation",
          "Prototyping & wireframes",
        ],
      },
      {
        title: "Module 5: Product Growth & Metrics",
        items: [
          "KPIs & product metrics",
          "Customer feedback loops",
          "Go-to-market strategy",
          "Growth hacking basics",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        items: [
          "Build product roadmap",
          "Prototype MVP",
          "Pitch product to stakeholders",
        ],
      },
    ],
  },

  businessanalyst: {
    title: "Business Analyst Online Training — Syllabus",
    accent: "#005BAC", // Blue
    meta: {
      duration: "8–10 weeks",
      audience: "Students, Business Analysts, Project Coordinators, Consultants",
      level: "Beginner → Intermediate",
      mode: "Online / Classroom",
      schedule: "Weekday & Weekend Batches",
    },
    preview: [
      "BA Fundamentals",
      "SDLC & Methodologies",
      "Requirements Gathering",
      "UML & Use Cases",
      "Process Modeling",
      "Agile & Scrum for BAs",
      "Documentation Skills",
      "Tools (Jira, Confluence, Balsamiq)",
      "Stakeholder Management",
      "Capstone Project",
    ],
    sections: [
      {
        title: "Module 1: Business Analysis Foundations",
        items: [
          "What is Business Analysis?",
          "Role of BA in projects",
          "SDLC models overview",
        ],
      },
      {
        title: "Module 2: Requirements Engineering",
        items: [
          "Requirements elicitation techniques",
          "Use case & user stories",
          "Functional vs non-functional requirements",
        ],
      },
      {
        title: "Module 3: Process & Modeling",
        items: [
          "UML basics",
          "Process flow diagrams",
          "Wireframes & mockups",
        ],
      },
      {
        title: "Module 4: Agile BA",
        items: [
          "BA role in Agile teams",
          "Backlog grooming",
          "Working with Scrum Master & Product Owner",
        ],
      },
      {
        title: "Module 5: Tools & Documentation",
        items: [
          "Jira for requirement tracking",
          "Confluence for documentation",
          "Balsamiq/Draw.io for diagrams",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        items: [
          "Elicit requirements for case study",
          "Create UML/use case diagrams",
          "Prepare BRD & SRS docs",
        ],
      },
    ],
  },
  // Add more courses like this:
  // python: { title, accent, meta, preview, sections: [...] },
  // fullstack: { ... },
};
