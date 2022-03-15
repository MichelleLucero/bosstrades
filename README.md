# bosstrades
Track insider transactions based on your stock or insider trader of interest

Live on Heroku [here](http://bosstrades.herokuapp.com/)
## User Stories
- As a user, I should be able to search for companies and insider transactions
- As a logged in user, I should be able to follow companies/insider traders
- As a logged in user, I should be able to unfollow companies/insider traders
- As a logged in user, I should be able to see the companies/insider traders I follow in my profile page

## ERD
![Untitled](https://i.imgur.com/tPyl6w6.png)

## Endpoints
### Auth
| Request Type | URL          | Functionality   | Access |
| ------------ | ------------ | --------------- | ------ |
| POST         | api/member   | Register a User | Public |
| POST         | api/auth     | Logs in a User  | Public |

### Member
| Request Type | URL          | Functionality       | Access  |
| ------------ | ------------ | ------------------- | ------- |
| PUT          | api/member   | Update User Details | Private |
| DELETE       | api/member   | Delete a User       | Private |
| GET          | api/member   | Get User Details    | Private |

### Company
| Request Type | URL                  | Functionality     | Access  |
| ------------ | -------------------- | ----------------- | ------- |
| POST         | api/member/company   | Add a Company     | Private |
| GET          | api/member/company   | Get all Companies | Private |
| DELETE       | api/member/company   | Delete a Company  | Private |

### Person
| Request Type | URL                 | Functionality            | Access  |
| ------------ | ------------------- | ------------------------ | ------- |
| POST         | api/member/person   | Add an Insider Trader    | Private |
| GET          | api/member/person   | Get all Insider Traders  | Private |
| DELETE       | api/member/person   | Delete an Insider Trader | Private |


### Search
| Request Type | URL                          | Functionality                                                               | Access  |
| ------------ | ---------------------------- | --------------------------------------------------------------------------- | ------- |
| POST         | api/search                   | Get all search results                                                      | Public  |
| GET          | api/search/following/:search | Get all the companies/insider traders the user follows based on search term | Private |
| GET          | api/search/:search           | Get all the companies/insider traders based on search term                  | Public  |

### Transactions
| Request Type | URL                          | Functionality                              | Access |
| ------------ | ---------------------------- | ------------------------------------------ | ------ |
| GET          | api/search/person/:personid  | Get all transactions of an Insider Trader  | Public |
| GET          | api/search/company/:ticker   | Get all transactions of a Company          | Public |

## Hurdles

## Local Installation
### Prerequisites
1. Node.js
2. PostgreSQL

### Clone Repo
Run the following in the directory of your choosing:
```
git clone https://github.com/MichelleLucero/bosstrades.git
```

### Running bosstrades
In the project's root directory run the following commands:
```
cd server 
npm install
cd ../client
npm install
```
In bosstrades/server, run:
```
npm run server
```
Open a separate terminal and navigate to bosstrades/client and run:
```
npm start
```
After running all the commands you can find bosstrades on [http://localhost:3000](http://localhost:3000)

## Tech Stack
### Frontend
- React.js
- MUI
- Context
### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT

## Contributer
- [Michelle Lucero](https://github.com/MichelleLucero)
