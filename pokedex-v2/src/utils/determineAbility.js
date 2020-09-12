export function determineAbility(string, key, abilityTotalNum) {
    if (key === abilityTotalNum - 1 && abilityTotalNum !== 1) {
        return "Hidden Ability: " + string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string.charAt(0).toUpperCase() + string.slice(1);

}