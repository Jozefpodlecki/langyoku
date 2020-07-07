export const getCourses = () => Promise.resolve([
    {
        id: 1,
        name: 'Personal Pronouns',
        languageName: 'chinese'
    },
    {
        id: 2,
        name: 'Possessive Pronouns',
        languageName: 'chinese'
    },
    {
        id: 3,
        name: 'Verbs',
        languageName: 'chinese'
    },
    {
        id: 4,
        name: 'Adjectives',
        languageName: 'chinese'
    },
    {
        id: 5,
        name: 'Adverbs',
        languageName: 'chinese'
    },
    {
        id: 6,
        name: 'Colors',
        languageName: 'chinese'
    },
    {
        id: 7,
        name: 'Numbers',
        languageName: 'chinese'
    }, 
    {
        id: 8,
        name: 'Food',
        languageName: 'chinese'
    },
    {
        id: 9,
        name: 'Frame of mind',
        languageName: 'chinese'
    }
])

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