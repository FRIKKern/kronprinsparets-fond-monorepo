import { Employee } from "./Employee";
import { Heading5, Subtitle2 } from "./Typography";

type Props = {
  mainEmployee: {
    name: string;
    position: string;
    phone?: string;
    email?: string;
    image?: any;
  };
  kommuneName?: string;
  kommuneNumber?: string;
};

export function KommuneNotFound({
  mainEmployee,
  kommuneName,
  kommuneNumber,
}: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <Heading5 className="mb-4">
        FLYT-programmet finnes ikke i {kommuneName} kommune enda
      </Heading5>
      <Subtitle2 className="mb-6">
        Hvis du ønsker å få Flytprogrammet til {kommuneName} kommune, ta
        kontakt med {mainEmployee.name.split(" ")[0]}, vår{" "}
        {mainEmployee.position} for å høre mer:
      </Subtitle2>
      <Employee {...mainEmployee} />
    </div>
  );
}

