import { EmailIcon, PhoneIcon } from "./CircleIcon";
import { SanityImage } from "./SanityImage";
import { Body1, Subtitle2 } from "./Typography";

type Props = {
  name: string;
  image?: any;
  position?: string;
  phone?: string;
  email?: string;
};

export function Employee({ name, image, position, phone, email }: Props) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 [&_p]:m-0 [&_svg]:fill-[var(--current-theme-color-700)]">
      {image && (
        <div className="w-[100px]">
          <SanityImage image={image} width={100} className="w-full" />
        </div>
      )}
      <div>
        <Subtitle2>{name}</Subtitle2>
        {position && <Body1>{position}</Body1>}
        {phone && (
          <Body1>
            <PhoneIcon phone={phone} />
            {phone}
          </Body1>
        )}
        {email && (
          <Body1>
            <EmailIcon email={email} />
            {email}
          </Body1>
        )}
      </div>
    </div>
  );
}

