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

  // Additional 90 questions
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
  {
    question: "What can you keep after giving to someone?",
    options: ["Your Word", "Money", "A Gift", "Time"],
    correctAnswer: "Your Word",
  },
  {
    question: "What gets bigger when more is taken away?",
    options: ["A Hole", "A Debt", "A Problem", "A Secret"],
    correctAnswer: "A Hole",
  },
  {
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    options: ["A Candle", "A Tree", "A Person", "A Shadow"],
    correctAnswer: "A Candle",
  },
  {
    question: "What is always in front of you but can't be seen?",
    options: ["The Future", "Air", "Your Shadow", "Your Nose"],
    correctAnswer: "The Future",
  },
  {
    question: "What can fill a room but takes up no space?",
    options: ["Light", "Sound", "Air", "Smell"],
    correctAnswer: "Light",
  },
  {
    question: "If you drop me I'm sure to crack, but give me a smile and I'll always smile back. What am I?",
    options: ["A Mirror", "An Egg", "Ice", "A Phone"],
    correctAnswer: "A Mirror",
  },
  {
    question: "What has 13 hearts but no other organs?",
    options: ["A Deck of Cards", "A Calendar", "A Clock", "A Computer"],
    correctAnswer: "A Deck of Cards",
  },
  {
    question: "What has a thumb and four fingers but is not alive?",
    options: ["A Glove", "A Hand", "A Mitten", "A Prosthetic"],
    correctAnswer: "A Glove",
  },
  {
    question: "What building has the most stories?",
    options: ["A Library", "A Skyscraper", "A Museum", "A School"],
    correctAnswer: "A Library",
  },
  {
    question: "What has words but never speaks?",
    options: ["A Book", "A Sign", "A Computer", "A Picture"],
    correctAnswer: "A Book",
  },
  {
    question: "What has a head, a tail, is brown, and has no legs?",
    options: ["A Penny", "A Snake", "A Worm", "A Tadpole"],
    correctAnswer: "A Penny",
  },
  {
    question: "What room do ghosts avoid?",
    options: ["The Living Room", "The Bathroom", "The Bedroom", "The Kitchen"],
    correctAnswer: "The Living Room",
  },
  {
    question: "What has many teeth but can't bite?",
    options: ["A Comb", "A Zipper", "A Saw", "A Gear"],
    correctAnswer: "A Comb",
  },
  {
    question: "What has one eye but can't see?",
    options: ["A Needle", "A Hurricane", "A Camera", "A Button"],
    correctAnswer: "A Needle",
  },
  {
    question: "What has hands but can't clap?",
    options: ["A Clock", "A Glove", "A Statue", "A Tree"],
    correctAnswer: "A Clock",
  },
  {
    question:
      "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    options: ["A River", "A Train", "A Clock", "A Storm"],
    correctAnswer: "A River",
  },
  {
    question: "What is full of holes but still holds water?",
    options: ["A Sponge", "A Net", "A Basket", "A Strainer"],
    correctAnswer: "A Sponge",
  },
  {
    question: "What can travel all around the world without leaving its corner?",
    options: ["A Stamp", "A Map", "The Internet", "A Globe"],
    correctAnswer: "A Stamp",
  },
  {
    question: "What has a face and two hands but no arms or legs?",
    options: ["A Clock", "A Watch", "A Compass", "A Sundial"],
    correctAnswer: "A Clock",
  },
  {
    question: "What five-letter word becomes shorter when you add two letters to it?",
    options: ["Short", "Small", "Little", "Tiny"],
    correctAnswer: "Short",
  },
  {
    question: "What begins with T, ends with T, and has T in it?",
    options: ["A Teapot", "A Testament", "A Tent", "A Trinket"],
    correctAnswer: "A Teapot",
  },
  {
    question: "What is so fragile that saying its name breaks it?",
    options: ["Silence", "Glass", "A Secret", "Trust"],
    correctAnswer: "Silence",
  },
  {
    question: "What can you hold in your right hand, but never in your left hand?",
    options: ["Your Left Hand", "Your Right Elbow", "Your Heart", "Your Breath"],
    correctAnswer: "Your Left Hand",
  },
  {
    question: "What is always coming but never arrives?",
    options: ["Tomorrow", "The Future", "The Horizon", "Death"],
    correctAnswer: "Tomorrow",
  },
  {
    question: "What can be cracked, made, told, and played?",
    options: ["A Joke", "A Story", "A Song", "A Game"],
    correctAnswer: "A Joke",
  },
  {
    question: "I'm found in socks, scarves, and mittens; and often in the paws of playful kittens. What am I?",
    options: ["Yarn", "Wool", "String", "Thread"],
    correctAnswer: "Yarn",
  },
  {
    question: "What has a ring but no finger?",
    options: ["A Telephone", "A Bell", "A Key Chain", "A Donut"],
    correctAnswer: "A Telephone",
  },
  {
    question: "What breaks yet never falls, and what falls yet never breaks?",
    options: ["Day and Night", "Sun and Moon", "Summer and Winter", "Dawn and Dusk"],
    correctAnswer: "Day and Night",
  },
  {
    question: "What can be stolen, mistaken, or altered, yet never leaves you your entire life?",
    options: ["Your Identity", "Your Name", "Your Memory", "Your Shadow"],
    correctAnswer: "Your Identity",
  },
  {
    question: "What belongs to you, but others use it more than you do?",
    options: ["Your Name", "Your Shadow", "Your Voice", "Your Time"],
    correctAnswer: "Your Name",
  },
  {
    question: "What is cut on a table, but is never eaten?",
    options: ["A Deck of Cards", "Paper", "Wood", "Fabric"],
    correctAnswer: "A Deck of Cards",
  },
  {
    question: "What has 4 fingers and a thumb, but is not living?",
    options: ["A Glove", "A Hand", "A Mitten", "A Puppet"],
    correctAnswer: "A Glove",
  },
  {
    question: "What can be measured but not seen?",
    options: ["Time", "Temperature", "Wind", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What flies without wings?",
    options: ["Time", "A Flag", "A Kite", "A Balloon"],
    correctAnswer: "Time",
  },
  {
    question: "What can be caught but not thrown?",
    options: ["A Cold", "Attention", "A Train", "Sleep"],
    correctAnswer: "A Cold",
  },
  {
    question: "What is black when you buy it, red when you use it, and gray when you throw it away?",
    options: ["Charcoal", "Lipstick", "Wine", "Matches"],
    correctAnswer: "Charcoal",
  },
  {
    question: "What can be swallowed, but can also swallow you?",
    options: ["Pride", "Water", "Fear", "Time"],
    correctAnswer: "Pride",
  },
  {
    question: "What starts with 'e', ends with 'e', and contains one letter?",
    options: ["Envelope", "Eye", "Eke", "Eve"],
    correctAnswer: "Envelope",
  },
  {
    question: "What word is pronounced the same if you take away four of its five letters?",
    options: ["Queue", "Quack", "Quick", "Quilt"],
    correctAnswer: "Queue",
  },
  {
    question: "What is the end of everything?",
    options: ["The Letter G", "Death", "Infinity", "Nothing"],
    correctAnswer: "The Letter G",
  },
  {
    question: "What is always in bed but never sleeps?",
    options: ["A River", "A Pillow", "A Book", "A Dream"],
    correctAnswer: "A River",
  },
  {
    question: "What has a bottom at the top?",
    options: ["Your Legs", "A Mountain", "A Bottle", "A Hat"],
    correctAnswer: "Your Legs",
  },
  {
    question: "What has branches, but no fruit, trunk, or leaves?",
    options: ["A Bank", "A Library", "A Family Tree", "A River"],
    correctAnswer: "A Bank",
  },
  {
    question: "What is made of water but if you put it into water it will die?",
    options: ["An Ice Cube", "A Snowflake", "A Cloud", "A Raindrop"],
    correctAnswer: "An Ice Cube",
  },
  {
    question: "What can be broken but is never held?",
    options: ["A Promise", "A Record", "A Heart", "A Secret"],
    correctAnswer: "A Promise",
  },
  {
    question: "What is as light as a feather, but even the strongest person cannot hold it for more than a minute?",
    options: ["Breath", "A Thought", "A Bubble", "A Snowflake"],
    correctAnswer: "Breath",
  },
  {
    question: "What is so delicate that saying its name breaks it?",
    options: ["Silence", "A Bubble", "A Secret", "Sleep"],
    correctAnswer: "Silence",
  },
  {
    question: "What has a head and a tail but no body?",
    options: ["A Coin", "A Comet", "A Snake", "A River"],
    correctAnswer: "A Coin",
  },
  {
    question: "What is always coming but never arrives?",
    options: ["Tomorrow", "The Future", "The Horizon", "The End"],
    correctAnswer: "Tomorrow",
  },
  {
    question: "What goes up and down but never moves?",
    options: ["Temperature", "A Staircase", "The Stock Market", "Age"],
    correctAnswer: "Temperature",
  },
  {
    question: "What can you catch but not throw?",
    options: ["A Cold", "Your Breath", "Sleep", "Time"],
    correctAnswer: "A Cold",
  },
  {
    question: "What has teeth but cannot eat?",
    options: ["A Comb", "A Saw", "A Zipper", "A Fork"],
    correctAnswer: "A Comb",
  },
  {
    question: "What has a neck but no head?",
    options: ["A Bottle", "A Shirt", "A Guitar", "A Vase"],
    correctAnswer: "A Bottle",
  },
  {
    question: "What has eyes but cannot see?",
    options: ["A Potato", "A Needle", "A Storm", "A Button"],
    correctAnswer: "A Potato",
  },
  {
    question: "What has hands but cannot clap?",
    options: ["A Clock", "A Watch", "A Glove", "A Statue"],
    correctAnswer: "A Clock",
  },
  {
    question: "What has legs but cannot walk?",
    options: ["A Table", "A Chair", "A Bed", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What has a heart that doesn't beat?",
    options: ["An Artichoke", "A Playing Card", "A Stone Sculpture", "A Book"],
    correctAnswer: "An Artichoke",
  },
  {
    question: "What has keys but no locks?",
    options: ["A Piano", "A Keyboard", "A Typewriter", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What can run but never walks?",
    options: ["A River", "A Computer Program", "Colors", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What can fly without wings?",
    options: ["Time", "A Flag", "A Balloon", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What is full of holes but still holds water?",
    options: ["A Sponge", "A Cloud", "A Watermelon", "A Straw"],
    correctAnswer: "A Sponge",
  },
  {
    question: "What gets sharper the more you use it?",
    options: ["Your Brain", "A Pencil", "A Knife", "Your Memory"],
    correctAnswer: "Your Brain",
  },
  {
    question: "What has a face and hands but no arms or legs?",
    options: ["A Clock", "A Watch", "A Mirror", "A Doll"],
    correctAnswer: "A Clock",
  },
  {
    question: "What can be thrown but never caught?",
    options: ["A Shadow", "A Dice", "A Party", "A Tantrum"],
    correctAnswer: "A Shadow",
  },
  {
    question: "What is higher without a head?",
    options: ["A Pillow", "A Chair", "A Bed", "A Mountain"],
    correctAnswer: "A Pillow",
  },
  {
    question: "What is cut on a table, but never eaten?",
    options: ["A Deck of Cards", "Paper", "Fabric", "Wood"],
    correctAnswer: "A Deck of Cards",
  },
  {
    question: "What has words, but never speaks?",
    options: ["A Book", "A Sign", "A Letter", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What can be cracked, made, told, and played?",
    options: ["A Joke", "A Story", "A Game", "A Song"],
    correctAnswer: "A Joke",
  },
  {
    question: "What can go up and down without moving?",
    options: ["Temperature", "The Stock Market", "Age", "Blood Pressure"],
    correctAnswer: "Temperature",
  },
  {
    question: "What gets wetter as it dries?",
    options: ["A Towel", "A Sponge", "Hair", "Clothes"],
    correctAnswer: "A Towel",
  },
  {
    question: "What has many keys but can't open a single lock?",
    options: ["A Piano", "A Keyboard", "A Typewriter", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What can be broken without being touched?",
    options: ["A Promise", "Silence", "A Record", "A Heart"],
    correctAnswer: "A Promise",
  },
  {
    question: "What can you hold in your left hand but not in your right?",
    options: ["Your Right Elbow", "Your Right Hand", "Your Left Ear", "Your Heart"],
    correctAnswer: "Your Right Elbow",
  },
  {
    question: "What is always in front of you but can't be seen?",
    options: ["The Future", "Air", "Your Nose", "Your Shadow"],
    correctAnswer: "The Future",
  },
  {
    question: "What can travel around the world while staying in a corner?",
    options: ["A Stamp", "A Map", "A Globe", "The Internet"],
    correctAnswer: "A Stamp",
  },
  {
    question: "What has a head, a tail, but no body?",
    options: ["A Coin", "A Comet", "A Snake", "A River"],
    correctAnswer: "A Coin",
  },
  {
    question: "What has an eye but can't see?",
    options: ["A Needle", "A Storm", "A Potato", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What has teeth but doesn't bite?",
    options: ["A Comb", "A Saw", "A Zipper", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What has a bank but no money?",
    options: ["A River", "A Cloud", "A Memory", "A Database"],
    correctAnswer: "A River",
  },
  {
    question: "What has a bed but never sleeps?",
    options: ["A River", "A Garden", "A Hospital", "A Hotel"],
    correctAnswer: "A River",
  },
  {
    question: "What has a neck but no head?",
    options: ["A Bottle", "A Shirt", "A Guitar", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What has a mouth but doesn't eat?",
    options: ["A River", "A Cave", "A Volcano", "All of these"],
    correctAnswer: "All of these",
  },
  {
    question: "What has roots that nobody sees, is taller than trees, up it goes, yet it never grows?",
    options: ["A Mountain", "A Tower", "A Cloud", "A Skyscraper"],
    correctAnswer: "A Mountain",
  },
  {
    question:
      "What is the beginning of eternity, the end of time and space, the beginning of every end, and the end of every race?",
    options: ["The Letter E", "Death", "Birth", "Infinity"],
    correctAnswer: "The Letter E",
  },
  {
    question: "What is as big as an elephant, but weighs nothing at all?",
    options: ["Its Shadow", "A Balloon", "A Cloud", "A Thought"],
    correctAnswer: "Its Shadow",
  },
  {
    question: "What is put on a table, cut, but never eaten?",
    options: ["A Deck of Cards", "Paper", "Fabric", "Wood"],
    correctAnswer: "A Deck of Cards",
  },
  {
    question: "What can be stolen, mistaken, or altered, yet never leaves you your entire life?",
    options: ["Your Identity", "Your Name", "Your Memory", "Your Shadow"],
    correctAnswer: "Your Identity",
  },
  {
    question: "What belongs to you, but others use it more than you do?",
    options: ["Your Name", "Your Shadow", "Your Voice", "Your Time"],
    correctAnswer: "Your Name",
  },
  {
    question: "What is always coming but never arrives?",
    options: ["Tomorrow", "The Future", "The Horizon", "Death"],
    correctAnswer: "Tomorrow",
  },
  {
    question: "What can be caught but not thrown?",
    options: ["A Cold", "Attention", "A Train", "Sleep"],
    correctAnswer: "A Cold",
  },
  {
    question: "What is black when you buy it, red when you use it, and gray when you throw it away?",
    options: ["Charcoal", "Lipstick", "Wine", "Matches"],
    correctAnswer: "Charcoal",
  },
  {
    question: "What can be swallowed, but can also swallow you?",
    options: ["Pride", "Water", "Fear", "Time"],
    correctAnswer: "Pride",
  },
  {
    question: "What starts with 'e', ends with 'e', and contains one letter?",
    options: ["Envelope", "Eye", "Eke", "Eve"],
    correctAnswer: "Envelope",
  },
  {
    question: "What word is pronounced the same if you take away four of its five letters?",
    options: ["Queue", "Quack", "Quick", "Quilt"],
    correctAnswer: "Queue",
  },
  {
    question: "What is the end of everything?",
    options: ["The Letter G", "Death", "Infinity", "Nothing"],
    correctAnswer: "The Letter G",
  },
  {
    question: "What is always in bed but never sleeps?",
    options: ["A River", "A Pillow", "A Book", "A Dream"],
    correctAnswer: "A River",
  },
  {
    question: "What has a bottom at the top?",
    options: ["Your Legs", "A Mountain", "A Bottle", "A Hat"],
    correctAnswer: "Your Legs",
  },
]
