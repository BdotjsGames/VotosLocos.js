
var ENEMIES = {
    RussianBot: '',
    QAnonShamon: '',
    MagaHatMarge: '',
    InternetTroll: '',
    CyberNinja: '',
}

var Environments = {
    Street: {
        tileImage: IMAGES.backgroundTileStreetSidewalk
    }

}

var BlockWalkDoor = {};
var BusStop = {};

function randomEnemies() {
    return {};
}

var LouChalibre = {
    name: "Lou Chailbre",
    image: IMAGES.LouChalibre,
    talkSound: SOUNDS.LouTalk,
    every: 3,
}

console.log(LouChalibre);

ImageLoader.onComplete( () => {
    LouChalibre.image = IMAGES.LouChalibre;
    console.log(LouChalibre);
});


GameSequence = [
    {
        name: "opening cutscene",
        DialogueData: [
            {person: LouChalibre, text: "The time to <color red>vote</color> is <wiggle>approaching!"},
            {person: LouChalibre, text: "You gotta get your ballot!"},
        ],
        continueOnDialogueFinish: true,
    },
    {
        name: "Level 1",
        Goal: "Get to The Registrar Office!",
        DialogueData: [
            {person: LouChalibre, text: "You're not registered to vote?"},
            {person: LouChalibre, text: "You gotta get to the Registrar Office!"},
        ],
        spawnRandom: [
            [HighFiver, 10]
        ],
        levelData: {},
        // encounters: [
        //     {
        //         name: "First combat",
        //         Goal: "Defeat the enemies!",
        //         enemies: [
        //             ENEMIES.RussianBot,
        //             ENEMIES.QAnonShamon,
        //             ENEMIES.MagaHatMarge,
        //         ]
        //     },
        //     {
        //         name: "Registrar Office"
        //     }
        // ]
    },
    {
        name: "First combat",
        Goal: "Defeat the enemies!",
        DialogueData: [
            {person: LouChalibre, text: "<bam>Uh Oh!"},
            {person: LouChalibre, text: "Watch out for the bots!"},
        ],
        spawnRandom: [
            [Bot, 10],
        ]
    },
    {
        name: "Registrar Office Reached",
        DialogueData: [], //give ballot cutscene
        spawnRandom: [
            [Drone, 10],
            [Bot, 10],
        ]
    },
    {
        name: "Low Rider Transition",
        night: true,
    },
    {
        name: "Go to Community Rally",
        Goal: "Enter the Community Rally",
        levelData: {},
    },
    {
        name: "Community Rally",
        Goal: "Talk to 5 tables",
        levelData: {},
        encounters: [
            {
                name :'table 1',
                DialogueData: [],
            },
            {
                name :'enemyEncounter',
                enemies: [
                    ENEMIES.InternetTroll,
                    ENEMIES.RussianBot,
                ]
            },
            {
                name :'table 2',
                DialogueData: [],
            },
            {
                name :'enemyEncounter',
                enemies: [
                    ENEMIES.RussianBot,
                    ENEMIES.CyberNinja,
                ]
            },{
                name :'table 3',
                DialogueData: [],
            },
            {
                name :'enemyEncounter',
                enemies: [
                    ENEMIES.InternetTroll,
                    ENEMIES.CyberNinja,
                ]
            },{
                name :'table 4',
                DialogueData: [],
            },
            {
                name :'enemyEncounter',
                enemies: [
                    ENEMIES.InternetTroll,
                    ENEMIES.RussianBot,
                    ENEMIES.CyberNinja,
                    ENEMIES.QAnonShamon,
                    ENEMIES.MagaHatMarge,
                ]
            },{
                name :'table 5',
                DialogueData: [],
            },
        ]
    },
    {
        name :"Community Rally complete",
        DialogueData: []
    },
    {
        name: "Rally March Transition"
    },
    {
        name :"Block Walking Introduction",
        DialogueData: []
    },
    {
        name :"Block Walking",
        Goal :"Knock on 10 doors",
        ecnouters: [
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            randomEnemies(),
            BlockWalkDoor,
            BusStop,
        ]
    },
    {
        name: "Bus Transition"
    },
    {
        name: "To The Polling Station",
        Goal: "Get to the Polling Station!",
        encounters: [
            BusStop, 
            {name: "blockade"},
            {name: "enemy swarm"},
            {name: "polling station"},
        ]
    },
    {
        name: "Boss cutscene"
    },
    {
        name: "Boss Fight"
    },
    {
        name: "Vote Cutscene"
    }

]