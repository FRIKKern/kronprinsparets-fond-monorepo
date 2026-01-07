import { EmailIcon, PhoneIcon } from "./CircleIcon";
import { Body1, Subtitle2 } from "./Typography";
import { cn } from "@/lib/helpers";

type Props = {
  flytEmployees: Array<{
    name: string;
    phone?: string;
    email?: string;
    stillinger?: Array<{
      name: string;
      group?: {
        kommune: { name: string };
        year: string;
      };
    }>;
  }>;
  contactPage?: boolean;
  isGlobal?: boolean;
};

export function FlytEmployeeList({
  flytEmployees,
  contactPage,
  isGlobal,
}: Props) {
  const createGroupName = (stillinger: Array<{ name: string; group?: { kommune: { name: string }; year: string } }>) => {
    const filtered = stillinger.filter(({ group }) => group);
    return filtered
      .map(
        ({ name, group }, index) =>
          `${
            stillinger.every(({ name: globalName }) => name === globalName) &&
            index > 0
              ? ""
              : name
          } ${group!.kommune.name} ${group!.year}`
      )
      .join(", ");
  };

  return (
    <div>
      {flytEmployees.length > 0
        ? flytEmployees.map(
            (
              { name, phone, stillinger, email },
              index
            ) => (
              <div
                key={`flyt-ansatt-${index}`}
                className={cn(
                  "flex justify-between items-center py-4 px-[var(--page-horizontal-padding)] mb-1",
                  contactPage
                    ? "bg-[var(--current-theme-color-100)]"
                    : "bg-[var(--current-theme-color-200)]"
                )}
              >
                <div>
                  <Subtitle2>{name}</Subtitle2>
                  <Body1>
                    {isGlobal
                      ? createGroupName(stillinger || [])
                      : stillinger && stillinger.length > 0
                      ? stillinger[0].name
                      : ""}
                  </Body1>
                </div>
                <div className="flex items-center [&_svg]:fill-[var(--current-theme-color-700)]">
                  {phone && <PhoneIcon phone={phone} />}
                  {email && <EmailIcon email={email} />}
                </div>
              </div>
            )
          )
        : "No results"}
    </div>
  );
}

