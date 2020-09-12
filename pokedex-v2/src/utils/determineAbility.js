export function determineAbility(string, key, abilityTotalNum) {
    if (key === abilityTotalNum - 1 && abilityTotalNum !== 1) {
        return "Hidden Ability: " + string;
    }
    return string;

}