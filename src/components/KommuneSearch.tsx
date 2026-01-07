"use client";

import { useState, useMemo, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { Input as BaseInput } from "@base-ui-components/react/input";
import Link from "next/link";
import { fuzzySearch } from "@/lib/searchUtils";
import { Icon } from "./Icon";
import { cn } from "@/lib/helpers";

type Kommune = {
  _id: string;
  name: string;
  groupUrl: string | null;
};

type Props = {
  searchData: {
    placeholder: string;
    showAllKommunes: string;
  };
  kommuneList: Kommune[];
};

const defaultSelectedIndexValue = -1;

function useKommuneSearch(kommuneList: Kommune[]) {
  const router = useRouter();
  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case "NAVIGATE_WITH_ARROWS":
          const newValue = state.selectedIndex + action.value;
          if (newValue >= 0 && newValue < state.results.length) {
            let groupUrl = state.results[newValue].groupUrl;
            return {
              ...state,
              selectedIndex: newValue,
              selectedKommuneUrl: groupUrl ? groupUrl : "har-ikke-flyt-enda",
            };
          }
          return state;
        case "UPDATE_QUERY":
          return { ...state, query: action.value, results: [] };
        case "UPDATE_RESULTS":
          const dropdownOpen = action.value.length > 0;
          return {
            ...state,
            results: action.value ? action.value.slice(0, 4) : [],
            dropdownOpen: dropdownOpen,
            selectedIndex: dropdownOpen
              ? state.selectedIndex
              : defaultSelectedIndexValue,
          };
        case "NAVIGATE_TO_KOMMUNE":
          if (state.selectedKommuneUrl) {
            router.push(state.selectedKommuneUrl);
          }
          break;
        default:
          return state;
      }
    },
    {
      query: "",
      results: [],
      dropdownOpen: false,
      selectedIndex: defaultSelectedIndexValue,
      selectedKommuneUrl: "",
    }
  );

  useEffect(() => {
    const arrowListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        dispatch({ type: "NAVIGATE_WITH_ARROWS", value: -1 });
      } else if (e.key === "ArrowDown") {
        dispatch({ type: "NAVIGATE_WITH_ARROWS", value: 1 });
      } else if (e.key === "Enter") {
        dispatch({ type: "NAVIGATE_TO_KOMMUNE" });
      }
    };
    document.addEventListener("keydown", arrowListener);
    return () => document.removeEventListener("keydown", arrowListener);
  }, []);

  const search = (query: string) => {
    dispatch({ type: "UPDATE_QUERY", value: query });
    let resultsArray: Kommune[] = [];
    if (query.length >= 1) {
      resultsArray = fuzzySearch(query, kommuneList);
    }
    dispatch({ type: "UPDATE_RESULTS", value: resultsArray });
  };

  return { ...state, search };
}

export function KommuneSearch({ searchData, kommuneList }: Props) {
  const { query, search, results, dropdownOpen, selectedIndex } =
    useKommuneSearch(kommuneList.filter((k) => k.groupUrl));

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Icon icon="search" size={18} />
        </div>
        <BaseInput
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder={searchData.placeholder}
          className={cn(
            "w-full pl-10 pr-4 py-3 border border-gray-300 rounded bg-white text-[var(--text-color)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--current-theme-color-400)] focus:border-transparent",
            dropdownOpen && "rounded-b-none"
          )}
        />
        {dropdownOpen && results.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-t-0 border-gray-300 rounded-b shadow-lg max-h-60 overflow-auto">
            {results.map((kommune: Kommune, index: number) => (
              <li
                key={kommune._id}
                className={cn(
                  "px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between",
                  selectedIndex === index && "bg-gray-100"
                )}
              >
                <Link
                  href={kommune.groupUrl || "/har-ikke-flyt-enda"}
                  className="flex items-center justify-between w-full"
                >
                  {kommune.name}
                  <Icon icon="arrowRight" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link
        href="/alle-kommuner"
        className="text-current underline underline-offset-2"
      >
        {searchData.showAllKommunes}
      </Link>
    </div>
  );
}
