import Posts from "./components/Posts";
import ProfilePic from "./components/ProfilePic";

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="mx-auto">
      <ProfilePic />
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hi there everyone 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Andreia</span>
        </span>
      </p>
      <Posts />
    </div>
  );
}
