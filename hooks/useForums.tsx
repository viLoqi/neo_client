//TODO: impl
import { useState, useEffect } from "react"

interface ForumObject {
    classNumber: string
    section: string
    instructor: string
}
const useForums = () => {
    const [loading, setLoading] = useState(true)
    const [forums, setForums] = useState<{ [key: string]: {} }>({})

    useEffect(() => {
        if (loading) {
            setForums({
                "CSE 101": {
                    "01-LEC": {
                        "classNumber": "91340",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 11:00AM - 12:20PM",
                        "room": "HARRIMAN HLL 137 WESTCAMPUS",
                        "instructor": "Jalaa Hoblos",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "97578",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 5:00PM - 6:20PM",
                        "room": "ENGINEERING 145 WESTCAMPUS",
                        "instructor": "Kevin McDonnell",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95445",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "TuTh 10:30AM - 11:50AM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Francois Bernard Rameau",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 114": {
                    "01-LEC": {
                        "classNumber": "89805",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 12:30PM - 1:50PM",
                        "room": "LGT ENGR LAB 102 WESTCAMPUS",
                        "instructor": "Paul Fodor",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "91341",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 5:00PM - 6:20PM",
                        "room": "FREY HALL 104 WESTCAMPUS",
                        "instructor": "Praveen Tripathi",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95447",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "MoWe 2:00PM - 3:20PM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Tony Mione",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 150": {
                    "01-LEC": {
                        "classNumber": "91877",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 9:30AM - 10:50AM",
                        "room": "New Computer Science Bldg 120 WESTCAMPUS",
                        "instructor": "R. Sekar",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 214": {
                    "01-LEC": {
                        "classNumber": "89696",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 8:00AM - 9:20AM",
                        "room": "LGT ENGR LAB 102 WESTCAMPUS",
                        "instructor": "Ahmad Esmaili",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "91422",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 11:00AM - 12:20PM",
                        "room": "LGT ENGR LAB 102 WESTCAMPUS",
                        "instructor": "Pramod Ganapathi",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95449",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "TuTh 12:30PM - 1:50PM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Byungkon Kang",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 215": {
                    "01-LEC": {
                        "classNumber": "90983",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 2:00PM - 3:20PM",
                        "room": "ENGINEERING 145 WESTCAMPUS",
                        "instructor": "Pramod Ganapathi",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "92139",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 8:00AM - 9:20AM",
                        "room": "JAVITS LECTR 110 WESTCAMPUS",
                        "instructor": "Xianfeng Gu",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95451",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "MoWe 10:30AM - 11:50AM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Zhoulai Fu",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 216": {
                    "01-LEC": {
                        "classNumber": "91760",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 9:30AM - 10:50AM",
                        "room": "MELVILLE LBR W4550 WESTCAMPUS",
                        "instructor": "Ritwik Banerjee",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "96446",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 11:00AM - 12:20PM",
                        "room": "MELVILLE LBR W4550 WESTCAMPUS",
                        "instructor": "Ritwik Banerjee",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95550",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "MoWe 2:00PM - 3:20PM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Zhoulai Fu",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 220": {
                    "01-LEC": {
                        "classNumber": "89701",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 9:30AM - 10:50AM",
                        "room": "ENGINEERING 145 WESTCAMPUS",
                        "instructor": "Kevin McDonnell",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "97610",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 9:30AM - 10:50AM",
                        "room": "New Computer Science Bldg 120 WESTCAMPUS",
                        "instructor": "Daniel Benz",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95453",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "TuTh 10:30AM - 11:50AM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "AMOS OMONDI",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 260": {
                    "01-LEC": {
                        "classNumber": "90904",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 9:30AM - 10:50AM",
                        "room": "COMPUTER SCI 2120 WESTCAMPUS",
                        "instructor": "Paul Fodor",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 300": {
                    "01-LEC": {
                        "classNumber": "89705",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 3:30PM - 4:50PM",
                        "room": "HUMANITIES 3018 WESTCAMPUS",
                        "instructor": "Howard Gunston",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "90952",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 2:00PM - 3:20PM",
                        "room": "CHEMISTRY 128 WESTCAMPUS",
                        "instructor": "Jennifer Albanese",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "03-LEC": {
                        "classNumber": "89541",
                        "section": "03-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 9:30AM - 10:50AM",
                        "room": "STALLER CTR 3220 WESTCAMPUS",
                        "instructor": "Sara Santos",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "04-LEC": {
                        "classNumber": "91470",
                        "section": "04-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 11:00AM - 12:20PM",
                        "room": "MELVILLE LBR E4310 WESTCAMPUS",
                        "instructor": "Jennifer Young",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "05-LEC": {
                        "classNumber": "91736",
                        "section": "05-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 12:30PM - 1:50PM",
                        "room": "HUMANITIES 1023 WESTCAMPUS",
                        "instructor": "Patricia Medved",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95507",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "MoWe 3:30PM - 4:50PM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Christopher Houghton",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 303": {
                    "01-LEC": {
                        "classNumber": "89706",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 2:00PM - 3:20PM",
                        "room": "ENGINEERING 145 WESTCAMPUS",
                        "instructor": "Anita Wasilewska",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95534",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "TuTh 2:00PM - 3:20PM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "AMOS OMONDI",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 304": {
                    "01-LEC": {
                        "classNumber": "94397",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 9:30AM - 10:50AM",
                        "room": "FREY HALL 201 WESTCAMPUS",
                        "instructor": "Abid Malik",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 306": {
                    "01-LEC": {
                        "classNumber": "89707",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 8:00AM - 9:20AM",
                        "room": "FREY HALL 105 WESTCAMPUS",
                        "instructor": "Eugene Stark",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 310": {
                    "01-LEC": {
                        "classNumber": "89589",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 3:30PM - 4:50PM",
                        "room": "JAVITS LECTR 102 WESTCAMPUS",
                        "instructor": "Jalaa Hoblos",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 312": {
                    "01-LEC": {
                        "classNumber": "89546",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 11:00AM - 12:20PM",
                        "room": "STALLER CTR M0113 WESTCAMPUS",
                        "instructor": "Anthony Scarlatos",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "92085",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 6:30PM - 7:50PM",
                        "room": "HARRIMAN HLL 116 WESTCAMPUS",
                        "instructor": "Ralph Marra",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "03-LEC": {
                        "classNumber": "96482",
                        "section": "03-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 6:30PM - 7:50PM",
                        "room": "FREY HALL 317 WESTCAMPUS",
                        "instructor": "Sondra Charbadze",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 316": {
                    "01-LEC": {
                        "classNumber": "91767",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 3:30PM - 4:50PM",
                        "room": "EARTH&SPACE 001 WESTCAMPUS",
                        "instructor": "Christopher Kane",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95553",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "MoWe 9:00AM - 10:20AM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Tony Mione",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 320": {
                    "01-LEC": {
                        "classNumber": "91092",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 2:00PM - 3:20PM",
                        "room": "HUMANITIES 1003 WESTCAMPUS",
                        "instructor": "Eugene Stark",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "96472",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 8:00AM - 9:20AM",
                        "room": "LGT ENGR LAB 102 WESTCAMPUS",
                        "instructor": "Dongyoon Lee",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95533",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "TuTh 9:00AM - 10:20AM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Tony Mione",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 327": {
                    "01-LEC": {
                        "classNumber": "92142",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 3:30PM - 4:50PM",
                        "room": "FREY HALL 205 WESTCAMPUS",
                        "instructor": "Haibin Ling",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 331": {
                    "01-LEC": {
                        "classNumber": "91489",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 3:30PM - 4:50PM",
                        "room": "MELVILLE LBR W4550 WESTCAMPUS",
                        "instructor": "Amir Rahmati",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 332": {
                    "01-LEC": {
                        "classNumber": "91697",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 8:00PM - 9:20PM",
                        "room": "MELVILLE LBR W4550 WESTCAMPUS",
                        "instructor": "Klaus Mueller",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 333": {
                    "01-LEC": {
                        "classNumber": "91490",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 2:00PM - 3:20PM",
                        "room": "COMPUTER SCI 2205 WESTCAMPUS",
                        "instructor": "Anthony Scarlatos",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 334": {
                    "01-LEC": {
                        "classNumber": "89708",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 3:30PM - 4:50PM",
                        "room": "COMPUTER SCI 2205 WESTCAMPUS",
                        "instructor": "Anthony Scarlatos",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 337": {
                    "01-LEC": {
                        "classNumber": "91698",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 8:00AM - 9:20AM",
                        "room": "EARTH&SPACE 001 WESTCAMPUS",
                        "instructor": "Abid Malik",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 350": {
                    "01-LEC": {
                        "classNumber": "91912",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 3:30PM - 4:50PM",
                        "room": "FREY HALL 201 WESTCAMPUS",
                        "instructor": "Supartha Podder",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 353": {
                    "01-LEC": {
                        "classNumber": "91914",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 5:00PM - 6:20PM",
                        "room": "JAVITS LECTR 109 WESTCAMPUS",
                        "instructor": "Yifan Sun",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "97314",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "MoWe 10:30AM - 11:50AM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Byungkon Kang",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 354": {
                    "01-LEC": {
                        "classNumber": "96480",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 5:00PM - 6:20PM",
                        "room": "MELVILLE LBR W4550 WESTCAMPUS",
                        "instructor": "Niranjan Balasubramanian",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 355": {
                    "01-LEC": {
                        "classNumber": "91111",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 2:00PM - 3:20PM",
                        "room": "JAVITS LECTR 103 WESTCAMPUS",
                        "instructor": "Joe Mitchell",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "92184",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "MoWe 2:00PM - 3:20PM",
                        "room": "ONLINE ONLINE ONLINE",
                        "instructor": "Joe Mitchell",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 356": {
                    "01-LEC": {
                        "classNumber": "96481",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 2:00PM - 3:20PM",
                        "room": "MELVILLE LBR W4550 WESTCAMPUS",
                        "instructor": "Mike Ferdman",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 357": {
                    "01-LEC": {
                        "classNumber": "94398",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 12:30PM - 1:50PM",
                        "room": "JAVITS LECTR 101 WESTCAMPUS",
                        "instructor": "Anshul Gandhi",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 360": {
                    "01-LEC": {
                        "classNumber": "92029",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 12:30PM - 1:50PM",
                        "room": "MELVILLE LBR W4550 WESTCAMPUS",
                        "instructor": "Amir Rahmati",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    }
                },
                "CSE 373": {
                    "01-LEC": {
                        "classNumber": "89709",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 12:30PM - 1:50PM",
                        "room": "JAVITS LECTR 102 WESTCAMPUS",
                        "instructor": "Rezaul Chowdhury",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95455",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "MoWe 3:30PM - 4:50PM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Jihoon Ryoo",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                },
                "CSE 416": {
                    "01-LEC": {
                        "classNumber": "91710",
                        "section": "01-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 5:00PM - 6:20PM",
                        "room": "COMPUTER SCI 2120 WESTCAMPUS",
                        "instructor": "Robert Kelly",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "02-LEC": {
                        "classNumber": "91711",
                        "section": "02-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 12:30PM - 1:50PM",
                        "room": "HARRIMAN HLL 112 WESTCAMPUS",
                        "instructor": "Shuai Mu",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "03-LEC": {
                        "classNumber": "92187",
                        "section": "03-LEC",
                        "semester": "Fall",
                        "classTime": "TuTh 2:00PM - 3:20PM",
                        "room": "COMPUTER SCI 2120 WESTCAMPUS",
                        "instructor": "Robert Kelly",
                        "meetingDates": "08/26/2024 - 12/19/2024"
                    },
                    "90-LEC": {
                        "classNumber": "95552",
                        "section": "90-LEC",
                        "semester": "Fall SK",
                        "classTime": "TuTh 3:30PM - 4:50PM",
                        "room": "Korea  OUTOFCNTRY",
                        "instructor": "Yoon Seok Yang",
                        "meetingDates": "08/23/2024 - 12/12/2024"
                    }
                }
            })
            setLoading(false)
        }
    }, [loading])

    return { forums, loading }
}

export default useForums;