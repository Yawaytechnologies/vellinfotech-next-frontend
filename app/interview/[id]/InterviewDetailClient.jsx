'use client';

import React, { useState } from "react";

const data = {
  aws: {
    title: "AWS Interview Questions and Answers",
    fresher: [
      { question: "What is AWS?", answer: "AWS stands for Amazon Web Services. It is a cloud computing platform offered by Amazon." },
      { question: "What are EC2 instances?", answer: "EC2 (Elastic Compute Cloud) provides resizable compute capacity in the cloud." },
      { question: "What is S3?", answer: "S3 (Simple Storage Service) is used to store and retrieve data in the cloud." },
      { question: "What is IAM?", answer: "IAM (Identity and Access Management) is used to manage access to AWS services securely." },
      { question: "What is a VPC?", answer: "A Virtual Private Cloud (VPC) allows you to launch AWS resources into a virtual network." },
      { question: "What is an AMI?", answer: "AMI (Amazon Machine Image) is a template for creating virtual machines." },
      { question: "What is Route 53?", answer: "Route 53 is a scalable DNS and domain name registration service." },
      { question: "What is CloudFront?", answer: "CloudFront is a content delivery network (CDN) for faster content delivery." },
      { question: "What is AWS Lambda?", answer: "Lambda is a serverless compute service to run code in response to events." },
      { question: "What is CloudWatch?", answer: "CloudWatch is a monitoring service for AWS resources and applications." },
      { question: "What is Auto Scaling?", answer: "Auto Scaling helps you automatically adjust your EC2 instances based on demand." },
      { question: "What is AWS CLI?", answer: "AWS Command Line Interface lets you interact with AWS services using commands." },
      { question: "What are availability zones?", answer: "Availability zones are isolated locations within a region for better redundancy." },
      { question: "What is AWS Elastic Beanstalk?", answer: "Elastic Beanstalk is used to deploy and manage applications quickly." },
      { question: "What is an AWS Region?", answer: "A region is a geographical area where AWS data centers are clustered." },
    ],
    experience: [
      { question: "How do you manage auto-scaling in AWS?", answer: "Using launch templates or configurations with scaling policies and CloudWatch alarms." },
      { question: "How do you secure EC2 instances?", answer: "Using security groups, key pairs, IAM roles, and patching regularly." },
      { question: "How does load balancing work in AWS?", answer: "AWS ELB distributes traffic across multiple targets in one or more availability zones." },
      { question: "How do you monitor services in AWS?", answer: "Using CloudWatch metrics, logs, and custom dashboards." },
      { question: "What's the difference between ELB and ALB?", answer: "ALB is used for HTTP/HTTPS traffic with routing, ELB is classic load balancing." },
      { question: "Explain S3 bucket policies.", answer: "Bucket policies are used to define access permissions to S3 buckets and objects." },
      { question: "How do you implement disaster recovery in AWS?", answer: "Using backup, multi-region replication, and failover mechanisms." },
      { question: "What is CloudFormation?", answer: "CloudFormation helps define infrastructure as code using YAML or JSON templates." },
      { question: "How do you manage user permissions?", answer: "By defining IAM policies with least privilege principles." },
      { question: "How do you secure data in S3?", answer: "Using encryption (SSE, KMS), versioning, and access policies." },
      { question: "How do you use AWS Secrets Manager?", answer: "To store, manage, and rotate credentials and sensitive data securely." },
      { question: "What is a NAT Gateway?", answer: "A NAT Gateway allows private instances to access the internet securely." },
      { question: "How do you handle cost optimization in AWS?", answer: "By rightsizing instances, using spot instances, and monitoring billing alerts." },
      { question: "What is the purpose of lifecycle rules in S3?", answer: "To manage object transitions between storage classes and deletion." },
      { question: "Explain how to use AWS Config.", answer: "AWS Config tracks resource configurations and evaluates compliance." },
    ],
  },
  selenium: {
    title: "Selenium Interview Questions and Answers",
    fresher: [
      { question: "What is Selenium?", answer: "Selenium is a framework for testing web applications automatically." },
      { question: "What are the components of Selenium?", answer: "Selenium IDE, WebDriver, RC (deprecated), and Grid." },
      { question: "What is Selenium WebDriver?", answer: "It is a tool for automating web application testing across browsers." },
      { question: "What is locators in Selenium?", answer: "Locators are used to find elements like id, name, xpath, cssSelector, etc." },
      { question: "How do you launch a browser?", answer: "By creating a WebDriver instance like new ChromeDriver()." },
      { question: "What is an XPath?", answer: "XPath is a language used to locate elements using XML path." },
      { question: "What is the difference between assert and verify?", answer: "Assert stops test on failure; verify continues even if test fails." },
      { question: "What is implicit wait?", answer: "Implicit wait sets a default wait time for element search globally." },
      { question: "What is explicit wait?", answer: "Explicit wait waits for a certain condition before proceeding." },
      { question: "What are TestNG annotations?", answer: "They define execution sequence like @Test, @BeforeMethod, etc." },
      { question: "What is Page Object Model (POM)?", answer: "A design pattern for creating object repositories for web UI elements." },
      { question: "What is a headless browser?", answer: "A browser without GUI, used for faster testing like HtmlUnitDriver." },
      { question: "How do you handle alerts?", answer: "Using Alert interface with switchTo().alert()." },
      { question: "How to handle dropdowns?", answer: "Using Select class and its methods like selectByVisibleText()." },
      { question: "What is the use of driver.quit()?", answer: "Closes all browser windows and ends WebDriver session." },
    ],
    experience: [
      { question: "How do you manage dynamic elements?", answer: "Using dynamic XPath or waiting strategies for element stability." },
      { question: "Explain Selenium Grid.", answer: "Selenium Grid is used to run tests on different machines/browsers in parallel." },
      { question: "What are fluent waits?", answer: "FluentWait checks conditions repeatedly at intervals until timeout." },
      { question: "How do you capture screenshots?", answer: "Using TakesScreenshot interface and getScreenshotAs() method." },
      { question: "How do you handle frames in Selenium?", answer: "Using driver.switchTo().frame() and switching back using defaultContent()." },
      { question: "What is the role of listeners in TestNG?", answer: "Listeners track events and can customize test reporting and logs." },
      { question: "How do you run tests in parallel?", answer: "Using TestNG parallel attribute or Selenium Grid." },
      { question: "What are challenges in Selenium automation?", answer: "Dynamic elements, browser compatibility, synchronization, and CAPTCHA handling." },
      { question: "How to handle file uploads?", answer: "By sending the file path to the input tag using sendKeys()." },
      { question: "How to maintain test scripts?", answer: "Using frameworks like POM, modular scripts, reusable components." },
      { question: "Explain data-driven testing.", answer: "It runs test cases with multiple sets of data from external sources." },
      { question: "What is CI/CD in Selenium context?", answer: "Integrating Selenium scripts with tools like Jenkins for automated pipelines." },
      { question: "What's the role of Maven in Selenium?", answer: "Maven manages Selenium dependencies and project builds." },
      { question: "What are Selenium limitations?", answer: "No desktop/mobile app testing, can't handle captchas, dependent on browser." },
      { question: "What is Hybrid Framework?", answer: "A combination of keyword, data-driven, and modular frameworks." },
    ],
  },
  python: {
    title: "Python Interview Questions and Answers",
    fresher: [
      { question: "What is Python?", answer: "Python is a high-level, interpreted programming language known for readability." },
      { question: "What are Python's key features?", answer: "Simple syntax, dynamic typing, interpreted, object-oriented, and vast libraries." },
      { question: "What is a list in Python?", answer: "A list is an ordered, mutable collection of items." },
      { question: "What is a tuple?", answer: "A tuple is an ordered, immutable collection of items." },
      { question: "What is a dictionary?", answer: "A dictionary is a key-value pair collection used for fast lookups." },
      { question: "How do you write a function in Python?", answer: "Using the def keyword followed by function name and parameters." },
      { question: "What is indentation in Python?", answer: "Indentation indicates a block of code and is mandatory." },
      { question: "What is PEP8?", answer: "PEP8 is a style guide for writing readable Python code." },
      { question: "What are Python data types?", answer: "Common types include int, float, str, list, tuple, dict, and bool." },
      { question: "What is a loop in Python?", answer: "A loop allows executing a block of code multiple times (for/while)." },
      { question: "What is a module?", answer: "A module is a file containing Python definitions and functions." },
      { question: "What is a package in Python?", answer: "A package is a directory containing multiple modules with __init__.py file." },
      { question: "What is typecasting?", answer: "Typecasting is converting one data type into another, e.g., int to float." },
      { question: "What are Python libraries?", answer: "Pre-written code modules like NumPy, Pandas, Matplotlib, etc." },
      { question: "What is the use of comments?", answer: "Comments are used to describe code logic, ignored during execution." },
    ],
    experience: [
      { question: "What is list comprehension?", answer: "A concise way to create lists using a single line for expression." },
      { question: "How does garbage collection work in Python?", answer: "Using reference counting and a cyclic garbage collector." },
      { question: "Explain decorators in Python.", answer: "Decorators allow modifying functions using @ syntax before defining them." },
      { question: "What is the difference between deep and shallow copy?", answer: "Shallow copy copies references; deep copy copies everything recursively." },
      { question: "How do you handle exceptions in Python?", answer: "Using try-except-else-finally blocks to catch and manage errors." },
      { question: "What is multithreading?", answer: "Multithreading allows running multiple threads (not true parallelism in CPython)." },
      { question: "What is the GIL?", answer: "Global Interpreter Lock prevents multiple threads from executing simultaneously in CPython." },
      { question: "Explain generators and yield.", answer: "Generators produce items on the fly using yield, saving memory." },
      { question: "What is a lambda function?", answer: "An anonymous function defined using lambda keyword." },
      { question: "How do you test Python code?", answer: "Using unittest, pytest, or doctest frameworks." },
      { question: "How do you connect Python with databases?", answer: "Using libraries like sqlite3, psycopg2, or SQLAlchemy." },
      { question: "What are Python's scopes?", answer: "Local, Enclosing, Global, Built-in (LEGB rule)." },
      { question: "How is memory managed in Python?", answer: "Memory is managed via private heap space and garbage collector." },
      { question: "What is a context manager?", answer: "Manages resources using 'with' block, like file handling." },
      { question: "How do you handle large datasets?", answer: "Using generators, pandas chunks, or Dask for scalable data handling." },
    ],
  },
  java: {
    title: "Java Interview Questions and Answers",
    fresher: [
      { question: "What is Java?", answer: "Java is a high-level, object-oriented programming language developed by Sun Microsystems." },
      { question: "What are features of Java?", answer: "Platform independent, secure, robust, object-oriented, and multithreaded." },
      { question: "What is the JVM?", answer: "Java Virtual Machine executes Java bytecode and enables platform independence." },
      { question: "What is the JDK?", answer: "Java Development Kit includes tools to develop and run Java programs." },
      { question: "What is a class?", answer: "A class is a blueprint for creating objects." },
      { question: "What is an object?", answer: "An object is an instance of a class containing states and behaviors." },
      { question: "What is inheritance?", answer: "Inheritance allows one class to acquire properties of another class." },
      { question: "What is polymorphism?", answer: "Polymorphism allows methods to behave differently based on object context." },
      { question: "What is encapsulation?", answer: "Encapsulation binds data and methods, hiding implementation details." },
      { question: "What is abstraction?", answer: "Abstraction hides complex implementation and shows only essential details." },
      { question: "What is a constructor?", answer: "A special method to initialize objects, called during object creation." },
      { question: "What is method overloading?", answer: "Same method name with different parameters within the same class." },
      { question: "What is method overriding?", answer: "Same method redefined in subclass with same signature." },
      { question: "What are access modifiers?", answer: "Keywords like public, private, protected to set access levels." },
      { question: "What is static keyword?", answer: "Static members belong to the class rather than instances." },
    ],
    experience: [
      { question: "How do you handle exceptions in Java?", answer: "Using try-catch-finally blocks or throws declarations." },
      { question: "What is the difference between ArrayList and LinkedList?", answer: "ArrayList is faster for random access; LinkedList is better for inserts/deletes." },
      { question: "What is a HashMap?", answer: "A collection that stores key-value pairs with unique keys." },
      { question: "What is the difference between abstract class and interface?", answer: "Abstract class can have implementation; interface is pure contract (Java 8+ allows defaults)." },
      { question: "What is multithreading?", answer: "Multithreading is concurrent execution of two or more threads." },
      { question: "How is memory managed in Java?", answer: "Through heap, stack, and automatic garbage collection." },
      { question: "What is the difference between equals() and ==?", answer: "equals() checks value equality; == checks reference equality." },
      { question: "What are design patterns?", answer: "Reusable solutions to common problems (e.g., Singleton, Factory)." },
      { question: "How do you synchronize threads?", answer: "Using synchronized blocks, methods, or locks." },
      { question: "What is the Java Stream API?", answer: "Stream API processes collections using functional-style operations." },
      { question: "What are lambda expressions?", answer: "Short form of anonymous functions introduced in Java 8." },
      { question: "What is the purpose of final keyword?", answer: "Final prevents variable/method/class from being modified." },
      { question: "Explain serialization in Java.", answer: "Serialization converts object state into a byte stream for storage or transfer." },
      { question: "What is Spring Framework?", answer: "An enterprise framework for Java for dependency injection and web development." },
      { question: "What are generics in Java?", answer: "Generics enable classes/methods to operate on typed parameters." },
    ],
  },
};

