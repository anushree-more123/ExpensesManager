import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Expense extends Model {
    static table = 'expenses';

    @field('title') title!: string;
    @field('amount') amount!: number;
    @field('category') category!: string;
    @date('created_at') createdAt!: Date;
}
