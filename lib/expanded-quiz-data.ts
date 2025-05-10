export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

export const expandedQuizData: QuizQuestion[] = [
  // Original questions
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

  // Additional questions (shortened for brevity)
  {
    question: "I'm light as a feather, but the strongest person can't hold me for more than a few minutes. What am I?",
    options: ["Breath", "A Thought", "Time", "A Feather"],
    correctAnswer: "Breath",
  },
  {
    question: "What has a neck but no head?",
    options: ["A Bottle", "A Shirt", "A Giraffe", "A River"],
    correctAnswer: "A Bottle",
  },
  {
    question: "What has an eye but cannot see?",
    options: ["A Needle", "A Storm", "A Camera", "A Potato"],
    correctAnswer: "A Needle",
  },
  {
    question: "What can you break, even if you never pick it up or touch it?",
    options: ["A Promise", "A Heart", "Silence", "A Record"],
    correctAnswer: "A Promise",
  },
  {
    question: "What goes up but never comes down?",
    options: ["Your Age", "The Sun", "A Balloon", "Temperature"],
    correctAnswer: "Your Age",
  },
]
