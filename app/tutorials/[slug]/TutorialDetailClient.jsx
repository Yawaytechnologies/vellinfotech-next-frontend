"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  FiUser,
  FiCalendar,
  FiFolder,
  FiChevronLeft,
  FiCheckCircle,
} from "react-icons/fi";

const CONTENT = {
  "django-framework-from-scratch": {
    meta: {
      title: "Django Tutorial — Learn Django Framework from Scratch",
      author: "Global 04",
      date: "2024-10-11",
      categories: ["Blog", "Software Engineering", "Tutorials"],
      image: "/images/tutorials.webp",
      excerpt:
        "Introduction to Django, environment setup, project structure, models and views, templates, and deployment basics. Django's high-level Python web framework promotes quick development through simple, pragmatic design.",
    },
    sections: [
      {
        id: "introduction-to-django",
        h: "Introduction to Django",
        body: (
          <>
            <p className="text-slate-800 leading-relaxed">
              Django is a high-level Python web framework that encourages rapid
              development and clean, pragmatic design. It follows the{" "}
              <strong>MVT (Model–View–Template)</strong> pattern and ships with
              an ORM, URL routing, templates, forms, authentication, and an
              auto-generated admin.
            </p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-slate-700 mb-2 font-semibold">MVT Flow</p>
              <ul className="space-y-2 text-slate-700">
                <li>
                  HTTP request → <strong>URLConf (urls.py)</strong> → View
                </li>
                <li>
                  View ↔ <strong>Model (models.py)</strong> via ORM
                </li>
                <li>
                  View → <strong>Template (.html)</strong> → HTTP response
                </li>
              </ul>
            </div>
          </>
        ),
      },
      {
        id: "setting-up-your-environment",
        h: "Setting Up Your Environment",
        body: (
          <ul className="mt-3 space-y-2">
            {[
              "Install Python 3.10+ from python.org",
              "Create venv:  python -m venv .venv",
              "Activate (Windows):  .venv\\Scripts\\activate",
              "Activate (macOS/Linux):  source .venv/bin/activate",
              "Install Django:  pip install django",
              "Create project:  django-admin startproject mysite .",
              "Run server:  python manage.py runserver  →  http://127.0.0.1:8000",
            ].map((line, i) => {
              const parts = line.split("  ");
              return (
                <li key={i} className="flex items-start gap-2 text-slate-800">
                  <FiCheckCircle className="mt-1 shrink-0 text-blue-700" />
                  <span>
                    {parts[0]}
                    {parts[1] && (
                      <code className="ml-2 rounded bg-slate-100 px-1 py-0.5">
                        {parts[1]}
                      </code>
                    )}
                    {parts[2] && (
                      <>
                        {" "}
                        <code className="rounded bg-slate-100 px-1 py-0.5">
                          {parts[2]}
                        </code>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        ),
      },
      {
        id: "project-structure",
        h: "Project Structure",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`mysite/
├── manage.py
├── mysite/              # Django config package: settings.py / urls.py / wsgi.py / asgi.py
└── core/                # app package (run: python manage.py startapp core)
    ├── models.py        # DB schema & ORM models
    ├── views.py         # Request handlers / controller logic
    ├── urls.py          # (optional) app-level route map
    └── templates/       # HTML templates used by this app`}</pre>
        ),
      },
      {
        id: "first-view-template",
        h: "Your First View & Template",
        body: (
          <>
            <p className="text-slate-800">
              Create an app and a simple view that renders a template.
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`# create an app
python manage.py startapp core

# core/views.py
from django.shortcuts import render

def home(request):
    return render(request, "home.html", {"name": "Django"})`}</pre>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`# mysite/urls.py
from django.contrib import admin
from django.urls import path
from core.views import home

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),
]`}</pre>
          </>
        ),
      },
    ],
  },

  "build-your-first-data-warehouse": {
    meta: {
      title: "Building Your First Data Warehouse: A Hands-on Tutorial",
      author: "Global 04",
      date: "2024-10-10",
      categories: ["Blog", "Datawarehouse", "Tutorials"],
      image: "/images/tutorials.webp",
      excerpt:
        "What a data warehouse is, the reference architecture, how to stand one up (Snowflake/BigQuery/Redshift), build a first ETL/ELT pipeline, and validate performance and costs.",
    },
    sections: [
      {
        id: "dw-intro",
        h: "What is a Data Warehouse?",
        body: (
          <p className="text-slate-800 leading-relaxed">
            A data warehouse centralizes historical, read-optimized data across
            sources for reporting and analytics. Key traits: schema-on-write,
            dimensional models, and separation of compute &amp; storage.
          </p>
        ),
      },
      {
        id: "dw-architecture",
        h: "Reference Architecture",
        body: (
          <ul className="mt-3 space-y-2 text-slate-800">
            {[
              "Sources: OLTP DBs, SaaS (Stripe, Salesforce), files, events.",
              "Staging/Landing: raw immutable copies (often partitioned by ingestion date).",
              "Transform: ELT in-warehouse with SQL (dbt) or ETL before load.",
              "Warehouse: curated dimensional models (Star/Snowflake schema).",
              "Data Marts: domain-oriented subsets for BI teams.",
              "BI/Serving: dashboards (Looker, Power BI), APIs, ML features.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <FiCheckCircle className="mt-1 text-blue-700" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        ),
      },
      {
        id: "dw-setup",
        h: "Spin Up the Warehouse",
        body: (
          <>
            <p className="text-slate-800">
              Choose a platform (Snowflake, BigQuery, Redshift). Create a
              database + schema, a compute (warehouse/slot/cluster), and a
              service user.
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`CREATE SCHEMA analytics.staging;
CREATE SCHEMA analytics.marts;

CREATE TABLE analytics.marts.dim_customer (
  customer_id STRING PRIMARY KEY,
  name STRING, email STRING, created_at TIMESTAMP
);

CREATE TABLE analytics.marts.fact_orders (
  order_id STRING PRIMARY KEY,
  customer_id STRING REFERENCES analytics.marts.dim_customer(customer_id),
  order_ts TIMESTAMP, amount NUMERIC(12,2), status STRING
);`}</pre>
          </>
        ),
      },
      {
        id: "dw-pipeline",
        h: "First ELT Pipeline",
        body: (
          <>
            <p className="text-slate-800">
              Land raw data daily, transform with SQL models, then publish
              marts. Tools: Airbyte/Fivetran (ingest), dbt (transform),
              Airflow/Cloud Composer (orchestration).
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`-- dbt-style model (orders_clean.sql)
SELECT
  id          AS order_id,
  customer_id,
  CAST(created_at AS TIMESTAMP) AS order_ts,
  CAST(amount AS NUMERIC)       AS amount,
  COALESCE(status, 'unknown')   AS status
FROM analytics.staging.orders_raw;`}</pre>
          </>
        ),
      },
      {
        id: "dw-validation",
        h: "Validation, Performance & Cost",
        body: (
          <ul className="mt-3 space-y-2 text-slate-800">
            {[
              "Validation: row counts, known null checks, business rule tests (dbt tests).",
              "Performance: partition by date, cluster by high-cardinality columns.",
              "Cost: schedule off-hours downscaling, cache results, materialize incremental models.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <FiCheckCircle className="mt-1 text-blue-700" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },

  "git-beginners": {
    meta: {
      title: "Git Tutorial for Beginners — From Zero to PR",
      author: "Team",
      date: "2024-10-08",
      categories: ["Blog", "DevTools", "Tutorials"],
      image: "/images/tutorials.webp",
      excerpt:
        "Install Git, make your first repo, understand commits and branching, work with remotes, and open a clean pull request.",
    },
    sections: [
      {
        id: "git-setup",
        h: "Install & Configure",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`# install (macOS)
brew install git

# identity
git config --global user.name "Your Name"
git config --global user.email you@example.com`}</pre>
        ),
      },
      {
        id: "git-first-repo",
        h: "First Repo & Commits",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`mkdir hello-git && cd hello-git
git init
echo "hello" > README.md
git add README.md
git commit -m "feat: initial commit"`}</pre>
        ),
      },
      {
        id: "git-branching",
        h: "Branching & Merging",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`git checkout -b feature/login
# ...edit files...
git add .
git commit -m "feat(login): ui"
git switch main
git merge feature/login`}</pre>
        ),
      },
      {
        id: "git-remote-pr",
        h: "Remote & Pull Request Flow",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`git remote add origin https://github.com/<you>/hello-git.git
git push -u origin main
# Open GitHub and create a Pull Request from your branch to main`}</pre>
        ),
      },
      {
        id: "git-rebase-merge",
        h: "Rebase vs Merge",
        body: (
          <ul className="mt-3 space-y-2 text-slate-800">
            <li>
              <strong>Merge:</strong> preserves history; adds a merge commit.
            </li>
            <li>
              <strong>Rebase:</strong> linear history; rewrites commits (avoid
              rebasing shared branches).
            </li>
          </ul>
        ),
      },
    ],
  },

  "spring-boot-rest": {
    meta: {
      title: "Spring Boot REST API — Clean Controllers & Validation",
      author: "Team",
      date: "2024-10-05",
      categories: ["Blog", "Backend", "Tutorials"],
      image: "/images/tutorials.webp",
      excerpt:
        "Create a production-ready REST API with layered architecture, DTOs, Bean Validation, exception handling, and OpenAPI.",
    },
    sections: [
      {
        id: "sb-setup",
        h: "Project Setup",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`# start.spring.io  → dependencies:
# Spring Web, Validation, Spring Data JPA, H2 or Postgres, Lombok, Springdoc OpenAPI`}</pre>
        ),
      },
      {
        id: "sb-controller",
        h: "Controller + Service + Repository",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
class CustomerController {
  private final CustomerService service;

  @PostMapping
  public CustomerDto create(@Valid @RequestBody CustomerCreateDto in) {
    return service.create(in);
  }
}`}</pre>
        ),
      },
      {
        id: "sb-validation",
        h: "DTOs & Bean Validation",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`class CustomerCreateDto {
  @NotBlank String name;
  @Email String email;
}`}</pre>
        ),
      },
      {
        id: "sb-exceptions",
        h: "Global Exception Handling",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`@RestControllerAdvice
class GlobalErrors {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<?> invalid(MethodArgumentNotValidException ex) { /* map errors */ }
}`}</pre>
        ),
      },
      {
        id: "sb-openapi",
        h: "OpenAPI Docs",
        body: (
          <p className="text-slate-800">
            Add <code>springdoc-openapi-starter-webmvc-ui</code>, then visit{" "}
            <code>/swagger-ui.html</code> to interact with endpoints.
          </p>
        ),
      },
    ],
  },

  "react-hooks-deep-dive": {
    meta: {
      title: "React Hooks Deep Dive — useState, useEffect, and Beyond",
      author: "Team",
      date: "2024-10-02",
      categories: ["Blog", "Frontend", "Tutorials"],
      image: "/images/tutorials.webp",
      excerpt:
        "Understand how hooks compose logic, avoid infinite renders, and structure effects and custom hooks for maintainable React apps.",
    },
    sections: [
      {
        id: "hooks-state",
        h: "useState Basics",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`const [count, setCount] = useState(0);
const inc = () => setCount(c => c + 1);`}</pre>
        ),
      },
      {
        id: "hooks-effect",
        h: "useEffect Patterns",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);   // cleanup
}, []);                              // run once`}</pre>
        ),
      },
      {
        id: "hooks-custom",
        h: "Custom Hooks",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}`}</pre>
        ),
      },
      {
        id: "hooks-pitfalls",
        h: "Common Pitfalls",
        body: (
          <ul className="mt-3 space-y-2 text-slate-800">
            {[
              "Always list hook dependencies; prefer functions in setState.",
              "Do not call hooks inside conditions or loops.",
              "Split effects by concern (subscription vs data fetch).",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <FiCheckCircle className="mt-1 text-blue-700" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },

  "sql-joins-explained": {
    meta: {
      title: "SQL Joins Explained with Visuals",
      author: "Team",
      date: "2024-09-24",
      categories: ["Blog", "Databases", "Tutorials"],
      image: "/images/tutorials.webp",
      excerpt:
        "INNER, LEFT, RIGHT, FULL, and CROSS joins — where each is useful, example queries, and performance notes with indexes.",
    },
    sections: [
      {
        id: "sql-setup",
        h: "Sample Tables",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`customers(id, name)
