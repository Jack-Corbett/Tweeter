DROP TABLE IF EXISTS Following
DROP TABLE IF EXISTS Posts
DROP TABLE IF EXISTS Users

-- Create a new table called 'Users'

-- Create the table in the specified schema
CREATE TABLE Users
(
    UserId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Username [NVARCHAR](50) NOT NULL UNIQUE,
    Password [CHAR](60) NOT NULL
);

-- Create a new table called 'Posts'

-- Create the table in the specified schema
CREATE TABLE Posts
(
    PostId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    Content [NVARCHAR](200) NOT NULL,
    Time DATETIME NOT NULL
);

-- Create a new table called 'Following'

-- Create the table in the specified schema
CREATE TABLE Following
(
    FollowingId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    FollowedId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    PRIMARY KEY (FollowingId, FollowedId)
);
GO

-- Insert rows into table 'Users'
INSERT INTO Users
( -- columns to insert data into
 [Username], [Password]
)
VALUES
(
 N'Joe', '$2a$08$dvNgEbMHXk2AL.QA2ALELe91WFK47S5eeuMFiAhOt/P7ZLHuwhTFu'
),
(
 N'John', '$2a$08$SYlWbyVoa6uZ/TXRKWQr.OpNVxzuvfcqeKAouVicofogwqG8blqRW'
),
(
 N'Frank', '$2a$08$xm.daihN2e3O1HxBQFa2HesBGGdE9ZbsAmi7f7V.8XyOXdflzpLW6'
),
(
 N'Anna', '$2a$08$dvNgEbMHXk2AL.QA2ALELe91WFK47S5eeuMFiAhOt/P7ZLHuwhTFu'
),
(
 N'Mary', '$2a$08$xm.daihN2e3O1HxBQFa2HesBGGdE9ZbsAmi7f7V.8XyOXdflzpLW6'
)


-- Insert rows into table 'Posts'
INSERT INTO Posts
(
 [UserId], [Content], [Time]
)
VALUES
(
 1, N'Hi everyone, just got Tweeter! Absolutely loving it 🐦', CURRENT_TIMESTAMP
),
(
 1, N'Still loving it!', CURRENT_TIMESTAMP
),
(
 2, N'Just joined! Hello World!', CURRENT_TIMESTAMP
),
(
 3, N'Hey all, hope you all have a great day 👍', CURRENT_TIMESTAMP
),
(
 3, N'Just me again, hope you are all good!', CURRENT_TIMESTAMP
),
(
 4, N'This is my first time on Tweeter!', CURRENT_TIMESTAMP
),
(
 5, N'Wow, just had a great Cloud App Development lecture! 🔥', CURRENT_TIMESTAMP
),
(
 5, N'Hope you all have a great day!', CURRENT_TIMESTAMP
)


-- Insert rows into table 'Following'
INSERT INTO Following
( -- columns to insert data into
 [FollowingId], [FollowedId]
)
VALUES
( 
 1, 2
),
( 
 1, 3
),
(
 1, 4
),
(
 1, 5
),
(
 2, 1
),
(
 2, 3
),
(
 2, 4
),
(
 2, 5
),
(
 3, 1
),
(
 3, 2
),
(
 4, 1
),
(
 4, 5
)
GO