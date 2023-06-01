create database library;

create table author
(
    id         serial             not null
        constraint author_id_pk
            primary key,
    name       varchar            not null,
    rating     numeric(3, 1),
    created_at timestamp without time zone default now() not null
);

create table book
(
    id         serial             not null
        constraint book_id_pk
            primary key,
    name       varchar            not null,
    author_id  integer            not null
        constraint author_id_fk
            references author (id)
            on delete cascade,
    price      numeric(6, 2),
    created_at timestamp without time zone default now() not null
);

insert into author (name, rating) values ('Федор Достоевский', 10);
insert into author (name, rating) values ('Михаил Булгаков', 9.9);
insert into author (name, rating) values ('Александр Пушкин', 9.8);
insert into author (name, rating) values ('Николай Гоголь', 9.7);
insert into author (name, rating) values ('Лев Толстой', 9.6);
insert into author (name, rating) values ('Александр Дюма', 9.5);
insert into author (name, rating) values ('Антон Чехов', 9.4);
insert into author (name, rating) values ('Иван Тургенев', 9.3);
insert into author (name, rating) values ('Эрих Мария Ремарк', 9.2);
insert into author (name, rating) values ('Артур Конан Дойль', 9.1);
insert into author (name, rating) values ('Виктор Гюго', 9);
insert into author (name, rating) values ('Жюль Верн', 8.9);
insert into author (name, rating) values ('Джек Лондон', 8.8);
insert into author (name, rating) values ('Эрнест Хемингуэй', 8.7);
insert into author (name, rating) values ('Михаил Шолохов', 8.6);
insert into author (name, rating) values ('Алексей Толстой', 8.5);
insert into author (name, rating) values ('Агата Кристи', 8.4);
insert into author (name, rating) values ('Михаил Лермонтов', 8.3);
insert into author (name, rating) values ('Валентин Пикуль', 8.2);
insert into author (name, rating) values ('Александр Грибоедов', 8.1);
insert into author (name, rating) values ('Борис Васильев', 8);
insert into author (name, rating) values ('Марк Твен', 7.9);
insert into author (name, rating) values ('Николай Лесков', 7.8);
insert into author (name, rating) values ('Уильям Шескпир', 7.7);
insert into author (name, rating) values ('Василий Шукшин', 7.6);
insert into author (name, rating) values ('Иван Гончаров', 7.5);
insert into author (name, rating) values ('Александр Волков', 7.4);
insert into author (name, rating) values ('Максим Горький', 7.3);
insert into author (name, rating) values ('Шарлотта Бронте', 7.2);
insert into author (name, rating) values ('Станислав Лем', 7.1);
insert into author (name, rating) values ('Даниель Дефо', 7);

insert into book (name, author_id, price) values ('Преступление и наказание', 1, 100.12);
insert into book (name, author_id, price) values ('Братья Карамазовы', 1, 105);
insert into book (name, author_id, price) values ('Игрок', 1, 110.23);
insert into book (name, author_id, price) values ('Хамелеон', 7, 115);
insert into book (name, author_id, price) values ('Человек в футляре', 7, 120.34);
insert into book (name, author_id, price) values ('Джейн Эйр', 29, 125);
insert into book (name, author_id, price) values ('Мастер и Маргарита', 2, 130.45);
insert into book (name, author_id, price) values ('Собачье сердце', 2, 135);
insert into book (name, author_id, price) values ('Капитанская дочка', 3, 140.67);
insert into book (name, author_id, price) values ('Дубровский', 3, 145);
insert into book (name, author_id, price) values ('Мертвые души', 4, 150.89);
insert into book (name, author_id, price) values ('Война и мир', 5, 155);
insert into book (name, author_id, price) values ('Анна Каренина', 5, 160.12);
insert into book (name, author_id, price) values ('После бала', 5, 165);
insert into book (name, author_id, price) values ('Детство', 5, 170.34);
insert into book (name, author_id, price) values ('Кавказский пленник', 5, 175);