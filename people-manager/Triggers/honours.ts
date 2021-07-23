import { TriggerItem, ExecuteScriptAction, TriggerType } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient, Person, City, Gender, Month, Race, Mark } from 'people-manager/people-manager';

declare const client: PeopleManagerClient & SystemServiceClient;

export const honours = new TriggerItem(
    'Honours',
    /^([\w\W]+) \((male|female) ([A-Za-z' ]+)\)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                const indexOffset = current_block.indexOf(current_line);

                const fullNameGenderRaceRegExp = /^([\w\W]+) \((male|female) ([A-Za-z' ]+)\)\.$/;
                const ageRegExp = /^(?:He|She) is (\d+) years old, having been born on the (\d+)(?:st|nd|rd|th) of (Sarapin|Daedalan|Aeguary|Miraman|Scarlatan|Ero|Valnuary|Lupar|Phaestian|Chronos|Glacian|Mayan), (\d+) years after the fall of the Seleucarian Empire\.$/;
                const ageHiddenRegExp = /^(?:His|Her) date of birth is hidden by the sand of Aeon\.$/;
                const ageOldRegExp = /^(?:He|She) was born before the fall of the Seleucarian Empire\.$/;
                const ageImmortalRegExp = /^(?:He|She) was born before time was counted\.$/;
                const xpRankRegExp = /^(?:He|She) is ranked (\d+)(?:st|nd|rd|th) in Achaea\./;
                const xpUnrankedRegExp = /^(?:He|She) is unranked in Achaea\./;
                const combatRankRegExp = /^(?:He|She) is the (\d+)(?:st|nd|rd|th) ranked combatant with a rating of (\d+)\.$/;
                const infamousRegExp = /^(?:He|She) is one of the Infamous\.$/;
                const notInfamousRegExp = /^(?:He|She) is not known for acts of infamy\.$/;
                const markRegExp = /^(?:He|She) is a member of the (Ivory|Quisalis) Mark\.$/;
                const markRankRegExp = /^(?:He|She) is the [\w\W]+? in the (Ivory|Quisalis) Mark\.$/;
                const cityRankRegExp = /^(?:He|She) is an? ([A-Z][a-z]+) in (Ashtan|Cyrene|Eleusis|Hashan|Mhaldor|Targossas)\.$/;
                const cityArmyRegExp = /^(?:He|She) is ([\w\W]+) in the army of (Ashtan|Cyrene|Eleusis|Hashan|Mhaldor|Targossas)\.$/;
                const mightRegExp = /^(?:He|She|It) is considered to be approximately (\d+)% of your might\.$/;
                const mightEqualRegExp = /^(?:He|She) is considered to be approximately equal to your might\.$/;
                const houseRegExp = /^(?:He|She) is ([\w\W]+) in the ([\w\W]+)\.$/;
                const coatOfArmsRegExp = /^(?:He|She) bears the arms: ([\w\W]+)\.$/;
                const divorcesRegExp = /^(?:He|She) has been divorced (?:(\d+) times|once)\.$/;
                const mottoRegExp = /^(?:His|Her) motto: '([\w\W]+)'$/;
                const warcryRegExp = /^(?:His|Her) warcry: '([\w\W]+)'$/;
                const deedsRegExp = /^See HONOURS DEEDS ([A-Z]+) to view (?:his|her) (\d+) special honours\.$/;

                const updatedPerson: Partial<Person> = {
                    city: 'cityless',
                    honoursed: true
                };

                for (let i = indexOffset; i < current_block.length; i++) {
                    const currentLine = current_block[i];

                    // Prompt
                    if (!('parsed_line' in currentLine)) {
                        break;
                    }

                    const currentText = currentLine.parsed_line.text();

                    // Full name, Gender, Race
                    if (fullNameGenderRaceRegExp.test(currentText)) {
                        const [, fullName, gender, race] = currentText.match(fullNameGenderRaceRegExp) || [];

                        updatedPerson.fullName = fullName;
                        updatedPerson.gender = <Gender>gender.toLowerCase();
                        updatedPerson.race = <Race>race.toLowerCase();
                    }
                    // Age, Birthday, Birthmonth, Birthyear
                    else if (ageRegExp.test(currentText)) {
                        const [, age, birthday, birthmonth, birthyear] = currentText.match(ageRegExp) || [];

                        updatedPerson.age = Number(age);
                        updatedPerson.birthday = Number(birthday);
                        updatedPerson.birthmonth = <Month>birthmonth.toLowerCase();
                        updatedPerson.birthyear = Number(birthyear);
                    }
                    // Age, Hidden
                    else if (ageHiddenRegExp.test(currentText)) {
                        if (!updatedPerson.age) {
                            updatedPerson.age = 'hidden';
                        }

                        if (!updatedPerson.birthday) {
                            updatedPerson.birthday = 'hidden';
                        }

                        if (!updatedPerson.birthmonth) {
                            updatedPerson.birthmonth = 'hidden';
                        }

                        if (!updatedPerson.birthyear) {
                            updatedPerson.birthyear = 'hidden';
                        }
                    }
                    // Age, Old
                    else if (ageOldRegExp.test(currentText)) {
                        updatedPerson.age = 'old';
                        updatedPerson.birthday = 'old';
                        updatedPerson.birthmonth = 'old';
                        updatedPerson.birthyear = 'old';
                    }
                    // Age, Immortal
                    else if (ageImmortalRegExp.test(currentText)) {
                        updatedPerson.age = 'immortal';
                        updatedPerson.birthday = 'immortal';
                        updatedPerson.birthmonth = 'immortal';
                        updatedPerson.birthyear = 'immortal';
                    }
                    // XP Rank
                    else if (xpRankRegExp.test(currentText)) {
                        const [, xpRank] = currentText.match(xpRankRegExp) || [];

                        updatedPerson.xpRank = Number(xpRank);
                    }
                    // XP Unranked
                    else if (xpUnrankedRegExp.test(currentText)) {
                        updatedPerson.xpRank = undefined;
                    }
                    // Combat Rank, Combat Rating
                    else if (combatRankRegExp.test(currentText)) {
                        const [, combatRank, combatRating] = currentText.match(combatRankRegExp) || [];

                        updatedPerson.combatRank = Number(combatRank);
                        updatedPerson.combatRating = Number(combatRating);
                    }
                    // Infamous
                    else if (infamousRegExp.test(currentText)) {
                        updatedPerson.infamous = true;
                    }
                    // Not Infamous
                    else if (notInfamousRegExp.test(currentText)) {
                        updatedPerson.infamous = false;
                    }
                    // Mark
                    else if (markRegExp.test(currentText)) {
                        const [, mark] = currentText.match(markRegExp) || [];

                        updatedPerson.mark = <Mark>mark.toLowerCase();
                    }
                    // Mark Rank
                    else if (markRankRegExp.test(currentText)) {
                        const [, mark] = currentText.match(markRankRegExp) || [];

                        updatedPerson.mark = <Mark>mark.toLowerCase();
                    }
                    // City, City Rank
                    else if (cityRankRegExp.test(currentText)) {
                        const [, cityRank, city] = currentText.match(cityRankRegExp) || [];

                        updatedPerson.cityRank = cityRank;
                        updatedPerson.city = <City>city.toLowerCase();
                    }
                    // City, City Army, City Army Rank
                    else if (cityArmyRegExp.test(currentText)) {
                        const [, cityArmyRank, city] = currentText.match(cityArmyRegExp) || [];

                        updatedPerson.cityArmyRank = cityArmyRank;
                        updatedPerson.cityArmy = true;
                        updatedPerson.city = <City>city.toLowerCase();
                    }
                    // Might Percent
                    else if (mightRegExp.test(currentText)) {
                        const [, mightPercent] = currentText.match(mightRegExp) || [];

                        updatedPerson.mightPercent = Number(mightPercent);
                    }
                    // Might Percent Equal
                    else if (mightEqualRegExp.test(currentText)) {
                        updatedPerson.mightPercent = 100;
                    }
                    // House, House Rank
                    else if (houseRegExp.test(currentText)) {
                        const [, houseRank, house] = currentText.match(houseRegExp) || [];

                        updatedPerson.houseRank = houseRank;
                        updatedPerson.house = house;
                    }
                    // Coat of Arms
                    else if (coatOfArmsRegExp.test(currentText)) {
                        const [, coatOfArms] = currentText.match(coatOfArmsRegExp) || [];

                        updatedPerson.coatOfArms = coatOfArms;
                    }
                    // Divorces
                    else if (divorcesRegExp.test(currentText)) {
                        const [, divorces] = currentText.match(divorcesRegExp) || [];

                        updatedPerson.divorces = divorces === undefined ? 1 : Number(divorces);
                    }
                    // Motto
                    else if (mottoRegExp.test(currentText)) {
                        const [, motto] = currentText.match(mottoRegExp) || [];

                        updatedPerson.motto = motto;
                        updatedPerson.warcry = undefined;
                    }
                    // Warcry
                    else if (warcryRegExp.test(currentText)) {
                        const [, warcry] = currentText.match(warcryRegExp) || [];

                        updatedPerson.motto = undefined;
                        updatedPerson.warcry = warcry;
                    }
                    // Name, Deeds
                    else if (deedsRegExp.test(currentText)) {
                        const [, name, deeds] = currentText.match(deedsRegExp) || [];

                        updatedPerson.name = name.toLowerCase();
                        updatedPerson.deeds = Number(deeds);
                    }
                }

                let foundPerson = false;

                if (updatedPerson.name) {
                    client.peopleManager.updatePerson(updatedPerson.name, updatedPerson);

                    foundPerson = true;
                }
                else if (client.peopleManager.honoursName && updatedPerson.fullName?.toLowerCase().indexOf(client.peopleManager.honoursName) !== -1) {
                    client.peopleManager.updatePerson(client.peopleManager.honoursName, updatedPerson);

                    if (client.peopleManager.honoursTimerId) {
                        clearTimeout(client.peopleManager.honoursTimerId);

                        client.peopleManager.honoursName = undefined;
                        client.peopleManager.honoursTimerId = undefined;
                    }

                    foundPerson = true;
                }
                else if (updatedPerson.fullName) {
                    const names: string[] = [];
                    const regExp = /([A-Z][a-z]+)/g;

                    let match: RegExpExecArray | null = null;

                    while (match = regExp.exec(updatedPerson.fullName)) {
                        names.push(match[1]);
                    }

                    if (names.length === 1 && names[0]) {
                        const name = names[0].toLowerCase();

                        client.peopleManager.updatePerson(name, updatedPerson);

                        foundPerson = true;
                    }
                }

                if (!foundPerson) {
                    client.peopleManager.error(`Could not identify person: Full Name: '${updatedPerson.fullName}', Name: '${updatedPerson.name}'`);
                }
            }
        )
    ]
);
