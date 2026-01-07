import { cn } from "@/lib/helpers";
import styles from "./GroupSelector.module.css";

type Group = {
  name: string;
  _id: string;
};

type Props = {
  groups: Group[];
  changeGroup: (group: Group) => void;
  selectedGroup: Group;
};

export function GroupSelector({
  groups,
  changeGroup,
  selectedGroup,
}: Props) {
  return (
    <ul className={styles.groups}>
      {groups.map((group, index) => (
        <li
          key={`group-selector-item-${index}`}
          className={cn(styles.group, selectedGroup.name === group.name && styles.selected)}
        >
          <button onClick={() => changeGroup(group)}>{group.name}</button>
        </li>
      ))}
    </ul>
  );
}

