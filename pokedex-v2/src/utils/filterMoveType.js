export function filterMoveType(move_name, version_group_detail_object, learn_method) {
    let move_learn_level = {};
    const moves = version_group_detail_object.map((value) => (
        move_learn_level[move_name] = value.level_learned_at,
        value.move_learn_method.name === learn_method && value.version_group.name === "ultra-sun-ultra-moon"? value.move_learn_method.name: null
    ));
    // console.log(version_group_detail_object)
    // console.log(move_learn_level)
    // console.log(moves)
    return moves.includes(learn_method) ? (learn_method === "level-up" ? "Lv " + move_learn_level[move_name] + " " : "") + move_name : null

}