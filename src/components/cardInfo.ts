export const cards = [
  {
    id: "1",
    Category: "Science",
    Title: "Neura the Brainy Explorer",
    Topic: "Neural Network of the brain",
    Duration: "45 mins",
    image:'/brain.jpg'
  
  },
  {
    id: "2",
    Category: "Maths",
    Title: "Countsy the Number Wizard",
    Topic: "Derivatives and Integrals",
    Duration: "30 mins",
    image:'/maths.jpg'
  },
  {
    id: "3",
    Category: "Language",
    Title: "Verba the Vocabulary Builder",
    Topic: "English Literature",
    Duration: "30 mins",
    image:'/vocab.jpg'
  },
  {
    id: "4",
    Category: "Language",
    Title: "The Growth Expert",
    Topic: "Scaling your Business successfully",
    Duration: "30 mins",
    image:'/business.jpg'
  },
  {
    id: "5",
    Category: "History",
    Title: "Memo, The memory keeper",
    Topic: "World Wars, causes and effects",
    Duration: "30 mins",
    image:"/history.jpg"
  },
];


export const users = [
  {
    id:"1",
    name:"Abtahi Mustakim",
    email:"abtahi@gmail.com"
  },
  {
    id:"2",
    name:"Shadman Muhtasim",
    email:"shadman@gmail.com"
  },
  {
    id:"3",
    name:"Shadab Hasn",
    email:"shadab@gmail.com"
  },
]

export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];
export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};
export const getSubjectColors = (subject:string)=>{
  return subjectsColors[subject as keyof typeof subjectsColors]
}


export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};