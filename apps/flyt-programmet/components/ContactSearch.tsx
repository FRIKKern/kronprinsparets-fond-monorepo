"use client";

import { useState } from "react";
import { Input } from "./Input";
import { FlytEmployeeList } from "./FlytEmployeeList";
import { sortByScore, splitNameStringSimilarity } from "@/lib/searchUtils";

type Props = {
  allEmployees: Array<{
    name: string;
    phone?: string;
    email?: string;
    stillinger?: Array<{
      name: string;
      group?: {
        kommune?: { name: string };
        year: string;
      };
    }>;
  }>;
};

export function ContactSearch({ allEmployees }: Props) {
  const [contactQuery, setContactQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);

  const search = (query: string) => {
    let tempResults = allEmployees
      .map((props) => ({
        ...props,
        score:
          props.name && props.stillinger
            ? Math.max(
                splitNameStringSimilarity(query, props.name),
                ...props.stillinger.map(({ group }) =>
                  splitNameStringSimilarity(query, group?.kommune?.name || "")
                )
              )
            : 0,
      }))
      .filter(({ score }) => score > 0.4);
    tempResults = sortByScore(tempResults);
    setResult(tempResults);
    setContactQuery(query);
  };

  return (
    <>
      <Input
        placeholder="Navn eller kommune"
        icon="search"
        value={contactQuery}
        onChange={(e) => search(e.target.value)}
      />
      <br />
      <FlytEmployeeList
        isGlobal
        contactPage
        flytEmployees={contactQuery.length > 1 ? result : allEmployees}
      />
    </>
  );
}
