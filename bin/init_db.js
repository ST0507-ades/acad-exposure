const { query, end } = require('../database');
const faker = require('@faker-js/faker');

// What is this doing?
const createTableSql = `
    DROP TABLE IF EXISTS data_table;
    CREATE TABLE data_table (
        id SERIAL primary key,
        name VARCHAR not null,
        handle VARCHAR not null,
        img VARCHAR not null,
        likes INT not null,
        tweet VARCHAR not null
    );
`;

let insertSql = `
    INSERT INTO data_table (name, handle, img, likes, tweet) VALUES
`;
const insertParams = [];
const avatars = [`elyse`, `kristy`, `lena`, `lindsay`, `mark`, `matthew`, `molly`, `patrick`, `rachel`].map(
    (name) => `https://semantic-ui.com/images/avatar2/large/${name}.png`,
);
const numOfTweets = 100;
let p = 1;

/**
 * What is this doing?
 *  - How many tweets are we creating?
 *  - How many different avatars will we see?
 *  - What is the range of possible likes each tweet?
 */
for (let i = 0; i < numOfTweets; i++) {
    const fakeName = faker.name.findName();
    const fakeHandle = faker.internet.userName();
    const fakeImg = avatars[i % avatars.length];
    const fakeLikes = Math.floor(faker.datatype.number({ min: 0, max: 1000 }));
    const fakeTweet = faker.lorem.sentence(10, 10);
    insertParams.push(fakeName);
    insertParams.push(fakeHandle);
    insertParams.push(fakeImg);
    insertParams.push(fakeLikes);
    insertParams.push(fakeTweet);

    insertSql += `($${p++}, $${p++}, $${p++}, $${p++}, $${p++})`;
    if (i + 1 < numOfTweets) insertSql += `,`;
}

console.log('Creating table');
query(createTableSql, [], true)
    .then(function () {
        console.log('✔️ Successfully created table');
        console.log('Creating fake tweets');
        return query(insertSql, insertParams, true);
    })
    .then(function () {
        console.log('✔️ Successfully created fake tweets');
    })
    .catch(function (error) {
        console.log(`!!!ERROR!!!`);
        console.error(error);
    })
    .finally(function () {
        // What are we ending?
        return end();
    });
