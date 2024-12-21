create schema news_melnikova collate utf8mb3_general_ci;
use schema news_melnikova;

create table news_items
(
    id          int auto_increment
        primary key,
    title       varchar(255)               not null,
    description text                       not null,
    image       varchar(255) default null  null,
    date        datetime     default now() not null
);

create table comments
(
    id      int auto_increment
        primary key,
    news_id int                       not null,
    author  varchar(255) default null null,
    text    text                      not null,
    constraint comments_news_items_id_fk
        foreign key (news_id) references news_items (id)
            on delete cascade
);
INSERT INTO news_melnikova.news_items (title, description, image, date) VALUES ('Facilitating the Rise of HTS Is the Latest US Blunder', 'Once the world’s only superpower, the American empire is falling because of incompetence, corruption and brutality. Supporting the war in Ukraine, enabling the genocide against Palestinians and empowering terrorists to take over Syria have expedited America’s fall.', null, DEFAULT);
INSERT INTO news_melnikova.news_items (title, description, image, date) VALUES ('Uncertain Transition in Syria After the Surprise End of Assad', 'Jean-Daniel Ruch is a former Swiss diplomat. He served as Switzerland’s ambassador to Serbia and Montenegro, then to Israel and finally to Turkey. Jean-Daniel also served as a political advisor to the prosecutor of the International Criminal Tribunal for the former Yugoslavia. Born in 1963 in Moutier, Canton Bern, Jean-Daniel studied international relations and international security in Geneva. Éditions Zarka published his book Crimes, Hate and Tremors in June 2024.', null, DEFAULT);
INSERT INTO news_melnikova.comments (news_id, author, text) VALUES (1, 'Jean-Daniel Ruch', 'Jean-Daniel Ruch is a former Swiss diplomat. He served as Switzerland’s ambassador to Serbia and Montenegro, then to Israel and finally to Turkey. Jean-Daniel also served as a political advisor to the prosecutor of the International Criminal Tribunal for the former Yugoslavia. Born in 1963 in Moutier.');
INSERT INTO news_melnikova.comments (news_id, author, text) VALUES (2, 'Mehdi Alavi', 'Mehdi Alavi is an author and also the founder and president of Peace Worldwide Organization, a non-religious, non-partisan charitable organization in the United States that promotes human rights, freedom, and peace for all. ');













