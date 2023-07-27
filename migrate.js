require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");
const argon2 = require("argon2");

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

    await connection.query(`drop database if exists ${DB_NAME}`);
    await connection.query(`create database ${DB_NAME}`);
    await connection.query(`use ${DB_NAME}`);
    const sql = fs.readFileSync("./makesense.sql", "utf8");

    await connection.query(sql);

    const role = [
        { name : "Décisionnaire"},
        { name : "Employer"},
        { name : "Bénévole"},
    ];

  for (let i = 0; i < role.length; i++) {
    const { name } = role[i];
    await connection.query("insert into role (name) values (?)", [name]);
    await console.log(`Add Role : ${name}`);
  }

  await console.log(`Total Role : ${role.length}`);

  const job = [
    { name : "Directeur Associatif" },
    { name : "Directeur Général" },
    { name : "Service Civique" },
    { name : "RH" },
    { name : "Développeur" },
    { name : "Technicien" },
    { name : "Commercial" },
    { name : "Brand Manager" },
    { name : "Design Director" },
    { name : "Technicien surface" },
    { name : "comptable" },
    { name : "Réceptionniste" },
    { name : "Community Manager" },

  ];

  for (let i = 0; i < job.length; i++) {
    const { name } = job[i];
    await connection.query("insert into job (name) values (?)", [name]);
    await console.log(`Add Job : ${name}`);
  }

  await console.log(`Total Job : ${job.length}`);

  const user = [
    {
        "firstname": "Alexandre",
        "lastname": "Renard",
        "email": "alexandre.renard98@gmail.com",
        "password": "alex",
        "avatar": `${process.env.BACKEND_URL}/upload/user/alexandre_renard.png`,
        "affiliated_site": "France",
        "tel": "07 12 75 49 57",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Etienne",
        "lastname": "Chamarier",
        "email": "etienne@makesense.org",
        "password": "etienne",
        "avatar": `${process.env.BACKEND_URL}/upload/user/etienne_chamarier.png`,
        "affiliated_site": "France",
        "tel": "06 32 44 47 84",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Thomas",
        "lastname": "Fachinetti",
        "email": "thomas@makesense.org",
        "password": "thomas",
        "avatar": `${process.env.BACKEND_URL}/upload/user/thomas_fachinetti.png`,
        "affiliated_site": "France",
        "tel": "06 77 55 88 99",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Jean-Maxime",
        "lastname": "Djnt",
        "email": "jean-maxime@makesense.org",
        "password": "jean-maxime",
        "avatar": `${process.env.BACKEND_URL}/upload/user/jean_maxime.png`,
        "affiliated_site": "France",
        "tel": "07 22 33 44 75",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Kader",
        "lastname": "Benderdouche",
        "email": "kader@makesense.org",
        "password": "kader",
        "avatar": `${process.env.BACKEND_URL}/upload/user/kader_benderdouche.png`,
        "affiliated_site": "France",
        "tel": "06 11 77 74 56",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
      "firstname": "John",
      "lastname": "Doe",
      "email": "user@makesense.org",
      "password": "user",
      "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
      "affiliated_site": "France",
      "tel": "06 11 00 96 99",
      "job_id": "7",
      "admin" : "0",
      "role_id": "3"
  },
  {
    "firstname": "Benjamin",
    "lastname": "Hubert",
    "email": "benjamin_hubert@makesense.org",
    "password": "benjamin",
    "avatar": `${process.env.BACKEND_URL}/upload/user/benjamin_hubert.png`,
    "affiliated_site": "France",
    "tel": "07 11 44 11 96",
    "job_id": "3",
    "admin" : "0",
    "role_id": "2"
  },
  {
    "firstname": "Celia",
    "lastname": "Brahmi",
    "email": "celia_brahmi@makesense.org",
    "password": "celia",
    "avatar": `${process.env.BACKEND_URL}/upload/user/celia_brahmi.png`,
    "affiliated_site": "Punta Cana",
    "tel": "06 99 99 55 96",
    "job_id": "3",
    "admin" : "0",
    "role_id": "1"
  },
  {
    "firstname": "Jean-Marc",
    "lastname": "Millet",
    "email": "jean-marc_millet@makesense.org",
    "password": "jean-marc",
    "avatar": `${process.env.BACKEND_URL}/upload/user/jean-marc_millet.png`,
    "affiliated_site": "Japon",
    "tel": "06 29 71 25 96",
    "job_id": "5",
    "admin" : "0",
    "role_id": "3"
  },
  {
    "firstname": "Naomi",
    "lastname": "Rose",
    "email": "naomi_rose@makesense.org",
    "password": "naomi",
    "avatar": `${process.env.BACKEND_URL}/upload/user/naomi_rose.png`,
    "affiliated_site": "France",
    "tel": "06 88 22 57 96",
    "job_id": "11",
    "admin" : "0",
    "role_id": "1"
  },
  {
    "firstname": "Omar",
    "lastname": "Melloulchi",
    "email": "omar_melloulchi@makesense.org",
    "password": "omar",
    "avatar": `${process.env.BACKEND_URL}/upload/user/omar_melloulchi.png`,
    "affiliated_site": "France",
    "tel": "06 33 52 55 96",
    "job_id": "4",
    "admin" : "1",
    "role_id": "2"
  },
  {
    "firstname": "Ornella",
    "lastname": "Tomboza",
    "email": "ornella_tomboza@makesense.org",
    "password": "ornella",
    "avatar": `${process.env.BACKEND_URL}/upload/user/ornella_tomboza.png`,
    "affiliated_site": "U.S.A",
    "tel": "06 11 22 77 77",
    "job_id": "4",
    "admin" : "0",
    "role_id": "3"
  },
  {
    "firstname": "Thomas",
    "lastname": "Lonjon",
    "email": "thomas_lonjon@makesense.org",
    "password": "thomas",
    "avatar": `${process.env.BACKEND_URL}/upload/user/thomas_lonjon.png`,
    "affiliated_site": "France",
    "tel": "06 88 99 55 96",
    "job_id": "5",
    "admin" : "1",
    "role_id": "3"
  },
  {
    "firstname": "Tom",
    "lastname": "Le laurain",
    "email": "tom_le_laurain@makesense.org",
    "password": "tom",
    "avatar": `${process.env.BACKEND_URL}/upload/user/tom_le_laurain.png`,
    "affiliated_site": "France",
    "tel": "06 11 11 88 96",
    "job_id": "5",
    "admin" : "1",
    "role_id": "3"
  },
  ];

  for (let i = 0; i < user.length; i++) {
    const { firstname, lastname, email, password, avatar, affiliated_site, tel, job_id, role_id, admin} = user[i];
    const hash = await argon2.hash(password);
    await connection.query("insert into user (firstname, lastname, email, password, avatar, affiliated_site, tel, job_id, role_id, admin) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, hash, avatar, affiliated_site, tel, job_id, role_id, admin]);
    await console.log(`Add user : ${firstname} ${lastname}`);
  }

  await console.log(`Total User : ${user.length}`);

  const post = [  
    {
        "title": "Instaler un panier de basket",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "createdDate": "2023-06-21T12:01:38.000",
        "status": "Prise de décision",
        "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "avatar": `${process.env.BACKEND_URL}/upload/post/basket.png`,
        "user_id": "12",
        "location": "U.S.A",
        "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "deadlineDate":"2023-07-21T12:01:38.000",
        "makeDecisionDate": "2023-07-22T12:01:18.000",
        "conflitDate": "2023-07-25T15:01:55.000"
    },
    {
      "title": "Création d'un bassin",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "createdDate": "2023-07-11T12:01:38.000",
      "status": "Prise de décision",
      "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "avatar": `${process.env.BACKEND_URL}/upload/post/bassin.png`,
      "user_id": "9",
      "location": "Japon",
      "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "deadlineDate":"2023-07-18T12:01:38.000",
      "makeDecisionDate": "2023-07-23T12:01:18.000",
      "conflitDate": "2023-07-30T15:01:55.000"
  },
  {
    "title": "Réinventer les Menus du Restaurant d'Entreprise pour une Alimentation Plus Saine",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-01T12:01:38.000",
    "status": "Conflit",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/cantine.png`,
    "user_id": "14",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-06-14T12:01:38.000",
    "makeDecisionDate": "2023-06-30T12:01:18.000",
    "conflitDate": "2023-07-31T15:01:55.000"
  },
  {
    "title": "Développement de Cartes Interactives pour un Site Web Plus Engageant",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-07-01T12:01:38.000",
    "status": "Décission Définitive",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/carte.png`,
    "user_id": "13",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-07-18T12:01:38.000",
    "makeDecisionDate": "2023-07-26T12:01:18.000",
    "conflitDate": "2023-08-31T15:01:55.000"
  },
  {
    "title": "Pour un code plus propre",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-07-01T12:01:38.000",
    "status": "Décission Définitive",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/code.png`,
    "user_id": "1",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-07-18T12:01:38.000",
    "makeDecisionDate": "2023-07-26T12:01:18.000",
    "conflitDate": "2023-08-31T15:01:55.000"
  },
  {
    "title": "Découvrez mon projet audacieux pour réinventer la notion même de semaine de travail !",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-20T12:01:38.000",
    "status": "Conflit",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/bureau_vide.png`,
    "user_id": "4",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-06-23T12:01:38.000",
    "makeDecisionDate": "2023-06-30T12:01:18.000",
    "conflitDate": "2023-07-30T15:01:55.000"
  },
  {
    "title": "Déménager hors de Paris !",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-03T12:01:38.000",
    "status": "Conflit",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/demenager.png`,
    "user_id": "6",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-07-03T12:01:38.000",
    "makeDecisionDate": "2023-07-10T12:01:18.000",
    "conflitDate": "2023-08-22T15:01:55.000"
  },
  {
    "title": "Devenir DevOps en 2023 à Rouane ??",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-03T12:01:38.000",
    "status": "Conflit",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/devops.png`,
    "user_id": "2",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-07-03T12:01:38.000",
    "makeDecisionDate": "2023-07-10T12:01:18.000",
    "conflitDate": "2023-08-22T15:01:55.000"
  },
  {
    "title": "Jouer à Dofus pendant les pauses !",
    "description": "Chers collègues, Nous aimerions soumettre l'idée de permettre aux employés de jouer à Dofus pendant leurs pauses. Dofus est un jeu en ligne multijoueur qui offre une expérience ludique et divertissante. Notre proposition vise à encourager des moments de détente et de décompression pendant les pauses, ce qui pourrait avoir des avantages positifs sur notre bien-être et notre productivité globale.",
    "createdDate": "2023-06-03T12:01:38.000",
    "status": "Conflit",
    "profit": "Réduction du Stress : Les pauses de jeu offrent aux employés un moyen de se détendre et de décompresser. Cela pourrait réduire le niveau de stress et favoriser un environnement de travail plus serein. Renforcement de l'Esprit d'Équipe : En permettant aux collègues de jouer ensemble pendant les pauses, nous pourrions renforcer les liens entre les membres de l'équipe et promouvoir une meilleure collaboration. Amélioration de la Concentration : Des pauses ludiques peuvent contribuer à améliorer la concentration et la créativité des employés lorsqu'ils reprennent leur travail. Boost de la Motivation : Offrir un moment de jeu amusant pendant les pauses peut augmenter la motivation et l'engagement des employés envers leur travail.",
    "risk":"Baisse de Productivité : Une utilisation excessive du jeu pendant les pauses pourrait entraîner une baisse de la productivité. Nous proposons de fixer des limites raisonnables pour le temps de jeu afin de maintenir un équilibre adéquat entre travail et détente. Distractions : Il est essentiel de veiller à ce que le jeu n'entraîne pas de distractions excessives pour les autres collègues qui préfèrent utiliser leurs pauses différemment.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/dofus.jpg`,
    "user_id": "3",
    "location": "France",
    "impact": "Tous les employés de l'entreprise seront impactés par cette proposition. Chaque membre du personnel aura la possibilité de participer et de profiter des moments de jeu pendant les pauses. Nous solliciterons l'avis de notre équipe informatique pour évaluer la faisabilité technique de cette initiative. Le département des ressources humaines sera également consulté pour intégrer cette possibilité dans notre politique de gestion du temps. Nous vous encourageons tous à voter et à partager vos commentaires sur cette proposition. Votre avis est essentiel pour déterminer si cette initiative est viable et bénéfique pour notre entreprise. Note : Pour voter, utilisez les options Pour ou Contre disponibles ci-dessous. Nous attendons avec impatience vos retours et vos votes concernant cette proposition. En cas de questions ou de suggestions supplémentaires, n'hésitez pas à les partager dans la section des commentaires. Ensemble, explorons cette opportunité d'améliorer notre cadre de travail et notre bien-être au sein de l'entreprise.",
    "deadlineDate":"2023-07-03T12:01:38.000",
    "makeDecisionDate": "2023-07-10T12:01:18.000",
    "conflitDate": "2023-08-22T15:01:55.000"
  },
  {
    "title": "Recherche Alternance",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-20T12:01:38.000",
    "status": "Prise Définitve",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/recherche_alternance.png`,
    "user_id": "11",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-06-23T12:01:38.000",
    "makeDecisionDate": "2023-06-30T12:01:18.000",
    "conflitDate": "2023-07-26T15:01:55.000"
  },
  {
    "title": "Voyage en République...",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-20T12:01:38.000",
    "status": "Prise Définitve",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/voyage.png`,
    "user_id": "8",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-06-23T12:01:38.000",
    "makeDecisionDate": "2023-06-30T12:01:18.000",
    "conflitDate": "2023-07-26T15:01:55.000"
  },
  {
    "title": "Nouveau Souffle pour Notre Entreprise : Une Refonte Moderne et Intuitive avec WebFlow",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-20T12:01:38.000",
    "status": "Conflit",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/webflow.png`,
    "user_id": "7",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-06-23T12:01:38.000",
    "makeDecisionDate": "2023-06-30T12:01:18.000",
    "conflitDate": "2023-07-30T15:01:55.000"
  },
  {
    "title": "Choisissez notre Mascotte : Faites entendre votre Voix pour Adopter notre Chat !",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "createdDate": "2023-06-20T12:01:38.000",
    "status": "Conflit",
    "profit": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "risk": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "avatar": `${process.env.BACKEND_URL}/upload/post/chat.png`,
    "user_id": "10",
    "location": "France",
    "impact": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "deadlineDate":"2023-06-23T12:01:38.000",
    "makeDecisionDate": "2023-06-30T12:01:18.000",
    "conflitDate": "2023-07-30T15:01:55.000"
  },
  ];

  for (let i = 0; i < post.length; i++) {
    const { title, description, createdDate, status, profit, risk, avatar, user_id, location, impact, deadlineDate, makeDecisionDate, conflitDate } = post[i];
    await connection.query("insert into post (title, description, createdDate, status, profit, risk, avatar, user_id, location, impact, deadlineDate, makeDecisionDate, conflitDate) values (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?)",
    [title, description, createdDate, status, profit, risk, avatar, user_id, location, impact, deadlineDate, makeDecisionDate, conflitDate]);
    await console.log(`Add Post : ${title}`);
  }

  await console.log(`Total Post : ${post.length}`);

  await console.log("Check ALL User Password Finish")
  const alert = [
    { title : "Alert1"},
    { title : "Alert2"},
    { title : "Alert3"},
    { title : "Alert4"},
    { title : "Alert5"},
    { title : "Alert6"},
    { title : "Alert7"},
    { title : "Alert8"},
    { title : "Alert9"},
    { title : "Alert10"},
    { title : "Alert11"},
    { title : "Alert12"},
    { title : "Alert13"},
    { title : "Alert14"},
    { title : "Alert15"},
  ];

  for (let i = 0; i < alert.length; i++) {
    const { title } = alert[i];
    await connection.query("insert into alert (title) values (?)", [title]);
    await console.log(`Add alert : ${title}`);
  }

  await console.log(`Total Alert : ${alert.length}`);

  const user_alert = [
    { alert_id : 1, user_id : 1},
    { alert_id : 4, user_id : 1},
    { alert_id : 2, user_id : 2},
    { alert_id : 3, user_id : 2},
    { alert_id : 1, user_id : 2},
    { alert_id : 5, user_id : 3},
    { alert_id : 7, user_id : 4},
    { alert_id : 6, user_id : 4},
    { alert_id : 2, user_id : 4},
  ];

  for (let i = 0; i < user_alert.length; i++) {
    const { alert_id, user_id} = user_alert[i];
    await connection.query("insert into user_alert (alert_id, user_id) values (?, ?)", [alert_id, user_id]);
    await console.log(`Add User Alert : n°${i+1}`);
  }

  await console.log(`Total User Alert : ${user_alert.length}`);

  const user_participant = [
    { user_id : 1, post_id : 1, expert : 1, impacted : 1},
    { user_id : 2, post_id : 1, expert : 0, impacted : 1},
    { user_id : 3, post_id : 1, expert : 1, impacted : 0},
    { user_id : 14, post_id : 1, expert : 1, impacted : 1},
    { user_id : 11, post_id : 1, expert : 1, impacted : 1},
    { user_id : 4, post_id : 1, expert : 0, impacted : 1},
    { user_id : 8, post_id : 1, expert : 0, impacted : 1},
    { user_id : 4, post_id : 1, expert : 0, impacted : 0},
    { user_id : 5, post_id : 1, expert : 1, impacted : 1},
    { user_id : 5, post_id : 2, expert : 1, impacted : 1},
    { user_id : 1, post_id : 2, expert : 0, impacted : 1},
    { user_id : 2, post_id : 2, expert : 0, impacted : 1},
    { user_id : 3, post_id : 2, expert : 0, impacted : 1},
    { user_id : 4, post_id : 2, expert : 0, impacted : 1},
    { user_id : 6, post_id : 2, expert : 0, impacted : 1},
    { user_id : 7, post_id : 2, expert : 0, impacted : 1},
    { user_id : 1, post_id : 3, expert : 0, impacted : 1},
    { user_id : 2, post_id : 3, expert : 0, impacted : 1},
    { user_id : 3, post_id : 3, expert : 0, impacted : 1},
    { user_id : 4, post_id : 3, expert : 0, impacted : 1},
    { user_id : 5, post_id : 3, expert : 0, impacted : 1},
    { user_id : 6, post_id : 3, expert : 0, impacted : 1},
    { user_id : 7, post_id : 3, expert : 0, impacted : 1},
    { user_id : 8, post_id : 3, expert : 0, impacted : 1},
    { user_id : 13, post_id : 2, expert : 1, impacted : 1},
    { user_id : 14, post_id : 2, expert : 1, impacted : 1},
    { user_id : 13, post_id : 3, expert : 1, impacted : 1},
    { user_id : 11, post_id : 3, expert : 1, impacted : 1},
    { user_id : 14, post_id : 4, expert : 1, impacted : 1},
    { user_id : 12, post_id : 4, expert : 1, impacted : 0},
    { user_id : 5, post_id : 4, expert : 1, impacted : 0},
    { user_id : 11, post_id : 4, expert : 1, impacted : 0},
    { user_id : 10, post_id : 4, expert : 1, impacted : 1},
    { user_id : 12, post_id : 4, expert : 1, impacted : 1},
    { user_id : 13, post_id : 5, expert : 1, impacted : 1},
    { user_id : 14, post_id : 5, expert : 1, impacted : 1},
    { user_id : 2, post_id : 5, expert : 1, impacted : 1},
    { user_id : 3, post_id : 5, expert : 1, impacted : 1},
    { user_id : 4, post_id : 5, expert : 1, impacted : 1},
    { user_id : 5, post_id : 5, expert : 1, impacted : 1},
    { user_id : 9, post_id : 5, expert : 1, impacted : 1},
    { user_id : 1, post_id : 6, expert : 1, impacted : 1},
    { user_id : 2, post_id : 6, expert : 1, impacted : 1},
    { user_id : 3, post_id : 6, expert : 1, impacted : 1},
    { user_id : 4, post_id : 6, expert : 1, impacted : 1},
    { user_id : 5, post_id : 6, expert : 1, impacted : 1},
    { user_id : 6, post_id : 6, expert : 1, impacted : 1},
    { user_id : 7, post_id : 6, expert : 1, impacted : 1},
    { user_id : 8, post_id : 6, expert : 1, impacted : 1},
    { user_id : 9, post_id : 6, expert : 1, impacted : 1},
    { user_id : 10, post_id : 6, expert : 1, impacted : 1},
    { user_id : 11, post_id : 6, expert : 1, impacted : 1},
    { user_id : 12, post_id : 6, expert : 1, impacted : 1},
    { user_id : 13, post_id : 6, expert : 1, impacted : 1},
    { user_id : 14, post_id : 6, expert : 1, impacted : 1},
    { user_id : 1, post_id : 7, expert : 1, impacted : 1},
    { user_id : 2, post_id : 7, expert : 1, impacted : 1},
    { user_id : 3, post_id : 7, expert : 1, impacted : 1},
    { user_id : 4, post_id : 7, expert : 1, impacted : 1},
    { user_id : 7, post_id : 7, expert : 0, impacted : 1},
    { user_id : 9, post_id : 7, expert : 0, impacted : 1},
    { user_id : 11, post_id : 7, expert : 1, impacted : 1},
    { user_id : 14, post_id : 7, expert : 0, impacted : 1},
    { user_id : 4, post_id : 7, expert : 1, impacted : 0},
    { user_id : 1, post_id : 8, expert : 1, impacted : 1},
    { user_id : 2, post_id : 8, expert : 0, impacted : 1},
    { user_id : 5, post_id : 8, expert : 0, impacted : 1},
    { user_id : 4, post_id : 8, expert : 0, impacted : 1},
    { user_id : 1, post_id : 8, expert : 1, impacted : 1},
    { user_id : 1, post_id : 9, expert : 1, impacted : 1},
    { user_id : 2, post_id : 9, expert : 1, impacted : 1},
    { user_id : 8, post_id : 9, expert : 0, impacted : 1},
    { user_id : 9, post_id : 9, expert : 0, impacted : 1},
    { user_id : 12, post_id : 9, expert : 1, impacted : 1},
    { user_id : 11, post_id : 9, expert : 1, impacted : 1},
    { user_id : 14, post_id : 9, expert : 1, impacted : 1},
    { user_id : 1, post_id : 10, expert : 1, impacted : 1},
    { user_id : 2, post_id : 10, expert : 1, impacted : 1},
    { user_id : 3, post_id : 10, expert : 1, impacted : 1},
    { user_id : 4, post_id : 10, expert : 1, impacted : 1},
    { user_id : 5, post_id : 10, expert : 1, impacted : 1},
    { user_id : 11, post_id : 10, expert : 1, impacted : 1},
    { user_id : 13, post_id : 10, expert : 1, impacted : 1},
    { user_id : 14, post_id : 10, expert : 1, impacted : 1},
    { user_id : 9, post_id : 10, expert : 1, impacted : 1},
    { user_id : 8, post_id : 10, expert : 1, impacted : 1},
    { user_id : 1, post_id : 11, expert : 1, impacted : 1},
    { user_id : 2, post_id : 11, expert : 1, impacted : 1},
    { user_id : 3, post_id : 11, expert : 1, impacted : 1},
    { user_id : 4, post_id : 11, expert : 1, impacted : 1},
    { user_id : 5, post_id : 11, expert : 1, impacted : 1},
    { user_id : 5, post_id : 12, expert : 1, impacted : 1},
    { user_id : 4, post_id : 12, expert : 1, impacted : 1},
    { user_id : 3, post_id : 12, expert : 1, impacted : 1},
    { user_id : 3, post_id : 12, expert : 1, impacted : 0},
  ];

  for (let i = 0; i < user_participant.length; i++) {
    const { user_id, post_id, expert, impacted } = user_participant[i];
    await connection.query("insert into user_participant (user_id, post_id, expert, impacted) values (?, ?, ?, ?)", [user_id, post_id, expert, impacted]);
    await console.log(`Add User Participant : n°${i+1}`);
  }

  await console.log(`Total ser Participant : ${user_participant.length}`);

  const user_post_avis = [
    { user_id : 1,
      post_id : 1,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 7,
      post_id : 1,
      text : "J'ai acheté la voiture électrique XYZ et je suis ravi de son design futuriste. Cependant, j'ai remarqué qu'elle avait tendance à se transformer en un robot géant lorsqu'elle était garée trop longtemps au soleil. Cela a causé quelques problèmes avec les autres véhicules garés à proximité, mais bon, c'est la vie avec une voiture électrique avancée",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 8,
      post_id : 1,
      text : "La voiture électrique XYZ est le pire achat que j'ai jamais fait. Dès que j'ai appuyé sur l'accélérateur, elle a décollé dans les airs et s'est envolée au-dessus des nuages, me laissant totalement perplexe. J'ai dû passer des heures à attendre qu'elle revienne sur terre. Je ne recommande absolument pas cette voiture à quiconque",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 8,
      post_id : 2,
      text : "La voiture électrique XYZ est le pire achat que j'ai jamais fait. Dès que j'ai appuyé sur l'accélérateur, elle a décollé dans les airs et s'est envolée au-dessus des nuages, me laissant totalement perplexe. J'ai dû passer des heures à attendre qu'elle revienne sur terre. Je ne recommande absolument pas cette voiture à quiconque",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 4,
      post_id : 2,
      text : "La voiture électrique XYZ est le pire achat que j'ai jamais fait. Dès que j'ai appuyé sur l'accélérateur, elle a décollé dans les airs et s'est envolée au-dessus des nuages, me laissant totalement perplexe. J'ai dû passer des heures à attendre qu'elle revienne sur terre. Je ne recommande absolument pas cette voiture à quiconque",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 4,
      post_id : 2,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 4,
      post_id : 3,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 2,
      post_id : 3,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 1,
      post_id : 3,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 1,
      post_id : 5,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 2,
      post_id : 6,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 9,
      post_id : 7,
      text : "J'ai été très déçu par la voiture électrique XYZ. La batterie s'est vidée après seulement 10 minutes de conduite, et le système de recharge ne fonctionnait pas du tout. De plus, le tableau de bord était illisible car il était écrit en une langue étrangère que je ne comprenais pas. Vraiment pas pratique pour une utilisation quotidienne",
      date : "2023-07-27T12:01:38.000"
    },
    { user_id : 1,
      post_id : 9,
      text : "Je suis totalement pour l'idée de jouer à Dofus pendant les pauses ! Le jeu en ligne est un excellent moyen de se détendre et de se vider la tête. Je suis convaincu que cela nous aiderait à réduire le stress au travail et à améliorer notre productivité. De plus, jouer ensemble renforcerait certainement notre esprit d'équipe. Je vote définitivement POUR cette proposition !",
      date : "2023-07-27T12:10:36.000"
    },
    { user_id : 8,
      post_id : 9,
      text : "Je comprends l'intérêt de permettre des pauses ludiques, mais je suis préoccupé par le risque de baisse de productivité. Il faut être prudent pour que le jeu ne devienne pas trop distrayant. Peut-être pourrions-nous fixer un temps limite pour les sessions de jeu afin de maintenir un équilibre adéquat. Dans l'ensemble, je suis mitigé sur cette proposition et j'aimerais voir plus de détails sur la manière dont nous prévoyons de gérer ces éventuelles distractions",
      date : "2023-08-27T12:09:08.000"
    },
    { user_id : 6,
      post_id : 9,
      text : "J'adore cette idée ! Jouer à Dofus pendant les pauses serait un excellent moyen de nous détendre et de resserrer nos liens d'équipe. Le jeu en ligne peut également stimuler notre créativité et notre concentration. Pourquoi ne pas essayer de mettre en place un système de rotations pour que tout le monde puisse en profiter sans perturber le travail ? En tout cas, je suis 100% POUR cette initiative !",
      date : "2023-08-27T12:16:04.000"
    },
    { user_id : 7,
      post_id : 9,
      text : "Je suis assez sceptique quant à cette proposition. Je crains que certains collègues en abusent et que cela entraîne une baisse de la productivité globale. Plutôt que de jouer à Dofus, peut-être pourrions-nous envisager d'autres activités de détente qui ne soient pas aussi distrayantes. Je suis plutôt CONTRE cette idée, à moins que nous trouvions un moyen de garantir que cela n'impactera pas négativement notre travail",
      date : "2023-08-27T12:17:45.000"
    },
    { user_id : 10,
      post_id : 9,
      text : "Je suis partagé sur cette proposition. D'un côté, je pense qu'il est important d'avoir des moments de détente pendant les pauses pour être plus productif par la suite. D'un autre côté, je suis inquiet que certains abusent du temps de jeu et que cela affecte notre travail. Pourquoi ne pas organiser un essai pilote pendant une période donnée pour évaluer les impacts avant de prendre une décision définitive ? Je suis curieux de voir comment cela se passerait en pratique avant de me prononcer.",
      date : "2023-09-27T12:12:16.000"
    },
    { user_id : 13,
      post_id : 9,
      text : "Je suis tout à fait en faveur de cette idée ! Le jeu en ligne est un excellent moyen de se déconnecter du travail pendant quelques minutes. Je suis convaincu que cela nous aiderait à être plus détendus et plus productifs au travail. Je suis excité par cette proposition et je vote sans hésiter POUR ! Jouons à Dofus et prenons du plaisir tout en restant productifs.",
      date : "2023-10-27T12:11:51.000"
    },
    { user_id : 3,
      post_id : 9,
      text : "Si vous votez OUI je vous donne un cookie  !",
      date : "2023-10-27T12:11:51.000"
    },
  ];

  for (let i = 0; i < user_post_avis.length; i++) {
    const { user_id, post_id, text, date } = user_post_avis[i];
    await connection.query("insert into user_post_avis (user_id, post_id, text, date) values (?, ?, ?, ?)", [user_id, post_id, text, date]);
    await console.log(`Add User Post Avis : n°${i+1}`);
  }

  await console.log(`Total User Post Avi : ${user_post_avis.length}`);

  const user_post_vote = [
    { user_id : 1, post_id : 1, vote : 1},
    { user_id : 1, post_id : 2, vote : 1},
    { user_id : 1, post_id : 3, vote : 1},
    { user_id : 1, post_id : 8, vote : 1},
    { user_id : 1, post_id : 10, vote : 1},
    { user_id : 2, post_id : 7, vote : 0},
    { user_id : 2, post_id : 6, vote : 0},
    { user_id : 2, post_id : 4, vote : 0},
    { user_id : 2, post_id : 9, vote : 1},
    { user_id : 2, post_id : 1, vote : 0},
    { user_id : 3, post_id : 1, vote : 1},
    { user_id : 3, post_id : 7, vote : 1},
    { user_id : 3, post_id : 10, vote : 1},
    { user_id : 3, post_id : 8, vote : 1},
    { user_id : 4, post_id : 8, vote : 1},
    { user_id : 4, post_id : 7, vote : 1},
    { user_id : 4, post_id : 11, vote : 1},
    { user_id : 4, post_id : 1, vote : 1},
    { user_id : 4, post_id : 1, vote : 0},
    { user_id : 5, post_id : 1, vote : 1},
    { user_id : 5, post_id : 3, vote : 1},
    { user_id : 5, post_id : 4, vote : 1},
    { user_id : 5, post_id : 7, vote : 1},
    { user_id : 6, post_id : 2, vote : 1},
    { user_id : 1, post_id : 9, vote : 1},
    { user_id : 10, post_id : 9, vote : 1},
    { user_id : 4, post_id : 9, vote : 1},
    { user_id : 3, post_id : 9, vote : 1},
    { user_id : 12, post_id : 9, vote : 0},
    { user_id : 6, post_id : 9, vote : 0},
    { user_id : 8, post_id : 9, vote : 1},
  ];

  for (let i = 0; i < user_post_vote.length; i++) {
    const { user_id, post_id, vote } = user_post_vote[i];
    await connection.query("insert into user_post_vote (user_id, post_id, vote) values (?, ?, ?)", [user_id, post_id, vote]);
    await console.log(`Add User Post Vote : n°${i+1}`);
  }

  await console.log(`Total User Post Vote : ${user_post_vote.length}`);

  connection.end();
};

try {
  migrate().then(() => console.log("Database schema successfully synchronised"));;
} catch (err) {
  console.error(err);
}