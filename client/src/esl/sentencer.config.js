import { NOUNS } from "./nouns/index.js";

const pickRandomFrom = (arr = [], numItems = 1, excludedIndexes = []) => {
    if (our(arr).isNot.anArray) {
        return null;
    }
    const ln = arr.length;
    numItems = numItems > ln ? ln : numItems;
    let randomIndex = -1;
    const randomIndexes = [];
    const randomItems = [];
    for (let i = 0; i < numItems; i++) {
        let numIterations = 0;
        do {
            randomIndex = getRandomUpTo(ln - 1, 3);
            numIterations++;
        } while (
            numIterations < 200 &&
            (randomIndexes.includes(randomIndex) ||
                excludedIndexes.includes(randomIndex))
        );
        randomIndexes.push(randomIndex);
        randomItems.push(arr[randomIndex]);
    }
    //For a single item, return it directly. For more than one items, return an array.
    return numItems === 1 ? randomItems[0] : randomItems;
};

const sentencer_config = {
    actions: {
        number: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        a_noun__singular: function({ excluding = [] }) {
            return pickRandomFrom(NOUNS.singular);
        },
        noun__plural: function({ excluding = [] }) {
            return pickRandomFrom(NOUNS.plural);
        },
        noun__nonCount: function({ excluding = [] }) {
            return pickRandomFrom(NOUNS.nonCount);
        },
    },
};

export { sentencer_config as sentencerConfig };
