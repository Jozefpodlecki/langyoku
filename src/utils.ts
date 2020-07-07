import moment from "moment";

export const delay = (milliseconds: number) => new Promise<void>((resolve, reject) => setTimeout(resolve, milliseconds));

export const formatTime = (startDate: any, endDate: any) => {
    const diff = moment(endDate).diff(startDate);
    const duration = moment.duration(diff);
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    let str = '';

    if(minutes === 1) {
        str = str + `${minutes} minute`
    }
    else {
        str = str + `${minutes} minutes`
    }

    if(seconds === 1) {
        str = str + ` ${seconds} second`
    }
    else {
        str = str + ` ${seconds} seconds`    
    }
    
    return str;
}

export const parseTries = (tries: number[]) => {

    return tries.reduce((acc, value) => {
        if(value === 1) {
            acc[0].value = acc[0].value + 1;
            return acc;
        }

        if(value === 2) {
            acc[1].value = acc[1].value + 1;
            return acc;
        }

        acc[2].value = acc[2].value + 1;
        return acc;
    }, [
        { name: 'First try', value: 0 },
        { name: 'Second try', value: 0 },
        { name: 'Multiple tries', value: 0 },
    ])
}

export const randomBoolean = () => Boolean(Math.floor(Math.random() * 2));

export const randomItemFromArray = (array: any[]) => {
    const length = array.length;
    const randomIndex = Math.floor(Math.random() * length);

    return array[randomIndex];
}

export const shuffle = (array: any[]) => {
    const length = array.length;
    let randomIndex = Math.floor(Math.random() * length);
    const randomIndexes = new Set<number>();

    while(randomIndexes.size !== length) {
        randomIndex = Math.floor(Math.random() * length);

        if(randomIndexes.has(randomIndex)) {
            continue;
        }

        randomIndexes.add(randomIndex);
    }

    return [...randomIndexes.values()].map(rand => array[rand]);
}
