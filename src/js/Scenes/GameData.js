
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


ImageLoader.onComplete( () => {
    LouChalibre.talkSound = SOUNDS.LouTalk;
    LouChalibre.image = IMAGES.LouChalibre;
});

// SOUNDS.onComplete( () => {
//     LouChalibre.talkSound = SOUNDS.LouTalk;
// });


GameSequence = [
    {
        name: "opening cutscene",
        DialogueData: [
            {person: LouChalibre, text: "The time to <color red>vote</color> is <wiggle>approaching!"},
            {person: LouChalibre, text: "Are you ready to cast your ballot?"},
        ],
        continueOnDialogueFinish: true,
    },
    {
        name: "Level 1",
        Goal: "Get to The Registrar Office!",
        DialogueData: [
            {person: LouChalibre, text: "You're not registered to vote? Today is the last day!"},
            {person: LouChalibre, text: "Hurry! you better get to the Registrar Office!"},
            {person: LouChalibre, text: "Before its <wiggle>too||o|||o|||||o|||o|| l|||a|||t|||e!"},
        ],
        npcTexts: [
            "You haven't registered to vote yet? Cmon lets go!",
            "You're not registered yet? Its the last day!",
            "Lets get you to the registrar office!",
            "Oh the last day is today?, I need to register to vote too!",
            "The registrar office? Lets go!",
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
            {person: LouChalibre, text: "Press the [Attack] button to show em what for!"},
        ],
        spawnRandom: [
            [Bot, 4],
        ]
    },
    {
        name: "1-2",
        DialogueData: [], //give ballot cutscene
        spawnRandom: [
            // [KnockableDoor, 10],
            [Bot, 8],
            [Ninja, 3],
            // [Bot, 10],
        ]
    },
    {
        name: "Registrar Office Reached",
        DialogueData: [
            {person: LouChalibre, text: "you made it to the Registrar office!"},
            {text: "<color red> you received a ballot!"},
        ], //give ballot cutscene
        
    },
    {
        name: "Low Rider Transition",
        DialogueData: [
            {person: LouChalibre, text: "Hey bud, We're heading to the community rally"},
            {person: LouChalibre, text: "Need a ride?"},
        ],
        night: true,
    },
    {
        name: "Go to Community Rally",
        Goal: "Enter the Community Rally",
        levelData: {},
    },
    {
        name: "Community Rally - 1",
        npcTexts: [
            "hello join us",
            "we are representing something"
        ],
        spawnRandom: [
            [HighFiver, 3]
        ]
    },
    {
        name: "Community Rally - 2",
        spawnRandom: [
            [Bot, 4]
        ]
    },
    {
        name: "Community Rally - 1",
        npcTexts: [
            "hello join us",
            "we are representing something"
        ],
        spawnRandom: [
            [HighFiver, 3]
        ]
    },
    // {
    //     name: "Community Rally",
    //     Goal: "Talk to 5 tables",
    //     levelData: {},
    //     encounters: [
    //         {
    //             name :'table 1',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.InternetTroll,
    //                 ENEMIES.RussianBot,
    //             ]
    //         },
    //         {
    //             name :'table 2',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.RussianBot,
    //                 ENEMIES.CyberNinja,
    //             ]
    //         },{
    //             name :'table 3',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.InternetTroll,
    //                 ENEMIES.CyberNinja,
    //             ]
    //         },{
    //             name :'table 4',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.InternetTroll,
    //                 ENEMIES.RussianBot,
    //                 ENEMIES.CyberNinja,
    //                 ENEMIES.QAnonShamon,
    //                 ENEMIES.MagaHatMarge,
    //             ]
    //         },{
    //             name :'table 5',
    //             DialogueData: [],
    //         },
    //     ]
    // },
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