orders(id, customer_id, amount)`}</pre>
        ),
      },
      {
        id: "sql-inner",
        h: "INNER JOIN",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`SELECT c.name, o.amount
FROM customers c
INNER JOIN orders o ON o.customer_id = c.id;`}</pre>
        ),
      },
      {
        id: "sql-left",
        h: "LEFT JOIN",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;`}</pre>
        ),
      },
      {
        id: "sql-right-full",
        h: "RIGHT / FULL JOIN",
        body: (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">{`-- RIGHT shows all rows from RIGHT table
SELECT c.name, o.amount
FROM customers c
RIGHT JOIN orders o ON o.customer_id = c.id;

-- FULL OUTER JOIN shows unmatched from both
SELECT c.name, o.amount
FROM customers c
FULL OUTER JOIN orders o ON o.customer_id = c.id;`}</pre>
        ),
      },
      {
        id: "sql-performance",
        h: "Performance Notes",
        body: (
          <ul className="mt-3 space-y-2 text-slate-800">
            {[
              "Index the join keys (e.g., orders.customer_id).",
              "Filter early with WHERE to reduce rows before joining.",
              "Prefer INNER join when appropriate for better optimizer plans.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <FiCheckCircle className="mt-1 text-blue-700" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },
};

function fallbackFor(slug) {
  return {
    meta: {
      title: slug
        .split("-")
        .map((s) => s[0]?.toUpperCase() + s.slice(1))
        .join(" "),
      author: "Team",
      date: new Date().toISOString().slice(0, 10),
      categories: ["Tutorials"],
      image: "/images/tutorials.webp",
      excerpt: "Full content coming soon…",
    },
    sections: [
      {
        id: "coming-soon",
        h: "Coming soon",
        body: <p className="text-slate-700">We are preparing this tutorial.</p>,
      },
    ],
  };
}

export default function TutorialDetailClient({ slug }) {
  const page = CONTENT[slug] || fallbackFor(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { meta, sections } = page;

  return (
    <article className="bg-slate-50 pb-20 pt-16 md:pt-[134px] lg:pt-[145px] xl:pt-[145px]">
      {/* Hero / banner */}
      <div className="relative">
        <img
          src={meta.image}
          alt={meta.title}
          className="w-full h-44 sm:h-56 md:h-[300px] lg:h-[340px] xl:h-[380px] 2xl:h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-6 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
            {meta.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/90">
            <span className="inline-flex items-center gap-1">
              <FiUser /> {meta.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <FiCalendar />
              {new Date(meta.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <FiFolder /> {meta.categories.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Body + Sidebar */}
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-8 xl:gap-10">
        <div>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            {meta.excerpt}
          </p>

          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mt-10 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold mt-6 text-[#0B3D6E] border-l-4 border-[#005BAC] pl-3">
                {s.h}
              </h2>
              <div className="mt-3">{s.body}</div>
            </section>
          ))}

          <div className="mt-12">
            <Link
              href="/tutorials"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#005BAC] text-[#005BAC] hover:bg-[#005BAC] hover:text-white transition-colors font-medium text-sm"
            >
              <FiChevronLeft /> Back to Tutorials
            </Link>
          </div>
        </div>

        <aside className="hidden lg:block lg:sticky lg:top-[160px] self-start">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-base font-semibold">On this page</h3>
            <ul className="mt-3 space-y-2 text-[#005BAC] text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:underline">
                    {s.h}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
