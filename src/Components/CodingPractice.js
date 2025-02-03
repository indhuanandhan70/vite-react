/* global Sk */

import React, { useState, useEffect } from "react";
import codingQuestions from "./codingQuestions";
import "./CodingPractice.css";

// Function to dynamically load Skulpt for Python execution
const loadSkulpt = () => {
  return new Promise((resolve, reject) => {
    if (window.Sk) {
      resolve(); // Skulpt already loaded
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/skulpt@latest/skulpt.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);

    const scriptLib = document.createElement("script");
    scriptLib.src = "https://cdn.jsdelivr.net/npm/skulpt@latest/skulpt-stdlib.js";
    document.body.appendChild(scriptLib);
  });
};

const CodingPractice = ({ updateCodingProgress }) => {
  const [language, setLanguage] = useState("javascript"); // Default language
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState(codingQuestions[currentIndex].functionSignature);
  const [output, setOutput] = useState("");
  const [marks, setMarks] = useState(0);

  const currentProblem = codingQuestions[currentIndex];

  useEffect(() => {
    setCode(currentProblem.functionSignature);
    setOutput("");
  }, [currentIndex, currentProblem]);

  useEffect(() => {
    if (language === "python") {
      loadSkulpt(); // Load Skulpt for Python execution
    }
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode(""); // Clear the code editor when the language changes
  };

  // Function to execute Python code using Skulpt
  const runPython = async (code, input) => {
    await loadSkulpt(); // Ensure Skulpt is loaded

    return new Promise((resolve, reject) => {
      let output = "";

      // Configure Skulpt with proper output handling
      Sk.configure({
        output: (text) => {
          output += text; // Capture Skulpt's output
        },
        read: (filename) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
            throw new Error(`File not found: '${filename}'`);
          }
          return Sk.builtinFiles["files"][filename];  // Read file contents
        },
      });

      // Wrap user code with a print statement to capture results
      const wrappedCode = `
${code}
print(${currentProblem.functionSignature.split(" ")[1].split("(")[0]}(*${JSON.stringify(input)}))
      `;

      Sk.misceval
        .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, wrappedCode))  // Execute the code
        .then(() => resolve(output.trim()))  // Resolve with output
        .catch((err) => {
          console.error("Error during Python execution:", err);
          reject(`Python execution error: ${err.toString()}`); // Reject with an error message
        });
    });
  };

  // Handle form submission with code execution
  const handleSubmit = async () => {
    try {
      let result;

      if (language === "javascript") {
        // JavaScript Code Execution
        // eslint-disable-next-line no-new-func
        const userFunction = new Function(`return (${code})`)();
        const exampleArgs = currentProblem.exampleInput;
        result = userFunction(...exampleArgs);
      } else if (language === "python") {
        // Python Code Execution using Skulpt
        result = await runPython(code, currentProblem.exampleInput);
      } else if (language === "java") {
        // Placeholder for Java execution
        alert("Java execution requires additional setup with a Java interpreter.");
        return;
      }

      // Compare the results
      if (JSON.stringify(result) === JSON.stringify(currentProblem.solution(...currentProblem.exampleInput))) {
        setOutput("Correct! 🎉");
        setMarks((prev) => prev + 10);
        updateCodingProgress(10);
      } else {
        setOutput(`Incorrect. Output: ${result}`);
      }
    } catch (error) {
      console.error("Error in code submission:", error);
      setOutput(`Error in code execution: ${error}`);
    }
  };

  // Handle moving to the next problem
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % codingQuestions.length);
  };

  return (
    <div className="coding-practice">
      <h2>Online Coding Practice</h2>
      <div className="problem-section">
        <h3>{currentProblem.title}</h3>
        <p>{currentProblem.description}</p>
        <p>
          <strong>Example Input:</strong> {JSON.stringify(currentProblem.exampleInput)}
        </p>
        <p>
          <strong>Example Output:</strong> {JSON.stringify(currentProblem.exampleOutput)}
        </p>
      </div>

      <div className="language-selector">
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        className="code-editor"
        placeholder={`Write your ${language} code here`}
      ></textarea>

      <button onClick={handleSubmit} className="submit-button">
        Submit Code
      </button>
      <button onClick={handleNext} className="next-button">
        Next Problem
      </button>

      <div className="output-section">
        <h4>Output:</h4>
        <p>{output}</p>
        <p>
          <strong>Total Marks:</strong> {marks}
        </p>
      </div>
    </div>
  );
};

export default CodingPractice;
