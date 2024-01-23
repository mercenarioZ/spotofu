import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";

// this constant is used to revalidate the page every 0 seconds
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="font-semibold text-xl">Welcome</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-2">
            <ListItem
              image="/images/liked.png"
              name="Liked songs"
              href="liked"
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-6 px-6">
        <div>
          <h1 className="text-xl font-semibold">Newest songs</h1>
        </div>

        <PageContent songs={songs} />
      </div>
    </div>
  );
}
