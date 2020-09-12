export function capitaliseName(move_name) {
    move_name = move_name.replace(/-/gi, " ")
    let space = move_name.lastIndexOf(" ")
    if (space !== -1) {
        move_name = move_name.slice(0,space+1) + move_name.charAt(space+1).toUpperCase() + move_name.slice(space+2);
    }
    return move_name.charAt(0).toUpperCase() + move_name.slice(1);
}