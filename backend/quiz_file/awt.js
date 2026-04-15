const shuffleOptions = (options) => {
  const shuffled = [...options];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const makeQuestion = (questionText, correctAnswer, wrongAnswers, points = 1) => ({
  questionText,
  options: shuffleOptions([
    { text: correctAnswer, isCorrect: true },
    ...wrongAnswers.map((text) => ({ text, isCorrect: false }))
  ]),
  points
});

const questionBank = [
  {
    questionText: 'What does HTML stand for?',
    correctAnswer: 'HyperText Markup Language',
    wrongAnswers: [
      'Hyper Tool Markup Language',
      'Home Tool Markup Language',
      'HighText Machine Language'
    ]
  },
  {
    questionText: 'Which tag creates a hyperlink in HTML?',
    correctAnswer: '<a>',
    wrongAnswers: ['<link>', '<href>', '<url>']
  },
  {
    questionText: 'Which HTML element is used for the largest heading?',
    correctAnswer: '<h1>',
    wrongAnswers: ['<h6>', '<head>', '<title>']
  },
  {
    questionText: 'Which attribute specifies the destination of a link?',
    correctAnswer: 'href',
    wrongAnswers: ['src', 'alt', 'rel']
  },
  {
    questionText: 'Which tag is used to include a JavaScript file in HTML?',
    correctAnswer: '<script>',
    wrongAnswers: ['<js>', '<code>', '<style>']
  },
  {
    questionText: 'Which HTML element represents the main content of a page?',
    correctAnswer: '<main>',
    wrongAnswers: ['<section>', '<aside>', '<footer>']
  },
  {
    questionText: 'Which HTML element defines a table row?',
    correctAnswer: '<tr>',
    wrongAnswers: ['<td>', '<th>', '<table>']
  },
  {
    questionText: 'Which CSS property controls the space inside an element?',
    correctAnswer: 'padding',
    wrongAnswers: ['margin', 'border', 'outline']
  },
  {
    questionText: 'Which CSS property controls the space outside an element?',
    correctAnswer: 'margin',
    wrongAnswers: ['padding', 'gap', 'float']
  },
  {
    questionText: 'Which CSS property changes text color?',
    correctAnswer: 'color',
    wrongAnswers: ['font-style', 'text-align', 'letter-spacing']
  },
  {
    questionText: 'Which CSS property makes text bold?',
    correctAnswer: 'font-weight',
    wrongAnswers: ['font-size', 'line-height', 'text-transform']
  },
  {
    questionText: 'Which layout system is best for one-dimensional rows or columns?',
    correctAnswer: 'Flexbox',
    wrongAnswers: ['Grid', 'Float', 'Positioning']
  },
  {
    questionText: 'Which CSS layout system is designed for two-dimensional layouts?',
    correctAnswer: 'CSS Grid',
    wrongAnswers: ['Flexbox', 'Tables', 'Media Queries']
  },
  {
    questionText: 'Which at-rule is used for responsive breakpoints?',
    correctAnswer: '@media',
    wrongAnswers: ['@keyframes', '@font-face', '@supports']
  },
  {
    questionText: 'Which unit is relative to the root font size?',
    correctAnswer: 'rem',
    wrongAnswers: ['px', 'em', 'vh']
  },
  {
    questionText: 'Which CSS property sets how an element is displayed?',
    correctAnswer: 'display',
    wrongAnswers: ['position', 'overflow', 'z-index']
  },
  {
    questionText: 'Which selector targets a class?',
    correctAnswer: '.class',
    wrongAnswers: ['#id', '*', ':hover']
  },
  {
    questionText: 'Which selector targets an id?',
    correctAnswer: '#id',
    wrongAnswers: ['.class', '[id]', '::id']
  },
  {
    questionText: 'Which HTML input type is used for email addresses?',
    correctAnswer: 'email',
    wrongAnswers: ['text', 'password', 'url']
  },
  {
    questionText: 'Which HTML attribute requires a field before submit?',
    correctAnswer: 'required',
    wrongAnswers: ['checked', 'readonly', 'hidden']
  },
  {
    questionText: 'What does DOM stand for?',
    correctAnswer: 'Document Object Model',
    wrongAnswers: ['Data Object Model', 'Digital Order Map', 'Document Option Matrix']
  },
  {
    questionText: 'What does API stand for?',
    correctAnswer: 'Application Programming Interface',
    wrongAnswers: ['Advanced Program Input', 'Application Process Integration', 'Automated Program Interface']
  },
  {
    questionText: 'Which method converts JSON text to a JavaScript object?',
    correctAnswer: 'JSON.parse()',
    wrongAnswers: ['JSON.stringify()', 'parseJSON()', 'toJSON()']
  },
  {
    questionText: 'Which method converts a JavaScript object to JSON text?',
    correctAnswer: 'JSON.stringify()',
    wrongAnswers: ['JSON.parse()', 'stringifyJSON()', 'objectToJSON()']
  },
  {
    questionText: 'Which keyword declares a mutable block-scoped variable?',
    correctAnswer: 'let',
    wrongAnswers: ['var', 'const', 'int']
  },
  {
    questionText: 'Which keyword waits for a Promise inside an async function?',
    correctAnswer: 'await',
    wrongAnswers: ['return', 'yield', 'pause']
  },
  {
    questionText: 'Which structure represents a pending asynchronous value?',
    correctAnswer: 'Promise',
    wrongAnswers: ['Callback', 'Array', 'Event']
  },
  {
    questionText: 'Which array method adds an item to the end?',
    correctAnswer: 'push()',
    wrongAnswers: ['pop()', 'shift()', 'slice()']
  },
  {
    questionText: 'Which operator checks both value and type?',
    correctAnswer: '===',
    wrongAnswers: ['==', '=', '!=']
  },
  {
    questionText: 'Which event fires when a button is clicked?',
    correctAnswer: 'click',
    wrongAnswers: ['hover', 'submit', 'change']
  },
  {
    questionText: 'Which event fires when a form is submitted?',
    correctAnswer: 'submit',
    wrongAnswers: ['reset', 'click', 'load']
  },
  {
    questionText: 'Which browser storage lasts only for the current tab session?',
    correctAnswer: 'sessionStorage',
    wrongAnswers: ['localStorage', 'cookies', 'cacheStorage']
  },
  {
    questionText: 'Which browser storage persists across sessions?',
    correctAnswer: 'localStorage',
    wrongAnswers: ['sessionStorage', 'cookies', 'memoryStorage']
  },
  {
    questionText: 'Which web API lets browsers make network requests?',
    correctAnswer: 'fetch()',
    wrongAnswers: ['setTimeout()', 'console.log()', 'localStorage']
  },
  {
    questionText: 'Which protocol is the secure version of HTTP?',
    correctAnswer: 'HTTPS',
    wrongAnswers: ['FTP', 'SSH', 'SMTP']
  },
  {
    questionText: 'Which HTTP method is commonly used to fetch data?',
    correctAnswer: 'GET',
    wrongAnswers: ['POST', 'PUT', 'DELETE']
  },
  {
    questionText: 'Which HTTP method is used to create a new resource?',
    correctAnswer: 'POST',
    wrongAnswers: ['GET', 'PATCH', 'OPTIONS']
  },
  {
    questionText: 'Which HTTP method is used to update a resource completely?',
    correctAnswer: 'PUT',
    wrongAnswers: ['PATCH', 'POST', 'DELETE']
  },
  {
    questionText: 'Which HTTP method is used to update a resource partially?',
    correctAnswer: 'PATCH',
    wrongAnswers: ['POST', 'PUT', 'GET']
  },
  {
    questionText: 'Which HTTP method removes a resource?',
    correctAnswer: 'DELETE',
    wrongAnswers: ['GET', 'PUT', 'POST']
  },
  {
    questionText: 'Which status code means Not Found?',
    correctAnswer: '404',
    wrongAnswers: ['200', '301', '500']
  },
  {
    questionText: 'Which status code means Created?',
    correctAnswer: '201',
    wrongAnswers: ['204', '302', '400']
  },
  {
    questionText: 'What does CORS stand for?',
    correctAnswer: 'Cross-Origin Resource Sharing',
    wrongAnswers: [
      'Cross-Object Resource Sharing',
      'Client-Origin Request Security',
      'Cross-Origin Response System'
    ]
  },
  {
    questionText: 'Which concept verifies identity before access?',
    correctAnswer: 'Authentication',
    wrongAnswers: ['Authorization', 'Encryption', 'Caching']
  },
  {
    questionText: 'Which concept controls what an authenticated user can do?',
    correctAnswer: 'Authorization',
    wrongAnswers: ['Authentication', 'Compression', 'Validation']
  },
  {
    questionText: 'Which technology enables real-time bidirectional communication in browsers?',
    correctAnswer: 'WebSocket',
    wrongAnswers: ['REST', 'DNS', 'FTP']
  },
  {
    questionText: 'Which database stores data in collections and documents?',
    correctAnswer: 'MongoDB',
    wrongAnswers: ['MySQL', 'PostgreSQL', 'Redis']
  },
  {
    questionText: 'Which Node.js framework is commonly used to build REST APIs?',
    correctAnswer: 'Express.js',
    wrongAnswers: ['Django', 'Laravel', 'Spring Boot']
  },
  {
    questionText: 'Which React hook manages component state?',
    correctAnswer: 'useState',
    wrongAnswers: ['useEffect', 'useMemo', 'useRef']
  },
  {
    questionText: 'Which React hook runs side effects after rendering?',
    correctAnswer: 'useEffect',
    wrongAnswers: ['useState', 'useCallback', 'useReducer']
  }
];

const awtQuiz = {
  title: 'AWT 50 Question Quiz',
  description:
    'Practice quiz for Advanced Web Technology with 50 multiple-choice questions covering HTML, CSS, JavaScript, React, Node.js, HTTP, and MongoDB.',
  questions: questionBank.map((item) =>
    makeQuestion(item.questionText, item.correctAnswer, item.wrongAnswers, item.points)
  )
};

module.exports = awtQuiz;
