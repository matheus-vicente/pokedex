import { HTMLAttributes, InputHTMLAttributes } from "react";

interface RootProps extends HTMLAttributes<HTMLDivElement> { } // eslint-disable-line
interface PrefixProps extends HTMLAttributes<HTMLDivElement> { } // eslint-disable-line
interface ControlProps extends InputHTMLAttributes<HTMLInputElement> { } // eslint-disable-line

function Root(props: RootProps) {
  return (
    <div
      {...props}
      className="flex h-10 flex-1 items-center rounded-full border border-gray-200 bg-white px-2"
    />
  );
}

function Prefix(props: PrefixProps) {
  return <div {...props} />;
}

function Control(props: ControlProps) {
  return (
    <input
      {...props}
      type="text"
      placeholder="Procurar pokémon"
      className="flex-1 bg-transparent pl-2 text-gray-900 placeholder-gray-400"
    />
  );
}

export { Root, Prefix, Control };
export type { RootProps, PrefixProps, ControlProps };
