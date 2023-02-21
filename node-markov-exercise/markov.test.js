const {MarkovMachine} = require("./markov");

describe('MarkovMachine', function() {
    
    test('create chains test', function () {
        const inputText = "What we think we become"
        const mm = new MarkovMachine(inputText);
        mm.makeChains();
        const targetChains = new Map([
            ["What", ["we"]],
            ["we", ["think", "become"]],
            ["think", ["we"]],
            ["become", [null]]
        ]);
        expect(mm.chains).toEqual(targetChains)
    })

    test('pick random element from array using choice()', function() {
        expect(MarkovMachine.choice([1,1,1])).toEqual(1);
        expect([1,2,3]).toContain(MarkovMachine.choice([1,2,3]));
    })
})