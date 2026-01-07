"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Heading1, Subtitle1 } from "./Typography";
import { GroupSelector } from "./GroupSelector";
import { ImportantMessage } from "./ImportantMessage";
import { BlockContent } from "./BlockContent";
import { YearList } from "./YearList";
import { SwipeableImageCarousel } from "./SwipeableImageCarousel";
import { FlytEmployeeList } from "./FlytEmployeeList";
import { isPreviousYear } from "@/lib/helpers";

type Group = {
  _id: string;
  name: string;
  year: string;
  introduction?: any;
  images?: Array<{ image: any; caption?: string }>;
  recruitmentLink?: {
    showRecruitmentLink?: boolean;
    recruitmentLink?: string;
    linkText?: string;
  };
  importantMessage?: any;
  content?: any;
  employees?: any[];
};

type Props = {
  groups: Group[];
  otherYears: string[];
  kommuneName: string;
};

export function GroupContent({
  groups,
  otherYears,
  kommuneName,
}: Props) {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);

  const changeGroup = (group: Group) => setSelectedGroup(group);

  return (
    <>
      <Heading1>
        {kommuneName}
        <span style={{ fontSize: "1rem", marginLeft: "1rem" }}>
          {selectedGroup.year}
        </span>
      </Heading1>
      {selectedGroup.introduction && (
        <BlockContent blocks={selectedGroup.introduction} />
      )}
      {isPreviousYear(selectedGroup.year) && <ImportantMessage oldMessage />}
      <GroupSelector
        groups={groups}
        changeGroup={changeGroup}
        selectedGroup={selectedGroup}
      />
      {selectedGroup.images && (
        <SwipeableImageCarousel images={selectedGroup.images} />
      )}
      {selectedGroup.recruitmentLink?.showRecruitmentLink && (
        <>
          <Button
            variant="secondary"
            href={selectedGroup.recruitmentLink.recruitmentLink}
          >
            {selectedGroup.recruitmentLink.linkText}
          </Button>
          <br />
          <br />
        </>
      )}
      {selectedGroup.importantMessage && (
        <ImportantMessage content={selectedGroup.importantMessage} />
      )}
      <BlockContent blocks={selectedGroup.content} />
      <br />
      {otherYears && otherYears.length > 0 && (
        <>
          <Subtitle1>Andre år</Subtitle1>
          <YearList kommuneName={kommuneName} otherYears={otherYears} />
        </>
      )}
      {selectedGroup.employees && selectedGroup.employees.length > 0 && (
        <>
          <br />
          <br />
          <Subtitle1>Kontaktpersoner</Subtitle1>
          <br />
          <FlytEmployeeList flytEmployees={selectedGroup.employees} />
        </>
      )}
    </>
  );
}

