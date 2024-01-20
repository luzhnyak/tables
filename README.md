# React Tables

Стек технологій: React | TypeScript

Завдання.

Створити веб-застосунок із такою ієрархічною структурою сторінок(таблиць):
Accounts => Profiles => Campaigns

Table [Accounts] {
"accountId", "email", "authToken", "creationDate"
}
Table [Profiles of selected account] {
"profileId", "country", "marketplace"
}
Table [Campaigns of selected profile] {
"campaignId", "clicks", "cost", "date"
}

3 клікабельні таблиці, які при кліку по одному з рядків - переходять по структурі у вибрану entity.
Реалізувати сортування, фільтрування та пагінацію до кожної з таблиць.

Можна використовувати Bootstrap модулі для дизайну сторінок/таблиць.
Набір даних задати константами в коді. (або використати будь-які методи імітування виводу даних із бекенду)
