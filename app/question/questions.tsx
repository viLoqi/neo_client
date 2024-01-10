let questions = [
    {
        course: "CSE 114",
        deckName: "Override vs Overload?",
        question: "class Plant {\n\tString getType() {\n\t\treturn \"general plant\";\n\t}\n}\n\nclass Tree extends Plant {\n\t@override\n\tString getType() {\n\t\treturn \"Tree\";\n\t}\n}\n\n public class TestPlant {\n\tpublic static void main(String[] args){\n\t\t Plant plant = new Tree();\n\t}\n}\n\nWhat's the output of main?",
        choices: [
            "A) \"general plant\"", "B) \"tree\"", "C) The code does not compile", "D) Throws a runtime exception"
        ],
        correctChoiceIndex: 1,
    }
]

export default questions;