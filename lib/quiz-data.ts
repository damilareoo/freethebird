export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

export const quizData: QuizQuestion[] = [
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    options: ["An Echo", "A Shadow", "A Thought", "A Cloud"],
    correctAnswer: "An Echo",
  },
  {
    question: "What has keys but no locks, space but no room, and you can enter but not go in?",
    options: ["A Keyboard", "A Map", "A Dream", "A Book"],
    correctAnswer: "A Keyboard",
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    options: ["Footsteps", "Memories", "Breath", "Time"],
    correctAnswer: "Footsteps",
  },
  {
    question: "What gets wetter as it dries?",
    options: ["A Towel", "A Sponge", "Hair", "Soap"],
    correctAnswer: "A Towel",
  },
  {
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    options: ["A Map", "A Globe", "A Dream", "A Painting"],
    correctAnswer: "A Map",
  },
  {
    question: "What can travel around the world while staying in a corner?",
    options: ["A Stamp", "A Passport", "The Internet", "A Thought"],
    correctAnswer: "A Stamp",
  },
  {
    question: "What has a head and a tail, but no body?",
    options: ["A Coin", "A Snake", "A Dream", "A River"],
    correctAnswer: "A Coin",
  },
  {
    question: "What has many keys but can't open a single lock?",
    options: ["A Piano", "A Keyboard", "A Map", "A Book"],
    correctAnswer: "A Piano",
  },
  {
    question: "What can you catch but not throw?",
    options: ["A Cold", "A Ball", "A Fish", "A Thought"],
    correctAnswer: "A Cold",
  },
  {
    question: "What has legs, but doesn't walk?",
    options: ["A Table", "A Bird", "A Fish", "A Snake"],
    correctAnswer: "A Table",
  },
]
