import Image from "next/image";

// interface CardProps {
//   pokemon: Pokemon;
// }

export function Card() {
  return (
    <div className="rounded-md bg-white shadow-sm">
      <div className="flex justify-center rounded-md rounded-b-none bg-green-300">
        <Image
          width={180}
          height={180}
          alt={"Bulbasaur"}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${1}.png`}
          className=""
        />
      </div>

      <div className="p-4">
        <div className="flex items-center">
          <span className="text-lg font-bold">#{"1".padStart(3, "0")}</span>
          <strong className="ml-4">{"Bulbasaur"}</strong>
        </div>

        <div className="flex">
          <span className="font-medium">Tipo</span>
          <span className="ml-auto text-gray-600">
            {"Grass"}/{"Poison"}
          </span>
        </div>

        <div className="flex">
          <span className="font-medium">Tamanho</span>
          <span className="ml-auto text-gray-600">{"0.7"} m</span>
        </div>

        <div className="flex">
          <span className="font-medium">Peso</span>
          <span className="ml-auto text-gray-600">{"6.9"} kg</span>
        </div>
      </div>
    </div>
  );
}
