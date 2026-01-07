import { Subtitle1, Body1 } from "./Typography";

type Props = {
  text: string;
  author: string;
};

export function Quote({ text, author }: Props) {
  return (
    <div className="relative my-8 mb-4">
      <svg
        className="absolute left-0 top-[-22px]"
        width="46"
        height="46"
        fill="none"
      >
        <path
          d="M19.029 7.536A18.609 18.609 0 00.959 26.603v2.383a9.472 9.472 0 109.47-9.47 8.84 8.84 0 00-2.137.268.48.48 0 01-.531-.706 13.095 13.095 0 0111.268-6.75 2.396 2.396 0 100-4.792zM42.646 12.328a2.396 2.396 0 100-4.792 18.611 18.611 0 00-18.07 19.067v2.383a9.472 9.472 0 109.472-9.47 8.836 8.836 0 00-2.14.268.478.478 0 01-.53-.706 13.094 13.094 0 0111.268-6.75z"
          fill="var(--current-theme-color-200)"
        />
      </svg>
      <div className="relative z-[1] px-3">
        <Subtitle1>{text}</Subtitle1>
        <Body1 className="ml-2 ">- {author}</Body1>
      </div>
    </div>
  );
}

