import Courses from "components/Courses";
import Flashcards from "components/Flashcards";
import Stories from "components/Stories";
import Dialogs from "components/Dialogs";
import Games from "components/Games";
import { faCubes, faGamepad, faComments, faBookOpen, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { randomBoolean, randomItemFromArray, shuffle } from "utils";
import { dictionary } from "data";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
export * from './auth'
export * from './course'
export * from './flashcard'
export * from './game'
export * from './language'
export * from './story'
export * from './user'


export const getDialogs = (options) => Promise.resolve([
    {
        id: 1,
        name: 'Teacher and Student',
        value: [
            {
                id: 1,
                actor: 'Student',
                text: '老师好, 您忙不忙?',
                pinyin: 'Laoshi hǎo. Nín máng bù máng?',
                englishTranslation: 'Hello teacher, are you busy?'
            },
            {
                id: 2,
                actor: 'Teacher',
                text: '很忙. 你呢?',
                pinyin: 'Hěn máng. Nǐ ne?',
                englishTranslation: 'Very busy, and you?'
            },
            {
                id: 3,
                actor: 'Student',
                text: '我也很忙｡',
                pinyin: 'Wǒ yě hěn máng.',
                englishTranslation: 'I am also very busy.'
            },
            {
                id: 4,
                actor: 'Teacher',
                text: '那,一会儿见了｡',
                pinyin: 'Na, yī huĭr jiàn le.',
                englishTranslation: 'In that case, I’ll see you later.'
            },
            {
                id: 5,
                actor: 'Student',
                text: '回头见｡',
                pinyin: 'Huí tóu jiàn.',
                englishTranslation: 'See you later.'
            }
        ]
    },
    {
        id: 2,
        name: '',
        value: [
            {
                id: 1,
                actor: 'Student',
                text: '今天你要做什么？',
                pinyin: 'Jīntiān nǐ yào zuò shénme?',
                englishTranslation: 'What do you want to do today?'
            },
            {
                id: 2,
                actor: 'Student',
                text: '老师给我太多作业！我今天很忙。你呢？',
                pinyin: 'Lǎoshī gěi wǒ tài duō zuòyè! Wǒ jīntiān hěn máng. Nǐ ne?',
                englishTranslation: 'The teacher gave me too much homework! I will be busy today. What about you?'
            },
            {
                id: 3,
                actor: 'Student',
                text: '我也有很多作业。那我们一起做作业吧。',
                pinyin: 'Wǒ yěyǒu hěnduō zuòyè. Nà wǒmen yīqǐ zuò zuo yè ba.',
                englishTranslation: `I also have a lot of homework. In that case, let's do homework together then.`
            }
        ]
    }
]);

export const getLinks = () => Promise.resolve([
    {
        id: 1,
        name: 'twitter',
        url: 'https://www.twitter.com',
        icon: faTwitter
    },
    {
        id: 2,
        name: 'facebook',
        url: 'https://www.facebook.com',
        icon: faFacebook
    }
])

export const getMenuItems = () => Promise.resolve([
    {
        id: 1,
        name: 'Courses',
        link: '/user/courses',
        component: Courses,
        icon: faCubes
    },
    {
        id: 2,
        name: 'Games',
        link: '/user/games',
        component: Games,
        icon: faGamepad
    },
    {
        id: 3,
        name: 'Dialogs',
        link: '/user/dialogs',
        component: Dialogs,
        icon: faComments
    },
    {
        id: 4,
        name: 'Stories',
        link: '/user/stories',
        component: Stories,
        icon: faBookOpen
    },
    {
        id: 5,
        name: 'Flashcards',
        link: '/user/flashcards',
        component: Flashcards,
        icon: faStickyNote
    }
])


const context = require.context('../assets/images/', true, /\.(jpg|png)$/)
export const getMatches = ({language}) => new Promise<any[]>((resolve, reject) => {

    let result = [];
    let id = 1;
    const slice = dictionary.slice(0, 2);

    for(let item of slice) {
        const match1 = {
            id: id++,
            matchId: item.id,
            type: 'text',
            value: item.simplified
        }

        const rollImage = randomBoolean();
        let match2 = {};

        if(rollImage && item.images) {
            let value = randomItemFromArray(item.images);
            value = context(value).default;

            match2 = {
                id: id++,
                matchId: item.id,
                type: 'image',
                value
            }
        }
        else {
            match2 = {
                id: id++,
                matchId: item.id,
                type: 'text',
                value: randomItemFromArray(item.meanings)
            }
        }
        

        result = result.concat([match1, match2])
    }

    result = shuffle(result);

    resolve(result);
})