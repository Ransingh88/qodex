export const THEME = {
  STORAGE_KEY: "theme-preference",
  DARK: "dark",
  LIGHT: "light",
}

export const ERROR_MESSAGE = {
  USER_NOT_FOUND: "No user found with this email.",
  INVALID_PASSWORD: "Incorrect password. Please try again.",
}

export const LANGUAGES = {
  javascript: {
    label: "Javascript",
    monaco: "javascript",
    judge0ID: 63,
    template: `// Write your JavaScript code here
    function main(){
      console.log("Hello World")
    }
      main();`,
  },
  python: {
    label: "Python",
    monaco: "python",
    judge0ID: 71,
    template: `# Write your Python code here
    def main():
      print("Hello World")
    main()`,
  },
  cpp: {
    label: "C++",
    monaco: "cpp",
    judge0ID: 62,
    template: `// Write your C++ code here
    #include <iostream>
    using namespace std;
    int main() {
      cout << "Hello World" << endl;
      return 0;
    }`,
  },
  java: {
    label: "Java",
    monaco: "java",
    judge0ID: 62,
    template: `// Write your Java code here
    public class Main {
      public static void main(String[] args) {
        System.out.println("Hello World");
      }
    }`,
  },
}
