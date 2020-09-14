export function filterMoveType(move_name, version_group_detail_object, learn_method) {
    const moves = version_group_detail_object.map((value) => (
        value.move_learn_method.name === learn_method && value.version_group.name === "ultra-sun-ultra-moon"? value.move_learn_method.name: null
    ));
    // console.log(version_group_detail_object)
    // console.log(move_learn_level)
    // console.log(moves)
    return moves.includes(learn_method) ? move_name : null

}