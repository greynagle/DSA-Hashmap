function main() {
    const lotr = new HashMap();
    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;

    lotr.set("Hobbit", "Bilbo");
    lotr.set("Hobbit", "Frodo");
    lotr.set("Wizard", "Gandalf");
    lotr.set("Human", "Aragorn");
    lotr.set("Elf", "Legolas");
    lotr.set("Maiar", "The Necromancer");
    lotr.set("Maiar", "Sauron");
    lotr.set("RingBearer", "Gollum");
    lotr.set("LadyOfLight", "Galadriel");
    lotr.set("HalfElven", "Arwen");
    lotr.set("Ent", "Treebeard");
    console.log(lotr);

    console.log(lotr.get("Maiar"));
    console.log(lotr.get("Hobbit"));
    // The other values for Maiar and Hobbit aren't stored, because we only record one value per key. If we allowed an array of values, we could record many values per key but as it is, we overwrite for identical keys
}

["10", "22", "31", "4", "15", "28", "17", "88", "59"].forEach((val) =>
    console.log(HashMap._hashString(val))
);

main();

// for question 2, looks like the function first creates some strings, then initializes a hashmap. It sets the first index using the first string and assigns it a value, then overwrites that value with the second string. The same thing happens in the second hashmap. When asked to return the hashmaps at the end, what it's going to return, because of the identical values of the keys, is the values set for str2 and str 4, even though the user asks for str1 and str3.

function duplicates(string) {
    let fill = new HashMap();
    string
        .split("")
        .filter((check) => check !== " ")
        .forEach((val) => fill.set(val, 1));
    console.log(fill);

    let ans = string
        .split("")
        .filter((check) => check !== " ")
        .reduce((acc, cur) => {
            if (fill.get(cur) != 0) {
                fill.set(cur, 0);
                return acc + cur;
            } else {
                return acc;
            }
        }, "");

    return ans;
}

duplicates("google");

function permPal(string) {
    // if string length is odd, must be one character with
    // odd number of instances and the rest even. if even
    // all instances must have an even occurance
    let palTest = new HashMap();
    palTest.MAX_LOAD_RATIO = 0.5;
    palTest.SIZE_RATIO = 3;
    string
        .split("")
        .filter((check) => check !== " ")
        .forEach((val) => {
            try {
                let inst = palTest.get(val);
                console.log(inst);
                palTest.set(val, inst + 1);
            } catch (error) {
                palTest.set(val, 1);
            }
        });

    let contents = duplicates(string);

    let evenFlag = true;
    let oddFlagArr = [true, true];
    switch (string.length % 2) {
        case 0:
            contents.split("").forEach((val) => {
                if (palTest.get(val) % 2 != 0) {
                    evenFlag = false;
                }
            });
            break;

        default:
            contents.split("").forEach((val) => {
                if (palTest.get(val) % 2 != 0 && oddFlagArr[0] == true) {
                    oddFlagArr[0] = false;
                } else if (
                    palTest.get(val) % 2 != 0 &&
                    oddFlagArr[0] == false
                ) {
                    oddFlagArr[1] = false;
                }
            });
            break;
    }

    let oddFlag = oddFlagArr[0] ^ oddFlagArr[1] ? true : false;

    let returnFlag = string.length % 2 == 0 ? evenFlag : oddFlag;
	
    console.log(`${string} can result in a palindrome? ${returnFlag}`);
}

permPal("1001");