export default function InterviewDetailClient({ id }) {
  const [level, setLevel] = useState("fresher");
  const selected = data[id];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f4ff] to-white pt-20 md:pt-28 px-4 pb-12 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 underline decoration-blue-700 underline-offset-4">
          {selected?.title || "Not Found"}
        </h1>

        {selected?.fresher && selected?.experience && (
          <div className="flex justify-center gap-4 mb-10">
            {["fresher", "experience"].map((type) => (
              <button
                key={type}
                onClick={() => setLevel(type)}
                className={`px-6 py-2 rounded-full text-sm sm:text-md font-semibold border transition-all duration-300
                  ${
                    level === type
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md scale-105"
                      : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
                  }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {selected?.[level] && (
          <div className="bg-white border border-gray-300 rounded-2xl shadow-xl p-6 md:p-10 text-left space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 capitalize border-b pb-4">
              {level} Interview Questions &amp; Answers
            </h2>

            {selected[level].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white via-[#f1f6ff] to-white border-l-4 border-blue-700 p-4 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <p className="font-semibold text-lg text-blue-900 mb-1">
                  Q{index + 1}. {item.question}
                </p>
                <p className="text-gray-800 text-base">Ans: {item.answer}</p>
              </div>
            ))}
          </div>
        )}

        {!selected && (
          <div className="bg-white border border-gray-300 rounded-2xl shadow-xl p-10 text-center">
            <p className="text-gray-600 text-lg">Interview guide not found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
