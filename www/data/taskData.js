var taskData = {
    en: {
        "task1": {
            "name": "a + b",
            "description": "a and b are random marked cells, separated by an empty cell",
            "img": ""
        },
        "task2": {
            "name": "2*n",
            "description": "Multiply 'n' by 2, n are random marked cells placed by you.",
            "img": ""
        },
        "task3": {
            "name": "2^n",
            "description": "Pow 2 on n, n are random marked cells placed by you",
            "img": ""
        },
        "task4": {
            "name": "a-b",
            "description": "a>=b  'a' and 'b' are random marekd cells placed by you, separated by and empty one.",
            "img": ""
        }
    },

    bg: {
        "task1": {
            "name": "a + b",
            "description": "a и b са произволен брой тикчета, разделени с празна клетка",
            "img": ""
        },
        "task2": {
            "name": "2*n",
            "description": "Умножаваме n тикчета по 2, n е произволен брой тикчета поставени от вас.",
            "img": ""
        },
        "task3": {
            "name": "2^n",
            "description": "Повдигаме числото 2 на степен n, n е произволен брой тикчета поставени от вас.",
            "img": ""
        },
        "task4": {
            "name": "a-b",
            "description": "a>=b  a и b са произволен брой тикчета, разделени с празна клетка.",
            "img": ""
        }
    },
    solution: {
        "task1": {
            "testInput": ["P", "R", "P", "R", "P", "R", "P", "R", "P", "R", "P", "R", "P", "R", "R", "P", "R", "P", "R", "P", "R", "P", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"],
            "testFinal": [true, true, true, true, true, true, true, true, true, true, true],
            "solution":["P", "R", "P", "R", "P", "R"]
        },
        "task2": {
            "testInput": ["P", "R", "P", "R", "P", "R", "P", "L", "L", "L"],
            "testFinal": [true, true, true, true, true, true, true, true],
            "solution":[]
        },
        "task3": {
            "testInput": ["P", "R", "P", "R", "P", "R", "P", "L", "L", "L"],
            "testFinal": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            "solution":[]
        },
        "task4": {
            "testInput": ["P", "R", "P", "R", "P", "R", "P", "R", "P", "R", "P", "R", "P", "R", "R", "P", "R", "P", "R", "P", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"],
            "testFinal": [true, true, true, true],
            "solution":[]   
        }
    }
};