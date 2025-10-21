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
    template: `const fs = require('fs');\n\nfunction addTwoNumbers(a, b) {\n    // Write your code here\n    // Return the sum of a and b\n    return a + b;\n}\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(addTwoNumbers(a, b));`,
  },
  python: {
    label: "Python",
    monaco: "python",
    judge0ID: 71,
    template: `def add_two_numbers(a, b):\n    # Write your code here\n    # Return the sum of a and b\n    return a + b\n\nimport sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(add_two_numbers(a, b))`,
  },
  cpp: {
    label: "C++",
    monaco: "cpp",
    judge0ID: 62,
    template: `#include <iostream>
#include <sstream>

int addTwoNumbers(int a, int b) {
    // Return the sum of a and b
    return a + b;
}

int main() {
    // Reading input from stdin
    int a, b;
    std::cin >> a >> b;

    std::cout << addTwoNumbers(a, b) << std::endl;
    return 0;
}`,
  },
  java: {
    label: "Java",
    monaco: "java",
    judge0ID: 62,
    template: `import java.util.Scanner;\n\npublic class Main {\n    public static int addTwoNumbers(int a, int b) {\n        // Write your code here\n        // Return the sum of a and b\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(addTwoNumbers(a, b));\n    }\n}`,
  },
}

export const ROUTES = {
  ROOT: "/",
  PROBLEMS: {
    ROOT: "/problems",
    PROBLEM: "/problem/:id",
  },
  EXPLORE: "/explore",
  CONTEST: "/contest",
  DASHBOARD: {
    ROOT: "/dashboard",
    OVERVIEW: "/dashboard/overview",
  },
  ADMIN: {
    ROOT: "/admin",
    USERS: {
      ROOT: "/admin/users",
      CREATE: "/admin/users/create",
      EDIT: "/admin/users/edit/:id",
    },
    PROBLEMS: {
      ROOT: "/admin/problems",
      CREATE: "/admin/problems/create",
      EDIT: "/admin/problems/edit/:id",
    },
  },
  SETTINGS: {
    ROOT: "/settings",
    PROFILE: "/settings/profile",
    PASSWORD: "/settings/password",
  },
}
