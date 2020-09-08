export function determineAbility(string, key, abilityTotalNum) {
    const abilityName = string.charAt(0).toUpperCase() + string.slice(1);
    if (key === abilityTotalNum - 1) {
        return "Hidden Ability: " + string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string.charAt(0).toUpperCase() + string.slice(1);

}