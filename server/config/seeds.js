const db = require('./connection');
const { Genre } = require('../models');

db.once('open', async () => {
    await Genre.deleteMany();

    const genres = await Genre.insertMany([
        { name: 'Portrait' },
        { name: 'Fashion' },
        { name: 'Wedding' },
        { name: 'Travel' },
        { name: 'Nature' },
        { name: 'Events' },
        { name: 'Journalism' },
        { name: 'Sports' },
        { name: 'Action' },
        { name: 'Lifestyle' },
        { name: 'Food' },
        { name: 'Animals' }
    ]);

    console.log('categories seeded');

    process.exit();
})