import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
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

        {/* List of songs */}
        <div>List of songs</div>
      </div>
    </div>
  );
}