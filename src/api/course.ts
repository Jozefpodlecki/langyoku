export const getCourses = (criteria: any) => new Promise<any[]>((resolve, reject) => {

    const allCourses = [
        {
            id: 1,
            name: 'Personal Pronouns',
            languageId: 2
        },
        {
            id: 2,
            name: 'Possessive Pronouns',
            languageId: 2
        },
        {
            id: 3,
            name: 'Verbs',
            languageId: 2
        },
        {
            id: 4,
            name: 'Adjectives',
            languageId: 2
        },
        {
            id: 5,
            name: 'Adverbs',
            languageId: 2
        },
        {
            id: 6,
            name: 'Colors',
            languageId: 2
        },
        {
            id: 7,
            name: 'Numbers',
            languageId: 2
        }, 
        {
            id: 8,
            name: 'Food',
            languageId: 2
        },
        {
            id: 9,
            name: 'Frame of mind',
            languageId: 2
        },
        {
            id: 10,
            name: 'Personal Pronouns',
            languageId: 1
        },
        {
            id: 11,
            name: 'Verbs',
            languageId: 1
        },
        {
            id: 12,
            name: 'Colors',
            languageId: 1
        },
    ]

    const courses = allCourses.filter(pr => pr.languageId === criteria.languageId);

    resolve(courses);
})

export const getCourse = (id: number) => Promise.resolve([
    {
        id: 1,
        simplified: '黑色',
        traditional: null,
        pinyin: ['hei se', 'hei1 se4'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "black"
        ],
    },
    {
        id: 2,
        simplified: '蓝色',
        traditional: null,
        pinyin: ['lan se', 'lan2 se4'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "blue"
        ],
    },
    {
        id: 3,
        simplified: '绿色',
        traditional: null,
        pinyin: ['lv4 se4', 'lv4 se4'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "green",
        ],
    },
    {
        id: 4,
        simplified: '红色',
        traditional: null,
        pinyin: ['hong se', 'hong2 se4'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "red"
        ],
    },
    {
        id: 5,
        simplified: '艳红色',
        traditional: null,
        pinyin: ['yàn hóng sè', 'yàn hóng sè'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "crimson"
        ],
    },
    {
        id: 6,
        simplified: '深红色',
        traditional: null,
        pinyin: ['shēn hóng sè', 'shēn hóng sè'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "scarlet"
        ],
    },
    {
        id: 7,
        simplified: '粉红色',
        traditional: null,
        pinyin: ['fěn hóng sè', 'fen hong se4'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "pink"
        ],
    },
    {
        id: 8,
        simplified: '红色',
        traditional: null,
        pinyin: ['hong se', 'hong2 se4'],
        audioSrc: require('assets/audio/chinese/do1ngxi.mp3').default,
        meanings: [
            "red"
        ],
    }
])