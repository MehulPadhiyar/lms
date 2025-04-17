-- Feed categories

INSERT INTO Category (category_id, name)
VALUES 
  (1, 'Computer Science'),
  (2, 'Music'),
  (3, 'Cooking'),
  (4, 'Maths'),
  (5, 'Management'),
  (6, 'Business');


-- Feed courses and chapters

-- Web Development

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
VALUES 
  (UUID(), 'Web Development', 
  '🌐 Web development is the backbone of the internet, allowing developers to create dynamic and interactive websites. In this course, you''ll learn how to build modern web applications using HTML, CSS, JavaScript, and frameworks like React and Node.js. From front-end design to back-end logic, we cover it all!  
  \n🚀 By the end of this course, you''ll have a solid understanding of how to develop and deploy full-stack applications, ensuring a seamless experience for users. Whether you''re looking to become a professional web developer or just want to build your own projects, this course has everything you need!', 
  'sample_web.jpg', 499, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 1, NOW(), NOW());

INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
  (UUID(), 'Introduction to Web Development', 
  '<h1>🌍 Welcome to the World of Web Development!</h1>  
  <p>Websites are everywhere, from social media to online stores, and they all rely on fundamental technologies. In this chapter, we will explore how the web works, the role of <strong>browsers, servers, and databases</strong>, and how different technologies like <strong>HTML, CSS, and JavaScript</strong> come together to create an interactive experience.</p>  
  <br>  
  <p>📌 By the end of this chapter, you’ll have a <strong>strong foundation</strong> in how websites function and be ready to dive into the technical aspects of building them yourself!</p>', 
  'coding1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Web Development'), NOW(), NOW()),

  (UUID(), 'HTML & Semantic Markup', 
  '<h1>📄 HTML: The Backbone of the Web</h1>  
  <p>Every webpage you visit is built using <strong>HyperText Markup Language (HTML)</strong>, which structures content for browsers.</p>  
  <br>  
  <p>💡 In this chapter, you will learn about <strong>HTML elements, tags, and attributes</strong>. We’ll also dive into <strong>semantic HTML</strong>, which improves accessibility and SEO by giving meaning to content.</p>  
  <br>  
  <p>🛠️ By the end of this chapter, you’ll be able to <strong>create well-structured webpages</strong> with headings, paragraphs, images, links, and forms.</p>', 
  'coding2.mp4', 2, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Web Development'), NOW(), NOW()),

  (UUID(), 'CSS & Responsive Design', 
  '<h1>🎨 Make Your Website Look Amazing!</h1>  
  <p>Design is what makes a website beautiful and user-friendly! CSS (<strong>Cascading Style Sheets</strong>) allows you to style elements, control layouts, and create engaging visuals.</p>  
  <br>  
  <p>📌 In this chapter, we’ll explore the <strong>box model, colors, fonts, flexbox, and grid layouts</strong>. You’ll also learn how to create <strong>responsive designs</strong> using <strong>media queries</strong>, ensuring that your website looks great on <strong>mobile, tablet, and desktop screens</strong>.</p>  
  <br>  
  <p>🔹 By the end of this chapter, you’ll be able to craft <strong>visually appealing, mobile-friendly webpages</strong> that adapt to any screen size!</p>', 
  'coding3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Web Development'), NOW(), NOW()),

  (UUID(), 'JavaScript & Interactivity', 
  '<h1>⚡ JavaScript: Making Websites Interactive!</h1>  
  <p>JavaScript (<strong>JS</strong>) is what brings websites to life! Without JavaScript, websites would be <strong>static and non-interactive</strong>.</p>  
  <br>  
  <p>💡 In this chapter, we will explore <strong>JavaScript fundamentals</strong>, including <strong>variables, data types, functions, loops, and DOM manipulation</strong>. You’ll learn how to make your site interactive by handling <strong>events, animations, and dynamic content updates</strong>.</p>  
  <br>  
  <p>🚀 By the end of this chapter, you’ll be able to <strong>add interactivity to your webpages</strong>, making them more engaging and functional!</p>', 
  'coding1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Web Development'), NOW(), NOW()),

  (UUID(), 'Frontend Frameworks & Modern Tools', 
  '<h1>🚀 Take Your Skills to the Next Level!</h1>  
  <p>The world of web development is constantly evolving, and modern frameworks make building websites <strong>faster and more efficient</strong>.</p>  
  <br>  
  <p>🔹 In this chapter, we’ll explore <strong>popular frontend frameworks</strong> like <strong>React, Vue, and Angular</strong>. You’ll learn about their <strong>component-based architecture</strong>, which allows developers to build reusable UI elements.</p>  
  <br>  
  <p>🛠️ We’ll also cover <strong>modern development tools</strong> like <strong>Webpack, Babel, and version control (Git & GitHub)</strong>, helping you write <strong>cleaner, optimized, and maintainable</strong> code.</p>  
  <br>  
  <p>📌 By the end of this chapter, you’ll be ready to <strong>build professional-grade web applications</strong> using modern technologies!</p>', 
  'coding2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Web Development'), NOW(), NOW()),

  (UUID(), 'Outro & Next Steps', 
  '<h1>✅ Congratulations! You’re Now a Web Developer! 🎉</h1>  
  <p>You now have a <strong>strong foundation</strong> in HTML, CSS, JavaScript, and modern tools used by developers worldwide.</p>  
  <br>  
  <h2>🚀 What’s Next?</h2>  
  <ul>  
    <li>Building your <strong>first real-world project</strong> 🌍</li>  
    <li>Learning about <strong>backend technologies</strong> like Node.js and databases 🛠️</li>  
    <li>Creating an online <strong>portfolio</strong> to showcase your skills 📂</li>  
    <li>Applying for jobs or freelancing opportunities 💼</li>  
  </ul>  
  <br>  
  <p>📌 Keep practicing, keep learning, and you’ll soon be a <strong>pro web developer</strong>! The journey is just beginning! 🚀</p>', 
  'coding3.mp4', 6, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Web Development'), NOW(), NOW());

-- React Course

  INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'React Course', 
  "The React Course is designed to help developers master React.js, one of the most powerful and widely used JavaScript libraries for building modern, fast, and scalable web applications. This course covers fundamental concepts, including components, JSX, state management, and props, as well as advanced topics like React Hooks, Context API, React Router, and performance optimization. Whether you're a beginner or an experienced developer looking to enhance your React skills, this course provides a structured, hands-on learning experience.
    
  Throughout the course, you’ll work on real-world projects, building interactive user interfaces and dynamic single-page applications (SPAs). You'll learn how to manage application state efficiently using useState, useEffect, and useReducer, and explore advanced state management solutions like Redux and Zustand. Additionally, the course covers best practices for component reusability, code organization, and debugging techniques to help you write clean, maintainable code.", 
  'sample_react.jpg', 299, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 1, NOW(), NOW());

INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
  (UUID(), 'Introduction to React', 
  '<h1>⚛️ Welcome to React: The Future of Web Development!</h1>  
  <p>React is one of the most powerful and widely used JavaScript libraries for building <strong>fast, scalable, and dynamic</strong> web applications. Created by Facebook, it allows developers to create reusable UI components and manage application state efficiently.</p>  
  <br>  
  <p>🔹 In this chapter, we will explore:</p>  
  <ul>  
    <li>What React is and why it is so popular 🚀</li>  
    <li>The difference between React and traditional JavaScript frameworks 🧐</li>  
    <li>How React simplifies front-end development with component-based architecture 🏗️</li>  
  </ul>  
  <br>  
  <p>📌 By the end of this chapter, you’ll have a solid understanding of how React works and why it’s used by companies like Facebook, Instagram, Netflix, and Airbnb!</p>', 
  'coding1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='React Course'), NOW(), NOW()),

  (UUID(), 'Understanding JSX & Components', 
  '<h1>🖥️ JSX: Writing HTML in JavaScript!</h1>  
  <p>JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code directly within JavaScript. React uses JSX to define UI structures, making your code more readable and maintainable.</p>  
  <br>  
  <p>🎯 In this chapter, we will learn:</p>  
  <ul>  
    <li>How JSX simplifies UI creation and improves developer experience 💡</li>  
    <li>The rules of JSX (e.g., wrapping elements, using expressions) 📜</li>  
    <li>How to create reusable, independent components 🔄</li>  
  </ul>  
  <br>  
  <p>🚀 By the end of this chapter, you’ll be able to build React components using JSX and understand how React renders elements efficiently!</p>', 
  'coding2.mp4', 2, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='React Course'), NOW(), NOW()),

  (UUID(), 'State & Props: Managing Data in React', 
  '<h1>🎛️ State & Props: Making React Interactive</h1>  
  <p>React is all about building dynamic UIs, and to do that, we need a way to handle data inside components. This is where <strong>state and props</strong> come into play!</p>  
  <br>  
  <p>🔹 In this chapter, we’ll cover:</p>  
  <ul>  
    <li>The difference between <strong>props</strong> (parent-to-child data flow) and <strong>state</strong> (internal component data) 🔄</li>  
    <li>How to update and manage state using <code>useState</code> 🎛️</li>  
    <li>Best practices for structuring data in React applications 📊</li>  
  </ul>  
  <br>  
  <p>⚡ By the end of this chapter, you’ll have hands-on experience working with dynamic data and making React applications truly interactive!</p>', 
  'coding3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='React Course'), NOW(), NOW()),

  (UUID(), 'React Hooks: The Modern Way to Manage State', 
  '<h1>⚡ React Hooks: Writing Cleaner and Smarter Code</h1>  
  <p>React Hooks revolutionized state and lifecycle management in React. They allow developers to use state and other React features without writing class components!</p>  
  <br>  
  <p>📌 In this chapter, we’ll cover:</p>  
  <ul>  
    <li>Understanding the need for hooks and why they replaced class components 🔥</li>  
    <li>Using <code>useState</code> for managing component state 🎛️</li>  
    <li>Using <code>useEffect</code> for handling side effects and API calls 🌐</li>  
    <li>Exploring other powerful hooks like <code>useRef</code>, <code>useContext</code>, and <code>useReducer</code> ⚡</li>  
  </ul>  
  <br>  
  <p>🚀 By the end of this chapter, you’ll be able to build React applications with modern and efficient state management techniques!</p>', 
  'coding1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='React Course'), NOW(), NOW()),

  (UUID(), 'React Router & Navigation', 
  '<h1>🌍 React Router: Making Multi-Page Apps</h1>  
  <p>React is often used for building <strong>single-page applications (SPAs)</strong>, but what if you want multiple pages? That’s where <strong>React Router</strong> comes in!</p>  
  <br>  
  <p>🔹 In this chapter, you’ll learn:</p>  
  <ul>  
    <li>How React Router enables navigation between pages 🔗</li>  
    <li>Setting up routes using <code>BrowserRouter</code>, <code>Route</code>, and <code>Link</code> 🏗️</li>  
    <li>Dynamic routing, route parameters, and nested routes 🛤️</li>  
    <li>Protecting routes with authentication guards 🔒</li>  
  </ul>  
  <br>  
  <p>🚀 By the end of this chapter, you’ll be able to build **fully navigable React applications** with multiple pages!</p>', 
  'coding2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='React Course'), NOW(), NOW()),

  (UUID(), 'Outro & Next Steps', 
  '<h1>✅ Congratulations! You’re Now a React Developer! 🎉</h1>  
  <p>React is a powerful tool, and by now, you have mastered its core concepts! But the journey doesn’t stop here.</p>  
  <br>  
  <h2>🚀 What’s Next?</h2>  
  <ul>  
    <li>Building your <strong>first real-world React project</strong> 🏗️</li>  
    <li>Learning about <strong>backend technologies</strong> like Node.js, Express, and databases 📦</li>  
    <li>Exploring <strong>advanced topics</strong> like Redux, Context API, and performance optimization ⚡</li>  
    <li>Creating an online <strong>portfolio</strong> to showcase your skills 💼</li>  
  </ul>  
  <br>  
  <p>📌 Keep practicing, keep learning, and you’ll soon be a <strong>React expert</strong>! The journey has just begun! 🚀</p>', 
  'coding3.mp4', 6, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='React Course'), NOW(), NOW());

-- JavaScript Course
  INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'JavaScript Course', 
  "The JavaScript Course is designed to teach you the fundamentals and advanced concepts of JavaScript, the core language of web development 🌍💻. You'll learn variables, functions, DOM manipulation, asynchronous programming, and modern ES6+ features, enabling you to build interactive and dynamic web applications. Whether you're a beginner or an aspiring developer, this course will provide hands-on experience to master JavaScript for front-end and back-end development! 🎯🔥", 
  'sample_js.jpg', 599, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 1, NOW(), NOW());

INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
  (UUID(), 'Introduction to JavaScript', 
  '<h1>🚀 Welcome to JavaScript: The Language of the Web!</h1>  
  <p>JavaScript is the backbone of modern web development! It powers everything from interactive websites to complex web applications. Whether you are adding simple click events or building powerful frameworks, JavaScript is **the language you need to master**.</p>  
  <br>  
  <p>🔹 In this chapter, we’ll explore:</p>  
  <ul>  
    <li>What JavaScript is and why it is so essential for web development 🌐</li>  
    <li>The difference between client-side and server-side JavaScript 🏗️</li>  
    <li>How JavaScript integrates with HTML and CSS for dynamic web pages 🎨</li>  
  </ul>  
  <br>  
  <p>📌 By the end of this chapter, you’ll understand **why JavaScript is so powerful** and be ready to write your first script!</p>', 
  'coding2.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='JavaScript Course'), NOW(), NOW()),

  (UUID(), 'JavaScript Syntax & Basics', 
  '<h1>📜 JavaScript Fundamentals: Understanding the Basics</h1>  
  <p>Before diving into advanced topics, it’s crucial to master the **fundamentals** of JavaScript. This chapter will cover basic syntax, variables, data types, and operators.</p>  
  <br>  
  <p>🔹 Key topics:</p>  
  <ul>  
    <li>Declaring variables with <code>var</code>, <code>let</code>, and <code>const</code> 📌</li>  
    <li>Understanding JavaScript data types like strings, numbers, and objects 🛠️</li>  
    <li>Working with operators (arithmetic, comparison, logical) ➕➖</li>  
  </ul>  
  <br>  
  <p>🎯 By the end, you’ll be able to write simple JavaScript programs confidently!</p>', 
  'coding3.mp4', 2, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='JavaScript Course'), NOW(), NOW()),

  (UUID(), 'Control Flow & Loops', 
  '<h1>🔄 Controlling the Flow of Your JavaScript Programs</h1>  
  <p>JavaScript is all about decision-making and automation. With conditional statements and loops, you can **control how your code executes** and **repeat actions efficiently**.</p>  
  <br>  
  <p>🔹 In this chapter, you’ll learn:</p>  
  <ul>  
    <li>Using <code>if</code>, <code>else</code>, and <code>switch</code> statements for decision-making 🧐</li>  
    <li>Looping through data with <code>for</code>, <code>while</code>, and <code>do-while</code> loops 🔁</li>  
    <li>Best practices to avoid infinite loops and improve performance ⚡</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to create interactive scripts that **respond to user inputs** dynamically!</p>', 
  'coding1.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='JavaScript Course'), NOW(), NOW()),

  (UUID(), 'Functions & Scope', 
  '<h1>📌 Functions: The Building Blocks of JavaScript</h1>  
  <p>Functions allow you to write **reusable and modular code**. In this chapter, we’ll explore function declaration, parameters, return values, and **scope in JavaScript**.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>How to declare and invoke functions using <code>function</code> and arrow syntax ➡️</li>  
    <li>Understanding function parameters, return values, and default values 🎯</li>  
    <li>Global vs local scope and closures 🔐</li>  
  </ul>  
  <br>  
  <p>🛠️ By the end, you’ll be comfortable creating **efficient, reusable functions** in JavaScript!</p>', 
  'coding2.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='JavaScript Course'), NOW(), NOW()),

  (UUID(), 'JavaScript DOM Manipulation', 
  '<h1>🖥️ Making Webpages Interactive with the DOM</h1>  
  <p>The **Document Object Model (DOM)** allows JavaScript to interact with HTML elements dynamically. Want to make buttons clickable or change text instantly? **The DOM is the key!**</p>  
  <br>  
  <p>🔹 This chapter covers:</p>  
  <ul>  
    <li>Selecting elements using <code>getElementById</code>, <code>querySelector</code>, and more 🎯</li>  
    <li>Modifying styles and content dynamically 🎨</li>  
    <li>Adding event listeners for user interactions (clicks, keypresses) 🖱️</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to create **interactive websites** that respond to user actions!</p>', 
  'coding3.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='JavaScript Course'), NOW(), NOW()),

  (UUID(), 'ES6+ Features & Modern JavaScript', 
  '<h1>🚀 ES6+ Features: Writing Modern JavaScript</h1>  
  <p>JavaScript has evolved over the years, and ES6 (ECMAScript 2015) introduced **powerful new features** that make coding easier and more efficient.</p>  
  <br>  
  <p>🔹 Key updates:</p>  
  <ul>  
    <li>Arrow functions (<code>() => {}</code>) for cleaner syntax 🎯</li>  
    <li>Destructuring objects and arrays for better readability 🧩</li>  
    <li>Template literals, async/await, and promises for better asynchronous programming 🚀</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll be coding in **modern JavaScript like a pro!**</p>', 
  'coding1.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='JavaScript Course'), NOW(), NOW()),

  (UUID(), 'Outro & Next Steps', 
  '<h1>🎉 Congratulations! You’re Now a JavaScript Developer!</h1>  
  <p>JavaScript is a vast language, but you now have a **strong foundation** in its core concepts. The journey doesn’t stop here!</p>  
  <br>  
  <h2>🚀 What’s Next?</h2>  
  <ul>  
    <li>Practice by building **real-world JavaScript projects** 🏗️</li>  
    <li>Learn about **APIs, AJAX, and Fetch for data communication** 🌐</li>  
    <li>Explore **Node.js and backend development** 🛠️</li>  
    <li>Master JavaScript frameworks like React, Vue, or Angular ⚛️</li>  
  </ul>  
  <br>  
  <p>📌 Keep coding, keep learning, and soon you’ll be a **JavaScript expert**! 🚀</p>', 
  'coding2.mp4', 7, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='JavaScript Course'), NOW(), NOW());

-- Maths for DSA

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Maths for DSA', 
  "The Mathematics for DSA (Data Structures & Algorithms) Course provides the essential mathematical concepts needed to design and analyze efficient algorithms 📊. This course covers number theory, combinatorics, probability, logarithms, recurrence relations, and modular arithmetic, which are crucial for solving complex computational problems 🧠. By mastering these concepts, you'll be better prepared for competitive programming, coding interviews, and optimizing algorithm performance! ⚡🎯", 
  'sample_dsmaths.webp', 399, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 4, NOW(), NOW());

  INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Introduction to Maths for DSA', 
  '<h1>🧮 Why is Math Important for DSA?</h1>  
  <p>Mathematics is the backbone of efficient algorithms! Understanding key mathematical concepts helps in **problem-solving, optimizing code, and improving performance** in Data Structures & Algorithms.</p>  
  <br>  
  <p>🔹 In this chapter, you’ll learn:</p>  
  <ul>  
    <li>Why math is essential for algorithms 🏗️</li>  
    <li>The role of discrete mathematics, probability, and number theory 🎯</li>  
    <li>How math enhances problem-solving in coding interviews 🧠</li>  
  </ul>  
  <br>  
  <p>📌 By the end of this chapter, you’ll understand **how mathematical foundations help you become a better programmer!**</p>', 
  'maths1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW()),

  (UUID(), 'Number Theory & Modular Arithmetic', 
  '<h1>🔢 Number Theory: Prime Numbers & Modular Arithmetic</h1>  
  <p>Number theory is widely used in **encryption, hashing, and competitive programming**. Understanding **prime numbers, GCD, LCM, and modular arithmetic** is crucial for solving many algorithmic problems.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Finding prime numbers using **Sieve of Eratosthenes** 🧮</li>  
    <li>Efficient computation of **GCD & LCM** using Euclidean Algorithm 🏗️</li>  
    <li>Understanding **modular arithmetic** for handling large numbers efficiently 🔄</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to **solve number-based problems efficiently** in coding interviews!</p>', 
  'maths2.mp4', 2, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW()),

  (UUID(), 'Bit Manipulation & Binary Numbers', 
  '<h1>💡 Bitwise Operations for Faster Computations</h1>  
  <p>Bit manipulation is a **powerful technique** used in optimizing algorithms, working with low-level data structures, and solving complex mathematical problems efficiently.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Understanding **binary representation** of numbers 🔢</li>  
    <li>Using bitwise operators (**AND, OR, XOR, NOT, Left & Right Shifts**) 🔄</li>  
    <li>Fast calculations using **Bitmasking & Brian Kernighan’s Algorithm** ⚡</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll master **bitwise tricks** that optimize your code for competitive programming!</p>', 
  'maths3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW()),

  (UUID(), 'Recurrence Relations & Mathematical Induction', 
  '<h1>🔄 Understanding Recursive Functions Mathematically</h1>  
  <p>Many problems in DSA are solved using **recursion**, and understanding its mathematical foundation is crucial for **writing optimized recursive solutions**.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Understanding **recurrence relations** and solving them using the **Recursion Tree Method** 🌳</li>  
    <li>Using **Mathematical Induction** to prove recursive formulae 🧐</li>  
    <li>Optimizing recursive algorithms using **Master Theorem** 📊</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to **analyze recursive functions mathematically** for better efficiency!</p>', 
  'maths1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW()),

  (UUID(), 'Graph Theory & Combinatorics', 
  '<h1>🌐 Graphs, Combinations & Permutations</h1>  
  <p>Graphs are an essential data structure used in **networking, AI, and real-world optimization problems**. Understanding **graph theory & combinatorics** helps in mastering competitive programming.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Understanding **graphs, trees, and connectivity** 🌳</li>  
    <li>Combinations & permutations for **counting problems in algorithms** 🔢</li>  
    <li>Graph traversal techniques (**BFS & DFS**) for solving graph-based problems 🔄</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be ready to solve **graph-based problems efficiently**!</p>', 
  'maths2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW()),

  (UUID(), 'Probability & Statistics for DSA', 
  '<h1>📊 Probability & Expected Values in Algorithms</h1>  
  <p>Probability is widely used in **randomized algorithms, hashing, and machine learning**. Understanding key probability concepts helps in designing **efficient and robust** algorithms.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Basic probability concepts **(independent events, conditional probability)** 🎲</li>  
    <li>Expected values and their role in **randomized algorithms** 📊</li>  
    <li>Applications in **data structures like Bloom Filters & Hashing** 🔄</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll know how to apply **probability concepts** in programming!</p>', 
  'maths3.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW()),

  (UUID(), 'Time & Space Complexity Analysis', 
  '<h1>📈 Optimizing Code for Speed & Efficiency</h1>  
  <p>Algorithm efficiency is measured using **Big-O notation**. Knowing how to analyze time and space complexity is crucial for writing **scalable and optimal** code.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Understanding **Big-O, Big-Theta & Big-Omega** notations 🔍</li>  
    <li>Analyzing **best, worst, and average-case complexities** 📊</li>  
    <li>Optimizing space complexity using **Dynamic Programming & Memoization** 🔄</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to **analyze and optimize** your algorithms efficiently!</p>', 
  'maths1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW()),

  (UUID(), 'Outro & Next Steps', 
  '<h1>🎉 Congratulations! You’ve Mastered Maths for DSA!</h1>  
  <p>Understanding mathematics is a **game-changer** in Data Structures & Algorithms. But the learning never stops!</p>  
  <br>  
  <h2>🚀 What’s Next?</h2>  
  <ul>  
    <li>Practice solving **math-intensive coding problems** 🧠</li>  
    <li>Explore **Advanced Algorithms like FFT, RSA, and Game Theory** 🔄</li>  
    <li>Improve problem-solving skills for **coding competitions & interviews** 💼</li>  
  </ul>  
  <br>  
  <p>📌 Keep practicing, and soon you’ll be an **algorithm expert!** 🚀</p>', 
  'maths2.mp4', 8, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Maths for DSA'), NOW(), NOW());

-- DSA Course

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'DSA Course', 
  "The Data Structures & Algorithms (DSA) Course is designed to help you master the core concepts of efficient problem-solving in programming 🧠. You'll learn essential data structures like arrays, linked lists, stacks, queues, trees, and graphs, along with powerful algorithms for sorting, searching, recursion, dynamic programming, and graph traversal 📊. This course will enhance your coding skills, logical thinking, and algorithmic efficiency, making it essential for competitive programming, technical interviews, and real-world software development! ⚡🎯", 
  'sample_dsa.jpg', 799, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 1, NOW(), NOW());

  INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
  (UUID(), 'Introduction to Data Structures & Algorithms', 
  '<h1>🚀 Welcome to DSA: The Foundation of Problem-Solving</h1>  
  <p>Data Structures and Algorithms (DSA) are the **building blocks** of software development. Mastering DSA improves problem-solving skills and helps in **optimizing applications for efficiency**.</p>  
  <br>  
  <p>🔹 In this chapter, you’ll explore:</p>  
  <ul>  
    <li>What DSA is and why it is crucial for software engineering 💡</li>  
    <li>How companies like Google, Amazon, and Microsoft use DSA for **efficient algorithms** 🏗️</li>  
    <li>The difference between **time complexity, space complexity, and algorithm efficiency** 📊</li>  
  </ul>  
  <br>  
  <p>📌 By the end of this chapter, you’ll have a **clear understanding of how DSA plays a vital role in coding and interviews**!</p>', 
  'coding1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW()),

  (UUID(), 'Arrays & Strings', 
  '<h1>📊 Arrays & Strings: The Most Used Data Structures</h1>  
  <p>Arrays and Strings are **fundamental** data structures in programming. They are used everywhere, from storing data to solving complex problems efficiently.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Understanding **arrays, types of arrays, and memory allocation** 🛠️</li>  
    <li>Common array operations: **insertion, deletion, searching, sorting** 🔄</li>  
    <li>Working with **strings, character manipulation, and pattern matching** 📖</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to **solve array and string problems efficiently!**</p>', 
  'coding2.mp4', 2, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW()),

  (UUID(), 'Recursion & Backtracking', 
  '<h1>🔄 Recursion: The Power of Self-Calling Functions</h1>  
  <p>Recursion is a **powerful problem-solving technique** used in **divide and conquer algorithms** like Merge Sort and Quick Sort.</p>  
  <br>  
  <p>🔹 In this chapter, you’ll learn:</p>  
  <ul>  
    <li>How recursion works and why it is useful for **breaking down complex problems** 🧐</li>  
    <li>Understanding **base cases, recursive calls, and recursion trees** 🌳</li>  
    <li>Solving problems like **factorial, Fibonacci, and tower of Hanoi** 🏗️</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll be able to **write recursive algorithms confidently**!</p>', 
  'coding3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW()),

  (UUID(), 'Sorting & Searching Algorithms', 
  '<h1>📌 Sorting & Searching: Optimizing Data Access</h1>  
  <p>Sorting and searching algorithms form the foundation of **efficient data management** in applications like databases and search engines.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Popular sorting algorithms: **Bubble Sort, Selection Sort, Merge Sort, Quick Sort** 🔄</li>  
    <li>Binary Search vs Linear Search and their applications 🔍</li>  
    <li>Understanding **time complexity of different sorting and searching techniques** 📊</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to **choose the best sorting and searching algorithm** for a given problem!</p>', 
  'coding1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW()),

  (UUID(), 'Stacks & Queues', 
  '<h1>🛠️ Stacks & Queues: Managing Data Efficiently</h1>  
  <p>Stacks and Queues are **linear data structures** used in memory management, parsing expressions, and scheduling tasks.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Understanding the **LIFO (Last In, First Out) and FIFO (First In, First Out) principles** 🔄</li>  
    <li>Implementing **Stacks & Queues using arrays and linked lists** 🏗️</li>  
    <li>Solving problems like **balanced parentheses, browser history, and job scheduling** 📑</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll be able to use **stacks and queues for problem-solving!**</p>', 
  'coding2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW()),

  (UUID(), 'Graphs & Trees', 
  '<h1>🌳 Graphs & Trees: Representing Real-World Problems</h1>  
  <p>Graphs and trees are **non-linear data structures** used in networking, AI, and game development.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Graph representations: **Adjacency Matrix vs Adjacency List** 🛠️</li>  
    <li>Graph traversal algorithms: **BFS (Breadth-First Search) & DFS (Depth-First Search)** 🔍</li>  
    <li>Understanding **tree data structures, binary trees, and binary search trees (BST)** 🌳</li>  
  </ul>  
  <br>  
  <p>🚀 By the end, you’ll be able to **implement graphs and trees for solving complex problems!**</p>', 
  'coding3.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW()),

  (UUID(), 'Dynamic Programming', 
  '<h1>⚡ Dynamic Programming: Solving Problems Efficiently</h1>  
  <p>Dynamic Programming (DP) is a **powerful optimization technique** that helps in solving problems by breaking them into smaller overlapping subproblems.</p>  
  <br>  
  <p>🔹 Topics covered:</p>  
  <ul>  
    <li>Understanding **memoization and tabulation** 🏗️</li>  
    <li>Solving **Fibonacci, Knapsack, and Longest Common Subsequence (LCS)** problems 🎯</li>  
    <li>Optimizing algorithms using **time complexity reduction techniques** ⚡</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll master **problem-solving using DP techniques**!</p>', 
  'coding1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW()),

  (UUID(), 'Outro & Next Steps', 
  '<h1>🎉 Congratulations! You’re Now a DSA Expert!</h1>  
  <p>Mastering DSA is a **huge step toward becoming a top-tier programmer!** But the journey doesn’t stop here.</p>  
  <br>  
  <h2>🚀 What’s Next?</h2>  
  <ul>  
    <li>Practice solving **coding problems on LeetCode, Codeforces, and Hackerrank** 🏆</li>  
    <li>Master **competitive programming techniques** 🏁</li>  
    <li>Learn advanced DSA topics like **Tries, Segment Trees, and Disjoint Sets** 📚</li>  
  </ul>  
  <br>  
  <p>📌 Keep practicing, and soon you’ll be an **algorithmic problem-solving champion!** 🚀</p>', 
  'coding2.mp4', 8, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='DSA Course'), NOW(), NOW());

--Cooking Course

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Cooking Course', 
  "", 
  'sample_cooking.jpg', 499, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 1, NOW(), NOW());

  INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
  (UUID(), 'Introduction to Cooking', 
  '<h1>👨‍🍳 Welcome to the World of Cooking!</h1>  
  <p>Cooking is not just about making food; it is an **art and science** combined! Whether you are a beginner or an aspiring chef, this course will teach you **fundamental techniques** that form the backbone of great cooking. 🍽️</p>  
  <br>  
  <h2>🔹 In this chapter, you will learn:</h2>  
  <ul>  
    <li>The history and evolution of cooking 🔥</li>  
    <li>Different cooking methods: **Boiling, Frying, Baking, Grilling** 🍳</li>  
    <li>Essential kitchen tools and their uses 🔪🥄</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll feel **confident and ready** to start your cooking journey! 🍽️</p>', 
  'Cooking1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW()),

  (UUID(), 'Knife Skills & Kitchen Safety', 
  '<h1>🔪 Mastering Knife Skills & Staying Safe in the Kitchen</h1>  
  <p>One of the first things every chef learns is **proper knife handling**. A sharp knife is safer than a dull one, and knowing how to use it **efficiently** will make cooking easier! 🥒🍅</p>  
  <br>  
  <h2>🛠️ What You Will Learn:</h2>  
  <ul>  
    <li>How to hold and use a chef’s knife safely 🔪</li>  
    <li>Essential cutting techniques: **Chopping, Slicing, Dicing, Mincing, and Julienne** 🥕</li>  
    <li>Common kitchen hazards and how to avoid them ⚠️</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll be able to **handle knives like a pro** while keeping your fingers safe! 🤲</p>', 
  'Cooking2.mp4', 2, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW()),

  (UUID(), 'Understanding Ingredients', 
  '<h1>🥕🧄 Fresh vs. Processed: Choosing the Right Ingredients</h1>  
  <p>The secret to delicious meals is **high-quality ingredients**. Learn how to choose the best produce, meats, dairy, and pantry staples to elevate your cooking. 🍎🥩</p>  
  <br>  
  <h2>📌 Key Takeaways:</h2>  
  <ul>  
    <li>How to pick **fresh fruits, vegetables, and herbs** 🥦</li>  
    <li>Understanding different cuts of meat and their best cooking methods 🍖</li>  
    <li>The importance of **spices and seasoning** for flavor 🌶️</li>  
  </ul>  
  <br>  
  <p>🔥 After this lesson, you’ll be able to **shop smarter and cook tastier meals!**</p>', 
  'Cooking3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW()),

  (UUID(), 'Cooking Techniques: Sautéing, Roasting & More', 
  '<h1>🔥 Mastering Fundamental Cooking Techniques</h1>  
  <p>Every dish is created using **different cooking methods**. Learning these techniques will give you confidence in the kitchen and allow you to cook a variety of dishes! 🍳🥘</p>  
  <br>  
  <h2>👨‍🍳 Techniques Covered:</h2>  
  <ul>  
    <li>🥄 **Sautéing** – Cooking food quickly over high heat with a little oil</li>  
    <li>🔥 **Roasting** – Using dry heat to bring out deep flavors</li>  
    <li>🌊 **Boiling & Simmering** – Perfecting pasta, soups, and sauces</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll be able to **apply these techniques to any recipe** like a chef! 👩‍🍳</p>', 
  'Cooking1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW()),

  (UUID(), 'Making the Perfect Sauce', 
  '<h1>🍝 The Art of Making Delicious Sauces</h1>  
  <p>Sauces bring life to any dish! From **creamy pasta sauces** to **rich gravies**, knowing how to balance flavors is an essential skill. 🥄</p>  
  <br>  
  <h2>🧂 What You Will Learn:</h2>  
  <ul>  
    <li>How to make **classic sauces like Béchamel, Tomato, and Hollandaise** 🥫</li>  
    <li>Understanding the balance of **acid, fat, spice, and sweetness** 🍋</li>  
    <li>Thickening methods: **Roux, Reduction, and Emulsification** 🧈</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll be able to **make restaurant-quality sauces at home!** 🍽️</p>', 
  'Cooking2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW()),

  (UUID(), 'Baking Basics: Bread & Desserts', 
  '<h1>🍞🥐 Sweet & Savory: The Joy of Baking</h1>  
  <p>Baking is a precise science! Learn how to measure ingredients, mix doughs, and create delicious baked goods. 🧁</p>  
  <br>  
  <h2>🔹 In This Lesson:</h2>  
  <ul>  
    <li>🍞 **Making bread from scratch** – Understanding yeast and fermentation</li>  
    <li>🎂 **Baking cakes & cookies** – The role of eggs, flour, and sugar</li>  
    <li>🥐 **Pastry techniques** – Puff pastry, shortcrust, and choux</li>  
  </ul>  
  <br>  
  <p>📌 After this, you’ll be ready to **bake delicious treats for every occasion!** 🎉</p>', 
  'Cooking3.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW()),

  (UUID(), 'International Cuisines', 
  '<h1>🌍 Explore the Flavors of the World</h1>  
  <p>Each culture has **unique cooking styles and flavors**. This chapter will take you on a **culinary journey** across different continents! ✈️</p>  
  <br>  
  <h2>🍽️ Dishes You’ll Learn:</h2>  
  <ul>  
    <li>🍜 **Asian Cuisine** – Stir-fries, dumplings, and sushi</li>  
    <li>🌮 **Mexican Cuisine** – Tacos, burritos, and salsas</li>  
    <li>🍕 **Italian Cuisine** – Pasta, pizza, and risotto</li>  
  </ul>  
  <br>  
  <p>📌 After this lesson, you’ll be able to **cook authentic international dishes**! 🇮🇹🇲🇽🇯🇵</p>', 
  'Cooking1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW()),

  (UUID(), 'Outro & Final Thoughts', 
  '<h1>🎉 Congratulations! You’re Ready to Cook Like a Pro!</h1>  
  <p>Cooking is a journey, and you have taken **a huge step forward**! 🚀</p>  
  <br>  
  <h2>📌 Next Steps:</h2>  
  <ul>  
    <li>📖 **Experiment with your own recipes**</li>  
    <li>🍽️ **Host a dinner party and impress your friends**</li>  
    <li>📌 **Keep learning and refining your skills**</li>  
  </ul>', 
  'Cooking2.mp4', 8, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Cooking Course'), NOW(), NOW());


--Piano Course

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Piano Course', 
  "The Piano Course is designed to help you learn the fundamentals of playing the piano, from basic notes and chords to advanced techniques 🎼. You'll explore proper hand positioning, sheet music reading, scales, rhythms, and song playing to build your musical skills 🎶. Whether you're a beginner or looking to improve, this course will guide you in developing confidence, creativity, and mastery of the piano! 🎵✨", 
  'piano.jpg', 499, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 1, NOW(), NOW());

  INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
  (UUID(), 'Introduction to Piano', 
  '<h1>🎹 Welcome to the World of Piano!</h1>  
  <p>Learning the piano is an exciting journey into **music theory, hand coordination, and expression**. This course will help you build a strong foundation in piano playing. 🎶</p>  
  <br>  
  <h2>📌 In this chapter, you will learn:</h2>  
  <ul>  
    <li>The history and evolution of the piano 🎼</li>  
    <li>Understanding the **88 keys** and their layout 🎵</li>  
    <li>Basic posture, hand placement, and finger positioning ✋</li>  
  </ul>  
  <br>  
  <p>🚀 Get ready to start your musical journey with confidence!</p>', 
  'music1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW()),

  (UUID(), 'Music Theory Basics', 
  '<h1>🎼 Understanding Music Theory for Piano</h1>  
  <p>Before playing beautiful music, you need to understand the **language of music**! 📜 This chapter covers essential music theory concepts.</p>  
  <br>  
  <h2>🎵 Key Topics:</h2>  
  <ul>  
    <li>The **musical alphabet** and note names (A, B, C, D, E, F, G) 🔤</li>  
    <li>Understanding **treble and bass clefs** 🎼</li>  
    <li>Introduction to **rhythm, time signatures, and note values** 🕰️</li>  
  </ul>  
  <br>  
  <p>📌 By mastering this, you’ll be able to **read and understand music sheets!** 📖</p>', 
  'music2.mp4', 2, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW()),

  (UUID(), 'Playing Your First Notes', 
  '<h1>🎶 Let’s Play! Your First Notes on the Piano</h1>  
  <p>It’s time to **press the keys and create music!** 🎹 This lesson will guide you through playing your first notes and melodies.</p>  
  <br>  
  <h2>🎵 What You Will Learn:</h2>  
  <ul>  
    <li>Finding **Middle C** and understanding its importance 🎯</li>  
    <li>Playing the **C Major Scale** (C-D-E-F-G-A-B-C) 🎹</li>  
    <li>Practicing **basic finger exercises** for smooth playing ✋</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll be able to play simple melodies with ease! 🎶</p>', 
  'music1.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW()),

  (UUID(), 'Mastering Chords & Harmony', 
  '<h1>🎼 The Magic of Chords: Building Beautiful Sounds</h1>  
  <p>Chords form the backbone of music! Learning how to build and play **chords** will unlock a world of harmony. 🎵</p>  
  <br>  
  <h2>🎹 Topics Covered:</h2>  
  <ul>  
    <li>Understanding **Major & Minor chords** 🎶</li>  
    <li>Playing common **triads (C Major, G Major, A Minor, F Major)** 🎵</li>  
    <li>How to transition smoothly between chords 🔄</li>  
  </ul>  
  <br>  
  <p>📌 After this, you’ll be able to **accompany songs and create chord progressions**! 🎶</p>', 
  'music2.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW()),

  (UUID(), 'Left Hand & Right Hand Coordination', 
  '<h1>🤲 Mastering Hand Independence</h1>  
  <p>Playing piano requires **both hands working together** – but sometimes playing **different things at the same time**! 🖐️✋</p>  
  <br>  
  <h2>🎵 Techniques You Will Learn:</h2>  
  <ul>  
    <li>Left-hand **bass notes & arpeggios** 🎶</li>  
    <li>Right-hand **melody playing** 🎹</li>  
    <li>Exercises to improve **coordination and finger strength** ✨</li>  
  </ul>  
  <br>  
  <p>📌 By practicing these exercises, you’ll gain **better control over both hands!**</p>', 
  'music1.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW()),

  (UUID(), 'Playing Songs: Your First Piece', 
  '<h1>🎵 Putting It All Together: Play Your First Song!</h1>  
  <p>Now that you’ve learned the basics, it’s time to **play a full song**! 🎼 We’ll start with a simple yet beautiful melody.</p>  
  <br>  
  <h2>🎹 What You’ll Do:</h2>  
  <ul>  
    <li>Practice a famous beginner song (**"Twinkle Twinkle Little Star" or "Ode to Joy"**) 🌟</li>  
    <li>Use both hands to play melody and chords 🎶</li>  
    <li>Improve **timing and expression** in your playing ⏳</li>  
  </ul>  
  <br>  
  <p>📌 By the end, you’ll have **your first full song** under your belt! 🎵</p>', 
  'music2.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW()),

  (UUID(), 'Improvisation & Creativity', 
  '<h1>🎼 Express Yourself: Learn to Improvise</h1>  
  <p>Improvisation is what makes music **exciting and unique**! In this chapter, we explore how to create your own melodies. 🎹</p>  
  <br>  
  <h2>🎶 Topics Covered:</h2>  
  <ul>  
    <li>How to **create your own chord progressions** 🎵</li>  
    <li>Using **scales to improvise melodies** 🎶</li>  
    <li>Adding emotion through **dynamics and tempo changes** 🎼</li>  
  </ul>  
  <br>  
  <p>📌 After this, you’ll be able to **freestyle and compose your own piano pieces!** 🎼</p>', 
  'music1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW()),

  (UUID(), 'Final Thoughts & Next Steps', 
  '<h1>🎉 Congratulations! You’re a Pianist Now! 🎹</h1>  
  <p>Great job! You’ve come so far on your **piano journey**! 🚀</p>  
  <br>  
  <h2>📌 What’s Next?</h2>  
  <ul>  
    <li>Keep **practicing daily** for continuous improvement 🎵</li>  
    <li>Learn **more advanced techniques & songs** 🎼</li>  
    <li>Experiment with **different styles like Jazz, Classical, and Pop** 🎶</li>  
  </ul>  
  <br>  
  <p>👏 Keep playing, keep learning, and most importantly – **enjoy the music!** 🎹🎶</p>', 
  'music2.mp4', 8, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Piano Course'), NOW(), NOW());


--Maths for ML

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Maths for ML', 
  "The Mathematics for Machine Learning Course provides the essential mathematical foundation needed to understand and build ML algorithms 🤖. You'll explore key concepts like linear algebra, calculus, probability, and statistics, which are crucial for optimizing models and making data-driven decisions 📊. Whether you're a beginner or an aspiring data scientist, this course will help you develop the math skills required for machine learning, AI, and deep learning applications! ⚡🎯", 
  'MathsforML.jpg', 599, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 1, NOW(), NOW());

INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
  (UUID(), 'Introduction to Mathematics for Machine Learning', 
  '<h1>🤖 Welcome to the World of Maths for ML!</h1>  
  <p>Mathematics is the **backbone of Machine Learning**. This course will guide you through essential concepts required to build intelligent models! 🚀</p>  
  <br>  
  <h2>📌 In this chapter, you will learn:</h2>  
  <ul>  
    <li>Why mathematics is crucial for Machine Learning 📊</li>  
    <li>Overview of **Linear Algebra, Calculus, Probability, and Statistics** 🧮</li>  
    <li>How math helps in **model training and predictions** 🤖</li>  
  </ul>  
  <br>  
  <p>🚀 Get ready to dive into the world of ML mathematics!</p>', 
  'maths1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW()),

  (UUID(), 'Linear Algebra for ML', 
  '<h1>📏 The Power of Linear Algebra in ML</h1>  
  <p>Linear Algebra is the **foundation of ML algorithms**! Many ML models rely on matrices, vectors, and transformations. Let’s break it down! 🧮</p>  
  <br>  
  <h2>🎯 Topics Covered:</h2>  
  <ul>  
    <li>Understanding **scalars, vectors, matrices, and tensors** 📊</li>  
    <li>Matrix operations: **addition, multiplication, transposition** 🔢</li>  
    <li>Eigenvalues, eigenvectors, and their role in ML 🏗️</li>  
    <li>Applications in **Principal Component Analysis (PCA) & Neural Networks** 🤖</li>  
  </ul>  
  <br>  
  <p>📌 By the end of this chapter, you’ll be comfortable working with **matrix computations in ML!**</p>', 
  'maths2.mp4', 2, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW()),

  (UUID(), 'Calculus for Optimization', 
  '<h1>📉 How Calculus Optimizes Machine Learning Models</h1>  
  <p>Optimization is a core part of ML – and Calculus helps us **minimize loss functions and train models effectively!** 🎯</p>  
  <br>  
  <h2>📚 Key Concepts:</h2>  
  <ul>  
    <li>Understanding **derivatives and gradients** 🔢</li>  
    <li>Partial derivatives and their role in **Gradient Descent** 🏔️</li>  
    <li>How to compute gradients for neural networks 🔄</li>  
    <li>Applications in **Backpropagation and Deep Learning** 🤖</li>  
  </ul>  
  <br>  
  <p>📌 After this chapter, you’ll understand how ML models **learn from data using calculus!**</p>', 
  'maths3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW()),

  (UUID(), 'Probability & Statistics for ML', 
  '<h1>📊 Understanding Probability & Statistics in ML</h1>  
  <p>Probability and statistics **help ML models make decisions under uncertainty**! Let’s explore how. 🎲</p>  
  <br>  
  <h2>📈 What You’ll Learn:</h2>  
  <ul>  
    <li>Understanding **random variables, distributions, and Bayes’ Theorem** 📊</li>  
    <li>Probability in ML: **Naïve Bayes Classifier & Markov Chains** 🌀</li>  
    <li>Hypothesis testing and statistical significance 📉</li>  
    <li>How ML models deal with **bias and variance** ⚖️</li>  
  </ul>  
  <br>  
  <p>📌 Mastering probability and statistics will make you a **better ML practitioner!**</p>', 
  'maths1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW()),

  (UUID(), 'Vector Spaces & Transformations', 
  '<h1>🧭 Exploring Vector Spaces in ML</h1>  
  <p>ML models operate in **high-dimensional spaces**! Understanding vector spaces helps in handling data efficiently. 🚀</p>  
  <br>  
  <h2>🔢 Topics Covered:</h2>  
  <ul>  
    <li>What are **vector spaces** and why are they important? 📊</li>  
    <li>Transformations: **Rotation, Scaling, and Projections** 📐</li>  
    <li>Applications in **Feature Engineering & PCA** 🧠</li>  
  </ul>  
  <br>  
  <p>📌 After this, you’ll understand how **dimensionality reduction helps in ML models!**</p>', 
  'maths2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW()),

  (UUID(), 'Gradient Descent & Optimization Techniques', 
  '<h1>🚀 Mastering Optimization: Gradient Descent</h1>  
  <p>ML models improve by **minimizing errors** – and Gradient Descent helps in achieving that! 🏔️</p>  
  <br>  
  <h2>📉 What You’ll Learn:</h2>  
  <ul>  
    <li>Understanding the **Gradient Descent algorithm** 🔽</li>  
    <li>Variants: **Batch, Stochastic, and Mini-batch Gradient Descent** 🔄</li>  
    <li>Learning Rate, Momentum, and Adam Optimizer 🏆</li>  
  </ul>  
  <br>  
  <p>📌 This chapter will give you insights into **how ML models improve over time!**</p>', 
  'maths3.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW()),

  (UUID(), 'Mathematics in Deep Learning', 
  '<h1>🧠 The Math Behind Neural Networks</h1>  
  <p>Deep Learning is powered by complex mathematics! Let’s uncover how it works behind the scenes. 🤖</p>  
  <br>  
  <h2>🔬 Key Concepts:</h2>  
  <ul>  
    <li>Understanding the **mathematics of neural networks** 🏗️</li>  
    <li>Activation functions: **Sigmoid, ReLU, Softmax** 📈</li>  
    <li>Backpropagation and the Chain Rule 📊</li>  
  </ul>  
  <br>  
  <p>📌 Master this, and you’ll be ready to build **your own neural networks!**</p>', 
  'maths1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW()),

  (UUID(), 'Conclusion & Next Steps', 
  '<h1>🎯 Congratulations! You’re Ready for ML!</h1>  
  <p>🎉 You’ve completed the **Mathematics for ML** course! Now, it’s time to apply what you’ve learned. 🚀</p>  
  <br>  
  <h2>📌 What’s Next?</h2>  
  <ul>  
    <li>Start building **ML models using Python and libraries like NumPy & TensorFlow** 🧠</li>  
    <li>Explore **Advanced Topics: Reinforcement Learning, Generative AI, etc.** 🤖</li>  
    <li>Practice math-based ML problems to strengthen your concepts 🔢</li>  
  </ul>  
  <br>  
  <p>👏 Keep learning and keep innovating in the world of ML! 🚀</p>', 
  'maths2.mp4', 8, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Maths for ML'), NOW(), NOW());

  --Business Management course

  INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Business Management Course', 
  "The Business Management Course is designed to give you a strong foundation in the principles and practices of running and growing a successful business 📈. You'll learn about management strategies, marketing, finance, operations, leadership, and decision-making to navigate today’s competitive market 🌍. Whether you're an aspiring entrepreneur or a future manager, this course equips you with the essential skills to lead and innovate in the business world! 💡📊", 
  'business-management.jpg', 799, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 5, NOW(), NOW());

  INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at) VALUES (UUID(), 'Introduction to Business Management', 
"<h1>📘 Welcome to Business Management</h1>
<p>Business Management is the art of planning, organizing, and analyzing business activities efficiently. 🌍</p>
<br>
<h2>🎯 In this chapter:</h2>
<ul>
  <li>Understand what Business Management is 📈</li>
  <li>Explore its impact on organizations 🌐</li>
  <li>Preview of the course journey 🧭</li>
</ul>
<br>
<p>Let's get started on managing businesses like a pro! 💼</p>", 
'business1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Principles of Management', 
'<h1>📊 The Foundations of Management</h1>
<p>This chapter dives into the essential principles every manager must know. 💡</p>
<br>
<h2>🧠 You’ll learn:</h2>
<ul>
  <li>Planning, organizing, leading, and controlling 📋</li>
  <li>Key contributions by management theorists 👨‍🏫</li>
  <li>Best practices in modern management 🔍</li>
</ul>
<br>
<p>These principles shape the success of any organization! 🔑</p>', 
'business2.mp4', 2, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Organizational Structure & Design', 
'<h1>🏗️ Building Effective Organizations</h1>
<p>Organizational design is about structuring roles to achieve goals efficiently. 🔄</p>
<br>
<h2>🏢 Topics include:</h2>
<ul>
  <li>Types of organizational structures: Functional, Matrix, Flat, etc. 📌</li>
  <li>Delegation and authority hierarchy 🧱</li>
  <li>Modern approaches to agile structures ⚡</li>
</ul>
<br>
<p>Proper structure fuels better communication and productivity. 🧠</p>', 
'business3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Leadership & Motivation', 
'<h1>🧑‍💼 Leading People Effectively</h1>
<p>Leaders inspire, empower, and guide teams toward success. 🔥</p>
<br>
<h2>💬 In this chapter:</h2>
<ul>
  <li>Explore leadership styles: Transformational, Servant, Autocratic, etc. 👥</li>
  <li>Understand employee motivation theories 🧲</li>
  <li>Strategies to boost morale and performance 💯</li>
</ul>
<br>
<p>Great leadership is the heart of business growth. ❤️</p>', 
'business1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Strategic Planning', 
'<h1>🧭 Creating a Winning Business Strategy</h1>
<p>Strategy sets the direction and roadmap for the business. 🚗</p>
<br>
<h2>📘 What you’ll explore:</h2>
<ul>
  <li>SWOT Analysis, Porter’s Five Forces, and BCG Matrix 📉</li>
  <li>Setting long-term goals and mission alignment 🎯</li>
  <li>Strategic execution and monitoring ✅</li>
</ul>
<br>
<p>Be the strategist your business needs. 💼</p>', 
'business2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Marketing Management', 
'<h1>📢 Managing Markets and Customers</h1>
<p>Marketing is all about delivering value to customers. 💡</p>
<br>
<h2>📋 Key Topics:</h2>
<ul>
  <li>The 4Ps of Marketing (Product, Price, Place, Promotion) 🛍️</li>
  <li>Branding and positioning strategies 🧠</li>
  <li>Digital marketing fundamentals 🌐</li>
</ul>
<br>
<p>Master marketing to attract and retain customers! 💥</p>', 
'business3.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Financial Management', 
'<h1>💰 Managing Business Finances</h1>
<p>Finance is the lifeblood of any organization. Learn how to manage it wisely. 💹</p>
<br>
<h2>📚 Topics Covered:</h2>
<ul>
  <li>Budgeting, forecasting, and cash flow management 📊</li>
  <li>Understanding financial statements 🧾</li>
  <li>ROI, break-even analysis, and risk assessment 📈</li>
</ul>
<br>
<p>Sound financial decisions lead to sustainable growth. 📈</p>', 
'business1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Operations & Supply Chain Management', 
'<h1>🏭 Optimizing Operations for Efficiency</h1>
<p>Operations management ensures goods and services are delivered efficiently. 🏗️</p>
<br>
<h2>🔄 In this module:</h2>
<ul>
  <li>Supply chain components and logistics 📦</li>
  <li>Inventory and quality management 🧰</li>
  <li>Lean manufacturing and Six Sigma 📉</li>
</ul>
<br>
<p>Efficient operations keep the business agile and cost-effective. 🚀</p>', 
'business2.mp4', 8, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Business Ethics & Corporate Governance', 
'<h1>⚖️ Doing Business the Right Way</h1>
<p>Ethics and governance build trust and long-term value. 🛡️</p>
<br>
<h2>📌 Covered Topics:</h2>
<ul>
  <li>Understanding corporate responsibility 🌍</li>
  <li>Stakeholder and board management 📚</li>
  <li>Ethical dilemmas and real-world case studies 💬</li>
</ul>
<br>
<p>Good governance ensures business sustainability and public trust. 🧭</p>', 
'business3.mp4', 9, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW()),

(UUID(), 'Final Thoughts & Career Paths', 
'<h1>🎓 Wrapping Up & Looking Ahead</h1>
<p>Congratulations on completing the Business Management Course! 🎉</p>
<br>
<h2>🔍 What’s Next?</h2>
<ul>
  <li>Career options in management, consulting, and entrepreneurship 💼</li>
  <li>Certifications and advanced learning 📘</li>
  <li>How to apply concepts in the real world 🌐</li>
</ul>
<br>
<p>Go out there and lead with confidence! 🌟</p>', 
'business1.mp4', 10, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Business Management Course'), NOW(), NOW());

--Guitar Course

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Guitar Course', 
  "The Guitar Course is perfect for anyone looking to start their musical journey or sharpen their guitar-playing skills 🎶. You'll learn the basics of chords, strumming patterns, finger placement, scales, and popular songs, all while building strong technique and musical understanding 🎵. Whether you're a complete beginner or looking to level up, this course will help you play with confidence and creativity! 🎼🔥", 
  'guitar.jpg', 449, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 2, NOW(), NOW());

INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
(UUID(), 'Introduction to Guitar', 
'<h1>🎸 Welcome to the World of Guitar!</h1>
<p>Ready to strum your way into music? This course is designed for absolute beginners to help you fall in love with the guitar. 💖</p>
<br>
<h2>🎯 What you’ll learn:</h2>
<ul>
  <li>Different types of guitars (acoustic, electric, classical) 🎵</li>
  <li>Parts of the guitar and how to hold it properly 🎯</li>
  <li>Setting up your space for practice 🪑</li>
</ul>
<br>
<p>Let’s begin your journey to becoming a guitar hero! 🦸‍♂️</p>', 
'music1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Understanding Guitar Tuning', 
'<h1>🎼 Tune Up Like a Pro!</h1>
<p>Tuning is the first step toward making beautiful music. An out-of-tune guitar can throw everything off! 🎻</p>
<br>
<h2>📚 In this chapter:</h2>
<ul>
  <li>Standard tuning (EADGBE) explained 🎵</li>
  <li>Using digital and clip-on tuners 🎧</li>
  <li>Ear training for manual tuning 👂</li>
</ul>
<br>
<p>Let’s get your guitar in tune and ready to rock! 🔥</p>', 
'music2.mp4', 2, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Basic Chords for Beginners', 
'<h1>🎶 Master Your First Chords</h1>
<p>Chords are the building blocks of every song. Once you’ve got a few down, you’ll be playing your favorite tunes in no time! 🎤</p>
<br>
<h2>🎸 This chapter covers:</h2>
<ul>
  <li>Open chords: C, G, D, Em, Am, E 💬</li>
  <li>Proper finger placement and technique 👆</li>
  <li>Tips to avoid buzzing and muted strings 💡</li>
</ul>
<br>
<p>Play your first chord and feel the magic! ✨</p>', 
'music1.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Strumming Patterns', 
'<h1>🎵 Feel the Rhythm</h1>
<p>Strumming brings life to your chords. It’s all about rhythm and flow! 🕺</p>
<br>
<h2>🥁 You’ll learn:</h2>
<ul>
  <li>Basic downstroke and upstroke patterns 👋</li>
  <li>Counting beats and staying in time 🕰️</li>
  <li>Popular strumming styles from real songs 🎶</li>
</ul>
<br>
<p>Strum with confidence and keep the groove going! 💃</p>', 
'music2.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Playing Your First Song', 
'<h1>🎤 Time to Jam!</h1>
<p>Put everything together and play a full song. Nothing beats the feeling of strumming through a complete tune! 🎼</p>
<br>
<h2>🎸 Includes:</h2>
<ul>
  <li>Simple 3-chord song breakdown 🎵</li>
  <li>Practice tips and transitions 🔄</li>
  <li>Backing track to play along with 🎧</li>
</ul>
<br>
<p>You’re officially making music now! 🥳</p>', 
'music1.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Fingerpicking Basics', 
'<h1>🖐️ Unlock Melodic Fingerpicking</h1>
<p>Want to add some elegance to your playing? Fingerpicking opens up a new dimension of expression. 🎹</p>
<br>
<h2>🎯 Learn:</h2>
<ul>
  <li>Basic fingerpicking patterns (Travis, arpeggios) 🎼</li>
  <li>Proper thumb and finger coordination 👌</li>
  <li>Practicing slowly and building speed 🔄</li>
</ul>
<br>
<p>Make your guitar sing in new ways! 🎵</p>', 
'music2.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Barre Chords & Power Chords', 
'<h1>💪 Push Beyond Open Chords</h1>
<p>Time to strengthen those fingers! Barre and power chords unlock a whole world of rock and pop songs. 🎸🔥</p>
<br>
<h2>🎸 You’ll explore:</h2>
<ul>
  <li>How to play major and minor barre chords 🎶</li>
  <li>Power chord shapes for electric guitar 🎛️</li>
  <li>Tips for reducing hand fatigue 🖐️</li>
</ul>
<br>
<p>This is where your playing starts sounding pro! 😎</p>', 
'music1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Guitar Scales and Improvisation', 
'<h1>🎼 Solo Like a Rockstar</h1>
<p>Scales are essential for solos, melodies, and improvisation. 🎶</p>
<br>
<h2>🎓 You’ll master:</h2>
<ul>
  <li>Major and minor scales 🎵</li>
  <li>Simple licks and improvisation techniques 🎤</li>
  <li>How to jam with backing tracks 🎧</li>
</ul>
<br>
<p>Let your fingers do the talking! 🎸</p>', 
'music2.mp4', 8, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Common Guitar Techniques', 
'<h1>⚙️ Spice Up Your Sound</h1>
<p>Want to sound like your favorite guitarist? These techniques will give you that edge. 🌟</p>
<br>
<h2>🎸 This chapter includes:</h2>
<ul>
  <li>Hammer-ons, pull-offs, and slides 🪕</li>
  <li>String bending and vibrato 🎶</li>
  <li>Muting and palm muting techniques ✋</li>
</ul>
<br>
<p>Add flair to your solos and riffs! 🚀</p>', 
'music1.mp4', 9, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW()),

(UUID(), 'Final Jam & Next Steps', 
'<h1>🎉 Wrapping Up & Moving Forward</h1>
<p>You made it to the final chapter! Now it’s time to celebrate your progress and explore where to go next. 🏁</p>
<br>
<h2>📈 What’s next?</h2>
<ul>
  <li>Record and share your music 📹</li>
  <li>Explore advanced techniques 🎸</li>
  <li>Join a band or perform live! 🎤</li>
</ul>
<br>
<p>Keep practicing and enjoy the musical journey ahead! 🎵🎶</p>', 
'music2.mp4', 10, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Guitar Course'), NOW(), NOW());

--Finance Course

INSERT INTO Course (course_id, title, description, image_url, price, status, user_id, category_id, created_at, updated_at)
  VALUES 
  (UUID(), 'Finance Course', 
  "The Finance Course is designed to help you understand the core principles of managing money, making smart investments, and planning for the future 📊. You'll dive into topics like budgeting, saving, investing, risk management, financial markets, and personal finance strategies 💹. Whether you're a student, entrepreneur, or professional, this course will empower you to make informed financial decisions and build a secure financial future! 💼📈", 
  'finance.jpg', 899, 'verified', (SELECT user_id FROM User where role = 'instructor' ORDER BY rand() LIMIT 1), 6, NOW(), NOW());

  INSERT INTO Chapter (chapter_id, title, description, videoUrl, position, isPublished, isFree, course_id, created_at, updated_at)
VALUES 
(UUID(), 'Introduction to Financial Literacy',
'<h1>📘 Welcome to Finance 101</h1>
<p>In this introductory chapter, we’ll demystify the world of finance. Whether you’re saving for a vacation ✈️ or planning for retirement 👵🏼, this course will guide you step-by-step.</p>
<br>
<h2>🌟 What to Expect:</h2>
<ul>
  <li>Importance of financial education 🧠</li>
  <li>Overview of the course structure 📚</li>
  <li>Setting personal finance goals 🎯</li>
</ul>
<br>
<p>Let’s start making your money work for you! 💵</p>', 
'business1.mp4', 1, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Budgeting Basics',
'<h1>📝 Create a Budget that Works</h1>
<p>Budgeting is the backbone of financial control. Mastering this skill helps avoid debt and build savings. 💪</p>
<br>
<h2>🧾 Learn to:</h2>
<ul>
  <li>Track your income and expenses 📊</li>
  <li>Differentiate needs vs wants 🧃👜</li>
  <li>Use tools like 50/30/20 rule ⚖️</li>
</ul>
<br>
<p>Every dollar needs a job—let’s assign them wisely! 💼</p>', 
'business2.mp4', 2, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Understanding Credit & Loans',
'<h1>💳 The Power (and Risk) of Credit</h1>
<p>Credit can help you build wealth—or debt. In this chapter, we explore how to use it responsibly.</p>
<br>
<h2>🔍 Topics include:</h2>
<ul>
  <li>How credit scores work 📈</li>
  <li>Types of loans (student, personal, mortgage) 🏡</li>
  <li>How to manage and reduce debt 🚫</li>
</ul>
<br>
<p>Smart credit usage can open financial doors! 🚪</p>', 
'business3.mp4', 3, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Saving Strategies',
'<h1>💰 Pay Yourself First</h1>
<p>Savings are the safety net for emergencies and future plans. In this lesson, we’ll go over best practices to grow your reserves. 🌱</p>
<br>
<h2>🏦 Covered in this chapter:</h2>
<ul>
  <li>Emergency funds vs long-term savings 🛟</li>
  <li>High-yield savings accounts and CDs 💽</li>
  <li>Automated savings plans 🔄</li>
</ul>
<br>
<p>Let your savings snowball into real wealth! ❄️💵</p>', 
'business1.mp4', 4, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Investing for Beginners',
'<h1>📈 Make Your Money Grow</h1>
<p>Investing is how money makes money. Learn how to start small and build a portfolio that supports your goals. 🚀</p>
<br>
<h2>💼 Topics include:</h2>
<ul>
  <li>Stocks, bonds, mutual funds & ETFs 📊</li>
  <li>Compound interest and risk profiles 📉📈</li>
  <li>Intro to retirement accounts like IRAs & 401(k)s 🛡️</li>
</ul>
<br>
<p>Start investing early, and let time be your ally! ⏳</p>', 
'business2.mp4', 5, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Taxes Demystified',
'<h1>🧾 Conquer Tax Season</h1>
<p>Taxes may be inevitable—but they don’t have to be terrifying. Learn how they work and how to save smartly. 🧠</p>
<br>
<h2>📄 You’ll learn:</h2>
<ul>
  <li>Types of taxes: income, capital gains, and more 💡</li>
  <li>Deductions, credits, and filing statuses 🧾</li>
  <li>How to stay organized throughout the year 📂</li>
</ul>
<br>
<p>Be tax-savvy and keep more of your earnings! 💵</p>', 
'business3.mp4', 6, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Financial Planning & Goals',
'<h1>🎯 Your Financial Roadmap</h1>
<p>Without a plan, money flows away easily. Learn how to set meaningful financial goals and stick to them. 🗺️</p>
<br>
<h2>🚀 This chapter covers:</h2>
<ul>
  <li>Short vs long-term goals 🧭</li>
  <li>Financial milestones (buying a house, retirement) 🏡</li>
  <li>How to adjust your plan as life changes 🔄</li>
</ul>
<br>
<p>Plan your future with confidence and clarity! 🌟</p>', 
'business1.mp4', 7, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Risk Management & Insurance',
'<h1>🛡️ Protect What Matters</h1>
<p>Insurance isn’t just a backup—it’s part of smart financial strategy. This chapter walks through essential coverage types. 🧯</p>
<br>
<h2>📌 You’ll explore:</h2>
<ul>
  <li>Health, auto, life, and home insurance 🚗🏥</li>
  <li>Premiums, deductibles, and claims 📄</li>
  <li>Identifying unnecessary coverage 🧹</li>
</ul>
<br>
<p>Sleep soundly knowing you’re protected! 😌</p>', 
'business2.mp4', 8, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Financial Tools & Technology',
'<h1>🖥️ Money Management Made Easy</h1>
<p>Technology can simplify everything from budgeting to investing. Here are the top tools to streamline your finances. 📱</p>
<br>
<h2>🔧 Featured Tools:</h2>
<ul>
  <li>Budgeting apps like Mint and YNAB 💡</li>
  <li>Robo-advisors and fintech platforms 🤖</li>
  <li>Spreadsheets and cloud tools for finance tracking 📊</li>
</ul>
<br>
<p>Leverage tech to automate, analyze, and optimize! ⚙️</p>', 
'business3.mp4', 9, TRUE, FALSE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW()),

(UUID(), 'Conclusion & Wealth Mindset',
'<h1>🏁 Final Thoughts: Build a Legacy</h1>
<p>You’ve completed the Finance Course—congrats! 🎓 This final chapter wraps up with mindset, habits, and the long-term view on wealth. 🌳</p>
<br>
<h2>💭 We’ll cover:</h2>
<ul>
  <li>Consistency vs perfection 💯</li>
  <li>Generational wealth & giving back ❤️</li>
  <li>Daily habits for lifelong success 🧘</li>
</ul>
<br>
<p>Keep learning, growing, and investing in your future. 🌟 You’ve got this! 💪</p>', 
'business1.mp4', 10, TRUE, TRUE, (SELECT course_id FROM Course WHERE title='Finance Course'), NOW(), NOW());



