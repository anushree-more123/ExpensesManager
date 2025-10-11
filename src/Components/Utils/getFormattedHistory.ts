import { Categories, ExpenseEntry } from '../CreateExpenses/expensesSlice';

type RowItem = ExpenseEntry & {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
};

type SectionListData = {
  title: string;
  data: RowItem[];
};

export const getFormattedHistory = (
  expenseHistory: ExpenseEntry[], categoriesList: Categories[]
): SectionListData[] => {
  const grouped: Record<string, (RowItem & { timestamp: number })[]> = {};

  const now = new Date();
  const currentYear = now.getFullYear();

  expenseHistory.forEach(entry => {
    const dateObj = new Date(entry.date);

    const sameDay =
      dateObj.getDate() === now.getDate() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear();

    const titleForSection = sameDay
      ? 'Today'
      : dateObj.getFullYear() === currentYear
        ? dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
        : dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const categoryMeta = categoriesList.find(c => c.label === entry.category) ?? {
      icon: 'question',
      color: '#ccc',
    };

    const row: RowItem & { timestamp: number } = {
      id: entry.id,
      amount: entry.amount,
      note: entry.note ?? '',
      date: entry.date,
      category: entry.category,
      icon: categoryMeta.icon,
      color: categoryMeta.color,
      title: entry.note || entry.category,
      subtitle: entry.category,
      timestamp: dateObj.getTime(),
    };

    if (!grouped[titleForSection]) grouped[titleForSection] = [];
    grouped[titleForSection].push(row);
  });

  return Object.entries(grouped)
    .map(([title, raw]) => ({
      title,
      data: raw
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(({ timestamp, ...rest }) => rest),
      sortKey: Math.max(...raw.map(r => r.timestamp)),
    }))
    .sort((a, b) => {
      if (a.title === 'Today') return -1;
      if (b.title === 'Today') return 1;
      return b.sortKey - a.sortKey;
    })
    .map(({ sortKey, ...rest }) => rest);
};
