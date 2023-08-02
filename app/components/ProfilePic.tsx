import Image from "next/image";

export default function ProfilePic() {
  return (
    <section className="w-full mx-auto">
      <Image
        className=""
        src="/images/profile.png"
        width={200}
        height={200}
        alt="Andréia Souza"
        priority
      />
    </section>
  );
}
