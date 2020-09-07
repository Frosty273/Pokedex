export function displayStat(string) {
    if (string === "hp") {
        return "HP"
    } else if (string === "attack") {
        return  "Atk"
    } else if (string === "defense") {
        return  "Def"
    } else if (string === "special-attack") {
        return  "Sp.Atk"
    } else if (string === "special-defense") {
        return  "Sp.Def"
    } else if (string === "speed") {
        return  "Speed"
    }
}