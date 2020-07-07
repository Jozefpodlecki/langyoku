const defaultCriteria = {
    page: 0,
    pageSize: 9,
    name: ''
}

export const getLanguages = (criteria: any) => new Promise<any[]>((resolve, reject) => {
    
    criteria = {
        ...defaultCriteria,
        ...criteria
    }

    const data = [
        {
            id: 1,
            name: "Spanish",
            url: require('assets/flags/es.png').default
        },
        {
            id: 2,
            name: "Chinese",
            url: require('assets/flags/cn.png').default
        },
        {
            id: 3,
            name: "Portuguese",
            url: require('assets/flags/pt.png').default
        },
        {
            id: 4,
            name: "Japanese",
            url: require('assets/flags/jp.png').default
        },
        {
            id: 5,
            name: "Korean",
            url: require('assets/flags/kr.png').default
        },
        {
            id: 6,
            name: "German",
            url: require('assets/flags/de.png').default
        },
        {
            id: 7,
            name: "Italian",
            url: require('assets/flags/at.png').default
        },
        {
            id: 8,
            name: "Greek",
            url: require('assets/flags/gr.png').default
        },
        {
            id: 9,
            name: "Dutch",
            url: require('assets/flags/nl.png').default
        },
        {
            id: 10,
            name: "French",
            url: require('assets/flags/gf.png').default
        },
        {
            id: 11,
            name: "Turkish",
            url: require('assets/flags/tr.png').default
        }
    ];

    let result = data;
    let { name, page, pageSize } = criteria;

    if(criteria.name) {
        name = name.toLowerCase();
        result = result.filter(pr => pr.name.toLowerCase().includes(name))
    }

    const from = page * pageSize;
    result = result.slice(from, from + pageSize);
    
    resolve(result);
})