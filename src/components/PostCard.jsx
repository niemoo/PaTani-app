import Link from "next/link";

export default function PostCard() {
  return (
    <main className="flex flex-col w-1/2 border border-gray p-4 mb-5">
      <h3 className="text-sm font-bold mb-3 ">🥬 Sayuran</h3>
      <h1 className="text-xl font-bold ">Melon Afrika Selatan</h1>
      <p className="">
        Availability Date: <span>21 January,2024</span>
      </p>
      <p className="">
        Jumlah: <span>1000 kg</span>
      </p>
      <p className="">
        Open Harga: <span>Rp. 40.000/40kg</span>
      </p>
      <br />
      <p className="text-md">
        Melon tanduk atau melano adalah tanaman merambat yang nama binomialnya
        Cucumis metuliferus. Ditanam untuk diambil buahnya. Melon tanduk atau
        dikenal sebagai kiwano merupakan buah asli Afrika Selatan.
      </p>
    </main>
  );
}
