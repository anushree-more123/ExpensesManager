import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'expenses',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'category', type: 'string' },
                { name: 'created_at', type: 'number' },
            ],
        }),
    ],
});
