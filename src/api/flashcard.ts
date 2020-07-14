import Flashcards from "components/Flashcards";

export const getFlashcard = (id: number) => Promise.resolve({
    name: 'HSK 1',
    cards: [
    {
        id: 1,
        simplified: '东西',
        traditional: '東西',
        pinyin: ['dōng xi', 'dong1 xi5'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "thing",
            "stuff",
            "person"
        ],
        breakdown: [
            {
                id: 1,
                simplified: '东',
                traditional: '东',
                pinyin: ['dōng', 'dong1'],
                meanings: [
                    "east",
                    "host (i.e. sitting on east side of guest)",
                    "landlord",
                    "surname dong"
                ],
                strokeImage: require('assets/strokes/dong11.gif').default,
                radicals: [
                    {
                        id: 1,
                        value: "东",
                        pinyin: "dōng",
                        meanings: [
                            "east"
                        ]
                    }
                ]
            },
            {
                id: 2,
                simplified: '西',
                traditional: '西',
                pinyin: ['xi', 'xi1'],
                meanings: [
                    "the West",
                    "abbr. for Spain 西班牙",
                    "Spanish"
                ],
                strokeImage: require('assets/strokes/xi11.gif').default,
                radicals: [
                    {
                        id: 1,
                        value: "西",
                        pinyin: "xī",
                        meanings: [
                            "west"
                        ]
                    }
                ]
            }
        ],
        examples: [
            ["别忘了你的东西。", "Don’t forget your things."],
            ["我想下去帮她拿东西。", "I wanted to go downstairs to help her get something."],
        ]
    },
    {
        id: 2,
        simplified: '商店',
        traditional: null,
        pinyin: ['shāng diàn', ''],
        audioSrc: require('assets/audio/chinese/shang1dian4.mp3').default,
        meanings: [
            "store",
            "shop"
        ],
        breakdown: [
            {
                id: 1,
                simplified: '商',
                pinyin: ['shāng', 'shang1'],
                meanings: [
                    "the shang dynasty, 16th to 11th century bc",
                    "commerce",
                    "merchant",
                    "dealer",
                    "to consult",
                    "quotient",
                    "2nd note in pentatonic scale"
                ],
                radicals: [
                    {
                        id: 1,
                        value: "亠",
                        pinyin: "tóu",
                        meanings: [
                            "head"
                        ]
                    },
                    {
                        id: 2,
                        value: "丷",
                        pinyin: "bā",
                        meanings: [
                            "eight"
                        ]
                    },
                    {
                        id: 3,
                        value: "冂",
                        pinyin: "jiōng",
                        meanings: [
                            "outskirts"
                        ]
                    },
                    {
                        id: 4,
                        value: "八",
                        pinyin: "bā",
                        meanings: [
                            "eight"
                        ]
                    },
                    {
                        id: 5,
                        value: "口",
                        pinyin: "kǒu",
                        meanings: [
                            "mouth"
                        ]
                    }
                ]
            },
            {
                id: 2,
                simplified: '店',
                pinyin: ['diàn', 'shang1'],
                meanings: [
                    "inn",
                    "shop",
                    "store"
                ],
                radicals: [
                    {
                        id: 1,
                        value: "广",
                        pinyin: "guǎng",
                        meanings: [
                            "shelter"
                        ]
                    },
                    {
                        id: 2,
                        value: "卜",
                        pinyin: "bǔ",
                        meanings: [
                            "divination"
                        ]
                    },
                    {
                        id: 3,
                        value: "口",
                        pinyin: "kǒu",
                        meanings: [
                            "mouth"
                        ]
                    }
                ]
            }
        ],
        examples: [
        ]
    }
]});

export const getFlashcards = (criteria: any) => new Promise<any[]>((resolve, reject) => {
    
    const allFlashcards = [
        {
            id: 1,
            name: 'HSK 1',
            languageId: 2
        },
        {
            id: 2,
            name: 'HSK 2',
            languageId: 2
        },
        {
            id: 3,
            name: 'HSK 3',
            languageId: 2
        },
        {
            id: 4,
            name: 'HSK 4',
            languageId: 2
        },
        {
            id: 5,
            name: 'HSK 5',
            languageId: 2
        },
        {
            id: 6,
            name: 'HSK 6',
            languageId: 2
        }
    ];

    const flashcards = allFlashcards.filter(pr => criteria.languageId === pr.languageId);

    resolve(flashcards);
})