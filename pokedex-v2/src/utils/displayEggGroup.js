import { capitaliseName } from "../utils/capitaliseName";

export function displayEggGroup(eggGroups) {
  console.log(eggGroups);
  if (eggGroups.length === 1) {
    return capitaliseName(eggGroups[0].name);
  }
  return (
    capitaliseName(eggGroups[0].name) + ", " + capitaliseName(eggGroups[1].name)
  );
}
