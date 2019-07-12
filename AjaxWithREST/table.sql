create sequence guestbookSeq;

create table guestbook(
    gno         number(10),
    writer      varchar2(50),
    ip          varchar2(50),
    regdate     date,
    updateDate  date,
    content     varchar2(500),
    constraint guestbook_PK primary key(gno)
);

create sequence replySeq;

create table reply(
    rno         number(10),
    gno         number(10),
    replyer     varchar2(50),
    ip          varchar2(50),
    regdate     date,
    updateDate  date,
    reply       varchar2(50),
    constraint reply_PK primary key(rno),
    constraint reply_FK foreign key(gno) references guestbook(gno)
);