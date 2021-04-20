CREATE TABLE messages (
    messageId serial not null primary key,
    messageText text not null,
    userId text not null,
    timestamp timestamp(0) not null default current_timestamp(0)
)

insert into messages(messageText, userId)  values('Am so proud of Steve!!', '1ed00b87-74b1-4887-914c-0112d7a40acb');
insert into messages(messageId, messageText, userId)  values(72, 'Am asserting my own independence via messageId', '1ed00b87-74b1-4887-914c-0112d7a40acb');
insert into messages(messageText, userId)  values('Our SteveChat DB is ready - am v excited', 'd6bedb1c-0a85-4a29-8412-50a3f726b731');